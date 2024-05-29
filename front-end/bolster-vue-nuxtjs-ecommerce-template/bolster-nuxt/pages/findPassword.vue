<template>
    <div>
        <div class="page-title-area">
            <div class="container">
                <ul>
                    <li>
                        <nuxt-link to="/">Home</nuxt-link>
                    </li>
                    <li>Login</li>
                    <li>비밀번호 찾기</li>
                </ul>
            </div>
        </div>

        <div class="login-area ptb-60">
            <div class="container">
                <div class="row">
                    <div class="login-content">
                        <div class="section-title" style="background-color: white;">
                            <h2>비밀번호 찾기</h2>
                            <h5>메일로 비밀번호 재설정 링크를 보내드립니다.</h5>
                        </div>

                        <form
                            class="login-form"
                            v-if="!$store.state.authUser"
                            @submit.prevent="findPassword"
                        >
                            <p v-if="formError" class="error">
                                {{ formError }}
                            </p>

                            <div class="form-group">
                                <label>아이디</label>
                                <input
                                    v-model="userId"
                                    type="text"
                                    class="form-control"
                                    placeholder=""
                                    name="userId"
                                />
                            </div>

                            <div class="form-group">
                                <label>전화번호</label>
                                <input
                                    v-model="mobileNumber"
                                    type="text"
                                    class="form-control"
                                    placeholder=""
                                    name="mobileNumber"
                                />
                            </div>

                            <div class="form-group">
                                <label>이메일</label>
                                <input
                                    v-model="email"
                                    type="email"
                                    class="form-control"
                                    placeholder=""
                                    name="email"
                                />
                            </div>

                            <button id="findId-btn" class="btn btn-primary">비밀번호 찾기</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

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

    &:hover {
        border: 1px solid black;
    }
}
</style>

<script>
import axios from 'axios';
import TopHeader from '../layouts/TopHeader';
import Menubar from '../layouts/Menubar';

export default {
    name: 'ForgotPasswordPage',
    components: {
        TopHeader,
        Menubar,
    },
    data() {
        return {
            formError: null,
            userId: '',
            mobileNumber: '',
            email: '',
        };
    },
    methods: {
        async findPassword() {
            if (!this.userId || !this.mobileNumber || !this.email) {
                this.formError = "모든 필드를 입력해 주세요.";
                return;
            }

            try {
                const response = await axios.post('http://localhost:8080/forgot-password', {
                    userId: this.userId,
                    mobileNumber: this.mobileNumber,
                    email: this.email,
                });

                if (response.status === 200) {
                    alert("비밀번호 재설정 링크가 이메일로 발송되었습니다.");
                    this.$router.push('/');
                } else {
                    this.formError = "사용자를 찾을 수 없습니다.";
                }
            } catch (error) {
                console.error("Error finding password:", error);
                this.formError = "비밀번호 찾기 중 오류가 발생했습니다. 다시 시도해 주세요.";
            }
        },
    },
};
</script>
