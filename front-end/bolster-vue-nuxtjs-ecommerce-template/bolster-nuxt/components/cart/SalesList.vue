<template>
    <div class="container">
        <h4>판매 목록</h4>
        <form style="margin-top: 16px;">
            <div class="cart-table table-responsive">
                <table class="table table-bordered">
                    <thead>
                        <tr style="text-align: center;">
                            <th style="width: 40%;">상품정보</th>
                            <th style="width: 15%;">거래방식</th>
                            <th style="width: 15%;">진행상태</th>
                            <th style="width: 15%;">배송상태</th>
                            <th style="width: 15%;">판매일자</th>
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
                                        {{ cart.details }}
                                        <br>
                                        {{ cart.price }}
                                    </div>
                                </div>
                            </td>

                            <td class="trade-type">
                                {{ cart.tradeType }}
                            </td>

                            <td class="progress-status">
                                {{ cart.progressStatus }}
                            </td>

                            <td class="delivery-status">
                                {{ cart.deliveryStatus }}
                            </td>

                            <td class="purchase-date">
                                {{ cart.saleDate }}
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
                    name: 'BTS JIN PHOTOCARD',
                    details: 'PERMISSION TO DANCE ON STAGE  미니포카',
                    price: '27,000',
                    quantity: 2,
                    image: require('../../assets/img/jin.jpg'),
                    tradeType: '일반경매',
                    progressStatus: '결제완료',
                    deliveryStatus: '배송준비중',
                    saleDate: '2024.04.28'
                }, {
                    name: 'BTS JIN PHOTOCARD',
                    details: 'PERMISSION TO DANCE ON STAGE  미니포카',
                    price: '34,000',
                    quantity: 1,
                    image: require('../../assets/img/jin.jpg'),
                    tradeType: '일반경매',
                    progressStatus: '결제완료',
                    deliveryStatus: '배송준비중',
                    saleDate: '2024.04.28'
                }
            ]
        }
    }
}
</script>