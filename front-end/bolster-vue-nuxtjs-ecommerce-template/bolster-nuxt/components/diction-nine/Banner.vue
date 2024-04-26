<template>
    <div class="home-slides-three black-color-text owl-carousel owl-theme">
        <carousel
            :autoplay = true
            :autoplayTimeout = 3000
            :paginationEnabled = true
            :perPage="1"
        >
            <slide>
                <div class="main-banner item-bg13">
                    <div class="d-table">
                        <div class="d-table-cell">
                            <div class="container">
                                <div class="main-banner-content">
                                    <span>Limited Time Offer!</span>
                                    <h1>Winter-spring 2021!</h1>
                                    <p>Take 20% Off ‘Sale Must-Haves'</p>

                                    <a href="#" class="btn btn-primary">Shop Women's</a>
                                    <a href="#" class="btn btn-light">Shop Men's</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </slide>

            <slide>
                <div class="main-banner item-bg14">
                    <div class="d-table">
                        <div class="d-table-cell">
                            <div class="container">
                                <div class="main-banner-content">
                                    <span>New Inspiration 2021!</span>
                                    <h1>Summer-spring 2021!</h1>
                                    <p>Trending from men and women style collection</p>

                                    <a href="#" class="btn btn-primary">Shop Women's</a>
                                    <a href="#" class="btn btn-light">Shop Men's</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </slide>

            <slide>
                <div class="main-banner item-bg15">
                    <div class="d-table">
                        <div class="d-table-cell">
                            <div class="container">
                                <div class="main-banner-content">
                                    <span>New Inspiration 2021!</span>
                                    <h1>Travel-spring 2021!</h1>
                                    <p>Up To 30% OFF Select Styles</p>

                                    <a href="#" class="btn btn-primary">Shop Women's</a>
                                    <a href="#" class="btn btn-light">Shop Men's</a>
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
    name: 'Banner'
}
</script>