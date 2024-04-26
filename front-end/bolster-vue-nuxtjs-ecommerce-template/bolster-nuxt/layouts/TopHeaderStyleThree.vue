<template>
    <div>
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
                        <div class="top-header-others-option">
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
        <SidebarPanel></SidebarPanel>
    </div>
</template>

<script>
import SidebarPanel from '../layouts/SidebarPanel'
import { mutations } from '../utils/sidebar-util'

export default {
    name: 'TopHeaderStyleThree',
    components: {
        SidebarPanel,
    },
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