<template>
    <div>
        <TopPanel v-if="isShowing" @clicked="onTopPanelClose"></TopPanel>

        <div class="top-header">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-7 col-md-6">
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

                    <div class="col-lg-5 col-md-6">
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
    </div>
</template>

<script>
import TopPanel from '../layouts/TopPanel'

export default {
    components: {
        TopPanel,
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
    }
}
</script>