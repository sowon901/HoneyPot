<template>
    <div class="container">
        <h4>입찰 목록</h4>
        <form style="margin-top: 16px;">
            <div class="cart-table table-responsive">
                <table class="table table-bordered">
                    <thead>
                        <tr style="text-align: center;">
                            <th style="width: 40%;">상품정보</th>
                            <th style="width: 20%;">남은시간</th>
                            <th style="width: 20%;">입찰가격</th>
                            <th style="width: 20%;">현재가격</th>
                        </tr>
                    </thead>

                    <tbody v-if="cart.length > 0">
                        <tr v-for="(cart, i) in cart" :key="i" style="text-align: center;">
                            <td class="product-infomation" style="text-align: left;">
                                <div style="display: flex;">
                                    <div style="margin-right: 10px;">
                                        <img :src="cart.image" width="60px" />
                                    </div>
                                    <div>
                                        <h6>
                                            {{ cart.name }}
                                        </h6>
                                        {{ cart.sellerId }}
                                        <br>
                                        {{ cart.details }}
                                        <br>
                                        {{ cart.remaingAuctionTime }}
                                    </div>
                                </div>
                            </td>
                            <td>
                                {{ cart.remainingTime }}
                            </td>
                            <td>
                                {{ cart.bidPrice }}
                            </td>
                            <td>
                                {{ cart.currentPrice }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 테스트용 데이터로 초기화된 cart 배열
            cart: [
                {
                    sellerId: 'army22',
                    name: 'BTS JIN PHOTOCARD',
                    details: 'PERMISSION TO DANCE ON STAGE  미니포카',
                    bidPrice: '27,000',
                    image: require('../../assets/img/jin.jpg'),
                    remainingTime: '08:22:39',
                    currentPrice: '27,000'
                }, {
                    sellerId: 'army13',
                    name: 'BTS JIN PHOTOCARD',
                    details: 'PERMISSION TO DANCE ON STAGE  미니포카',
                    bidPrice: '33,000',
                    image: require('../../assets/img/jin.jpg'),
                    remainingTime: '12:48:22',
                    currentPrice: '35,000'
                }
            ]
        }
    }
}
</script>