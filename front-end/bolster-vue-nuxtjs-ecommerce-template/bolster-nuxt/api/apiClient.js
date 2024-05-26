import axios from 'axios';

// Axios 인스턴스 생성
const apiClient = axios.create({
    baseURL: 'http://localhost:8080', // 백엔드 서버 주소
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 인터셉터
apiClient.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('JWT_TOKEN');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = sessionStorage.getItem('REFRESH_TOKEN');
                const response = await axios.post('http://localhost:8080/auth/refresh', { refreshToken });
                const newAccessToken = response.data.accessToken;
                const newAccessTokenExpiration = response.data.accessTokenExpiration;

                // 새로운 액세스 토큰과 만료 시간을 세션 스토리지에 저장
                sessionStorage.setItem('JWT_TOKEN', newAccessToken);
                sessionStorage.setItem('ACCESS_TOKEN_EXPIRATION', newAccessTokenExpiration);

                axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                return apiClient(originalRequest);
            } catch (refreshError) {
                // 리프레시 토큰 갱신 실패 시 처리
                console.error('리프레시 토큰 갱신 실패:', refreshError);
                // 로그아웃 처리 또는 사용자에게 재로그인 요청
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
