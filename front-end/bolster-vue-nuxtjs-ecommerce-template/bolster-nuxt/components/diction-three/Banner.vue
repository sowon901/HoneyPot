<template>
    <client-only>
        <!-- Start Main Banner Area -->
        <div class="home-slides-two">
            <carousel
                :autoplay = true
                :autoplayTimeout = 3000
                :navigationEnabled = "true"
                navigationNextLabel="<i class='fas fa-angle-right'></i>"
                navigationPrevLabel="<i class='fas fa-angle-left'></i>"
                :paginationEnabled = false
                :perPage="1"
            >
                <slide>
                    <div class="banner-section item-bg5">
                        <div class="d-table">
                            <div class="d-table-cell">
                                <div class="container">
                                    <div class="banner-content">
                                        <span class="sub-title">Limited Time Offer!</span>
                                        <h1>Clothing Made for You!</h1>
                                        <p>Take 20% Off ‘Sale Must-Haves'</p>
                                        <a href="#" class="btn btn-primary">Shop women's</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </slide>

                <slide>
                    <div class="banner-section item-bg6">
                        <div class="d-table">
                            <div class="d-table-cell">
                                <div class="container">
                                    <div class="banner-content">
                                        <span class="sub-title">Limited Time Offer!</span>
                                        <h1>Clothing Made for You!</h1>
                                        <p>Take 20% Off ‘Sale Must-Haves'</p>
                                        <a href="#" class="btn btn-primary">Shop Men's</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </slide>
            </carousel>
        </div>
        <!-- End Main Banner Area -->
    </client-only>
</template>