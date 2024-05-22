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
                      <input type="text" id="fullName" v-model="this.info.recipientName" class="form-control"
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
                      <input type="text" id="zipcode" v-model="personDetails.address" class="form-control"
                        placeholder="우편번호" />
                    </div>
                  </div>
                  <div class="col-lg-12 col-md-6">
                    <div class="form-group">
                      <input type="text" id="address" v-model="personDetails.address" class="form-control"
                        placeholder="기본주소" />
                    </div>


                    <div class="form-group">
                      <input type="text" id="address" v-model="personDetails.address" class="form-control"
                        placeholder="나머지 주소" />
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-lg-6 col-md-6">
                      <div class="form-group">
                        <label>휴대전화 <span class="required">*</span></label>
                        <input type="text" id="phone" v-model="personDetails.phone" class="form-control phone-input" />
                      </div>
                    </div>

                    <div class="col-lg-6 col-md-6">
                      <div class="form-group">
                        <label>이메일 <span class="required">*</span></label>
                        <input type="email" id="email" v-model="personDetails.email" class="form-control" />
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
                          <span class="order-subtotal-amount">{{ this.price }}원</span>
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
                          <span class="subtotal-amount">{{ this.price }}원</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!-- <div class="payment-method">
                    <p>
                      <input type="radio" id="direct-bank-transfer" name="radio-group" checked />
                      <label for="direct-bank-transfer">Direct Bank Transfer</label>
  
                      Make your payment directly into our bank account. Please use
                      your Order ID as the payment reference. Your order will not
                      be shipped until the funds have cleared in our account.
                    </p>
                    <p>
                      <input type="radio" id="paypal" name="radio-group" />
                      <label for="paypal">PayPal</label>
                    </p>
                    <p>
                      <input type="radio" id="cash-on-delivery" name="radio-group" />
                      <label for="cash-on-delivery">Cash on Delivery</label>
                    </p>
                  </div> -->

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
        <!-- 모달 내용: 여기서 주소를 선택할 수 있도록 구현 -->
        <div v-for="address in info.addresses" :key="address.id" @click="selectAddress(address)" class="address-item">
          <p>{{ address.postCode }} {{ address.roadAddress }} {{ address.detailAddress }}</p>
        </div>
      </div>
    </div>
    <!-- End Checkout Area -->

  </div>
</template>

<script>
import firebase from '../../plugins/firebase';
import axios from 'axios';

export default {
  data() {
    return {
      personDetails: {
        // fullName: 'John Doe',
        // address: '',
        // city: 'New York',
        // email: 'john@gmail.com',
        // phone: '01021228150',
        // createdAt: new Date(),
      },
      info: {
        addresses: [],
      },
      serialNumber: '',
      productId: '',
      showModal: false, // showModal 속성을 여기에 정의합니다.
      price: '',
    }
    
  },
  computed: {
    cart() {
      return this.$store.getters.cart
    },
    cartTotal() {
      return this.$store.getters.totalAmount
    },
    cartTotal() {
      return this.$store.getters.totalAmount
    },
  },
  methods: {
    openModal(event) {
      console.log("modal open");
      this.showModal = true;
    },
    closeModal(event) {
      // this.showModal = false;
      if (event.target.classList.contains('modal') || event.target.classList.contains('close')) {
        this.showModal = false;
      }
    },
    selectAddress(address) {
      this.personDetails.address = `${address.roadAddress} ${address.detailAddress}`;
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
    removeItemFromCart(id) {
      this.$store.dispatch('deleteCart', id)
    },
    onIncrement(id) {
      this.$store.dispatch('updateCart', {
        id,
        unit: 1,
        cart: this.cart,
      })
    },
    onDecrement(id, quantity) {
      if (quantity > 1) {
        this.$store.dispatch('updateCart', {
          id,
          unit: -1,
          cart: this.cart,
        })
      } else {
        this.removeItemFromCart(id)
        this.$toast.warning('Item deleted!')
      }
    },
  },
  mounted() {
    this.serialNumber = this.$route.query.serialNumber;
    this.productId = this.$route.query.productId;

    console.log(this.serialNumber);
    console.log(this.productId);
    axios.get('http://localhost:8080/productDetails', {
      params: {
        serialNumber: this.serialNumber,
        productId: this.productId
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
    // 예시로 주소 목록을 설정
    this.addresses = [
      { id: 1, roadAddress: '서울특별시 강남구 테헤란로', detailAddress: '101동 102호' },
      { id: 2, roadAddress: '서울특별시 송파구 올림픽로', detailAddress: '202동 203호' }
      // 실제 데이터를 서버에서 가져올 수도 있음
    ];
  }
}
</script>

<style scoped>
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
  z-index: 1;
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
  /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  /* Could be more or less, depending on screen size */
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