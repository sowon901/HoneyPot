        <div v-if="info.productName" class="product-item">
    <template>
      <div>
        <!-- Start Checkout Area -->
        <div class="checkout-area ptb-60">
          <div class="container">
            <form @submit.prevent="onSubmit">
              <div class="row">
                <div class="col-lg-6 col-md-12">
                  <div class="billing-details">
                    <h3 class="title">배송지</h3>
                    <div class="row">
                      <div class="col-lg-12 col-md-6">
                        <div class="form-group">
                          <label style="width: 30%; margin-top:8px; ">받는사람 <span class="required">*</span></label>
                          <input type="text" id="fullName" v-model="selectedAddress.recipientName" style="width: 70%"
                            class="form-control" readonly />
                        </div>
                      </div>
                      <div>
                        <div class="find-address-button">
                          <label>주소 <span class="required">*</span></label>
                        </div>
                      </div>
                      <div class="col-lg-6 col-md-6" style="display: flex">
                        <div class="form-group">

                          <input type="text" id="zipcode" v-model="selectedAddress.postCode" class="form-control"
                            placeholder="우편번호" readonly />

                        </div>
                      </div>
                      <div class="col-lg-6 col-md-6">
                        <button type="button" class="btn btn-primary-address" @click="openModal">주소선택</button>
                      </div>
                      <div class="col-lg-12 col-md-6">
                        <div class="form-group">
                          <input type="text" id="address" v-model="selectedAddress.roadAddress" class="form-control"
                            placeholder="기본주소" readonly />
                        </div>
                        <div class="form-group">
                          <input type="text" id="addressDetail" v-model="selectedAddress.detailAddress"
                            class="form-control" placeholder="나머지 주소" />
                        </div>
                      </div>

                      <div class="col-lg-12 col-md-6">
                        <div class="form-group">
                          <label style="width: 30%; margin-top:8px;">휴대전화 <span class="required">*</span></label>
                          <input type="text" id="phone" class="form-control" style="width: 70%"
                            v-model="selectedAddress.recipientPhone" />
                        </div>
                      </div>
                      <!-- <div class="col-lg-6 col-md-6">
                          <div class="form-group">
                            <label>이메일 <span class="required"></span></label>
                            <input type="email" id="email" class="form-control"/>
                          </div>
                        </div> -->
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 col-md-12">
                  <div class="order-details">
                    <h3 class="title">결제정보</h3>
                    <div class="order-table table-responsive">
                      <table class="table table-bordered">
                        <thead>
                          <tr>
                            <th scope="col">주문상품</th>
                            <th scope="col">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td class="order-subtotal">
                              <span>상품 이름</span>
                            </td>
                            <td>
                              <span>{{ this.productName }}</span>
                            </td>
                          </tr>
                          <tr>
                            <td class="order-subtotal">
                              <span>상품 가격</span>
                            </td>
                            <td class="order-subtotal-price">
                              <span class="order-subtotal-amount">{{ price }}원</span>
                            </td>
                          </tr>
                          <tr>
                            <td class="order-shipping">
                              <span>배송비</span>
                            </td>

                            <td class="shipping-price">
                              <span>2500원</span>
                            </td>
                          </tr>

                          <tr>
                            <td class="order-inspection">
                              <span>검수비용</span>
                            </td>

                            <td class="insepction-fee">
                              <span>3900원</span>
                            </td>
                          </tr>
                          <tr>
                            <td class="total-price">
                              <span>최종 결제 금액</span>
                            </td>
                            <td class="product-subtotal">
                              <span class="subtotal-amount">{{ price + 2500 + 3900 }}원</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <a href="javascript:void(0)" @click="add" class="btn btn-primary order-btn">결제 하기</a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <!-- 모달 창 -->
        <div v-if="showModal" class="modal" @click="closeModal">
          <div class="modal-content">
            <span class="close" @click="closeModal">&times;</span>
            <h2>주소 선택</h2>
            <!-- <div v-for="address in info.address" :key="address.id" @click="selectAddress(address)" class="address-item">
              <div class="address-details">
                
                <h6>{{ address.addressName }}</h6>
                <p>{{ address.recipientName }} {{ address.recipientPhone }}
                  <br>{{ address.postCode }} {{ address.roadAddress }} {{ address.detailAddress }}
                </p>
              </div>
            </div> -->

            <div class="address-info">
              <div v-for="(address) in addresses" :key="address.id" @click="selectAddress(address)"
                class="address-item">
                <div class="address-details">
                  <h6>{{ address.addressName }}</h6>
                  <p>{{ address.recipientName }} {{ address.recipientPhone }}
                    <br>{{ address.roadAddress }}, {{ address.detailAddress }} [{{ address.postCode }}]
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
        <!-- End Checkout Area -->
      </div>
    </template>


