<template>
    <div class="container" style="margin-top: 2px;">
        <h4>구매 목록</h4>
        <form style="margin-top: 20px;">
            <div class="cart-table table-responsive">
                <table class="table table-bordered">
                    <thead>
                        <tr style="text-align: center;">
                            <th style="width: 40%;">상품정보</th>
                            <th style="width: 20%;">진행상태</th>
                            <th style="width: 20%;">배송상태</th>
                            <th style="width: 20%;">구매일자</th>
                        </tr>
                    </thead>


                    <tbody v-if="products.length > 0">
                        <tr v-for="(product, i) in products" :key="i" style="text-align: center;">
                            <td class="product-information" style="text-align: left;">
                                <nuxt-link :to="`/bid-details/${product.productId}`" class="product-detail">
                                    <div style="display: flex;">
                                        <div class="image-container" style="margin-right: 10px;">
                                            <img :src="product.image1" />
                                        </div>
                                        <div>
                                            <h6>
                                                {{ product.productName }}
                                            </h6>
                                            판매자: {{ product.nickName }}
                                            <br>
                                            결제금액: {{ product.price }}
                                        </div>
                                    </div>
                                </nuxt-link>
                            </td>

                            <td class="payment-status">
                                
                                <span v-if="product.orderConfirm === true" class="order-complete">
                                    구매 완료
                                </span>
                                <span v-else-if="product.paymentStatus === 1" class="payment-complete">
                                    <div class="payment-details">
                                        <p>결제완료</p> 
                                        <button @click="confirmBid(product)">구매확정</button>
                                    </div>


                                </span>
                                <span v-else-if="product.paymentStatus === 0" class="checkout-link" @click="redirectToCheckout(product)"
                                    style="color: #FFB400; text-decoration: underline;">
                                    결제대기
                                </span>

                                
                            </td>

                            <td class="delivery-status">
                                {{ product.deliveryStatus ? getDeliveryStatusInKorean(product.deliveryStatus) : '배송전' }}
                            </td>

                            <td class="purchase-date">
                                {{ product.completeDate ? formatDate(product.completeDate) : '' }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
    props: ['serialNumber'],
    data() {
        return {
            products: [],
            productId: '',
        };
    },
    computed: {
        ...mapGetters(['getDeliveryStatusInKorean', 'formatDate'])
    },
    mounted() {
        if (this.serialNumber) {
            axios.get(`http://10.0.11.7:8080/mypage/purchaseList/${this.serialNumber}`)
                .then(response => {
                    console.log("Full response data:", response.data);
                    // 서버에서 받아온 상품 데이터를 products 배열에 할당
                    this.products = response.data;
                    this.products.forEach(product => {
                        console.log("Individual product data:", product);
                        this.fetchOrderConfirmation(product);
                    });
                })
                .catch(error => {
                    console.error('Error fetching product list:', error);
                });
        } else {
            console.error('Serial number is not available.');
        }
        

    },
    methods: {
        redirectToCheckout(product) {
            if (product.paymentStatus === 0) {
                this.$router.push({ path: '/checkout', query: { serialNumber: product.serialNumber, productId: product.productId } });
            }
        },
        confirmBid(product) {
            axios.post(`http://10.0.11.7:8080/shopping/${product.productId}`)
                .then(response => {
                    console.log("결제 완료 값: " + response.data);
                    this.products.paymentStatus = response.data.paymentStatus;
                })
                .catch(error => {
                    console.error('Error fetching payment status:', error);
                });

        },
        fetchOrderConfirmation(product) {
            axios.get(`http://10.0.11.7:8080/shopping/${product.productId}`)
                .then(response => {
                    console.log("구매확정 값 : " + response.data);
                    // product.orderConfirm = response.data;
                    this.$set(product, 'orderConfirm', response.data);

                    console.log("[" + product.productId + "] 상품에 order confirm 값 들어 갔는지 체크 : " + product.orderConfirm);
                })
                .catch(error => {
                    console.error('Error fetching Order Confirmation:', error);
                });

        },
    }
}
</script>
<style scoped="scoped">
.table td,
.table th {
    color: black;
    vertical-align: middle;
}

.product-detail {
    color: black;
    cursor: pointer;
}

.checkout-link {
    margin-top:25px;
    cursor: pointer;
}

.image-container {
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0; /* 컨테이너가 줄어들지 않도록 설정 */
    background-color: #f5f5f5; 
}

.image-container img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
}

.image-container.no-image {
    background-color: #e0e0e0;
}

.payment-status {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%; /* Ensure it takes the full height of the cell */
    vertical-align: middle; 
}

.payment-complete .payment-details {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.payment-status button {
    margin-left: 25px;
    margin-right: 25px;
    width: 60%;
    background-color: #FFB400;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 30px;

}

.order-complete {
    margin-top: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}
</style>
