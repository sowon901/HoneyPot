<template>
    <div>
        <div class="products-collections-area ptb-60">
            <div class="container">
                <div class="section-title">
                    <h2>
                        <span class="dot"></span>
                        Products</h2>
                </div>

                <div class="row">
                    <Sidebar/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Sidebar from '../components/all-products/Sidebar'

    export default {
        components: {
            Sidebar
        }
    }
</script>