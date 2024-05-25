<!-- 참고자료 : https://velog.io/@yukina1418/%EA%B2%B0%EC%A0%9C-%ED%86%B5%ED%95%A9-%EB%AA%A8%EB%93%88-Iamport -->
<template>
    <div class="certification-container">
      <h2>Step 01. 인증정보 서버단에서 획득하기</h2>
      <button @click="fetchCertificationInfo">서버에서 인증정보 가져오기</button>
  
      <h2>Step 02. 인증 정보 조회하기</h2>
      <button @click="fetchAccessToken">액세스 토큰 발급</button>
      <button @click="fetchCertification">인증 정보 조회</button>
  
      <h2>Step 03. 인증 정보 활용하기</h2>
      <div v-if="certificationsInfo">
        <p>이름: {{ certificationsInfo.name }}</p>
        <p>생년월일: {{ certificationsInfo.birth }}</p>
        <p>휴대폰 번호: {{ certificationsInfo.phone }}</p>
        <p v-if="isAgeSatisfied">연령 제한: 연령 만족</p>
        <p v-else>연령 제한: 연령 미달</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        impUid: '',
        accessToken: '',
        certificationsInfo: null,
        isAgeSatisfied: false
      };
    },
    methods: {
      async fetchCertificationInfo() {
        try {
          const { data } = await axios.post("/certifications", {
            imp_uid: "imp16476367"
          });
          console.log(data); // Log the fetched data
        } catch (error) {
          console.error('Error occurred:', error);
        }
      },
      async fetchAccessToken() {
        try {
          const { data } = await axios.post("https://api.iamport.kr/users/getToken", {
            imp_key: "7370724524073332",
            imp_secret: "HenLdfmUZLtDO19T80kyH530EQS5K5adkf8QrhCCoas4XkOkMkiNPijJxf5ZaRS490Ni8InbiycHFseS"
          });
          console.log("here is dataaaaaaaaaaaaaaaaaaaaaaaaaa ")
          console.log(data);
          this.accessToken = data.access_token;
          console.log('Access token:', this.accessToken); // Log the access token
        } catch (error) {
          console.error('Error occurred:', error);
        }
      },
      async fetchCertification() {
        try {
          const { data } = await axios.get(`https://api.iamport.kr/certifications/${this.impUid}`, {
            headers: { Authorization: this.accessToken }
          });
          this.certificationsInfo = data;
          console.log('Certification info:', this.certificationsInfo); // Log the fetched certification info
  
          // Calculate age and check age restriction
          const birthYear = new Date(this.certificationsInfo.birth).getFullYear();
          const currentYear = new Date().getFullYear();
          this.isAgeSatisfied = currentYear - birthYear >= 25; // Adjust age restriction as needed
        } catch (error) {
          console.error('Error occurred:', error);
        }
      }
    }
  };
  </script>
  
  <style>
  .certification-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button {
    margin-bottom: 10px;
  }
  </style>
  