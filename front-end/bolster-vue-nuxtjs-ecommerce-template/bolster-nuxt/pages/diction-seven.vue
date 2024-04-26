<template>
    <div>
        <TopHeaderStyleOne />
        <MenubarStyleOne />
        <Banner />
        <AlowYourStyle />
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
import TopHeaderStyleOne from '../layouts/TopHeaderStyleOne'
import MenubarStyleOne from '../layouts/MenubarStyleOne'
import Banner from '../components/diction-seven/Banner'
import AlowYourStyle from '../components/diction-seven/AlowYourStyle'
import PopularProducts from '../components/common/PopularProducts'
import CategoryProducts from '../components/common/CategoryProducts'
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
        TopHeaderStyleOne,
        MenubarStyleOne,
        Banner,
        AlowYourStyle,
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