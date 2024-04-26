<template>
  <div>
    <TopHeader />
    <Menubar />
    <Banner></Banner>
    <Offer></Offer>
    <LatestProducts></LatestProducts>
    <ProductCategory></ProductCategory>
    <TrendingProducts></TrendingProducts>
    <BestSellers></BestSellers>
    <Facility></Facility>
    <Testimonials></Testimonials>
    <NewsSlides></NewsSlides>
    <Subscribe></Subscribe>
    <Partner></Partner>
    <InstagramPhotos></InstagramPhotos>
  </div>
</template>

<script>
import TopHeader from '../layouts/TopHeader'
import Menubar from '../layouts/Menubar'
import Banner from '../components/landing-one/Banner';
import Offer from '../components/landing-one/Offer';
import LatestProducts from '../components/landing-one/LatestProducts';
import ProductCategory from '../components/common/ProductCategory';
import TrendingProducts from '../components/landing-one/TrendingProducts';
import BestSellers from '../components/landing-one/BestSellers';
import Facility from '../components/common/Facility';
import Testimonials from '../components/common/Testimonials';
import NewsSlides from '../components/common/NewsSlides';
import Subscribe from '../components/common/Subscribe';
import Partner from '../components/common/Partner';
import InstagramPhotos from '../components/common/InstagramPhotos';

export default {
  components: {
    TopHeader, Menubar, Banner, Offer, LatestProducts, ProductCategory, TrendingProducts,
    BestSellers, Facility, Testimonials, NewsSlides, Subscribe, Partner, InstagramPhotos
  }
}
</script>