<script>
import { PGS } from '../payment/constants';
import Utils from '../payment/utils';
import apiClient from '../../api/apiClient';
import axios from 'axios';


export default {
  data() {
    return {

      productName: '',
      price: 1,

      selectedAddress: {},
      addresses: [],
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
      serialNumber: '',
      productId: '',
      productName: '',
      showModal: false,
      form: {
        pg: 'html5_inicis',
        payMethod: 'card',
        escrow: true,
        vbankDue: '',
        bizNum: '',
        quota: '0',
        merchantUid: `mid_${new Date().getTime()}`,

      },
      pgs: PGS,
      methods: Utils.getMethodsByPg(),
      quotas: Utils.getQuotaByPg(),
      vbankDueVisible: false,
      bizNumVisible: false,
      quotaVisible: true,
      email: '',


    };
  },
  async mounted() {
    const accessToken = sessionStorage.getItem('JWT_TOKEN');
    const accessTokenExpiration = sessionStorage.getItem('ACCESS_TOKEN_EXPIRATION');

    await this.fetchProfile();
    console.log('Access Token:', accessToken);
    console.log('Access Token Expiration:', accessTokenExpiration);

    if (new Date(accessTokenExpiration) <= new Date()) {
      console.log('Access Token is expired. Need to refresh token.');
      await this.refreshAccessToken();
    }

    this.loadDependencies();
    this.fetchAddresses();
    this.fetchSelectedAddress();
    await this.loadProductData();

  },

  methods: {
    async refreshAccessToken() {
      const refreshToken = sessionStorage.getItem('REFRESH_TOKEN');
      try {
        const response = await apiClient.post('/auth/refresh', { refreshToken });
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
    fetchAddresses() {
      axios.get(`http://localhost:8080/mypage-address/${this.serialNumber}`)
        .then(response => {
          this.addresses = response.data;
          console.log("주소 정보", this.addresses);
        })
        .catch(error => {
          console.error('Error fetching addresses:', error);
        });
    },
    async fetchProfile() {
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

      try {
        const response = await apiClient.get(`/mypage-profile/${this.serialNumber}`); // 백엔드 엔드포인트에 맞게 수정
        console.log('Profile fetched successfully:', response.data);
        const { profileImage, nickname, tag1, tag2, tag3, account } = response.data;
        this.profileImage = profileImage;
        this.nickname = nickname;
        this.selectedTags = [tag1, tag2, tag3].map(Number).filter(tag => tag); // null 또는 빈 태그 제거
        this.userAccount = account; // Add this line to fetch userAccount
      } catch (error) {
        console.error('Error fetching profile:', error);
        this.formError = 'Failed to fetch profile information.';
      }
    },
    fetchSelectedAddress() {
      // Simulated asynchronous data fetching
      setTimeout(() => {
        // Update selectedAddress object with fetched data
        this.selectedAddress = {
          recipientName: this.nickname, // Example value
          recipientPhone: "", // Example value
          roadAddress: "", // Example value
          detailAddress: '', // Example value
          postCode: "", // Example value
          // Other properties...
        };
      }, 1000); // Adjust delay as needed
    },
    loadDependencies() {
      const jQueryScript = document.createElement('script');
      jQueryScript.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
      jQueryScript.onload = () => {
        this.loadIMP();
      };
      document.body.appendChild(jQueryScript);
    },
    loadIMP() {
      const script = document.createElement('script');
      script.src = 'https://cdn.iamport.kr/js/iamport.payment-1.1.5.js';
      script.onload = () => {
        this.checkIMP();
      };
      document.body.appendChild(script);
    },
    checkIMP() {
      if (typeof window.IMP !== 'undefined') {
        const { IMP } = window;
        IMP.init(Utils.getUserCodeByPg('html5_inicis'));
      } else {
        setTimeout(this.checkIMP, 1000);
      }
    },
    async sendPaymentDataToBackend(data) {
      try {
        const response = await fetch('http://localhost:8080/payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
        console.log(response);
        // Check if the request was successful
        if (response.ok) {
          // Payment data sent successfully
          console.log('Payment data sent successfully');

          // Redirect or perform any other actions as needed
        } else {
          // Handle error responsel
          console.error('Failed to send payment data');
        }
      } catch (error) {
        // Handle fetch error
        console.error('Error sending payment data:', error);
      }
    },
    async loadProductData() {

      const productId = this.$route.query.productId;
      console.log("상품 아이디 :  " + productId);
      try {
        const response = await axios.get(`http://localhost:8080/bid-details/${productId}`);
        console.log('Product data fetched:', response.data);

        // {{ product.startPrice + (product.bidCnt * product.priceUnit) }}
        this.price = response.data.startPrice + (response.data.bidCnt * response.data.priceUnit);
        this.productName = response.data.productName;


        console.log("상품이름이래 " + this.productName);
        console.log("상품가격이래" + this.price);

      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    },
    //   console.log("onsubmit")
    //   const { IMP } = window;
    //   IMP.init(Utils.getUserCodeByPg(this.form.pg));
    //   const data = {
    //     pg: this.form.pg,
    //     pay_method: this.form.payMethod,
    //     escrow: this.form.escrow,
    //     merchant_uid: this.form.merchantUid,
    //     name: this.form.name,
    //     amount: this.price,
    //     buyer_name: this.form.buyerName,
    //     buyer_tel: this.form.buyerPhone,
    //     buyer_email: this.form.buyerEmail,
    //     buyer_addr: this.form.buyerAddr,
    //     buyer_postcode: this.form.buyerPostcode,
    //     niceMobileV2: true,
    //   };
    //   console.log("결제 데이터 입니다: " + data);
    //   console.log("결제 금액입니다" + data.amount);
    //   console.log("결제 금액입니다2" + this.price);


    //   if (this.form.payMethod === 'vbank') {
    //     data.vbank_due = this.form.vbankDue;
    //     if (this.form.pg === 'danal_tpay') {
    //       data.biz_num = this.form.bizNum;
    //     }
    //   }
    //   if (this.form.payMethod === 'card') {
    //     data.display = {
    //       card_quota: this.form.quota,
    //     };
    //   }

    //   console.log("결제창 띄워라")
    //   IMP.request_pay(data, (response) => {
    //     console.log("결제 완료");
    //     console.log(response);
    //     // Check if payment is successful
    //     if (response.success) {
    //       console.log("결제 성공");
    //       // Send payment data to backend
    //       this.sendPaymentDataToBackend(data);
    //     } else {
    //       console.log("[결제실패] : 결제 가격: " + data.amount);
    //       console.log("결제 실패");
    //       // Handle payment failure
    //     }
    //   });
    // },
    openModal(event) {
      console.log("modal open");
      console.log(event);
      this.showModal = true;
    },
    closeModal(event) {
      if (event.target.classList.contains('modal') || event.target.classList.contains('close')) {
        this.showModal = false;
      }
    },
    // selectAddress(address) {
    //   this.form.buyerAddr = address.roadAddress;
    //   this.form.buyerAddrDetail = address.detailAddress;
    //   this.form.buyerPostcode = address.postCode;
    //   this.form.buyerName = address.recipientName;
    //   this.form.buyerPhone = address.recipientPhone;
    //   this.showModal = false;
    // },
    selectAddress(address) {
      this.selectedAddress = address;
      this.showModal = false;
    },
    add(e) {
      console.log("on add")
      // const cartData = {
      //   details: this.personDetails,
      //   items: this.cart,
      // }
      // const db = firebase.firestore()
      // const dbOrderRef = db.collection('orders')
      // dbOrderRef.add(cartData)
      // this.$toast.success(`Thanks for the order`, {
      //   icon: 'fas fa-cart-plus',
      // })
      // this.$store.dispatch('cartEmpty')
      const { IMP } = window;
      IMP.init(Utils.getUserCodeByPg(this.form.pg));
      const data = {
        success: false,
        status: "",
        pg: this.form.pg,
        payMethod: "card",
        escrow: this.form.escrow,
        merchantUid: this.form.merchantUid,
        name: this.productName,
        amount: 100, // 여기 바꾸기 this.price + 2500 + 3900
        serialNumber: this.serialNumber,
        buyerName: this.nickname,
        buyerPhone: this.selectAddress.recipientPhone,
        buyerAddr: this.selectAddress.roadAddress,
        buyerAddrDetail: this.selectAddress.detailAddress,
        buyerPostcode: this.selectAddress.postCode,
        dateAdded: new Date(),
        niceMobileV2: true,
        receiptUrl: '',
      };

      console.log("결제 데이터 결제금액 입니다: " + data.amount)
      if (this.form.payMethod === 'vbank') {
        data.vbank_due = this.form.vbankDue;
        if (this.form.pg === 'danal_tpay') {
          data.biz_num = this.form.bizNum;
        }
      }
      if (this.form.payMethod === 'card') {
        data.display = {
          card_quota: this.form.quota,
        };
      }

      console.log("결제창 띄워라")
      IMP.request_pay(data, (response) => {
        console.log("결제 완료");
        console.log(response);
        // Check if payment is successful
        if (response.success) {
          data.status = response.status;
          data.receiptUrl = response.receipt_url;
          data.success = true;

          console.log("결제 성공");
          console.log("data::: " + data);
          // Send payment data to backend
          this.sendPaymentDataToBackend(data);
        } else {
          console.log("결제 실패");
          // Handle payment failure
        }
      });

    },
    handleGoBack() {
      this.$router.go(-1);
    },
    callback(response) {
      console.log(response);
      const query = {
        ...response,
        type: 'payment',
      };
      this.$router.push({ path: '/', query });
    },
  },
  computed: {


  },
};
</script>


<style scoped>
.form-group {
  display: flex;
  justify-content: space-between
}



.modal {
  display: block;
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 60%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.address-item {
  padding: 10px;
  border: 1px solid #ccc;
  margin: 5px 0;
  cursor: pointer;
}

.address-item:hover {
  background-color: #f1f1f1;
}

.button-container {
  text-align: right;
  margin-top: 20px;
  /* Adjust margin as needed */
}

.btn-primary,
.btn-primary-address {
  background-color: #FFB400;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 30px;
  margin-left: auto;
  align-self: flex-end;
}

.find-address-button {
  margin-bottom: 10px;
  margin-top: 2px;
}

/* .billing-details button{
      background-color: #FFB400;
      color: white;
      border: none;
      padding: 10px 20px;
      font-size: 14px;
      cursor: pointer;
      border-radius: 30px;
      margin-left: auto;
      align-self: flex-end;

    } */
/* 
    .find-address-button button  {
      background-color: #FFB400;
      color: white;
      border: none;
      padding: 10px 20px;
      font-size: 14px;
      cursor: pointer;
      width: 150px;
      height: 45px;
    } */


.billing-details button:hover {
  background-color: white;
  color: black;
  border: 1px solid black;
}



/* 모달 창 스타일 */
.modal {
  display: block;
  /* Hidden by default */
  position: fixed;
  /* Stay in place */
  z-index: 9999;
  /* Sit on top */
  left: 0;
  top: 0;
  width: 100%;
  /* Full width */
  height: 100%;
  /* Full height */
  overflow: auto;
  /* Enable scroll if needed */
  background-color: rgb(0, 0, 0);
  /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4);
  /* Black w/ opacity */
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 60%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.address-item {
  padding: 10px;
  border: 1px solid #ccc;
  margin: 5px 0;
  cursor: pointer;
}

.address-item:hover {
  background-color: #f1f1f1;
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
</style>