<template>
    <div>
        <div class="top-header top-header-style-two">
            <div class="container-fluid">
                <div class="row align-items-center">
                    <div class="col-lg-5 col-md-5">
                        <ul class="top-header-nav">
                            <li v-if="!$store.state.authUser">
                                <nuxt-link to="/login">Login</nuxt-link>
                            </li>
                            <li v-else @click="logout">
                                <nuxt-link to="#">Logout</nuxt-link>
                            </li>
                            <li><nuxt-link to="/signup">Signup</nuxt-link></li>
                            <li><nuxt-link to="/products">Products</nuxt-link></li>
                            <li><nuxt-link to="/contact">Contact</nuxt-link></li>
                        </ul>
                    </div>

                    <div class="col-lg-2 col-md-2">
                        <div class="top-header-logo">
                            <nuxt-link to="/" class="d-inline-block">
                                <img src="../assets/img/logo.png" alt="image">
                            </nuxt-link>
                        </div>
                    </div>

                    <div class="col-lg-5 col-md-6">
                        <div class="top-header-others-option">
                            <div class="others-option">
                                <div v-if="!$store.state.authUser" class="option-item">
                                    <nuxt-link to="/login">Login</nuxt-link>
                                </div>
                                <div v-else @click="logout" class="option-item">
                                    <nuxt-link to="#">Logout</nuxt-link>
                                </div>
                                <div class="option-item">
                                    <a @click.prevent="toggle" href="#">
                                        Cart({{ cart.length }}) <i class="fas fa-shopping-bag"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <SidebarPanel></SidebarPanel>
    </div>
</template>

<script>
import SidebarPanel from '../layouts/SidebarPanel'

export default {
    name: 'TopHeaderStyleOne',
    components: {
        SidebarPanel,
    },
    data() {
        return {
            isShowing: true,
        }
    },
    methods: {
        onTopPanelClose(value) {
            this.isShowing = value
        },
        async logout(e){
            e.preventDefault()
            try {
                await this.$store.dispatch('logout')
                this.$router.push('/')
            } catch (error) {
                this.formError = error.message
            }
        }
    },
    computed: {
        cart() {
            return this.$store.getters.cart
        },
    },
    methods: {
        toggle() {
            mutations.toggleNav()
        },
    }
}
</script>