<template>
    <div class="container">
        <div class="wrapper">
            <div class="content">
                <div class="sidebar">
                    <Sidebar/>
                </div>
                <div class="user-data">
                    <div class="header">
                        <h4>회원 정보 관리</h4>
                    </div>
                    <hr class="section-divider"/>
                    <div class="password-change">
                        <div class="password-header">
                            <h5>비밀번호 변경</h5>
                        </div>
                        <form @submit.prevent="changePassword">
                            <div class="form-group">
                                <label for="current-password">현재 비밀번호</label>
                                <input type="password" id="current-password" v-model="currentPassword" required>
                            </div>
                            <div class="form-group">
                                <label for="new-password">새 비밀번호</label>
                                <input type="password" id="new-password" v-model="newPassword" required>
                            </div>
                            <div class="form-group">
                                <label for="confirm-password">새 비밀번호 확인</label>
                                <input type="password" id="confirm-password" v-model="confirmPassword" required>
                            </div>
                            <button type="submit" class="btn-change">비밀번호 변경</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from '../components/all-products/Sidebar'
import apiClient from '../api/apiClient';

export default {
    components: {
        Sidebar
    },
    data() {
        return {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            serialNumber: null
        }
    },
    async mounted() {
        const accessToken = sessionStorage.getItem('JWT_TOKEN');
        const accessTokenExpiration = sessionStorage.getItem('ACCESS_TOKEN_EXPIRATION');

        console.log('Access Token:', accessToken);
        console.log('Access Token Expiration:', accessTokenExpiration);

        if (new Date(accessTokenExpiration) <= new Date()) {
            console.log('Access Token is expired. Need to refresh token.');
            await this.refreshAccessToken();
        }
    },
    methods: {
        async refreshAccessToken() {
            const refreshToken = sessionStorage.getItem('REFRESH_TOKEN');
            try {
                const response = await apiClient.post('/auth/refresh', {refreshToken});
                const newAccessToken = response.data.accessToken;
                const newAccessTokenExpiration = response.data.accessTokenExpiration;

                sessionStorage.setItem('JWT_TOKEN', newAccessToken);
                sessionStorage.setItem('ACCESS_TOKEN_EXPIRATION', newAccessTokenExpiration);

                console.log('Access Token refreshed successfully:', newAccessToken);
            } catch (error) {
                console.error('Failed to refresh access token:', error);
                this.formError = 'Failed to refresh access token. Please log in again.';
            }
        },
        async changePassword() {
            try {
                const response = await apiClient.get('/auth/user-info');
                console.log('User info fetched successfully:', response.data);
                this.serialNumber = response.data.data.serialNumber;
                console.log(this.serialNumber);
            } catch (error) {
                console.error('Error fetching user info:', error);
                this.formError = 'Failed to fetch user information.';
            }

            if (!this.serialNumber) {
                console.error('Serial number is not available.');
                this.formError = 'Failed to fetch profile information.';
                return;
            }

            if (this.newPassword !== this.confirmPassword) {
                this.formError = 'The new passwords do not match.';
                return;
            }

            try {
                await apiClient.post('/auth/change-password', {
                    serialNumber: this.serialNumber,
                    currentPassword: this.currentPassword,
                    newPassword: this.newPassword
                });
                alert("비밀번호 변경이 완료되었습니다.");
            } catch (error) {
                console.error('Error changing password:', error);
                this.formError = 'Failed to change password. ' + error.response.data.message;
            }
        },
    }
}
</script>

<style scoped>
.wrapper .content {
    display: flex;
    width: 100%;
    padding-top: 100px;
  }
  
  .sidebar {
    flex: 1;
  }
  
  .user-data {
    flex: 3;
    padding: 5px;
  }

  .password-header {
    margin-bottom: 20px;
  }
  
  .section-divider {
  margin-top: 17px;
  border: 0.3px #ccc;
}

.sidebar {
    flex: 1;
}

.user-data {
    flex: 3;
    padding: 5px;
}

.password-header {
    margin-bottom: 20px;
}

.section-divider {
    margin-top: 17px;
    border: 0.3px #ccc;
}


.form-group {
    margin-bottom: 10px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
}

.form-group input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.btn-change {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: #ffb400;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
}
</style>
