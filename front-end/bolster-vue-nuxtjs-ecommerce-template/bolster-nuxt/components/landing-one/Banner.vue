<template>
    <!-- Start Main Banner Area -->
    <!-- 배너 입찰 많은 순으로 -->

    <div class="home-slides owl-carousel owl-theme">
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
        <slide v-for="(slide, index) in slides" :key="index">
                    <div class="main-banner" :style="{ backgroundImage: 'url(' + slide.image + ')' }">
                    </div>
        </slide>


            <!-- <slide>
                <div class="main-banner item-bg1">
                    
                </div>
            </slide>

            <slide>
                <div class="main-banner item-bg2">
                </div>
            </slide>

            <slide>
                <div class="main-banner item-bg3">
                    
                </div>
            </slide> -->

    </carousel>
</div>
</template>

<script>
export default {
    name: 'Banner',
    data(){
        return{
            slides: [
                {
                    id: 1,
                    image: require('../../assets/img/banner-image/m02.jpeg')
                },
                {
                    id: 2,
                    image: require('../../assets/img/banner-image/m03.jpeg')
                },
                {
                    id: 3,
                    image: require('../../assets/img/banner-image/m01.jpeg')
                }
            ]
        }
    }
}
</script>
<style scoped>

.home-slides {
    width: 100%;
}

.main-banner {
    height: 520px;
}


</style>