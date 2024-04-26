<template>
    <div>
        <div class="all-products-area pb-60">
            <div class="container">
                <div class="products-category-tab">
                    <b-tabs content-class="mt-3 tab_content">
                        <b-tab title="Latest Products">
                            <div class="tabs_item">
                                <div class="row">
                                    <AllProductsItem
                                        v-for="(product, index) in products"
                                        :product="product"
                                        :key="index"
                                        @clicked="toggle"
                                    ></AllProductsItem>
                                </div>
                            </div>
                        </b-tab>

                        <b-tab title="Special Products">
                            <TabSpecialProducts />
                        </b-tab>

                        <b-tab title="Featured Products">
                            <div class="tabs_item">
                                <div class="row">
                                    <AllProductsItem
                                        v-for="(product, index) in products"
                                        :product="product"
                                        :key="index"
                                        @clicked="toggle"
                                    ></AllProductsItem>
                                </div>
                            </div>
                        </b-tab>
                    </b-tabs>
                </div>
            </div>
        </div>
        <QuckView />
    </div>
</template>

<script>
import QuckView from '../modals/QuckView'
import { mutations } from '../../utils/sidebar-util'
import AllProductsItem from './AllProductsItem'
import TabSpecialProducts from './TabSpecialProducts'

export default {
    name: 'AllProducts',
    components: {
        QuckView,
        AllProductsItem,
        TabSpecialProducts
    },
    methods: {
        toggle() {
            mutations.toggleQuickView()
        },
    },
    computed: {
        products() {
            return this.$store.state.products.all.filter(
                (product) => product.latestOne === true
            )
        },
    },
}
</script>