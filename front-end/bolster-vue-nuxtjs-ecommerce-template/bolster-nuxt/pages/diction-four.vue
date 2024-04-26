<template>
  <div>
    <TopHeader />
    <Menubar />
    <Banner />
    <Facility class="black-bg" />
    <TrendingProductsSlides />
    <BestSellers />
    <ProductsOffer />
    <News />
    <Subscribe />
    <Partner />
    <InstagramPhotos />
  </div>
</template>

<script>
import TopHeader from '../layouts/TopHeader'
import Menubar from '../layouts/Menubar'
import Banner from '../components/diction-four/Banner'
import Facility from '../components/common/Facility'
import TrendingProductsSlides from '../components/diction-four/TrendingProductsSlides'
import BestSellers from '../components/diction-four/BestSellers'
import ProductsOffer from '../components/diction-four/ProductsOffer'
import News from '../components/common/News'
import Subscribe from '../components/common/Subscribe'
import Partner from '../components/common/Partner'
import InstagramPhotos from '../components/common/InstagramPhotos'

export default {
  components: {
    TopHeader,
    Menubar,
    Banner,
    Facility,
    TrendingProductsSlides,
    BestSellers,
    ProductsOffer,
    News,
    Subscribe,
    Partner,
    InstagramPhotos,
  },
}
</script>