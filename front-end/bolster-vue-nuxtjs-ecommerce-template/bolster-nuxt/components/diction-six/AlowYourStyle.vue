<template>
    <div class="category-boxes-area pt-60">
        <div class="container">
            <div class="section-title">
                <h2><span class="dot"></span> Alow your style to match your ambition!</h2>
            </div>

            <div class="row">
                <div class="col-lg-4 col-sm-6 col-md-6">
                    <div class="category-boxes">
                        <img src="../../assets/img/category-product-image/img1.jpg" alt="image">
                        <div class="content">
                            <h3>Shop for Woman</h3>
                            <span>165 Products</span>
                            <nuxt-link to="/products" class="shop-now-btn">Shop Now</nuxt-link>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4 col-sm-6 col-md-6">
                    <div class="category-boxes">
                        <img src="../../assets/img/category-product-image/img2.jpg" alt="image">
                        <div class="content">
                            <h3>Shop for Man</h3>
                            <span>165 Products</span>
                            <nuxt-link to="/products" class="shop-now-btn">Shop Now</nuxt-link>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4 col-sm-6 col-md-6">
                    <div class="category-boxes">
                        <img src="../../assets/img/category-product-image/img3.jpg" alt="image">
                        <div class="content">
                            <h3>Shop for Man & Woman</h3>
                            <span>165 Products</span>
                            <nuxt-link to="/products" class="shop-now-btn">Shop Now</nuxt-link>
                        </div>
                    </div>
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