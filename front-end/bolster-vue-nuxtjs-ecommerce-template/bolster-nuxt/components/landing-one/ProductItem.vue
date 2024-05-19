<template>
    <div :class="className">
        <div class="single-product-box">
            <div class="product-image">
                <div class="image-wrapper">
                    <nuxt-link :to="`/bid-details/${product.productId}`">
                        <img :src="product.image1" :alt="product.productName" class="product-image" />
                    </nuxt-link>
                </div>
            </div>

            <div class="product-content">
                <h3 style="text-align: left;">
                    <nuxt-link :to="`/bid-details/${product.productId}`">
                        {{ product.productName }}
                    </nuxt-link>
                </h3>
                <div>
                    <div style="display: flex; justify-content: space-between;">
                        <div style="margin-right: auto; font-size: 16px; font-weight: bold; color: black;">
                            {{ product.price }}
                        </div>
                        <div style="margin-left: auto; color: gray;">
                            입찰 {{ product.bidCnt }}건
                        </div>
                    </div>
                    <div style="display: flex; color: gray; justify-content: space-between;">
                        <div style="margin-right: auto;" v-if="showBuyNow">
                            또는 즉시 구매
                        </div>
                        <div style="margin-left: auto;">
                            {{ remainingTime }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'ProductItem',
    components: {
    },
    data() {
        return {
        }
    },
    props: ['product', 'className'],
    computed: {
        showBuyNow() {
            return this.product.buyNow !== null && this.product.buyNow !== 0;
        },
        remainingTime() {
            const currentTime = new Date();
            const timeLimit = new Date(this.product.timeLimit);
            if (currentTime > timeLimit) {
                return "종료됨";
            } else {
                const remainingMilliseconds = timeLimit - currentTime;
                const days = Math.floor(remainingMilliseconds / (1000 * 60 * 60 * 24));
                const hours = Math.floor((remainingMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let remainingTimeStr = "";
                if (days > 0) {
                    remainingTimeStr += `${days}일 `;
                }
                if (hours > 0) {
                    remainingTimeStr += `${hours}시간 `;
                }
                return `${remainingTimeStr}`;
            }
        }
    },

}
</script>


<style scoped>
.product-image {
    position: relative;
    overflow: hidden;
}

.image-wrapper {
    position: relative;
    width: 100%;
    padding-top: 123.08%;
    background-color: white;
}

.product-image img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
}
</style>