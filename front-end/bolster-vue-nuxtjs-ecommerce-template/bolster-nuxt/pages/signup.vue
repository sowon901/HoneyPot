<template>
    <div>
        <div class="page-title-area">
            <div class="container">
                <ul>
                    <li><nuxt-link to="/">Home</nuxt-link></li>
                    <li>회원가입</li>
                    <li>회원 정보</li>
                </ul>
            </div>
        </div>
        <br><br><br>
        <div class="container">
            <div class="step-indicator">
                <div class="step active">
                    <div class="step-number">1</div>
                    <div class="step-text">약관 동의</div>
                </div>
                <div class="step-line"></div>
                <div class="step current">
                    <div class="step-number">2</div>
                    <div class="step-text">정보 입력</div>
                </div>
                <div class="step-line"></div>
                <div class="step">
                    <div class="step-number">3</div>
                    <div class="step-text">아티스트 선택</div>
                </div>
            </div>

            <div class="signup-area ptb-60">
                <div class="container">
                    <div class="signup-content">
                        <label style="color: darkgray; display: inline-block; text-align: right; width: 100%;"><h4 style="color: orangered; display: inline;">*</h4>표시는 필수 입력 항목입니다.</label>
                        <form class="signup-form" @submit.prevent="honeypotSignup">
                            <div class="form-group">
                                <label>회원 사진</label>
                                <label style="color: lightgray">프로필 사진은 200x200 픽셀 이하, 10MB 이하의 JPEG, PNG 형식의 파일만 올리실 수 있습니다.</label>
                                <input
                                    type="file"
                                    id="profileImage"
                                    name="profileImage"
                                    @change="handleFileUpload"
                                />
                                <p v-if="sizeExceeded" style="color: red;">파일 크기가 너무 큽니다. (최대 5MB까지 허용됩니다.)</p>
                                <p v-if="formatInvalid" style="color: red;">올바른 이미지 형식이 아닙니다. (JPEG 또는 PNG 형식을 허용합니다.)</p>
                                <img v-if="imageUrl" :src="imageUrl" alt="Profile Picture Preview" style="max-width: 200px; max-height: 200px;">
                            </div>

                            <div class="form-group">
                                <label>ID <h4 style="color: orangered; display: inline;">*</h4></label>
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="4자 이상 15자 이하, 영소문자, 숫자, 특수문자(_) 가능"
                                    id="id"
                                    name="id"
                                    v-model="id"
                                    @input="validateId"
                                />
                                <span v-if="!isIdValid" style="color: red;">ID는 4자 이상 20자 이하, 영소문자, 숫자, 특수문자(_)만 포함할 수 있습니다.</span>
                            </div>

                            <div class="form-group">
                                <label>비밀번호<h4 style="color: orangered; display: inline;">*</h4></label>
                                <input
                                    type="password"
                                    class="form-control"
                                    placeholder="8자 이상 30자 이하의 숫자 하나, 특수문자 하나 이상을 포함한 영문자)"
                                    id="password"
                                    name="password"
                                    v-model="password"
                                    @input="validatePassword"
                                />
                                <span v-if="!isPasswordValid" style="color: red;">비밀번호는 8자 이상 30자 이하의 숫자 하나, 특수문자 하나 이상을 포함한 영문자여야 합니다.</span>
                            </div>

                            <div class="form-group">
                                <label>비밀번호 확인<h4 style="color: orangered; display: inline;">*</h4></label>
                                <input
                                    type="password"
                                    class="form-control"
                                    placeholder="비밀번호를 한 번 더 입력해 주세요."
                                    id="password-check"
                                    name="password-check"
                                    v-model="passwordCheck"
                                    @input="checkPassword"
                                />
                                <span v-if="passwordMatch && password !== '' && passwordCheck !== ''" style="color: green;">비밀번호가 일치합니다.</span>
                                <span v-else-if="password !== '' && passwordCheck !== ''" style="color: red;">위와 동일한 비밀번호를 입력해주세요.</span>
                            </div>

                            <div class="form-group">
                                <label>이름</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder=""
                                    id="name"
                                    name="name"
                                    v-model="name"
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
                                    @input="checkInputValidity"
                                    v-model="nickname"
                                />
                                <p v-if="showSpecialCharacterWarning" style="color: red;">_와- 를 제외한 특수문자는 입력하실 수 없습니다.</p>
                                <p v-if="showLengthWarning" style="color: red;">글자수는 2자 이상 10자 이하여야 합니다.</p>
                            </div>

                            <div class="row">
                                <div class="col-md-8">
                                    <div class="form-group">
                                        <label>휴대전화번호<h4 style="color: orangered; display: inline;">*</h4></label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            placeholder="-을 제외한 숫자만 입력해주세요"
                                            id="mobileNumber"
                                            name="mobileNumber"
                                            v-model="mobileNumber"
                                        />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label style="visibility: hidden;">미사용 라벨</label>
                                        <button type="button" id="findId-btn" class="btn btn-primary btn-block" @click="sendMMS">인증번호 받기</button>
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

                            <div class="form-group">
                                <label>Email<h4 style="color: orangered; display: inline;">*</h4></label>
                                <input
                                    type="email"
                                    class="form-control"
                                    placeholder="아이디@도메인주소.com"
                                    id="email"
                                    name="email"
                                    v-model="email"
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
                                            v-model="postcode"
                                            id="zipcode"
                                            name="zipcode"
                                            readonly
                                        />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label style="visibility: hidden;">미사용 라벨</label>
                                        <button type="button" id="postcode" class="btn btn-primary btn-block" @click="execDaumPostcode">우편번호 찾기</button>
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
                                    v-model="address"
                                    readonly
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
                                    v-model="detailAddress"
                                />
                            </div>

                            <div class="form-group">
                                <label>생년월일 8자리</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="YYYYMMDD 형식으로 입력해주세요"
                                    id="birthdate"
                                    name="birthdate"
                                    v-model="birthdate"
                                />
                            </div>
                            <div id="gender-app">
                                <div class="form-group">
                                    <label>성별</label>
                                    <div class="btn-group" role="group" aria-label="Gender" style="width: 100%;">
                                        <button type="button" id="gender-btn" class="btn btn-primary" @click="selectGender('male')" :class="{ 'active': selectedGender === 'male', 'clicked': selectedGender === 'male' }">남자</button>
                                        <button type="button" id="gender-btn" class="btn btn-primary" @click="selectGender('female')" :class="{ 'active': selectedGender === 'female', 'clicked': selectedGender === 'female' }">여자</button>
                                        <button type="button" id="gender-btn" class="btn btn-primary" @click="selectGender('none')" :class="{ 'active': selectedGender === 'none', 'clicked': selectedGender === 'none' }">선택 안함</button>
                                    </div>
                                    <input type="hidden" name="gender" v-model="selectedGender">
                                </div>
                            </div>
                            <br><br>
                            <button type="submit" class="btn btn-primary" >회원 정보 입력</button>
                            <br>
                        </form>
                    </div>
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


