<template>
    <div>
        <div class="best-sellers-area pb-60">
            <div class="container">
                <div class="section-title without-bg">
                    <h2><span class="dot"></span> Best Sellers</h2>
                </div>

                <div class="row">
                    <ProductItem
                        :product="product"
                        v-for="(product, index) in products"
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
import ProductItem from './ProductItem'
import { mutations } from '../../utils/sidebar-util'
import QuckView from '../modals/QuckView'

export default {
    name: 'BestSellers',  
    components: {
        ProductItem,
        QuckView,
    },
    methods: {
        toggle() {
            mutations.toggleQuickView()
        },
    },
    computed: {
        products() {
            return this.$store.state.products.all.filter(
                (product) => product.bestSellersOne === true
            )
        },
    },
}
</script>