<template>
    <div>
        <div class="tabs_item">
            <div class="row">
                <SpecialOfferItem
                    v-for="(product, index) in products"
                    :product="product"
                    :key="index"
                    @clicked="toggle"
                    :className="`col-lg-4 col-md-6 col-sm-6`"
                ></SpecialOfferItem>
            </div>
        </div>
        <QuckView />
    </div>
</template>

<script>
import QuckView from '../modals/QuckView'
import { mutations } from '../../utils/sidebar-util'
import SpecialOfferItem from '../common/SpecialOfferItem'
import TabMenProducts from './TabMenProducts'

export default {
    name: 'TabMenProducts',
    components: {
        QuckView,
        SpecialOfferItem,
        TabMenProducts
    },
    methods: {
        toggle() {
            mutations.toggleQuickView()
        },
    },
    computed: {
        products() {
            return this.$store.state.products.all.filter(
                (product) => product.specialThree === true
            )
        },
    },
}
</script>