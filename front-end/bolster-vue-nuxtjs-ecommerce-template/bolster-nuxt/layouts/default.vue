<template>
  <div>
    <Nuxt />
    <Footer></Footer>
    <SiteLoader v-if="loading" />
    <BackToTop></BackToTop>
  </div>
</template>

<script>
import Footer from './Footer'
import BackToTop from './BackToTop'
import SiteLoader from './SiteLoder'
export default {
  components: {
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