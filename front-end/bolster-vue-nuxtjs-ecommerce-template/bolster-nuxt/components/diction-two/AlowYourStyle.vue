<template>
    <div class="offer-area ptb-60">
        <div class="container">
            <div class="section-title">
                <h2><span class="dot"></span> Alow your style to match your ambition!</h2>
            </div>

            <div class="row">
                <div class="offer-slides owl-carousel owl-theme">
                    <carousel
                        :autoplay = true
                        :autoplayTimeout = 3000
                        :navigationEnabled = true
                        navigationNextLabel="<i class='fas fa-angle-right'></i>"
                        navigationPrevLabel="<i class='fas fa-angle-left'></i>"
                        :paginationEnabled = true
                        :perPageCustom = "[[0, 1], [768, 2], [1200, 4]]"
                    >
                        <slide>
                            <div class="single-offer-box">
                                <img src="../../assets/img/offer-img1.jpg" alt="image">

                                <div class="offer-content">
                                    <h3>T-Shirts</h3>
                                    <span>65 Products</span>
                                </div>

                                <a href="#"></a>
                            </div>
                        </slide>

                        <slide>
                            <div class="single-offer-box">
                                <img src="../../assets/img/offer-img2.jpg" alt="image">

                                <div class="offer-content">
                                    <h3>Accessories</h3>
                                    <span>155 Products</span>
                                </div>

                                <a href="#"></a>
                            </div>
                        </slide>

                        <slide>
                            <div class="single-offer-box">
                                <img src="../../assets/img/offer-img3.jpg" alt="image">

                                <div class="offer-content">
                                    <h3>Footwaer</h3>
                                    <span>175 Products</span>
                                </div>

                                <a href="#"></a>
                            </div>
                        </slide>
                            
                        <slide>
                            <div class="single-offer-box">
                                <img src="../../assets/img/offer-img4.jpg" alt="image">

                                <div class="offer-content">
                                    <h3>Shirts</h3>
                                    <span>548 Products</span>
                                </div>

                                <a href="#"></a>
                            </div>
                        </slide>

                        <slide>
                            <div class="single-offer-box">
                                <img src="../../assets/img/offer-img3.jpg" alt="image">

                                <div class="offer-content">
                                    <h3>Footwaer</h3>
                                    <span>175 Products</span>
                                </div>

                                <a href="#"></a>
                            </div>
                        </slide>
                    </carousel>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AlowYourStyle'
}
</script>