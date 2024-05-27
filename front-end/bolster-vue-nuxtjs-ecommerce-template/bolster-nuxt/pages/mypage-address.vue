<template>
  <div class="container">
    <div class="wrapper">
      <div class="content">
        <div class="sidebar">
          <Sidebar />
        </div>
        <div class="address-container">
          <div class="header">
            <h4>회원 정보 관리</h4>
          </div>
          <hr class="section-divider" />
          <div class="address-management">
            <div class="address-header">
              <h5>배송지 관리</h5>
              <button @click="openAddModal" class="add-address-button">배송지 추가</button>

            </div>
            <div class="address-info">
              <div v-for="(address, index) in addresses" :key="address.id" class="address-item">
                <div class="address-details">
                  <h6>{{ address.addressName }}</h6>
                  <p>{{ address.recipientName }} {{ address.recipientPhone }}
                  <br>{{ address.roadAddress }}, {{ address.detailAddress }} [{{ address.postCode }}]</p>
                </div>
                <div class="button-group">
                  <button @click="openEditModal(address)" class="edit-button">수정</button>

                  <button @click="deleteAddress(index)" class="delete-button">삭제</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h5>{{ isEdit ? '배송지 수정' : '배송지 추가' }}</h5>
          <span @click="closeModal" class="close">&times;</span>
        </div>

        <form @submit.prevent="submitForm" class="modal-form">
          <div class="form-group">
            <p></p>
            <label for="postcode">우편번호</label>
            <div class="input-group">
              <input id="postcode" v-model="address.postCode" type="text" disabled>
              <button @click.prevent="openPostcodeFinder" class="colored-button">우편번호 찾기</button>
            </div>
          </div>
          <div class="form-group">
            <label for="address">주소지</label>
            <input id="address" v-model="address.roadAddress" type="text" disabled>
          </div>
          <div class="form-group">
            <label for="details">상세주소</label>
            <input id="details" v-model="address.detailAddress" type="text">
          </div>
          <div class="form-group">
            <label for="name">배송지명</label>
            <input id="name" v-model="address.addressName" type="text">
          </div>
          <div class="form-group">
            <label for="recipient">수령인</label>
            <input id="recipient" v-model="address.recipientName" type="text">
          </div>
          <div class="form-group">
            <label for="phone">휴대폰</label>
            <input id="phone" v-model="address.recipientPhone" type="text">
          </div>
          <button type="submit" class="colored-button" >{{ isEdit ? '수정하기' : '등록하기' }}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/all-products/Sidebar';
import axios from 'axios';
import { mapState, mapActions } from 'vuex';

