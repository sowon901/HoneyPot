<template>
    <!-- Start Main Banner Area -->
    <!-- 배너 입찰 많은 순으로 -->

    <div class="home-slides owl-carousel owl-theme" style = " border-radius: 50px; 
    overflow: hidden;">
        <carousel
            :paginationEnabled = true
            :perPage="1"
            :autoplay = true
            :autoplayTimeout = 3000
            :navigationEnabled = "true"
            :loop = true
            navigationNextLabel="<i class='fas fa-arrow-right'></i>"
            navigationPrevLabel="<i class='fas fa-arrow-left'></i>"
        >
            <slide>
                <div class="main-banner item-bg1">
                    <div class="d-table">
                        <div class="d-table-cell">
                            <div class="container">
                                <div class="main-banner-content">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </slide>

            <slide>
                <div class="main-banner item-bg2" @click="navigateToProducts" style=" cursor: pointer;">
                    <div class="d-table">
                        <div class="d-table-cell">
                            <div class="container">
                                <div class="main-banner-content">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </slide>
            <slide>
                <div class="main-banner item-bg3">
                    <div class="d-table">
                        <div class="d-table-cell">
                            <div class="container">
                                <div class="main-banner-content">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </slide>
    </carousel>
</div>
</template>

<script>
export default {
    name: 'Banner',
    methods: {
    navigateToProducts() {
      this.$router.push({ path: '/products', query: { sort: '2' } });
    }
  }
}
</script>
<style scoped>

.home-slides {
    width: 1300px;
}

.main-banner{
    border-radius: 50px; 
    overflow: hidden; 
}

</style>