#postcode {
    background-color: gray;
    color: white;
}


#postcode:hover {
    background-color: transparent;
    color: black;
    border: 1.5px solid black;
}

.step-indicator {
    width: 50%; /* 컨테이너의 너비의 절반으로 설정 */
    margin: 0 auto; /* 화면 가운데 정렬 */
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
}

.step {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.step-number {
    width: 30px;
    height: 30px;
    line-height: 30px;
    border-radius: 50%;
    border: 2px solid gainsboro;
    background-color: white;
    color: gainsboro;
    margin-bottom: 5px;
}

.step-text {
    color: darkgray;
}

.step.active .step-number {
    border-color: gainsboro;
    background-color: white;
}

.step.current .step-number {
    border-color: #FFB400;
    background-color: #FFB400;
    color: white;
}

.step.current .step-text {
    color: black;
}

.step-line {
    height: 1px;
    flex-grow: 1;
    background-color: gainsboro;
    margin: 0 5px;
}

</style>

<script>
import { ref, onMounted, nextTick } from 'vue';
import TopHeader from '../layouts/TopHeader';
import Menubar from '../layouts/Menubar';
import axios from 'axios';

export default {
    name: 'signupPage',
    components: {
        TopHeader,
        Menubar,
    },
    setup() {
        const profileImage = ref(null);
        const id = ref('');
        const password = ref('');
        const name = ref('');
        const nickname = ref('');
        const mobileNumber = ref('');
        const email = ref('');
        const postcode = ref('');
        const address = ref('');
        const detailAddress = ref('');
        const birthdate = ref('');
        const selectedGender = ref('');

        const imageUrl = ref(null);
        const sizeExceeded = ref(false);
        const formatInvalid = ref(false);
        const showSpecialCharacterWarning = ref(false);
        const showLengthWarning = ref(false);
        const passwordCheck = ref('');
        const passwordMatch = ref(false);
        const formError = ref(null);

        const authCode = ref('');
        const authCodeInput = ref('');
        const authCodeValid = ref(false);
        const authCodeMessage = ref('');

        const isSendingMMS = ref(false); // 중복 요청 방지용 플래그

        const isIdValid = ref(true);
        const isPasswordValid = ref(true);

        const selectGender = (gender) => {
            selectedGender.value = gender;
        };

        const honeypotSignup = async () => {
            // Validate ID and Password
            validateId();
            validatePassword();
            if (!isIdValid.value) {
                alert('ID는 4자 이상 15자 이하, 영소문자, 숫자, 특수문자(_)만 포함할 수 있습니다.');
                return;
            }
            if (!isPasswordValid.value) {
                alert('비밀번호는 8자 이상 30자 이하의 숫자 하나, 특수문자 하나 이상을 포함한 영문자여야 합니다.');
                return;
            }
            if (!passwordMatch.value) {
                alert('비밀번호가 일치하지 않습니다.');
                return;
            }
            if (!authCodeValid.value) {
                formError.value = '휴대전화 인증을 완료해 주세요.';
                alert(formError.value);
                return;
            }

            try {
                const formData = new FormData();
                if (profileImage.value) {
                    formData.append('profileImage', profileImage.value);
                }
                formData.append('username', id.value);
                formData.append('password', password.value);
                formData.append('name', name.value);
                formData.append('nickname', nickname.value);
                formData.append('mobileNumber', mobileNumber.value);
                formData.append('email', email.value);
                formData.append('postcode', postcode.value);
                formData.append('roadAddress', address.value);
                formData.append('detailAddress', detailAddress.value);
                formData.append('birthdate', birthdate.value);
                formData.append('selectedGender', selectedGender.value);

                const response = await axios.post('http://localhost:8080/auth/signup', formData);
                console.log('Signup response:', response);
                const serialNumber = response.data;
                console.log("시리얼 넘버 :" + response.data);
                window.location.href = `http://localhost:3000/favorites?serialNumber=${serialNumber}`;
            } catch (error) {
                console.error('Error during sign up:', error.response?.data || error.message);
                formError.value = '회원가입에 실패했습니다: ' + (error.response?.data || error.message);
                alert(formError.value);
            }
        };

        const sendMMS = async () => {
            if (isSendingMMS.value) return;
            if (!name.value || !mobileNumber.value) {
                formError.value = '이름과 휴대폰 번호를 입력해 주세요.';
                return;
            }

            formError.value = null;
            isSendingMMS.value = true;

            try {
                const response = await axios.post('http://localhost:8080/mms/send-one-signup', null, {
                    params: {
                        name: name.value,
                        mobileNumber: mobileNumber.value,
                    },
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                });

                if (response.status === 200 && response.data.success) {
                    alert('인증번호가 발송되었습니다.');
                    authCode.value = response.data.data.authCode;
                } else if (response.status === 404) {
                    alert('해당되는 사용자가 없습니다.');
                } else {
                    alert('서버 오류가 발생했습니다. 나중에 다시 시도해 주세요.');
                }
            } catch (error) {
                alert('서버 오류가 발생했습니다. 나중에 다시 시도해 주세요.');
                console.error('Unexpected error:', error);
            }
        };

        const execDaumPostcode = () => {
            new daum.Postcode({
                oncomplete: (data) => {
                    let addr = ''; // 주소 변수
                    let extraAddr = ''; // 참고항목 변수

                    // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                    if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                        addr = data.roadAddress;
                    } else { // 사용자가 지번 주소를 선택했을 경우(J)
                        addr = data.jibunAddress;
                    }

                    // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
                    if (data.userSelectedType === 'R') {
                        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                            extraAddr += data.bname;
                        }
                        // 건물명이 있고, 공동주택일 경우 추가한다.
                        if (data.buildingName !== '' && data.apartment === 'Y') {
                            extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                        }
                        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                        if (extraAddr !== '') {
                            addr += ' (' + extraAddr + ')';
                        }
                    }


                    postcode.value = data.zonecode;
                    address.value = addr;

                    detailAddress.value = '';

                    nextTick(() => {
                        document.getElementById('address-details').focus();
                    });
                }
            }).open();
        };

        const checkInputValidity = (event) => {
            const value = event.target.value;
            const regex = /[^\w\dㄱ-ㅎㅏ-ㅣ가-힣-_]/; // 특수문자를 제외한 문자를 검사하는 정규식

            showLengthWarning.value = value.length < 2 || value.length > 10;

            showSpecialCharacterWarning.value = regex.test(value);
        };

        const handleFileUpload = (event) => {
            const file = event.target.files[0];
            // 파일 크기 확인 (최대 5MB)
            sizeExceeded.value = file.size > 5 * 1024 * 1024;

            if (sizeExceeded.value) return;

            // 파일 형식 확인 (JPEG 또는 PNG)
            formatInvalid.value = !file.type.match('image/jpeg') && !file.type.match('image/png');

            if (formatInvalid.value) return;

            // FileReader 객체를 사용하여 파일을 읽고 이미지 URL을 생성
            const reader = new FileReader();
            reader.onload = (e) => {
                imageUrl.value = e.target.result; // 이미지 URL을 변수에 저장하여 미리보기에 표시
            };
            reader.readAsDataURL(file);
            profileImage.value = file;
        };

        const checkPassword = () => {
            passwordMatch.value = password.value === passwordCheck.value;
        };

        const validateId = () => {
            const idPattern = /^[a-z0-9_]{4,15}$/;
            isIdValid.value = idPattern.test(id.value);
        };

        const validatePassword = () => {
            const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30}$/;
            isPasswordValid.value = passwordPattern.test(password.value);
        };

        onMounted(() => {
            const script = document.createElement('script');
            script.src = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
            script.onload = () => console.log('카카오 우편번호 서비스 로드 완료');
            document.head.appendChild(script);
        });

        return {
            profileImage,
            id,
            password,
            name,
            nickname,
            mobileNumber,
            email,
            postcode,
            address,
            detailAddress,
            birthdate,
            selectedGender,

            imageUrl,
            sizeExceeded,
            formatInvalid,
            showSpecialCharacterWarning,
            showLengthWarning,
            passwordCheck,
            passwordMatch,
            formError,

            authCode,
            authCodeInput,
            authCodeValid,
            authCodeMessage,

            isIdValid,
            isPasswordValid,

            selectGender,
            honeypotSignup,
            sendMMS,
            execDaumPostcode,
            checkInputValidity,
            handleFileUpload,
            checkPassword,
            validateId,
            validatePassword,
        };
    },
    watch: {
        authCodeInput(val) {
            if (val === '390450') {
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
