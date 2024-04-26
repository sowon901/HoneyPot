<template>
    <div>
        <div class="trending-products-area ptb-60">
            <div class="container">
                <div class="section-title without-bg">
                    <h2><span class="dot"></span> Trending Products</h2>
                </div>

                <div class="row">
                    <ProductItem
                        v-for="(product, index) in products"
                        :product="product"
                        :key="index"
                        @clicked="toggle"
                    ></ProductItem>
                </div>
            </div>
        </div>

        <QuckView />
    </div>
</template>

<script>
import QuckView from '../modals/QuckView'
import { mutations } from '../../utils/sidebar-util'
import ProductItem from '../common/ProductItem'

export default {
    name: 'TrendingProductsSlides',
    components: {
        QuckView,
        ProductItem,
    },
    methods: {
        toggle() {
            mutations.toggleQuickView()
        },
    },
    computed: {
        products() {
            return this.$store.state.products.all.filter(
                (product) => product.trending === true
            )
        },
    },
}
</script>