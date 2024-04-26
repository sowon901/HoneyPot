<template>
    <div class="trending-products-area pb-60">
        <div class="container">
            <div class="section-title">
                <h2><span class="dot"></span> Trending Products</h2>
            </div>

            <div class="row">
                <AllProductsItem
                    v-for="(product, index) in products"
                    :product="product"
                    :key="index"
                    @clicked="toggle"
                ></AllProductsItem>
            </div>
        </div>
    </div>
</template>

<script>
import QuckView from '../modals/QuckView'
import { mutations } from '../../utils/sidebar-util'
import AllProductsItem from './AllProductsItem'

export default {
    name: 'TrendingProducts',
    components: {
        QuckView,
        AllProductsItem,
    },
    methods: {
        toggle() {
            mutations.toggleQuickView()
        },
    },
    computed: {
        products() {
            return this.$store.state.products.all.filter(
                (product) => product.latestTwo === true
            )
        },
    },
}
</script>