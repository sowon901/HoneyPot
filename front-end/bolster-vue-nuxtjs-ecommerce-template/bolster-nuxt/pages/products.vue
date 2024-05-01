<template>
  <div class="container">
    <div class="section-title">
      <h2>경매 목록</h2>
    </div>
    <div class="products-filter-options">
      <div class="row align-items-center">
        <div class="col d-flex">
          <p> 전체 {{ totalProducts }}개 중 {{ startIndex }} - {{ endIndex }}개 상품 표시 </p>
        </div>

        <div class="col d-flex">
          <div class="products-ordering-list">
            <select v-model="selectedSorting" @change="sortProducts">
              <option value="1">최신순</option>
              <option value="2">조회순</option>
              <option value="3">마감 임박순</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <ProductItem v-for="(product, index) in displayedProducts" :product="product" :key="index"
        :className="`col-lg-3 col-md-6 col-sm-6`"></ProductItem>
    </div>
    <nav class="woocommerce-pagination">
      <ul>
        <li v-for="pageNumber in totalPages" :key="pageNumber">
          <a href="#" class="page-numbers" @click="changePage(pageNumber)">{{ pageNumber }}</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import ProductItem from '../components/landing-one/ProductItem'

export default {
  components: {
    ProductItem,
  },
  computed: {
    products() {
      return this.$store.state.products.all;
    },
    totalProducts() {
      return this.products.length;
    },
    startIndex() {
      return (this.currentPage - 1) * this.itemsPerPage + 1;
    },
    endIndex() {
      return Math.min(this.currentPage * this.itemsPerPage, this.totalProducts);
    },
    displayedProducts() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = Math.min(startIndex + this.itemsPerPage, this.totalProducts);
      return this.products.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.totalProducts / this.itemsPerPage);
    },
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 40,
      selectedSorting: '1'
    };
  },
  methods: {
    changePage(pageNumber) {
      this.currentPage = pageNumber;
    },
    sortProducts() {
      switch (this.selectedSorting) {
        case '1': // 최신순
          this.products.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
        case '2': // 조회순
          this.products.sort((a, b) => b.views - a.views);
          break;
        case '3': // 마감 임박순
          this.products.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
          break;
        default:
          // 기본적으로는 최신순으로 정렬합니다.
          this.products.sort((a, b) => new Date(b.date) - new Date(a.date));
      }
    },
  },
}
</script>