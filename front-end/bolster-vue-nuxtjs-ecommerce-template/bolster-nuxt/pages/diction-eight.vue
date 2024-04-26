<template>
    <div>
        <TopHeaderStyleTwo />
        <MenubarStyleTwo />
        <Banner />
        <CategoryBoxes />
        <PopularProducts />
        <CategoryProducts />
        <BestSellersProducts />
        <Facility />
        <TrendingProductsSlides />
        <Testimonials class="bg2" />
        <NewsSlidesTwo />
        <Subscribe />
        <Partner />
        <InstagramPhotos />
    </div>
</template>

<script>
import TopHeaderStyleTwo from '../layouts/TopHeaderStyleTwo'
import MenubarStyleTwo from '../layouts/MenubarStyleTwo'
import Banner from '../components/diction-eight/Banner'
import CategoryBoxes from '../components/diction-eight/CategoryBoxes'
import PopularProducts from '../components/common/PopularProducts'
import CategoryProducts from '../components/diction-eight/CategoryProducts'
import BestSellersProducts from '../components/common/BestSellersProducts'
import Facility from '../components/common/Facility';
import TrendingProductsSlides from '../components/common/TrendingProductsSlides'
import Testimonials from '../components/common/Testimonials';
import NewsSlidesTwo from '../components/common/NewsSlidesTwo'
import Subscribe from '../components/common/Subscribe'
import Partner from '../components/common/Partner'
import InstagramPhotos from '../components/common/InstagramPhotos'

export default {
    components: {
        TopHeaderStyleTwo,
        MenubarStyleTwo,
        Banner,
        CategoryBoxes,
        PopularProducts,
        CategoryProducts,
        BestSellersProducts,
        Facility,
        TrendingProductsSlides,
        Testimonials,
        NewsSlidesTwo,
        Subscribe,
        Partner,
        InstagramPhotos,
    },
}
</script>