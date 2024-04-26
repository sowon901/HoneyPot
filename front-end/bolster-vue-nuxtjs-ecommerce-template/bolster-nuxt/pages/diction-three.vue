<template>
  <div>
    <TopHeader />
    <Menubar />
    <Banner />
    <Facility class="black-bg" />
    <Category />
    <LatestProducts />
    <Offer />
    <News />
    <Partner />
    <Subscribe />
    <InstagramPhotos />
  </div>
</template>

<script>
import TopHeader from '../layouts/TopHeader'
import Menubar from '../layouts/Menubar'
import Banner from '../components/diction-three/Banner'
import Facility from '../components/common/Facility'
import Category from '../components/diction-three/Category'
import LatestProducts from '../components/landing-one/LatestProducts'
import Offer from '../components/diction-three/Offer'
import News from '../components/common/News'
import Partner from '../components/common/Partner'
import Subscribe from '../components/common/Subscribe'
import InstagramPhotos from '../components/common/InstagramPhotos'

export default {
  components: {
    TopHeader,
    Menubar,
    Banner,
    Facility,
    Category,
    LatestProducts,
    Offer,
    News,
    Partner,
    Subscribe,
    InstagramPhotos,
  },
}
</script>