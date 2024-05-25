<template>
    <div class="container">
        <div class="wrapper">
            <div class="content">
                <div class="sidebar">
                    <Sidebar />
                </div>
                <div class="cart-items">
                    <PurchaseList :serialNumber="serialNumber" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Sidebar from '../components/all-products/Sidebar'
import PurchaseList from '../components/cart/PurchaseList'
import { mapState, mapActions } from 'vuex'

export default {
    components: {
        Sidebar,
        PurchaseList
    },
    computed: {
        ...mapState(['serialNumber', 'isLoggedIn', 'formError']),
    },
    async mounted() {
        const accessToken = sessionStorage.getItem('JWT_TOKEN');
        const accessTokenExpiration = sessionStorage.getItem('ACCESS_TOKEN_EXPIRATION');

        console.log('Access Token:', accessToken);
        console.log('Access Token Expiration:', accessTokenExpiration);

        if (new Date(accessTokenExpiration) <= new Date()) {
            console.log('Access Token is expired. Need to refresh token.');
            await this.refreshAccessToken();
        }

        await this.fetchProfile();
    },
    methods: {
        ...mapActions(['refreshAccessToken', 'fetchProfile']),
    }

}
</script>
<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    padding-top: 100px;
}

.content {
    display: flex;
}

.sidebar {
    flex: 0 0 25%;
    /* 사이드바 너비 */
}

.cart-items {
    flex: 1;
    /* 카트 아이템이 나머지 공간을 채움 */
}
</style>
