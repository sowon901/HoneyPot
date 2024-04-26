<template>
    <div>
        <div :class="['navbar-area navbar-style-two', { 'is-sticky': isSticky }]">
            <div class="comero-nav">
                <div class="container-fluid">
                    <nav class="navbar navbar-expand-md navbar-light">
                        <nuxt-link class="navbar-brand" to="/">
                            <img src="../assets/img/logo.png" alt="logo" />
                        </nuxt-link>
                        <b-navbar-toggle target="navbarSupportedContent"></b-navbar-toggle>

                        <b-collapse
                            class="collapse navbar-collapse"
                            id="navbarSupportedContent"
                            is-nav
                        >
                            <ul class="navbar-nav">
                                <li class="nav-item p-relative">
                                    <a href="#" class="nav-link">
                                        Home
                                        <i class="fas fa-chevron-down"></i>
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li class="nav-item">
                                            <nuxt-link to="/" class="nav-link active">
                                                Home Style One
                                            </nuxt-link>
                                        </li>
                                        <li class="nav-item">
                                            <nuxt-link to="/diction-two" class="nav-link active">
                                                Home Style Two
                                            </nuxt-link>
                                        </li>
                                        <li class="nav-item">
                                            <nuxt-link to="/diction-three" class="nav-link active">
                                                Home Style Three
                                            </nuxt-link>
                                        </li>
                                        <li class="nav-item">
                                            <nuxt-link to="/diction-four" class="nav-link active">
                                                Home Style Four
                                            </nuxt-link>
                                        </li>
                                        <li class="nav-item">
                                            <nuxt-link to="/diction-five" class="nav-link active">
                                                Home Style Five
                                            </nuxt-link>
                                        </li>
                                        <li class="nav-item">
                                            <nuxt-link to="/diction-six" class="nav-link active">
                                                Home Style Six
                                            </nuxt-link>
                                        </li>
                                        <li class="nav-item">
                                            <nuxt-link to="/diction-seven" class="nav-link active">
                                                Home Style Seven
                                            </nuxt-link>
                                        </li>
                                        <li class="nav-item">
                                            <nuxt-link to="/diction-eight" class="nav-link active">
                                                Home Style Eight
                                            </nuxt-link>
                                        </li>
                                        <li class="nav-item">
                                            <nuxt-link to="/diction-nine" class="nav-link active">
                                                Home Style Nine
                                            </nuxt-link>
                                        </li>
                                        <li class="nav-item">
                                            <nuxt-link to="/diction-ten" class="nav-link active">
                                                Home Style Ten
                                            </nuxt-link>
                                        </li>
                                        <li class="nav-item">
                                            <nuxt-link to="/diction-eleven" class="nav-link active">
                                                Home Style Eleven
                                            </nuxt-link>
                                        </li>
                                    </ul>
                                </li>

                                <li class="nav-item p-relative">
                                    <a href="#" class="nav-link">
                                        Shop
                                        <i class="fas fa-chevron-down"></i>
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li class="nav-item">
                                            <nuxt-link to="/products" class="nav-link">
                                                Products
                                            </nuxt-link>
                                        </li>

                                        <li class="nav-item">
                                            <nuxt-link to="/products-details/1" class="nav-link">
                                                Products Details
                                            </nuxt-link>
                                        </li>
                                    </ul>
                                </li>

                                <li class="nav-item">
                                    <nuxt-link to="/gallery-one" class="nav-link">
                                        Gallery
                                    </nuxt-link>
                                </li>

                                <li class="nav-item p-relative">
                                    <a href="#" class="nav-link">
                                        Pages
                                        <i class="fas fa-chevron-down"></i>
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li class="nav-item">
                                            <nuxt-link to="/gallery-one" class="nav-link">
                                                Gallery
                                            </nuxt-link>
                                        </li>

                                        <li class="nav-item">
                                            <nuxt-link to="/cart" class="nav-link"> Cart </nuxt-link>
                                        </li>

                                        <li class="nav-item">
                                            <nuxt-link to="/checkout" class="nav-link">
                                                Checkout
                                            </nuxt-link>
                                        </li>

                                        <li class="nav-item">
                                            <nuxt-link to="/login" class="nav-link">
                                                Login
                                            </nuxt-link>
                                        </li>

                                        <li class="nav-item">
                                            <nuxt-link to="/signup" class="nav-link">
                                                Signup
                                            </nuxt-link>
                                        </li>

                                        <li class="nav-item">
                                            <nuxt-link to="/not-found" class="nav-link">
                                                Error 404
                                            </nuxt-link>
                                        </li>

                                        <li class="nav-item">
                                            <nuxt-link to="/contact" class="nav-link">
                                                Contact
                                            </nuxt-link>
                                        </li>
                                    </ul>
                                </li>

                                <li class="nav-item p-relative">
                                    <a href="#" class="nav-link">
                                        Blog
                                        <i class="fas fa-chevron-down"></i>
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li class="nav-item">
                                            <nuxt-link to="/blog-one" class="nav-link">
                                                Blog Grid
                                            </nuxt-link>
                                        </li>

                                        <li class="nav-item">
                                            <nuxt-link to="/blog-details" class="nav-link">
                                                Blog Details
                                            </nuxt-link>
                                        </li>
                                    </ul>
                                </li>

                                <li class="nav-item">
                                    <nuxt-link to="/contact" class="nav-link">
                                        Contact
                                    </nuxt-link>
                                </li>
                            </ul>
                        </b-collapse>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'MenubarStyleThree',
    data() {
        return {
            isSticky: false,
        }
    },
    mounted() {
        const that = this
        window.addEventListener('scroll', () => {
            let scrollPos = window.scrollY
            if (scrollPos >= 100) {
                that.isSticky = true
            } else {
                that.isSticky = false
            }
        })
    },
    methods: {
        toggle() {
            mutations.toggleNav()
        },
        async logout(e) {
            e.preventDefault()
            try {
                await this.$store.dispatch('logout')
                this.$router.push('/')
            } catch (error) {
                this.formError = error.message
            }
        },
    },
}
</script>