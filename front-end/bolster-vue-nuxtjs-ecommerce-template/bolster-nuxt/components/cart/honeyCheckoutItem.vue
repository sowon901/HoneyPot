<template>
  <div class="container">
    <h1>결제</h1>
    <div class="row">
      주문상품
      <hr>
      <div class="product-container">
        <div v-if="info.productName" class="product-item">
          <div class="product-name">
            <span>상품 이름:</span>
            <span>{{ info.productName }}</span>

            <!-- <span>상품 가격:</span>
            <span>{{ info.pro }}</span> -->
          </div>
          <!-- Add more product information here as needed -->
        </div>
        <div v-else>
          <p>상품 정보를 불러오는 중입니다...</p>
        </div>
      </div>


      <div class="col-md-6">
        <div class="imp-container">

          <form @submit.prevent="handleSubmit">
            <input type="hidden" v-model="form.pg" />
            <input type="hidden" v-model="form.payMethod" />
            <input type="hidden" v-model="form.escrow" />
            <input v-if="vbankDueVisible" type="hidden" v-model="form.vbankDue" />
            <input v-if="bizNumVisible" type="hidden" v-model="form.bizNum" />
            <input v-if="quotaVisible" type="hidden" v-model="form.quota" />
            <input type="hidden" v-model="form.merchantUid" />
            <input type="hidden" v-model="form.name" />

            <h3>배송지</h3>
            <hr>
            <div class="form-group">
              <label style="width:40%;">결제금액</label>
              <input type="number" v-model="form.amount" style="width:60%;" />
            </div>
            <div class="form-group">
              <label style="width:40%;">이름</label>
              <input type="text" v-model="form.buyerName" style="width:60%;" />
            </div>
            <div class="form-group">
              <label style="width:40%;">연락처</label>
              <input type="number" v-model="form.buyerPhone" style="width:60%;" />
            </div>
            <div class="form-group">
              <label style="width:40%;">이메일</label>
              <input type="email" v-model="form.buyerEmail" style="width:60%;" />
            </div>

            <div class="form-group">
              <label style="width:40%;">주소</label>

              <div>
                <input type="text" v-model="form.buyerAddr" style="width:60%; margin-top: 30px" />
              </div>

              <div class="find-address-button"
                style="text-align: center; justify-content: center; align-items: center; align-content: center;">
                <button type="button" @click="openModal" style="height:80%;">주소선택</button>
              </div>

            </div>
            <div class="form-group">
              <label style="width:40%;">상세주소</label>
              <input type="text" v-model="form.buyerAddrDetail" style="width:60%;" />
            </div>
            <div class="form-group">
              <label style="width:40%;">우편번호</label>
              <input type="number" v-model="form.buyerPostcode" style="width:60%;" />
            </div>

            <div class="button-container">
              <button type="button" class="btn btn-primary" @click="handleGoBack">
                뒤로가기
              </button>
              <button type="submit" class="btn btn-primary">
                결제하기
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="col-md-6">
        <h3 class="table-title" style="margin-top:55px;">결제 정보</h3>
        <hr>
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
                <span>{{ info.productName }}</span>
              </td>
            </tr>
            <tr>
              <td class="order-subtotal">
                <span>상품 가격</span>
              </td>
              <td class="order-subtotal-price">
                <span class="order-subtotal-amount">{{ finalProductPrice }}원</span>
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
              <td class="inspection-fee">
                <span>3900원</span>
              </td>
            </tr>
            <tr>
              <td class="total-price">
                <span>최종 결제 금액</span>
              </td>
              <td class="product-subtotal">
                <span class="subtotal-amount">{{ finalAmount }}원</span>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- <div class="button-container">
          <button type="button" class="btn btn-primary" @click="handleGoBack">
            뒤로가기
          </button>
          <button type="submit" class="btn btn-primary">
            결제하기
          </button>
        </div> -->
      </div>

      <div v-if="showModal" class="modal" @click="closeModal">
        <div class="modal-content">
          <span class="close" @click="closeModal">&times;</span>
          <h2>주소 선택</h2>
          <div v-for="address in info.address" :key="address.id" @click="selectAddress(address)" class="address-item">
            <div class="address-details">
              <h6>{{ address.addressName }}</h6>
              <p>{{ address.recipientName }} {{ address.recipientPhone }}
                <br>{{ address.postCode }} {{ address.roadAddress }} {{ address.detailAddress }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>


<script>
import { PGS } from '../payment/constants';
import Utils from '../payment/utils';

export default {
  data() {
    return {
      info: {},
      selectedAddress: {},
      serialNumber: '',
      productId: 'poca123',
      showModal: false,
      price: 200,
      form: {
        pg: 'html5_inicis',
        payMethod: 'card',
        escrow: true,
        vbankDue: '',
        bizNum: '',
        quota: '0',
        merchantUid: `mid_${new Date().getTime()}`,

        // name: this.info.productName, // Initialize with product name
        // amount: this.finalProductPrice, // Initialize with final product price
        // buyerName: this.selectedAddress.recipientName, // Initialize with recipient name
        // buyerPhone: this.selectedAddress.recipientPhone, // Initialize with recipient phone
        // buyerEmail: 'example@example.com',
        // buyerAddr: this.selectedAddress.roadAddress, // Initialize with road address
        // buyerAddrDetail: this.selectedAddress.detailAddress, // Initialize with detail address
        // buyerPostcode: this.selectedAddress.postCode, // Initialize with post code
        name: 'Product Name Placeholder',
        amount: 100, // Initialize with final product price
        buyerName: '김태진', // Initialize with recipient name
        buyerPhone: '01021228150', // Initialize with recipient phone
        buyerEmail: 'example@example.com',
        buyerAddr: '도곡로 112', // Initialize with road address
        buyerPostcode: '07338', // Initialize with post code
      },
      pgs: PGS,
      methods: Utils.getMethodsByPg(),
      quotas: Utils.getQuotaByPg(),
      vbankDueVisible: false,
      bizNumVisible: false,
      quotaVisible: true,
    };
  },
  mounted() {
    this.loadDependencies();
    this.fetchInfo();
    this.fetchSelectedAddress();
  },
  methods: {
    fetchInfo() {
      // 여기서 백에서 상품 정보 가지고 오기
      setTimeout(() => {
        this.info = {
          productName: 'poca poca product',
          amount: '100',
        }
      }, 1000);
    },
    fetchSelectedAddress() {
      // Simulated asynchronous data fetching
      setTimeout(() => {
        // Update selectedAddress object with fetched data
        this.selectedAddress = {
          recipientName: 'John Doe', // Example value
          recipientPhone: '123456789', // Example value
          roadAddress: '123 Main St', // Example value
          detailAddress: 'Apt 101', // Example value
          postCode: '12345', // Example value
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
    handleSubmit() {
      const { IMP } = window;
      IMP.init(Utils.getUserCodeByPg(this.form.pg));
      const data = {
        pg: this.form.pg,
        pay_method: this.form.payMethod,
        escrow: this.form.escrow,
        merchant_uid: this.form.merchantUid,
        name: this.form.name,
        amount: this.form.amount,
        buyer_name: this.form.buyerName,
        buyer_tel: this.form.buyerPhone,
        buyer_email: this.form.buyerEmail,
        buyer_addr: this.form.buyerAddr,
        buyer_postcode: this.form.buyerPostcode,
        niceMobileV2: true,
      };

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
          console.log("결제 성공");
          // Send payment data to backend
          this.sendPaymentDataToBackend(data);
        } else {
          console.log("결제 실패");
          // Handle payment failure
        }
      });
    },
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    selectAddress(address) {
      this.form.buyerAddr = address.roadAddress;
      this.form.buyerAddrDetail = address.detailAddress;
      this.form.buyerPostcode = address.postCode;
      this.form.buyerName = address.recipientName;
      this.form.buyerPhone = address.recipientPhone;
      this.showModal = false;
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
    finalProductPrice() {
      // Compute the final product price
      return this.info && this.info.productName ? this.price : 0;
    },
    finalAmount() {
      // Compute the final amount including shipping and inspection fee
      return this.finalProductPrice + 2500 + 3900;
    },
  },
};
</script>


<style scoped>
.row {
  margin-top: 100px;
}

.imp-container .find-address-button {
  margin-bottom: 1em;
  text-align: right;
  margin-top: 20px;
}

.imp-container .find-address-button button {
  background-color: #FFB400;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 15px;
}

.imp-container {
  width: 100%;
  /* Set the width to 100% to match the imp-container */
}

.form-group {
  display: flex;
}


.imp-container .find-address-button button:hover {
  background-color: white;
  color: black;
  border: 1px solid black;
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

.btn-primary {
  background-color: #FFB400;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 15px;
  margin-left: auto;
  align-self: flex-end;
}


.table-title {}

.label {
  width: 40%;
}

.input {
  width: 60%;
}
</style>