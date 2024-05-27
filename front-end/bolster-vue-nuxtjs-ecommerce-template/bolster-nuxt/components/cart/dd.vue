<template>
  <div>
    <!-- Start Checkout Area -->
    <div class="checkout-area ptb-60">
      <div class="container">
        <a-form :form="form" @submit.prevent="onSubmit">
          <div class="row">
            <div class="col-lg-6 col-md-12">
              <div class="billing-details">
                <h3 class="title">배송지</h3>
                <div class="row">
                  <div class="col-lg-12 col-md-6">
                    <div class="form-group">
                      <label>받는사람 <span class="required">*</span></label>
                      <input type="text" id="fullName" v-model="selectedAddress.recipientName" class="form-control" readonly />
                    </div>
                  </div>
                  <div>
                    <div class="find-address-button">
                      <button type="button" @click="openModal">주소선택</button>
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-3">
                    <div class="form-group">
                      <label>주소 <span class="required">*</span></label>
                      <input type="text" id="zipcode" v-model="selectedAddress.postCode" class="form-control" placeholder="우편번호" readonly />
                    </div>
                  </div>
                  <div class="col-lg-12 col-md-6">
                    <div class="form-group">
                      <input type="text" id="address" v-model="selectedAddress.roadAddress" class="form-control" placeholder="기본주소" readonly />
                    </div>
                    <div class="form-group">
                      <input type="text" id="addressDetail" v-model="selectedAddress.detailAddress" class="form-control" placeholder="나머지 주소" />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-6 col-md-6">
                      <div class="form-group">
                        <label>휴대전화 <span class="required">*</span></label>
                        <input type="text" id="phone" class="form-control phone-input" v-model="selectedAddress.recipientPhone" />
                      </div>
                    </div>
                    <div class="col-lg-6 col-md-6">
                      <div class="form-group">
                        <label>이메일 <span class="required"></span></label>
                        <input type="email" id="email" class="form-control" />
                      </div>
                    </div>
                  </div>
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

                        <td class="insepction-fee">
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
                </div>
                <a href="javascript:void(0)" @click="add" class="btn btn-primary order-btn">결제 하기</a>
              </div>
            </div>
          </div>
        </a-form>
      </div>
    </div>
    <!-- 모달 창 -->
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
    <!-- End Checkout Area -->
  </div>
</template>

<script>
import axios from 'axios';
import PGS from '../payment/constants';
import Utils from '../payment/utils';
import { createForm } from 'ant-design-vue';
import { Form } from 'ant-design-vue';

export default {
  data() {
    return {
      info: {},
      serialNumber: '',
      productId: '',
      showModal: false,
      price: '',
      selectedAddress: {},

      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'payment' }),
      initialMerchantUid: `mid_${new Date().getTime()}`,
      pgs: PGS,
      methods: Utils.getMethodsByPg(),
      quotas: Utils.getQuotaByPg(),
      initialMethod: 'card',
      vbankDueVisible: false,
      bizNumVisible: false,
      quotaVisible: true,
    };
  },
  computed: {
    finalProductPrice() {
      return this.price = this.info.startPrice + (this.info.bidCnt * this.info.priceUnit);
    },
    finalAmount() {
      return this.price + 2500 + 3900; // 상품 가격 + 배송비 + 검수비용
    },
  },
  methods: {
    openModal() {
      console.log("modal open");
      this.showModal = true;
    },
    closeModal(event) {
      if (event.target.classList.contains('modal') || event.target.classList.contains('close')) {
        this.showModal = false;
      }
    },
    selectAddress(address) {
      this.selectedAddress = address;
      this.showModal = false;
    },
    add(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const {
            pg,
            payMethod = 'card',
            escrow = 'true',
            bizNum ='HoneyPot',
            quota = '',
            merchantUid = `mid_${new Date().getTime()}`,
            name = '꿀단지 결제 테스트',
            amount,
            buyerName = '김태진',
            buyerTel = '01021228150',
            buyerEmail = 'tjmax0930@gmail.com',
            buyerAddr = 'home123',
            buyerPostcode = '07338',
          } = values;
          const { IMP } = window;
          IMP.init(Utils.getUserCodeByPg(pg));
          const data = {
            pg,
            pay_method: payMethod,
            escrow,
            merchant_uid: merchantUid,
            name,
            amount: this.finalProductPrice(),
            buyer_name: buyerName,
            buyer_tel: buyerTel,
            buyer_email: buyerEmail,
            buyer_addr: buyerAddr,
            buyer_postcode: buyerPostcode,
            niceMobileV2: true,
          };
          if (payMethod === 'vbank') {
            data.vbank_due = vbankDue;
            if (pg === 'danal_tpay') {
              data.biz_num = bizNum;
            }
          }
          if (payMethod === 'card') {
            data.display = {
              card_quota: quota,
            };
          }
          console.log("결제창 띄워라 오버")
          IMP.request_pay(data, this.callback);
          this.sendPaymentDataToBackend(data);
        }
      });
      // this.$router.push('/')
    },
    async sendPaymentDataToBackend(data) {
      try {
        const response = await fetch('http://10.0.11.7:8080/payment', {
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
          // Handle error response
          console.error('Failed to send payment data');
        }
      } catch (error) {
        // Handle fetch error
        console.error('Error sending payment data:', error);
      }
    },
    handlePg(pg) {
      const newMethods = Utils.getMethodsByPg(pg);
      const [{ value }] = newMethods;
      this.methods = Utils.getMethodsByPg(pg);
      this.form.setFieldsValue({
        payMethod: value,
      });
      this.setVisible(pg, value);
    },
    handleMethod(method) {
      const pg = this.form.getFieldValue('pg');
      this.setVisible(pg, method);
    },
    setVisible(pg, method) {
      // 가상계좌 입금기한 렌더링 여부
      const vbankDueVisible = method === 'vbank';
      this.vbankDueVisible = vbankDueVisible;
      // 사업자 번호 렌더링 여부
      this.bizNumVisible = pg === 'danal_tpay' && vbankDueVisible;
      // 할부개월수 렌더링 여부
      this.quotaVisible = method === 'card';
    },
    handleGoBack() {
      this.$router.push('/');
    },
    callback(response) {
      // 본인인증 종료 후 result 페이지로 이동
      const query = {
        ...response,
        type: 'payment',
      };
      this.$router.push({ path: '/result', query });
    },
  },
  created() {
    if (typeof window.IMP === 'undefined') {
      console.error('Iamport script not loaded');
    }
  },
};
</script>

<style scoped>
.billing-details .find-address-button {
  margin-bottom: 10px;
  margin-top: 2px;
}

.billing-details .find-address-button button {
  background-color: #FFB400;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  margin-top: -10px;
}

.billing-details .find-address-button button:hover {
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
</style>
