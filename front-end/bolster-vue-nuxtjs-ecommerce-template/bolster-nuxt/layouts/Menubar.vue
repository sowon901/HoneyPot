<template>
    <div>
        <div :class="['navbar-area', { 'scrolled': isScrolled }]">
            <div class="comero-nav">
                <div class="container">
                    <nav class="navbar navbar-expand-md navbar-light">
                        <nuxt-link class="navbar-brand" to="/">
                            <img src="../assets/img/honeypotLogo.png" alt="logo" style="width: 100px; height: auto;" />
                        </nuxt-link>

                        <b-navbar-toggle target="navbarSupportedContent"></b-navbar-toggle>

                        <b-collapse class="collapse navbar-collapse" id="navbarSupportedContent" is-nav="is-nav">
                            <div class="search-bar">
                                <input type="text" v-model="searchQuery" @keyup.enter="searchProducts"
                                       placeholder="찾고 싶은 상품을 검색해보세요!" class="search-input">
                            </div>
                            <div class="others-option ml-auto">
                                <div class="option-item">
                                    <nuxt-link to="/products">모두보기</nuxt-link>
                                </div>
                                <div class="option-item">
                                    <button class="text-button" @click="navigateTo('sell')">판매하기</button>
                                </div>
                                <div class="option-item">
                                    <button class="text-button" @click="navigateTo('mypage')">마이페이지</button>
                                </div>
                                <div class="option-item" v-if="!isLoggedIn">
                                    <nuxt-link to="/login">로그인</nuxt-link>
                                </div>
                                <div class="option-item" v-if="isLoggedIn">
                                    <button class="text-button" @click="logout">로그아웃</button>
                                </div>
                            </div>
                        </b-collapse>
                    </nav>
                </div>
                <hr class="footer-line" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isLoggedIn: false,
            searchQuery: '', // 검색어 저장
            isScrolled: false, // 스크롤 여부 저장
        }
    },
    mounted() {
        this.checkLoginStatus();
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        async checkLoginStatus() {
            const accessToken = sessionStorage.getItem('JWT_TOKEN');
            const accessTokenExpiration = sessionStorage.getItem('ACCESS_TOKEN_EXPIRATION');

            if (accessToken && new Date(accessTokenExpiration) > new Date()) {
                this.isLoggedIn = true;
            } else if (accessToken) {
                this.refreshAccessToken().then(() => {
                    this.isLoggedIn = true;
                }).catch(() => {
                    this.logout();
                });
            } else {
                this.isLoggedIn = false;
            }
        },
        async refreshAccessToken() {
            const refreshToken = sessionStorage.getItem('REFRESH_TOKEN');

            try {
                const response = await this.$axios.post('/auth/refresh', { refreshToken });
                const newAccessToken = response.data.accessToken;
                const newAccessTokenExpiration = response.data.accessTokenExpiration;

                sessionStorage.setItem('JWT_TOKEN', newAccessToken);
                sessionStorage.setItem('ACCESS_TOKEN_EXPIRATION', newAccessTokenExpiration);

                console.log('Access Token refreshed successfully:', newAccessToken);
            } catch (error) {
                console.error('Failed to refresh access token:', error);
                this.logout();
            }
        },
        logout() {
            sessionStorage.removeItem('JWT_TOKEN');
            sessionStorage.removeItem('ACCESS_TOKEN_EXPIRATION');
            sessionStorage.removeItem('REFRESH_TOKEN');
            sessionStorage.removeItem('REFRESH_TOKEN_EXPIRATION');
            this.isLoggedIn = false;
            this.$router.push('/');
        },
        navigateTo(page) {
            if (!this.isLoggedIn) {
                alert('로그인이 필요합니다');
                this.$router.push('/login');
            } else {
                if (page === 'sell') {
                    this.$router.push('/mypage-stock');
                } else if (page === 'mypage') {
                    this.$router.push('/mypage-profile');
                }
            }
        },
        searchProducts() {
            if (this.searchQuery.trim() !== '') {
                this.$router.push({ path: '/products', query: { search: this.searchQuery } });
            }
        },
        handleScroll() {
            this.isScrolled = window.scrollY > 50; // Adjust the value to your preference
        },
    }
}
</script>

<style scoped="scoped">
.search-bar {
    border-radius: 50px;
    background-color: #fff;
    padding: 10px 20px;
    border: 1px solid #ccc;
    margin-top: 10px;
    flex-grow: 1;
    display: flex;
    align-items: center;
    margin-right: 10px;
}

.search-input {
    width: 300px;
    border: none;
    background: transparent;
    outline: none;
    font-size: 16px;
    margin-left: 10px;
}

.search-input::placeholder {
    color: #999;
}

.others-option {
    margin-top: 10px;
}

.text-button {
    background: none;
    border: none;
    color: inherit;
    font: inherit;
    cursor: pointer;
    padding: 0;
    margin: 0;
}

.text-button:hover {
    text-decoration: underline;
}

.navbar-area {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    transition: background-color 0.3s ease;
}

.navbar-area.scrolled {
    background-color: rgba(0, 0, 0, 0.8); /* Adjust transparency and color as needed */
}

/* hr.footer-line {
    margin-bottom: 0;
} */
</style>
