<template>
    <div class="recent-orders-box">
        <div class="title">
            <h3>
                "승인"(입고 승인) 및 "최종 승인"(사이트에 상품등록) 대기 상품들 (PENDING, PROCESSING 상태인 상품들)
            </h3><br>
            <strong><span class="explain-title">승인 상태</span><br></strong>
            <span>PENDING : <strong>"거절"</strong> 혹은 <strong>"승인"</strong> 으로 입고 거절, 혹은 입고 승인 처리를 받도록 기다리는 상태</span><br>
            <span>PROCESSING : <strong>"승인"</strong> 후 beeSpring 창고에 입고되고 있는 상태</span><br>
            <span>DECLINED : <strong>"거절"</strong>하면 변경되는 상태</span><br>
            <span>READY : 창고에 입고 된 상품을 사이트에 등록하도록 <strong>"최종 승인"</strong>하면 변경되는 상태</span><br>
        </div>
        <br>
        <ul class="order-list">
            <li v-for="(item, index) in productData" :key="index">
                <div class="list-header">
                    <span>{{ item.serialNumber }}의 입고요청</span>
                    <button class="btn-view" @click="toggleItem(index)">보기</button>
                </div>
                <div v-if="item.isExpanded" class="list-content">
                    <table class="table">
                        <thead>
                        <tr>
                            <th>이미지1</th>
                            <th>이미지2</th>
                            <th>이미지3</th>
                            <th>이미지4</th>
                            <th>이미지5</th>
                        </tr>
                        </thead>
                        <tbody>
                        <OrderImages :item="item"/>
                        </tbody>
                    </table>
                    <table class="table">
                        <thead>
                        <tr>
                            <th>상품명</th>
                            <th>호가 단위</th>
                            <th>경매 시작가</th>
                            <th>경매 시간</th>
                            <th>카테고리</th>
                            <th>아이돌</th>
                            <th>상품 상세 설명</th>
                            <th>승인 상태</th>
                            <th>작업</th>
                        </tr>
                        </thead>
                        <tbody>
                        <OrderItem
                            :item="item"
                            @approve="approveItem"
                            @decline="declineItem"
                            @finalApprove="finalApproveItem"
                        />
                        </tbody>
                    </table>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';
import OrderItem from './OrderItem.vue';
import OrderImages from './OrderImages.vue';

export default {
    components: {
        OrderItem,
        OrderImages,
    },
    data() {
        return {
            productData: [],
        };
    },
    methods: {
        async fetchData() {
            try {
                const response = await axios.get('http://localhost:8080/admin/pending-processing-products');
                this.productData = response.data.map(item => ({
                    ...item,
                    images: [item.image1, item.image2, item.image3, item.image4, item.image5].filter(Boolean),
                    items: item.items || [],
                    isExpanded: false, // Initialize isExpanded property for toggle functionality
                }));
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        },
        toggleItem(index) {
            this.productData[index].isExpanded = !this.productData[index].isExpanded;
        },
        async approveItem(item) {
            try {
                await axios.post('http://localhost:8080/admin/approve-product', {productId: item.productId}, {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('JWT_TOKEN')}`
                    }
                });
                alert('상품이 승인되었습니다.');
                this.fetchData();
            } catch (error) {
                console.error('Error approving product:', error);
            }
        },
        async finalApproveItem(item) {
            try {
                await axios.post('http://localhost:8080/admin/final-approve-product', {productId: item.productId}), {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('JWT_TOKEN')}`
                    }
                };
                alert('상품이 최종 승인되었습니다.');
                this.fetchData();
            } catch (error) {
                console.error('Error finally approving product:', error);
            }
        },
        async declineItem(item, reason) {
            try {
                await axios.post('http://localhost:8080/admin/decline-product', {
                    productId: item.productId,
                    serialNumber: item.serialNumber,
                    declineReason: reason,
                }, {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('JWT_TOKEN')}`
                    }
                });
                alert('상품이 거절되었습니다.');
                this.fetchData();
            } catch (error) {
                console.error('Error declining product:', error);
            }
        },
        confirmDecline(reason) {
            this.$emit('decline', this.item, reason);
        },
    },
    mounted() {
        this.fetchData();
    },
};
</script>

<style scoped>
.recent-orders-box {
    margin-top: 30px;
}

.title h3 {
    margin-bottom: 15px;
    font-size: 20px;
    font-weight: 600;
}

.order-list {
    list-style-type: none;
    padding: 0;
}

.list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #f8f9fa;
    border: 1px solid #ddd;
    margin-bottom: 5px;
}

.list-header h4 {
    margin: 0;
}

.list-content {
    padding: 10px;
    border: 1px solid #ddd;
    border-top: none;
}

.table {
    width: 100%;
    margin-bottom: 1rem;
    background-color: transparent;
}

.img-column {
    width: 100px;
}

.order-image {
    max-width: 80px;
    height: auto;
}

th, td {
    white-space: nowrap;
    text-align: center;
}

.btn-view {
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn-view:hover {
    background-color: #0056b3;
}

</style>
