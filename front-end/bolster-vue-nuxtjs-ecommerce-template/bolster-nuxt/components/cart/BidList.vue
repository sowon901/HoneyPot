<template>
    <div class="container" style="margin-top: 2px;">
        <h4>입찰 목록</h4>
        <form style="margin-top: 20px;">
            <div class="cart-table table-responsive">
                <table class="table table-bordered">
                    <thead>
                        <tr style="text-align: center;">
                            <th style="width: 40%;">상품정보</th>
                            <th style="width: 20%;">종료시간</th>
                            <th style="width: 20%;">입찰가격</th>
                            <th style="width: 20%;">현재가격</th>
                        </tr>
                    </thead>

                    <tbody v-if="products.length > 0">
                        <tr v-for="(product, i) in products" :key="i" style="text-align: center;">
                            <td class="product-infomation" style="text-align: left;">
                                <nuxt-link :to="'/bid-details/' + product.productId" class="product-detail">
                                    <div style="display: flex;">
                                        <div style="margin-right: 10px;">
                                            <img :src="product.image1" width="60px" />
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
                            <td>
                                {{ product.currentPrice }}
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
            axios.get(`http://localhost:8080/bids/${this.serialNumber}`)
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
</style>