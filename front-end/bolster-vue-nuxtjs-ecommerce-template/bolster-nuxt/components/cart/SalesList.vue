<template>
    <div class="container" style="margin-top: 2px;">
        <h4>판매 목록</h4>
        <form style="margin-top: 20px;" @submit.prevent="onSubmit">
            <div class="cart-table table-responsive">
                <table class="table table-bordered">
                    <thead>
                        <tr style="text-align: center;">
                            <th style="width: 40%;">상품정보</th>
                            <th style="width: 10%;">결제금액</th>
                            <th style="width: 10%;">결제상태</th>
                            <th style="width: 10%;">배송상태</th>
                            <th style="width: 15%;">판매일자</th>
                            <th style="width: 15%;">판매상태</th>
                        </tr>
                    </thead>

                    <tbody v-if="products.length > 0">
                        <tr v-for="(product, i) in products" :key="i" style="text-align: center;">
                            <td class="product-infomation" style="text-align: left;">
                                <nuxt-link :to="`/bid-details/${product.productId}`" class="product-detail">
                                    <div style="display: flex; align-items: center;">
                                        <div class="image-container" style="margin-right: 10px;">
                                            <img :src="product.image1" />
                                        </div>
                                        <div style="text-align: center;">
                                            <h6>
                                                <!-- <span>
                                                    {{ product.productName.length > 35 ? product.productName.slice(0,
                                                        35)
                                                        + '...' : product.productName }}
                                                </span> -->
                                                {{ product.productName }}
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
                                {{ product.deliveryStatus !== 'NULL' ? getDeliveryStatusInKorean(product.deliveryStatus)
                                    :
                                    '' }}
                            </td>

                            <td class="purchase-date">
                                {{ product.completeDate !== null ? formatDate(product.completeDate) : '' }}
                            </td>

                            <td class="purchase-status">
                                <button type="button" v-if="product.storageStatus === 'READY'"
                                    @click="startSale(product.productId)" class="start-selling">판매시작</button>
                                    <span v-else>{{ getStorageStatusInKorean(product.storageStatus) }}</span>
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
        const token = sessionStorage.getItem('JWT_TOKEN');
        axios.get(`http://localhost:8080/mypage/salesList/${this.serialNumber}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                // 서버에서 받아온 상품 데이터를 products 배열에 할당
                console.log(response.data);
                this.products = response.data;

            })
            .catch(error => {
                console.error('Error fetching product list:', error);
            });
    },
    methods: {
        startSale(productId) {
            axios.put(`http://localhost:8080/mypage/product/${productId}/start-sale`)
                .then(response => {
                    // 판매 시작 요청이 성공적으로 처리된 경우
                    console.log('Sale started successfully:', response.data);
                    this.products = this.products.map(product => {
                        if (product.productId === productId) {
                            product.storageStatus = 'SELLING';
                        }
                        return product;
                    });
                })
                .catch(error => {
                    console.error('Error starting sale:', error);
                });
        },
        getStorageStatusInKorean(status) {
            const statusMap = {
                'PENDING': '입고 중',
                'PROCESSING': '검수 중',
                'SELLING': '판매 중',
                'SOLD': '판매 종료',
                'FAIL': '판매 종료'
            };
            return statusMap[status] || '';
        }
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

.start-selling {
    background-color: #FFB400;
    color: white;
    border: none;
    padding: 10px 20px;
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
</style>