export default {
  components: {
    Sidebar
  },
  data() {
    return {
      showModal: false,  // 모달 표시 상태를 제어하는 데이터 속성
      addresses: [],     // 이 배열은 주소 데이터를 저장합니다.
      address: {
        addressId: '',
        addressName: '',
        detailAddress: '',
        postCode: '',
        recipientName: '',
        recipientPhone: '',
        roadAddress: '',
        serialNumber: ''
      },
      isEdit: false      // 편집 상태 여부
    };
  },
  async mounted() {
    const accessToken = sessionStorage.getItem('JWT_TOKEN');
    const accessTokenExpiration = sessionStorage.getItem('ACCESS_TOKEN_EXPIRATION');
    const serialNumber = sessionStorage.getItem('serialNumber');

    await this.fetchProfile();
    const script = document.createElement('script');
    script.src = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.onload = () => console.log('카카오 우편번호 서비스 로드 완료');
    document.head.appendChild(script);
    this.fetchAddresses();

    console.log('Access Token:', accessToken);
    console.log('Access Token Expiration:', accessTokenExpiration);
    console.log('Serial Number:', serialNumber);

    if (new Date(accessTokenExpiration) <= new Date()) {
      console.log('Access Token is expired. Need to refresh token.');
      try {
        await this.refreshAccessToken();
      } catch (error) {
        console.error('Failed to refresh access token:', error);
        this.redirectToLogin();
        return;
      }
    }
  },

  computed: {
    ...mapState(['user', 'serialNumber', 'isLoggedIn']),
  },
  methods: {
    ...mapActions(['refreshAccessToken', 'fetchProfile']),
    redirectToLogin() {
        alert('로그인이 필요합니다.');
        this.$router.push({ path: '/login' });
    },
    isFormValid() {
    const valid = this.address.addressName && this.address.recipientName && this.address.recipientPhone &&
             this.address.roadAddress && this.address.detailAddress && this.address.postCode;
    console.log('isFormValid:', valid); // 디버깅 메시지
    return valid;
    },
    fetchAddresses() {
      axios.get(`http://localhost:8080/mypage-address/${this.serialNumber}`, {
          headers: {
              'Authorization': `Bearer ${accessToken}`
          }
      })
        .then(response => {
          this.addresses = response.data;
        })
        .catch(error => {
          console.error('Error fetching addresses:', error);
        });
    },
    openAddModal() {
      if (this.addresses.length >= 3) {
      alert('최대 3개의 주소만 등록할 수 있습니다.');
      return;
    }
      this.isEdit = false;
      this.clearAddress();
      this.showModal = true;  // 모달 열기
    },
    openEditModal(selectedAddress) {
      this.isEdit = true;
      this.address = { ...selectedAddress };  // 선택한 주소 정보를 모달에 로드
      this.showModal = true;
    },
    deleteAddress(index) {
      const addressId = this.addresses[index].addressId;
      axios.delete(`http://localhost:8080/mypage-address/${addressId}`, {
          headers: {
              'Authorization': `Bearer ${accessToken}`
          }
      })
        .then(() => {
          this.addresses.splice(index, 1);
        })
        .catch(error => {
          console.error('Error deleting address:', error);
        });
    },
    closeModal() {
      this.showModal = false;  // 모달 닫기
    },
    openPostcodeFinder() {
      new daum.Postcode({
        oncomplete: (data) => {
          this.address.postCode = data.zonecode;
          this.address.roadAddress = data.address;
        }
      }).open();
    },
    submitForm() {
      console.log('submitForm called'); // 디버깅 메시지
      if (!this.isFormValid) {
      alert('모든 내용을 작성해야 합니다.');
      return;
      }
    const addressData = { ...this.address, serialNumber: this.serialNumber }; // 유저의 시리얼 넘버 (로그인된 유저의 시리얼 넘버로 대체)
    const request = this.isEdit
      ? axios.put(`http://localhost:8080/mypage-address/${this.address.addressId}`, addressData, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
      : axios.post('http://localhost:8080/mypage-address', addressData, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

      request.then(() => {
        this.fetchAddresses();
        this.closeModal();
      }).catch(error => {
        console.error('Error submitting form:', error);
      });
    },

    updateAddress() {
      // 주소 업데이트 로직
    },
    addAddress() {
      this.addresses.push({ ...this.address });  // 주소 추가 로직
    },
    clearAddress() {
      this.address = {
        addressId: '',
        addressName: '',
        detailAddress: '',
        postCode: '',
        recipientName: '',
        recipientPhone: '',
        roadAddress: '',
        serialNumber: ''
      };
    },

  }
};
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

.address-container {
  flex: 3;
  padding: 5px;

}

.address-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.address-info {
  font-size: 16px;
  color: #333;
}

.address-item {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  background-color: white;
  border-radius: 5px;
  border: 1px solid #ddd;
}
.edit-button, .delete-button {
  font-size: 14px;
  margin-top: 20px;
  background-color: #fff;
  color: #000;
  border: 1px solid white;
  border-radius: 5px;
  padding: 5px 10px;
  margin-left: 10px;
  cursor: pointer;
}

.section-divider {

  margin-top: 17px;

  border: 1px solid #ccc;
}
.add-address-button {
  background-color: #ffb400;
  color: white;
  border: none;
  padding: 7px 20px;
  border-radius: 30px;
  cursor: pointer;
}
.button-group {
  display: flex;
  justify-content: flex-end;
}


/* .address-item button {
  background-color: #ffb400;
  color: white;
  border: none;
  border-radius: 10px;
  margin: 5px;
  padding: 5px 10px;
} */


.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 50%;
  max-width: 600px;
  box-shadow: none;
}

.close {
  float: right;
  font-size: 28px;
  cursor: pointer;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.modal-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.form-group label {
  margin-bottom: 5px;
}

.input-group {
  display: flex;
}

input[type="text"], .colored-button {
  padding: 8px;
  border-radius: 10px;
  border: 1px solid #ccc;
  box-shadow: none;
}

input[type="text"] {
  flex: 1;
  margin-right: 10px;
}
.colored-button {
  background-color: #ffb400;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 8px 16px;
  cursor: pointer;
  /* 추가적으로 !important를 사용해 강제 적용을 시도할 수 있습니다 */
  /* background-color: #ffb400 !important;
  color: white !important; */
}

/* .text-button {
  background: none;
  border: none;
  color: black;
  cursor: pointer;
} */

  </style>
