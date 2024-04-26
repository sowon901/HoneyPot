<template>
    <!-- Start Top Header Area -->
    <div class="top-header">
        <div class="container-fluid">
            <div class="row align-items-center">
                <div class="col-lg-4 col-md-5">
                    <ul class="top-header-social">
                        <li><a href="#">Facebook</a></li>
                        <li><a href="#">Twitter</a></li>
                        <li><a href="#">Linkedin</a></li>
                    </ul>
                </div>

                <div class="col-lg-4 col-md-2">
                    <div class="top-header-discount-info">
                        <p><strong>50% OFF</strong> all new collections! <a href="#">Discover Now!</a></p>
                    </div>
                </div>

                <div class="col-lg-4 col-md-5">
                    <ul class="top-header-right-nav">
                        <li><nuxt-link to="/blog-one">Blog</nuxt-link></li>
                        <li><nuxt-link to="/cart">Cart</nuxt-link></li>
                        <li>
                            <div class="languages-list">
                                <select>
                                    <option value="1">Eng</option>
                                    <option value="2">Ger</option>
                                    <option value="3">Span</option>
                                </select>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!-- End Top Header Area -->
</template>

<script>
export default {
    name: 'TopHeaderStyleTwo',
    methods: {
        async logout(e){
            e.preventDefault()
            try {
                await this.$store.dispatch('logout')
                this.$router.push('/')
            } catch (error) {
                this.formError = error.message
            }
        }
    }
}
</script>