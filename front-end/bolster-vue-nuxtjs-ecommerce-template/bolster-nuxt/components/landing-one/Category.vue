<template>
  <div>
      <!-- Start Trending Products Area -->
      <div class="container">
          <div class="btn-category">
              <button class="category" v-for="(idol, index) in idols" :key="index" @click="filterByIdol(idol.idolName)"
                  :class="{ active: idol.idolName === selectedIdol }">{{idol.idolName}}</button>
          </div>

          <div class="row">
              <div class="col-md-3" v-for="(product, index) in filteredProducts.slice(0,4)" :key="index">
                  <ProductItem :product="product"></ProductItem>
              </div>
          </div>
      </div>
      <!-- End Trending Products Area -->
      <QuckView />
  </div>
</template>

<script>
import QuckView from '../modals/QuckView'
import ProductItem from './ProductItemMain'
import axios from 'axios';

export default {
  components: {
      QuckView,
      ProductItem,
  },
  data() {
      return {
          selectedIdol: null,
          idols: [],
          products: [],
          serialNumber: '123456789',
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
          const serialNumber = "123456789";
          axios.get(`http://localhost:8080/filterCategoryIdolName/${serialNumber}`)
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
          axios.get(`http://localhost:8080/filterByCategory/${idolName}`)
          .then(response => {
              this.products = response.data; 
              console.log("successMain", this.products);
          })
          .catch(error => {
              console.error('Error fetching data:', error);
          });
      },
  },
  computed: {
      products() {
          return this.$store.state.products.all.filter(
              (product) => product.trending === true
          )
      },
      filteredProducts() {
          if (!this.selectedIdol) return this.products;
          return this.products.filter(product => product.idolName === this.selectedIdol);
      },
  },
  mounted() {
      this.fetchIdolData();
  },
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
</style>
