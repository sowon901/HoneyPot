<template>
    <div class="container" style="margin-top: 2px;">
        <h4>판매 목록</h4>
        <form style="margin-top: 20px;">
            <div class="cart-table table-responsive">
                <table class="table table-bordered">
                    <thead>
                        <tr style="text-align: center;">
                            <th style="width: 40%;">상품정보</th>
                            <th style="width: 15%;">결제금액</th>
                            <th style="width: 15%;">결제상태</th>
                            <th style="width: 15%;">배송상태</th>
                            <th style="width: 15%;">판매일자</th>
                        </tr>
                    </thead>

                    <tbody v-if="products.length > 0">
                        <tr v-for="(product, i) in products" :key="i" style="text-align: center;">
                            <td class="product-infomation" style="text-align: left;">
                                <nuxt-link :to="`/bid-details/${product.productId}`" class="product-detail">
                                    <div style="display: flex; align-items: center;">
                                        <div style="margin-right: 10px;">
                                            <img :src="product.image1" width="60px" />
                                        </div>
                                        <div style="text-align: center;">
                                            <h6>
                                                <span>
                                                    {{ product.productName.length > 35 ? product.productName.slice(0,
                                                        35)
                                                        + '...' : product.productName }}
                                                </span>
                                            </h6>
                                        </div>
                                    </div>
                                </nuxt-link>
                            </td>

                            <td class="price">
                                {{ product.startPrice + (product.bidCnt * product.priceUnit) }}
                            </td>

                            <td class="payment-status">
                                {{ product.paymentStatus === 1 ? '결제완료' : '결제대기' }}
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
            products: [],
        };
    },
    computed: {
        ...mapGetters(['getDeliveryStatusInKorean', 'formatDate'])
    },
    mounted() {
        axios.get(`http://localhost:8080/productList/${this.serialNumber}`)
            .then(response => {
                // 서버에서 받아온 상품 데이터를 products 배열에 할당
                console.log(response.data);
                this.products = response.data;

            })
            .catch(error => {
                console.error('Error fetching product list:', error);
            });
    },
}
</script>
<style scoped="scoped">
.table td,
.table th {
    color: black;
}

.product-detail {
    color: black;
    cursor: default;
}

.product-detail:hover {
    cursor: pointer;
}
</style>