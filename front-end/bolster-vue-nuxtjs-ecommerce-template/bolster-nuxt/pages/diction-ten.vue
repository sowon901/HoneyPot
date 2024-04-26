<template>
    <div>
        <TopHeaderFour />
        <Menubar />
        <Banner />
        <CategoryBoxes />
        <SpecialOffer />
        <CategoryProducts />
        <TrendingProducts />
        <Facility />
        <BestSellersProducts class="ptb-60" />
        <Testimonials class="bg2" />
        <NewsSlidesTwo />
        <Subscribe />
        <Partner />
        <InstagramPhotos />
    </div>
</template>

<script>
import TopHeaderFour from '../layouts/TopHeaderFour'
import Menubar from '../layouts/Menubar'
import Banner from '../components/diction-ten/Banner'
import CategoryBoxes from '../components/diction-ten/CategoryBoxes'
import SpecialOffer from '../components/common/SpecialOffer'
import CategoryProducts from '../components/common/CategoryProducts'
import TrendingProducts from '../components/diction-ten/TrendingProducts'
import Facility from '../components/common/Facility'
import BestSellersProducts from '../components/diction-ten/BestSellersProducts'
import Testimonials from '../components/common/Testimonials'
import NewsSlidesTwo from '../components/common/NewsSlidesTwo'
import Subscribe from '../components/common/Subscribe'
import Partner from '../components/common/Partner'
import InstagramPhotos from '../components/common/InstagramPhotos'

export default {
    components: {
        TopHeaderFour,
        Menubar,
        Banner,
        CategoryBoxes,
        SpecialOffer,
        CategoryProducts,
        TrendingProducts,
        Facility,
        BestSellersProducts,
        Testimonials,
        NewsSlidesTwo,
        Subscribe,
        Partner,
        InstagramPhotos,
    },
}
</script>