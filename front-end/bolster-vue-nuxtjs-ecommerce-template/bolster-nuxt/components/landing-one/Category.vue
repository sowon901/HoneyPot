<template>
  <div>
      <!-- Start Trending Products Area -->
      <div class="container" v-if="serialNumber">
            <div class="section-title">  
                <span style="padding-right: 10px"><b>관심 상품 추천</b></span>    
            </div>
          <div class="btn-category">
              <button class="category" v-for="(idol, index) in idols" :key="index" @click="filterByIdol(idol.idolName)"
                  :class="{ active: idol.idolName === selectedIdol }">{{idol.idolName}}</button>
          </div>

          <div class="row">
              <div class="col-md-3" v-for="(product, index) in filteredProducts.slice(0,4)" :key="index">
                  <ProductItem v-if="!loading" :product="product"></ProductItem>
                  <div v-else class="spinner"></div> <!-- 로딩 중일 때 스피너 표시 -->
              </div>
          </div>
      </div>
      <!-- End Trending Products Area -->
      <QuickView />
  </div>
</template>

<script>
import ProductItem from './ProductItemMain'
import axios from 'axios';

export default {
  components: {
      ProductItem,
  },
  props: {
    serialNumber: {
      type: String,
      required: true
    }
  },
  data() {
      return {
          selectedIdol: null,
          idols: [],
          products: [],
          loading: false, // 로딩 상태 추가
      };
  },
  methods: {
      toggle() {
          mutations.toggleQuickView()
      },
      filterByIdol(idol) {
          this.selectedIdol = idol;
          this.fetchProductData(idol);
      },
      fetchIdolData() {
          axios.get(`http://10.0.11.7:8080/index/filterCategoryIdolName/${this.serialNumber}`)
          .then(response => {
              this.idols = response.data; 
              if (this.idols.length > 0) {
                  this.selectedIdol = this.idols[0].idolName;
                  this.fetchProductData(this.selectedIdol);
              }
          })
          .catch(error => {
              console.error('Error fetching data:', error);
          });
      },
      fetchProductData(idolName) {
          this.loading = true; // 데이터 로딩 시작
          axios.get(`http://10.0.11.7:8080/index/filterByCategory/${idolName}`)
          .then(response => {
              this.products = response.data; 
              this.loading = false; // 데이터 로딩 완료
              console.log("successMain", this.products);
          })
          .catch(error => {
              this.loading = false; // 에러 발생 시 로딩 완료 상태로 변경
              console.error('Error fetching data:', error);
          });
      },
  },
  computed: {
      filteredProducts() {
          if (!this.selectedIdol) return this.products;
          return this.products.filter(product => product.idolName === this.selectedIdol);
      },
  },
  watch: {
    serialNumber(newVal, oldVal) {
      // serialNumber props 값이 변경될 때마다 호출되는 함수
      this.fetchIdolData();
    }
  }
}
</script>

<style scoped>
.section-title {
  display:flex;
  margin-top:50px;
  justify-content: center;
  text-align: center;
}
.container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align:center;
}
.btn-category {
  height: 50px;
  margin-bottom: 15px;
}
.category {
  margin-right: 10px;
  background-color: white;
  color: black;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-color: #ffb400; 
  border-width: 1px; 
  border-style: solid; 
  border-radius: 50px; 
  margin-bottom: 30px;
  width: 150px;
  text-align:center;
  align-items:center;
  transition: background-color 0.3s, box-shadow 0.3s;
}
.btn-category button:hover {
  border-width: 3px; 
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  font-weight: bold;
}
.active {
  background-color: #ffb400;
  color: white;
  font-weight: bold;
}

.section-title {
    display:flex;
    margin-top:50px;
    justify-content: center;
    text-align: center;
    font-style: bold;
    font-size: 20px;
    color: #ffb400;
}

.row {
  height: 400px;
}

.spinner {
  border: 8px solid #ffb400; /* Light grey */
  border-top: 8px solid #ffb400; /* Blue */
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 2s linear infinite;
  margin: auto; /* Center the spinner */
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
