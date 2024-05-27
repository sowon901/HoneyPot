<template>
    <div class="container" style="margin-top: 2px;">
        <h4>입찰 목록</h4>
        <form style="margin-top: 20px;">
            <div class="cart-table table-responsive">
                <table class="table table-bordered">
                    <thead>
                        <tr style="text-align: center;">
                            <th style="width: 40%;">상품정보</th>
                            <th style="width: 30%;">종료시간</th>
                            <th style="width: 30%;">입찰가격</th>
                            <!-- <th style="width: 20%;">현재가격</th> -->
                        </tr>
                    </thead>

                    <tbody v-if="products.length > 0">
                        <tr v-for="(product, i) in products" :key="i" style="text-align: center;">
                            <td class="product-infomation" style="text-align: left;">
                                <nuxt-link :to="'/bid-details/' + product.productId" class="product-detail">
                                    <div style="display: flex;">
                                        <div class="image-container" :class="{ 'no-image': !product.image1 }"
                                            style="margin-right: 10px;">
                                            <img v-if="product.image1" :src="product.image1" />
                                        </div>
                                        <div>
                                            <h6>
                                                {{ product.productName }}
                                            </h6>
                                            {{ product.nickName }}
                                        </div>
                                    </div>
                                </nuxt-link>
                            </td>
                            <td>
                                {{ formatDateTime(product.deadline) }}
                            </td>
                            <td>
                                {{ product.currentPrice }}
                            </td>
                            <!-- <td>
                                {{ product.currentPrice }}
                            </td> -->
                        </tr>
                    </tbody>
                </table>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: ['serialNumber'],
    data() {
        return {
            products: []
        }
    },
    mounted() {
        this.fetchBids();
    },
    methods: {
        fetchBids() {
            const token = sessionStorage.getItem('JWT_TOKEN');
            axios.get(`http://localhost:8080/mypage/bids/${this.serialNumber}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    console.log(response.data);
                    this.products = response.data;
                })
                .catch(error => {
                    console.error('Error fetching bid data:', error);
                });
        },
        formatDateTime(dateTimeString) {
            const dateTime = new Date(dateTimeString);
            const formattedDate = dateTime.toLocaleDateString('en-CA'); // yyyy-MM-dd 형식
            const hours = dateTime.getHours().toString().padStart(2, '0');
            const minutes = dateTime.getMinutes().toString().padStart(2, '0');
            return `${formattedDate} ${hours}H${minutes}M`;
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
    cursor: default;
}

.product-detail:hover {
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
