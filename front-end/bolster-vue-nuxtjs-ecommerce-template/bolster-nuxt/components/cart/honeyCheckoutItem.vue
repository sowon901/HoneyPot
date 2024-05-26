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
                      <label>받는사람 <span class="required">*</span></label>
                      <input type="text" id="fullName" v-model="selectedAddress.recipientName" class="form-control"
                        readonly />
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
                      <input type="text" id="zipcode" v-model="selectedAddress.postCode" class="form-control"
                        placeholder="우편번호" readonly />
                    </div>
                  </div>
                  <div class="col-lg-12 col-md-6">
                    <div class="form-group">
                      <input type="text" id="address" v-model="selectedAddress.roadAddress" class="form-control"
                        placeholder="기본주소" readonly />
                    </div>
                    <div class="form-group">
                      <input type="text" id="addressDetail" v-model="selectedAddress.detailAddress" class="form-control"
                        placeholder="나머지 주소" />
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
        </form>
      </div>
    </div>
    <!-- 모달 창 -->
    <div v-if="showModal" class="modal" @click="closeModal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>주소 선택</h2>
        <div v-for="address in info.address" :key="address.id" @click="selectAddress(address)"
          class="address-item">
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

export default {
  data() {
    return {
      info: {},
      serialNumber: '',
      productId: '',
      showModal: false,
      price: '',
      selectedAddress: {},
    }
  },
  computed: {
    finalProductPrice() {
      return this.price = this.info.startPrice + (this.info.bidCnt*this.info.priceUnit);
    },
    finalAmount() {
      return this.price + 2500 + 3900; // 상품 가격 + 배송비 + 검수비용
    },
  },
  methods: {
    openModal(event) {
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
    add() {
      const cartData = {
        details: this.personDetails,
        items: this.cart,
      }
      const db = firebase.firestore()
      const dbOrderRef = db.collection('orders')
      dbOrderRef.add(cartData)
      this.$toast.success(`Thanks for the order`, {
        icon: 'fas fa-cart-plus',
      })
      this.$store.dispatch('cartEmpty')
      this.$router.push('/')
    },
  },
  mounted() {
    this.serialNumber = this.$route.query.serialNumber;
    this.productId = this.$route.query.productId;

    console.log(this.serialNumber);
    console.log(this.productId);
    axios.get('http://localhost:8080/mypage/productDetails', {
      params: {
        serialNumber: this.serialNumber,
        productId: this.productId
      },
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('JWT_TOKEN')}`
        }
    })
      .then(response => {
        // 응답 성공 처리
        this.info = response.data;
        console.log(response.data);
      })
      .catch(error => {
        // 에러 처리
        console.error("제품 정보 가져오기 실패:", error);
      });
  }
}
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
