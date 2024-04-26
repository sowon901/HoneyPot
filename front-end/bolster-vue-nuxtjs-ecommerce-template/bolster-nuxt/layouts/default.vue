<template>
  <div>
    <Header />
    <Nuxt />
    <Footer></Footer>
    <SiteLoader v-if="loading" />
    <BackToTop></BackToTop>
  </div>
</template>

<script>
import Header from './Header'
import Footer from './Footer'
import BackToTop from './BackToTop'
import SiteLoader from './SiteLoder'
export default {
  components: {
    Header,
    Footer,
    BackToTop,
    SiteLoader,
  },
  data() {
    return {
      loading: true,
    }
  },
  watch: {
    $route(pathUrl) {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 600)
    },
  },
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 600)
  },
}
</script>