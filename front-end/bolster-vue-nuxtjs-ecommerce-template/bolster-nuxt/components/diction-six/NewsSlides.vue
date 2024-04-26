<template>
    <div class="news-area ptb-60">
        <div class="container">
            <div class="section-title">
                <h2><span class="dot"></span> Comero News</h2>
            </div>

            <div class="row">
                <div class="news-slides owl-carousel owl-theme">
                    <carousel
                        :autoplay="true"
                        :autoplayTimeout="1000"
                        :perPageCustom="[[0, 1],[768, 2],[1024, 3],[1200, 3]]"
                    >
                        <slide>
                            <div class="col-lg-12 col-md-12">
                                <div class="single-blog-post">
                                    <div class="blog-image">
                                        <a href="#"><img src="../../assets/img/blog1.jpg" alt="image"></a>

                                        <div class="post-tag">
                                            <a href="#">Shop</a>
                                        </div>
                                    </div>

                                    <div class="blog-post-content">
                                        <span class="date">25 Feb, 2021</span>
                                        <h3><a href="#">The Most Popular New top Business Apps</a></h3>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum.</p>
                                        <a href="#" class="read-more-btn">Read More <i class="icofont-double-right"></i></a>
                                    </div>
                                </div>
                            </div>
                        </slide>

                        <slide>
                            <div class="col-lg-12 col-md-12">
                                <div class="single-blog-post">
                                    <div class="blog-image">
                                        <a href="#"><img src="../../assets/img/blog2.jpg" alt="image"></a>

                                        <div class="post-tag">
                                            <a href="#">Inspiration</a>
                                        </div>
                                    </div>

                                    <div class="blog-post-content">
                                        <span class="date">27 Feb, 2021</span>
                                        <h3><a href="#">The Best Marketing top use Management Tools</a></h3>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum.</p>
                                        <a href="#" class="read-more-btn">Read More <i class="icofont-double-right"></i></a>
                                    </div>
                                </div>
                            </div>
                        </slide>

                        <slide>
                            <div class="col-lg-12 col-md-12">
                                <div class="single-blog-post">
                                    <div class="blog-image">
                                        <a href="#"><img src="../../assets/img/blog3.jpg" alt="image"></a>

                                        <div class="post-tag">
                                            <a href="#">Sell</a>
                                        </div>
                                    </div>

                                    <div class="blog-post-content">
                                        <span class="date">28 Feb, 2021</span>
                                        <h3><a href="#">3 WooCommerce Plugins to Boost Sales</a></h3>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum.</p>
                                        <a href="#" class="read-more-btn">Read More <i class="icofont-double-right"></i></a>
                                    </div>
                                </div>
                            </div>
                        </slide>

                        <slide>
                            <div class="col-lg-12 col-md-12">
                                <div class="single-blog-post">
                                    <div class="blog-image">
                                        <a href="#"><img src="../../assets/img/blog4.jpg" alt="image"></a>

                                        <div class="post-tag">
                                            <a href="#">Marketing</a>
                                        </div>
                                    </div>

                                    <div class="blog-post-content">
                                        <span class="date">29 Feb, 2021</span>
                                        <h3><a href="#">Top 21 Must-Read Blogs For Creative Agencies</a></h3>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum.</p>
                                        <a href="#" class="read-more-btn">Read More <i class="icofont-double-right"></i></a>
                                    </div>
                                </div>
                            </div>
                        </slide>

                        <slide>
                            <div class="col-lg-12 col-md-12">
                                <div class="single-blog-post">
                                    <div class="blog-image">
                                        <a href="#"><img src="../../assets/img/blog5.jpg" alt="image"></a>

                                        <div class="post-tag">
                                            <a href="#">Shop</a>
                                        </div>
                                    </div>

                                    <div class="blog-post-content">
                                        <span class="date">25 Feb, 2021</span>
                                        <h3><a href="#">The Most Popular New top Business Apps</a></h3>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum.</p>
                                        <a href="#" class="read-more-btn">Read More <i class="icofont-double-right"></i></a>
                                    </div>
                                </div>
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
    name: 'NewsSlides'
}
</script>