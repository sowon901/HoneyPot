<template>
    <div>
        <div class="page-title-area">
            <div class="container">
                <ul>
                    <li>
                        <nuxt-link to="/">Home</nuxt-link>
                    </li>
                    <li>아이디 찾기</li>
                    <li>아이디 찾기 결과</li>
                </ul>
            </div>
        </div>

        <div class="login-area ptb-60">
            <div class="container">
                <div class="login-content">
                    <div class="result-box" style="background-color: #ffd97f; padding: 20px; border-radius: 5px; text-align: center;">
                        <h5>고객님의 아이디는 {{ userId }} 입니다.</h5>
                    </div>
                    <div style="text-align: center; margin-top: 20px;">
                        <nuxt-link to="/" class="btn btn-primary">메인으로 돌아가기</nuxt-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userId: '',
        };
    },
    mounted() {
        this.userId = this.$route.query.userId;
    },
};
</script>

<style>
.links-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.forgot-password, .forgot-id, .honeypot-signup, .separator {
    display: inline-block;
}

.btn-primary {
    background-color: #ffb400;
    border: none;
    color: black;
    padding: 10px 20px;
    text-decoration: none;
    border-radius: 5px;
}

.btn-primary:hover {
    border: 1px solid black;
    background-color: #ffc107;
}
</style>
