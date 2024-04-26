<template>
  <div>
    <TopHeader />
    <Menubar />
    <Banner />
    <AlowYourStyle />
    <AllProducts />
    <CategoryProducts />
    <TrendingProducts />
    <BestSellers />
    <Facility />
    <Testimonials class="bg2" />
    <NewsSlides />
    <Subscribe />
    <Partner />
    <InstagramPhotos />
  </div>
</template>

<script>
import TopHeader from '../layouts/TopHeader'
import Menubar from '../layouts/Menubar'
import Banner from '../components/diction-six/Banner'
import AlowYourStyle from '../components/diction-six/AlowYourStyle'
import AllProducts from '../components/diction-six/AllProducts'
import CategoryProducts from '../components/common/CategoryProducts'
import TrendingProducts from '../components/diction-six/TrendingProducts'
import BestSellers from '../components/diction-six/BestSellers'
import Facility from '../components/common/Facility';
import Testimonials from '../components/common/Testimonials';
import NewsSlides from '../components/diction-six/NewsSlides'
import Subscribe from '../components/common/Subscribe'
import Partner from '../components/common/Partner'
import InstagramPhotos from '../components/common/InstagramPhotos'

export default {
  components: {
    TopHeader,
    Menubar,
    Banner,
    AlowYourStyle,
    AllProducts,
    CategoryProducts,
    TrendingProducts,
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