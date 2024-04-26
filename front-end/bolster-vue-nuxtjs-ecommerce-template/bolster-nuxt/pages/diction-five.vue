<template>
  <div>
    <TopHeader />
    <Menubar />
    <Banner />
    <Facility class="black-bg" />
    <TrendingProducts />
    <BestSellers />
    <Offer />
    <News />
    <Subscribe />
    <Partner />
    <InstagramPhotos />
  </div>
</template>

<script>
import TopHeader from '../layouts/TopHeader'
import Menubar from '../layouts/Menubar'
import Banner from '../components/diction-five/Banner'
import Facility from '../components/common/Facility'
import TrendingProducts from '../components/diction-five/TrendingProducts'
import BestSellers from '../components/diction-five/BestSellers'
import Offer from '../components/diction-five/Offer'
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
    TrendingProducts,
    BestSellers,
    Offer,
    News,
    Subscribe,
    Partner,
    InstagramPhotos,
  },
}
</script>