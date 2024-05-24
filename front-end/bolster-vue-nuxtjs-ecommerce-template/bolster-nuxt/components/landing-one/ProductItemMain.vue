<template>
    <div class="single-product-box">
        <div class="product-image">
            <nuxt-link :to="`/bid-details/${product.productId}`">
                <div class="image-container">
                    <img :src="product.image1" :alt="product.productName" />
                </div>
            </nuxt-link>
        </div>
        <div class="product-content">
            <div class="main_description">
                <div class="idol_name">
                    <!-- 아이돌 명 -->
                    {{ product.idolName }}
                </div>
                <div class="product_type">
                    <!-- 상품 타입 -->
                    {{ product.ptypeName }}
                </div>
            </div>
            <h3>
                <nuxt-link :to="`/bid-details/${product.productId}`">
                    <b>{{ product.productName }}</b>
                </nuxt-link>
            </h3>
            <div class="product-price">
                <span class="new-price">{{ product.price }}원</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProductItem',
    props: ['product', 'className'],
    methods: {
        quickView(e) {
            this.$emit('clicked')
        }
    }
}
</script>

<style scoped>
.single-product-box {
    width: 270px; /* 고정된 너비 (4개씩 배치) */
    height: 450px; /* 고정된 높이 */
    box-sizing: border-box;
    padding: 10px;
    margin-bottom: 20px; /* 아래쪽 간격 추가 */
    display: flex;
    flex-direction: column;
    align-items: center;
}

.product-image {
    width: 100%;
    height: 270px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background-color: #f5f5f5; /* 이미지가 없을 때 표시할 배경색 */
}

.product-content {
    text-align: left;
    width: 100%;
    flex-grow: 1;
    padding-left: 10px; /* 좌측 여백 추가 */
    padding-right: 10px; /* 우측 여백 추가 */
}

.image-container {
    width: 100%;
    height: 100%; /* 부모의 높이에 맞춤 */
    position: relative;
    overflow: hidden;
}

.image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* 이미지를 컨테이너에 맞게 채우면서 자르기 */
}
.main_description {
    display: flex;
    justify-content: space-between;
}
</style>
