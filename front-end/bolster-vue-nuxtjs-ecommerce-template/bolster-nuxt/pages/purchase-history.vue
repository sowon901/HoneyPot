<template>
    <!-- <div>
        <Menubar/>
        <div class="products-collections-area ptb-60">
            <div class="container">
                <div class="row">
                    <Sidebar/>
                </div>
                <CartItems />
            </div>
        </div>
        <div class="content">
                <div class="sidebar">
                    <Sidebar/>
                </div>
                <div class="cart-items">
                    <CartItems />
                </div>
            </div>
        
    </div> -->
     <div class="container">
        <div class="wrapper">
            <div class="content">
                <div class="sidebar">
                    <Sidebar/>
                </div>
                <div class="cart-items">
                    <CartItems />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Sidebar from '../components/all-products/Sidebar'
    import CartItems from '../components/cart/CartItems'

    export default {
        components: {
            Sidebar,
            CartItems
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
    flex: 0 0 25%; /* 사이드바 너비 */
}

.cart-items {
    flex: 1; /* 카트 아이템이 나머지 공간을 채움 */
}
</style>
