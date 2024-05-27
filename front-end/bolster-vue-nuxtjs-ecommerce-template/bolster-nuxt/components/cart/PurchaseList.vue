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
                                        <div class="image-container" :class="{ 'no-image': !product.image1 }"
                                            style="margin-right: 10px;">
                                            <img v-if="product.image1" :src="product.image1" />
                                        </div>
                                        <div>
                                            <h6>
                                                {{ product.productName }}
                                            </h6>
                                            판매자: {{ product.nickName }}
                                            <br>
                                            결제금액: {{ product.startPrice + (product.bidCnt * product.priceUnit) }}
                                        </div>
                                    </div>
                                </nuxt-link>
                            </td>

                            <td class="payment-status">
                                <span v-if="product.paymentStatus === 1">
                                    결제완료
                                </span>
                                <span v-else class="checkout-link" @click="redirectToCheckout(product)"
                                    style="color: #FFB400; text-decoration: underline;">
                                    결제대기
                                </span>
                            </td>

                            <td class="delivery-status">
                                {{ getDeliveryStatusInKorean(product.deliveryStatus) }}
                            </td>

                            <td class="purchase-date">
                                {{ formatDate(product.completeDate) }}
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
            products: []
        };
    },
    computed: {
        ...mapGetters(['getDeliveryStatusInKorean', 'formatDate'])
    },
    mounted() {
        if (this.serialNumber) {
            axios.get(`http://localhost:8080/mypage/purchaseList/${this.serialNumber}`)
                .then(response => {
                    // 서버에서 받아온 상품 데이터를 products 배열에 할당
                    console.log(response.data);
                    this.products = response.data;
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
        }
    }
}
</script>
<style scoped="scoped">
.table td,
.table th {
    color: black;
}

.product-detail {
    color: black;
    cursor: pointer;
}

.checkout-link {
    cursor: pointer;
}

.image-container {
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.image-container img {
    max-width: 100%;
    max-height: 100%;
}

.image-container.no-image {
    background-color: #e0e0e0;
}
</style>
