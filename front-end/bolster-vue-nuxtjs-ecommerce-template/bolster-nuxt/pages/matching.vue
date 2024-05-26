<template>
    <div>
        <Menubar />
        <div class="product-layout">
            <!-- 1열: 메인 이미지, 상품 이름, 최근 거래가 -->
            <div class="column main-column">
                <div class="main-image-placeholder"></div>
                <h2 class="product-name">Memories Of 2020 DVD</h2>
                <div class="recent-price-row">
                    <span class="recent-price-text">최근 거래가</span>
                    <span class="recent-price">14,500원</span>
                </div>
            </div>

            <!-- 2열: 서브 이미지 4개 상단정렬 -->
            <div class="column sub-images-column">
                <div class="sub-image-placeholder" v-for="n in 4" :key="n"></div>
            </div>

            <!-- 3열: 제시가, 매칭 히스토리, 새로고침 버튼, 하단 리스트 -->
            <div class="column details-column">
                <div class="buttons-row">
                    <button class="action-button" :class="{ active: currentView === 'bid' }"
                        @click="setActive('bid')">제시가</button>
                    <button class="action-button" :class="{ active: currentView === 'history' }"
                        @click="setActive('history')">매칭 히스토리</button>
                    <button class="action-button-refresh" @click="refresh">새로고침</button>
                </div>

                <div class="price-history" style="height: 600px; width: 750px;">
                    <div class="price-entry" v-for="(entry, index) in priceHistory" :key="index">
                        <span>{{ entry.time }}</span>
                        <span>{{ entry.amount }}</span>
                    </div>
                </div>

                <div class="transaction-buttons">
                    <button class="buy-sell-button">구매하기</button>
                    <button class="buy-sell-button">판매하기</button>
                </div>
            </div>
        </div>
        <div class="product-info">

        </div>
    </div>
</template>
  
  <script>
  export default {
    
    data() {
      return {
        currentView: 'bid',
        priceHistory: [
          // 여기에 실제 가격 데이터를 채워넣으세요.
          { time: '2024.04.10 14:30:25', amount: '25,000원' },
          { time: '2024.04.10 14:30:25', amount: '24,000원' },
          // ...
        ],
      };
    },
    methods: {
      setActive(view) {
        this.currentView = view;
      },
      refresh() {
        // 새로고침 로직 구현
        console.log('Refreshing data...');
      },
    },
  };
  </script>
  
  <style scoped>
  .product-layout {
    justify-content: center;
    align-items: center;
    display: flex;
    align-items: flex-start;
    gap: 20px;
  }
  
  .column {
    display: flex;
    flex-direction: column;
  }
  
  .main-image-placeholder {
    width: 600px;
    height: 600px;
    background-color: #ddd;
    margin-bottom: 10px;
  }
  
  .product-name {
    text-align: left;
    margin-bottom: 10px;
  }
  
  .recent-price-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 600px;
  }
  
  .recent-price-text {
    /* 최근 거래가 텍스트 스타일 */
  }
  
  .recent-price {
    /* 가격 스타일 */
  }
  
  .sub-image-placeholder {
    width: 70px;
    height: 70px;
    background-color: #ddd;
    margin-bottom: 10px;
  }
  
  .buttons-row {
    display: grid;
    grid-template-columns: repeat(3, auto);
    gap: 10px;
    margin-bottom: 10px;
  }
  
  .action-button {
    background-color: #fff;
    color: #000;
    border: 1px solid #ddd;
    padding: 10px;
  }

  .action-button-refresh {
    background-color: #fff;
    color: #000;
    border: 1px solid #ddd;
    padding: 5px;
  }
  
  .action-button.active {
    background-color: #ffb400;
    color: #fff;
  }
  
  .price-history {
    margin-bottom: 10px;
    overflow: auto; /* 스크롤바 추가 */
  }
  
  .price-entry {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }
  
  .transaction-buttons {
    display: grid;
    grid-template-columns: repeat(2, auto);
    gap: 10px;
  }
  
  .buy-sell-button {
    padding: 10px;
    border: 1px solid #ddd;
    background-color: #fff;
    color: #000;
    cursor: pointer;
  }
  
  .buy-sell-button:hover {
    background-color: #eee;
  }
  
  </style>
  