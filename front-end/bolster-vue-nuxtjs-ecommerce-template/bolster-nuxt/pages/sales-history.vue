<template>
    <div class="container">
        <div class="wrapper">
            <div class="content">
                <div class="sidebar">
                    <Sidebar />
                </div>
                <div class="cart-items">
                    <SalesList :serialNumber="serialNumber" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Sidebar from '../components/all-products/Sidebar'
import SalesList from '../components/cart/SalesList'

export default {
    components: {
        Sidebar,
        SalesList
    },
    data() {
        return {
            serialNumber: null
        }
    },
    mounted() {
        // sessionStorage에서 serialNumber를 가져옵니다.
        const serialNumber = sessionStorage.getItem('SERIAL_NUMBER');
        if (serialNumber) {
            this.serialNumber = serialNumber;
        } else {
            // serialNumber가 없을 경우 처리 (예: 로그인 페이지로 리디렉션)
            this.$router.push('/login');
        }
    }
}
</script>
<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
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
