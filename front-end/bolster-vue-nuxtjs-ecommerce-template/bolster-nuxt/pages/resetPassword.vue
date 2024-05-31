<template>
    <div>
        <div class="page-title-area">
            <div class="container">
                <ul>
                    <li>
                        <nuxt-link to="/">Home</nuxt-link>
                    </li>
                    <li>Login</li>
                    <li>비밀번호 다시 설정하기</li>
                </ul>
            </div>
        </div>

        <div class="login-area ptb-60">
            <div class="container">
                <div class="login-content">
                    <div class="section-title" style="background-color: white;">
                        <h2>비밀번호 다시 설정하기</h2>
                    </div>

                    <form class="login-form">
                        <p v-if="formError" class="error">{{ formError }}</p>
                        <div class="form-group">
                            <label>새로운 비밀번호</label>
                            <input
                                v-model="newPassword"
                                type="password"
                                class="form-control"
                                placeholder="8자 이상 30자 이하의 숫자 하나, 특수문자 하나 이상을 포함한 영문자"
                                name="new_password"
                                @input="checkPassword"
                            />
                        </div>
                        <div class="form-group">
                            <label>비밀번호 확인</label>
                            <input
                                v-model="passwordCheck"
                                type="password"
                                class="form-control"
                                placeholder=""
                                name="confirm_password"
                                @input="checkPassword"
                            />
                            <span
                                v-if="passwordMatch && newPassword !== '' && passwordCheck !== ''"
                                style="color: green;"
                            >비밀번호가 일치합니다.</span>
                            <span
                                v-else-if="newPassword !== '' && passwordCheck !== ''"
                                style="color: red;"
                            >위와 동일한 비밀번호를 입력해주세요.</span>
                        </div>

                        <button
                            id="resetPassword-btn"
                            class="btn btn-primary"
                            @click.prevent="redefinePassword"
                            :disabled="!passwordMatch"
                        >비밀번호 바꾸기</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'ResetPasswordPage',
    data() {
        return {
            formError: null,
            newPassword: '',
            passwordCheck: '',
            passwordMatch: false,
        };
    },
    methods: {
        checkPassword() {
            this.passwordMatch = this.newPassword === this.passwordCheck;
        },
        async redefinePassword() {
            if (!this.passwordMatch || this.newPassword === '') {
                this.formError = "비밀번호가 일치하지 않거나 비밀번호가 입력되지 않았습니다.";
                return;
            }

            try {
                const token = this.$route.query.token;
                const response = await axios.post('http://10.0.11.7:8080/auth/reset-password?token=' + token, {
                    newPassword: this.newPassword
                });

                if (response.status === 200) {
                    alert("비밀번호가 변경되었습니다.");
                    console.log('Redirecting to home page');
                    window.location.href = 'http://223.130.153.93:3000/';
                } else {
                    this.formError = "비밀번호 변경 중 오류가 발생했습니다. 다시 시도해 주세요.";
                }
            } catch (error) {
                console.error("Error resetting password:", error);
                this.formError = "비밀번호 변경 중 오류가 발생했습니다. 다시 시도해 주세요.";
            }
        },
    },
};
</script>

<style scoped>
.page-title-area {
    /* your styles here */
}

.login-area {
    /* your styles here */
}

.login-content {
    /* your styles here */
}

.form-control {
    /* your styles here */
}

.btn-primary {
    background-color: #ffb400;
    border: none;

    &:hover {
        border: 1px solid black;
    }
}
</style>
