<template>
    <div class="container">
        <h4>구매 목록</h4>
        <form style="margin-top: 16px;">
            <div class="cart-table table-responsive">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col-8">상품정보</th>
                            <th scope="col-1">거래방식</th>
                            <th scope="col-1">진행상태</th>
                            <th scope="col-1">배송상태</th>
                            <th scope="col-1">구매일자</th>
                        </tr>
                    </thead>

                    <tbody v-if="cart.length > 0">
                        <tr v-for="(cart, i) in cart" :key="i">
                            <td class="product-thumbnail">
                                <a href="#">
                                    <img :src="cart.image" :alt="cart.name"/>
                                </a>
                            </td>

                            <td class="product-name">
                                <nuxt-link :to="`/products-details/${cart.id}`">
                                    {{ cart.name }}
                                </nuxt-link>
                                <ul>
                                    <li>Color:
                                        <strong>Light Blue</strong>
                                    </li>
                                    <li>Size:
                                        <strong>XL</strong>
                                    </li>
                                    <li>Material:
                                        <strong>Cotton</strong>
                                    </li>
                                </ul>
                            </td>

                            <td class="product-price">
                                <span class="unit-amount">${{ cart.price }}</span>
                            </td>

                            <td class="product-quantity">
                                <div class="input-counter">
                                    <span @click="onDecrement(cart.id, cart.quantity)" class="minus-btn">
                                        <i class="fas fa-minus"></i >
                                    </span>
                                    {{ cart.quantity }}
                                    <span @click="onIncrement(cart.id)" class="plus-btn">
                                        <i class="fas fa-plus"></i >
                                    </span>
                                </div>
                            </td>

                            <td class="product-subtotal">
                                <span class="subtotal-amount">${{ cart.price * cart.quantity }}</span >

                                <a
                                    href="javascript:void(0)"
                                    @click="removeItemFromCart(cart.id)"
                                    class="remove">
                                    <i class="far fa-trash-alt"></i >
                                </a>
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
        computed: {
            cart() {
                return this.$store.getters.cart
            },
            cartTotal() {
                return this.$store.getters.totalAmount
            }
        },
        methods: {
            removeItemFromCart(id) {
                this
                    .$store
                    .dispatch('deleteCart', id)
            },
            onIncrement(id) {
                this
                    .$store
                    .dispatch('updateCart', {
                        id,
                        unit: 1,
                        cart: this.cart
                    })
            },
            onDecrement(id, quantity) {
                if (quantity > 1) {
                    this
                        .$store
                        .dispatch('updateCart', {
                            id,
                            unit: -1,
                            cart: this.cart
                        })
                } else {
                    this.removeItemFromCart(id)
                    this
                        .$toast
                        .warning('Item deleted!')
                }
            }
        }
    }
</script>