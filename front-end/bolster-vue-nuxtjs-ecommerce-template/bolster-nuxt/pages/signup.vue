<template>
    <div>
        <div class="page-title-area">
            <div class="container">
                <ul>
                    <li><nuxt-link to="/">Home</nuxt-link></li>
                    <li>Signup</li>
                </ul>
            </div>
        </div>

        <div class="signup-area ptb-60">
            <div class="container">
                <div class="signup-content">
                    <div class="section-title" style="background-color: white;">
                        <h2>회원가입</h2>
                    </div>
                    <!-- 아이디 필터링하기 -->
                    <label style="color: darkgray; display: inline-block; text-align: right; width: 100%;"><h4 style="color: orangered; display: inline;">*</h4>표시는 필수 입력 항목입니다.</label>
                    <form class="signup-form">
                        <div class="form-group">
                            <label>ID <h4 style="color: orangered; display: inline;">*</h4></label>
                            <input
                                type="text"
                                class="form-control"
                                placeholder="4자 이상 20자 이하, 영소문자, 숫자, 특수문자(_) 가능"
                                id="id"
                                name="id"
                            />
                        </div>

                        <div class="form-group">
                            <label>비밀번호<h4 style="color: orangered; display: inline;">*</h4></label>
                            <input
                                type="text"
                                class="form-control"
                                placeholder="8자 이상 16자 이하의 숫자 하나, 특수문자 하나 이상을 포함한 영문자)"
                                id="password"
                                name="password"
                            />
                        </div>

                        <div class="form-group">
                            <label>이름</label>
                            <input
                                type="text"
                                class="form-control"
                                placeholder=""
                                id="name"
                                name="name"
                            />
                        </div>

                        <div class="form-group">
                            <label>별명<h4 style="color: orangered; display: inline;">*</h4></label>
                            <input
                                type="text"
                                class="form-control"
                                placeholder="2자 이상, 10자 이하의 한글,숫자,영문자"
                                id="nickname"
                                name="nickname"
                            />
                        </div>

                        <div class="form-group">
                            <label>휴대전화번호<h4 style="color: orangered; display: inline;">*</h4></label>
                            <div class="input-group">
                                <!--                                <div class="input-group-prepend">
                                                                    <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                        국가 선택
                                                                    </button>
                                                                    <div class="dropdown-menu">
                                                                        <a class="dropdown-item" href="#">한국</a>
                                                                        <a class="dropdown-item" href="#">미국</a>
                                                                        <a class="dropdown-item" href="#">영국</a>
                                                                        &lt;!&ndash; 다른 국가들을 필요에 따라 추가하세요 &ndash;&gt;
                                                                    </div>
                                                                </div>-->
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="-을 제외한 숫자만 입력해주세요"
                                    id="cellphone"
                                    name="cellphone"
                                />
                            </div>
                        </div>


                        <div class="form-group">
                            <label>Email<h4 style="color: orangered; display: inline;">*</h4></label>
                            <input
                                type="email"
                                class="form-control"
                                placeholder="아이디@도메인주소.com"
                                id="email"
                                name="email"
                            />
                        </div>

                        <div class="row">
                            <div class="col-md-8">
                                <div class="form-group">
                                    <label>우편번호</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder=""
                                        id="zipcode"
                                        name="zipcode"
                                    />
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label style="visibility: hidden;">미사용 라벨</label>
                                    <button type="button" id="zipcode-btn" class="btn btn-primary btn-block">우편번호 찾기</button>
                                </div>
                            </div>
                        </div>


                        <div class="form-group">
                            <label>주소</label>
                            <input
                                type="text"
                                class="form-control"
                                placeholder=""
                                id="address"
                                name="address"
                            />
                        </div>

                        <div class="form-group">
                            <label>상세주소</label>
                            <input
                                type="text"
                                class="form-control"
                                placeholder=""
                                id="address-details"
                                name="address-details"
                            />
                        </div>

                        <div class="form-group">
                            <label>생년월일 8자리</label>
                            <input
                                type="text"
                                class="form-control"
                                placeholder=""
                                id="birthdate"
                                name="birthdate"
                            />
                        </div>
                        <div id="gender-app">
                            <div class="form-group">
                                <label>성별</label>
                                <div class="btn-group" role="group" aria-label="Gender" style="width: 100%;">
                                    <button type="button" id="gender-btn" class="btn btn-primary" @click="selectGender('male')" :class="{ 'active': selectedGender === 'male', 'clicked': selectedGender === 'male' }">남자</button>
                                    <button type="button" id="gender-btn" class="btn btn-primary" @click="selectGender('female')" :class="{ 'active': selectedGender === 'female', 'clicked': selectedGender === 'female' }">여자</button>
                                    <button type="button" id="gender-btn" class="btn btn-primary" @click="selectGender('not_specified')" :class="{ 'active': selectedGender === 'not_specified', 'clicked': selectedGender === 'not_specified' }">선택 안함</button>
                                </div>
                                <input type="hidden" name="gender" v-model="selectedGender">
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary">인증 요청</button>
                        <br>
                        <nuxt-link to="/" class="return-store"
                        >메인으로 돌아가기</nuxt-link
                        >
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.btn-primary {
    background-color: #ffb400;
    border: none;

    &:hover {
        border: 1px solid black;
    }
}

#gender-btn {
    background-color: white;
    color : black;
    border: 1px solid gray;
}

#gender-btn:hover {
    border: 1.8px solid #ffb400;
    color: #ffb400;
}

#gender-btn.clicked {
    border: 1px solid #ffb400;
    color: #ffb400;
}

#zipcode-btn {
    background-color: gray;
    color: white;
}

#zipcode-btn:hover {
    background-color: transparent;
    color: black;
    border: 1.5px solid black;
}

</style>
<script>
import TopHeader from '../layouts/TopHeader'
import Menubar from '../layouts/Menubar'
import Vue from 'vue';

export default {
    components: {
        TopHeader,
        Menubar,
    },
    data() {
        return {
            selectedGender: ''
        }
    },
    methods: {
        selectGender(gender) {
            this.selectedGender = gender;
        },
        submitForm() {
            // 여기에 폼을 제출하는 로직을 작성하면 됩니다.
            console.log("성별 정보:", this.selectedGender);
        }
    }
}
</script>
