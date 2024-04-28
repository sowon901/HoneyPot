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
                                    <div>
                                        <img :src="cart.image" />
                                    </div>
                                    <div>
                                        {{ cart.name }}
                                        <br>
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
                    id: 1,
                    name: 'BTS JIN PHOTOCARD',
                    details: 'PERMISSION TO DANCE ON STAGE  미니포카',
                    price: '27,000',
                    quantity: 2,
                    image: '../../assets/img/bts-jin-photocard.jpg',
                    tradeType: '일반경매',
                    progressStatus: '결제완료',
                    deliveryStatus: '배송준비중',
                    saleDate: '2024.04.28'
                }, {
                    id: 2,
                    name: 'Product 2',
                    details: 'COTTON 100%',
                    price: 20,
                    quantity: 1,
                    image: 'product2.jpg',
                    image: '../../assets/img/bts-jin-photocard.jpg',
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