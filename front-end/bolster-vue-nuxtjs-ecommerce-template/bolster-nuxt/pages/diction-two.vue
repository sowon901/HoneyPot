<template>
    <div>
        <TopHeader />
        <Menubar />
        <Banner />
        <AlowYourStyle />
        <AllProductsSlides />
        <ProductCategory />
        <TrendingProductsSlides />
        <BestSellers />
        <Facility />
        <Testimonials />
        <NewsSlides />
        <Subscribe />
        <Partner />
        <InstagramPhotos />
    </div>
</template>

<script>
import TopHeader from '../layouts/TopHeader'
import Menubar from '../layouts/Menubar'
import Banner from '../components/diction-two/Banner'
import AlowYourStyle from '../components/diction-two/AlowYourStyle'
import AllProductsSlides from '../components/diction-two/AllProductsSlides'
import ProductCategory from '../components/common/ProductCategory'
import TrendingProductsSlides from '../components/diction-two/TrendingProductsSlides'
import BestSellers from '../components/diction-two/BestSellers'
import Facility from '../components/common/Facility';
import Testimonials from '../components/common/Testimonials'
import NewsSlides from '../components/common/NewsSlides'
import Subscribe from '../components/common/Subscribe'
import Partner from '../components/common/Partner'
import InstagramPhotos from '../components/common/InstagramPhotos'

export default {
    components: {
        TopHeader,
        Menubar,
        Banner,
        AlowYourStyle,
        AllProductsSlides,
        ProductCategory,
        TrendingProductsSlides,
        BestSellers,
        Facility,
        Testimonials,
        NewsSlides,
        Subscribe,
        Partner,
        InstagramPhotos,
    },
}
</script>