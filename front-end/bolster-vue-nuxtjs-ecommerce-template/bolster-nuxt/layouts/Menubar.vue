<template>
    <div>
        <div :class="['navbar-area']">
            <div class="comero-nav">
                <div class="container">
                    <nav class="navbar navbar-expand-md navbar-light">
                        <nuxt-link class="navbar-brand" to="/">
                            <img
                                src="../assets/img/honeypotLogo.png"
                                alt="logo"
                                style="width: 100px; height: auto;"/>
                        </nuxt-link>

                        <b-navbar-toggle target="navbarSupportedContent"></b-navbar-toggle>

                        <b-collapse
                            class="collapse navbar-collapse"
                            id="navbarSupportedContent"
                            is-nav="is-nav">
                            <div class="search-bar">
                                <input type="text" placeholder="판매자나 상품명을 검색해 보세요." class="search-input"></div>
                            <div class="others-option">
                                <div class="option-item">
                                    <nuxt-link to="/products">모두보기</nuxt-link>
                                </div>
                                <div class="option-item">
                                    <nuxt-link to="/login">판매하기</nuxt-link>
                                </div>
                                <div class="option-item">
                                    <nuxt-link to="/mypage-profile">마이페이지</nuxt-link>
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
                <hr class="footer-line"/>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    components: {

    },
    data() {
        return {
            isLoggedIn: false,
        }
    },
    mounted() {
        const accessToken = sessionStorage.getItem('JWT_TOKEN');
        const accessTokenExpiration = sessionStorage.getItem('ACCESS_TOKEN_EXPIRATION');

        if (accessToken && new Date(accessTokenExpiration) > new Date()) {
            this.isLoggedIn = true;
        } else if (accessToken) {
            this.refreshAccessToken().then(() => {
                this.isLoggedIn = true;
            }).catch(() => {
                this.isLoggedIn = false;
            });
        } else {
            this.isLoggedIn = false;
        }
    },
    computed: {

    }, methods: {
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
                sessionStorage.removeItem('JWT_TOKEN');
                sessionStorage.removeItem('ACCESS_TOKEN_EXPIRATION');
                sessionStorage.removeItem('REFRESH_TOKEN');
            }
        },
        logout() {
            sessionStorage.removeItem('JWT_TOKEN');
            sessionStorage.removeItem('ACCESS_TOKEN_EXPIRATION');
            sessionStorage.removeItem('REFRESH_TOKEN');
            this.isLoggedIn = false;
            this.$router.push('/');
        }
    }
}
</script>
<style scoped="scoped">
.search-bar {
    border-radius: 50px;
    background-color: #fff;
    /* 흰색 배경 */
    padding: 10px 20px;
    border: 1px solid #ccc;
    /* 회색 테두리 */
    margin-top: 10px;
}

.search-input {
    width: 300px;
    /* 고정된 너비 */
    border: none;
    background: transparent;
    outline: none;
    font-size: 16px;
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
    text-decoration: underline; /* 링크처럼 마우스를 올렸을 때 밑줄을 추가하고 싶다면 이 줄을 추가 */
}
</style>
<!--이맑음 작성-->
