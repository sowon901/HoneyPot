<template>
    <div>
        <div class="page-title-area">
            <div class="container">
                <ul>
                    <li>
                        <nuxt-link to="/">Home</nuxt-link>
                    </li>
                    <li>Login</li>
                    <li>아이디 찾기</li>
                </ul>
            </div>
        </div>

        <div class="login-area ptb-60">
            <div class="container">
                <div class="login-content">
                    <div class="section-title" style="background-color: white;">
                        <h2>아이디 찾기</h2>
                    </div>

                    <form class="login-form" v-if="!$store.state.authUser">
                        <p v-if="formError" class="error">{{ formError }}</p>
                        <div class="form-group">
                            <label>이름</label>
                            <input
                                v-model="name"
                                type="text"
                                class="form-control"
                                placeholder=""
                                name="name"
                            />
                        </div>

                        <div class="row">
                            <div class="col-md-8">
                                <div class="form-group">
                                    <label>휴대폰 번호</label>
                                    <input
                                        v-model="mobileNumber"
                                        type="text"
                                        class="form-control"
                                        placeholder=""
                                        name="mobileNumber"
                                    />
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label style="visibility: hidden;">미사용 라벨</label>
                                    <button id="findId-btn" class="btn btn-primary" @click.prevent="sendMMS">인증번호 받기</button>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label>인증번호</label>
                            <input
                                v-model="authCodeInput"
                                type="text"
                                class="form-control"
                                placeholder=""
                                name="authCode"
                            />
                            <p v-if="authCodeMessage" :style="{ color: authCodeValid ? 'green' : 'red' }">
                                {{ authCodeMessage }}
                            </p>
                        </div>

                        <button id="findId-btn" class="btn btn-primary" :disabled="!authCodeValid" @click.prevent="findId">아이디 찾기</button>
                    </form>
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
    name: 'findIdPage',
    components: {
        TopHeader,
        Menubar,
    },
    data() {
        return {
            formError: null,
            name: '',
            mobileNumber: '',
            authCode: '',
            authCodeInput: '',
            authCodeValid: false,
            authCodeMessage: '',
            userId: '',
        };
    },
    methods: {
        async sendMMS() {
            if (!this.name || !this.mobileNumber) {
                this.formError = '이름과 휴대폰 번호를 입력해 주세요.';
                return;
            }

            this.formError = null;

            try {
                const response = await axios.post('http://10.0.11.7:8080/mms/send-one', null, {
                    params: {
                        name: this.name,
                        mobileNumber: this.mobileNumber,
                    },
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                });

                if (response.status === 200 && response.data.success) {
                    alert('인증번호가 발송되었습니다.');
                    this.authCode = response.data.data.authCode;
                    this.userId = response.data.data.userId;
                } else if (response.status === 404) {
                    alert('해당되는 사용자가 없습니다.');
                } else {
                    alert('서버 오류가 발생했습니다. 나중에 다시 시도해 주세요.');
                }
            } catch (error) {
                alert('서버 오류가 발생했습니다. 나중에 다시 시도해 주세요.');
                console.error('Unexpected error:', error);
            }
        },
        findId() {
            console.log("findId method called");
            if (this.authCodeValid) {
                console.log("authCodeValid is true");
                this.$router.push({
                    path: '/foundId',
                    query: {userId: this.userId},
                }).catch(err => {
                    console.error("Router push error:", err);
                });
            }
        },
    },
    watch: {
        authCodeInput(val) {
            if (val === this.authCode) {
                this.authCodeValid = true;
                this.authCodeMessage = '인증번호가 일치합니다.';
            } else {
                this.authCodeValid = false;
                this.authCodeMessage = '인증번호가 다릅니다.';
            }
        },
    },
};
</script>
