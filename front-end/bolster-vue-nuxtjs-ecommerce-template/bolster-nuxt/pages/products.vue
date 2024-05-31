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
    <div class="interests">
      <h5>Idol</h5>
      <div class="buttons-container">
        <button v-for="tag in tags" :key="tag" :class="{ 'selected': selectedTags.includes(tag) }"
          @click="toggleTag(tag)">
          {{ tag }}
        </button>
      </div>
    </div>
    <div class="categories">
      <h5>Product</h5>
      <div class="buttons-container">
        <button v-for="category in categories" :key="category"
          :class="{ 'selected': selectedCategories.includes(category) }" @click="toggleCategory(category)">
          {{ category }}
        </button>
      </div>
    </div>
    <div class="row">
      <!-- 필터링된 상품 목록을 보여주는 부분 -->
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
import axios from 'axios';

export default {
  components: {
    ProductItem,
  },
  computed: {
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
      // return this.products.slice(startIndex, endIndex);
      // 필터링된 상품 목록의 일부만 가져오도록 수정합니다.
      return this.filteredProducts.slice(this.startIndex - 1, this.endIndex);
    },
    totalPages() {
      return Math.ceil(this.totalProducts / this.itemsPerPage);
    },
    // 선택된 태그로 필터링된 상품 목록을 반환하는 computed 속성
    filteredProducts() {
      let filtered = this.products;

      if (this.selectedTags.length > 0) {
        filtered = filtered.filter(product => this.selectedTags.includes(product.idolName));
      }

      if (this.selectedCategories.length > 0) {
        filtered = filtered.filter(product => this.selectedCategories.includes(product.ptypeName));
      }
      if (this.searchQuery) {
        filtered = filtered.filter(product =>
                product.productName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                product.productInfo.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
      }


      return filtered;
    },
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 40,
      selectedSorting: this.$route.query.sort || '1',
      tags: ['AESPA', 'BLACKPINK', 'BOYNEXTDOOR', 'BTS', 'ENHYPEN', 'EXO', 'GIRLSRENERATION', 'ITZY', 'LESSERAFIM', 'NCT', 'NEWJEANS', 'NMIXX', 'FROMIS_9', 'RIIZE', 'STRAYKIDS', 'SEVENTEEN', 'SHINEE', 'SUPERJUNIOR', 'TXT', 'TWICE', 'WINNER'],
      selectedTags: [],
      categories: ["Photo", "Official Fanlight", "Fashion", "Acc", "Stationery", "DVD", "Music", "Living"],
      selectedCategories: [],
      products: [],
      searchQuery: this.$route.query.search || '', // 검색어 저장
    };
  },
  methods: {
    changePage(pageNumber) {
      this.currentPage = pageNumber;
    },
    sortProducts() {
      // 현재 시간
      const now = new Date();

      switch (this.selectedSorting) {
        case '1': // 최신순
          this.products.sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate));
          break;
        case '2': // 조회순
          this.products.sort((a, b) => b.view - a.view);
          break;
        case '3': // 마감 임박순
          this.products.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
          break;
        default:
          // 기본적으로는 최신순으로 정렬합니다.
          this.products.sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate));
      }

      // 경매 종료된 상품을 맨 뒤로 이동
      this.products.sort((a, b) => {
        const aDeadline = new Date(a.deadline);
        const bDeadline = new Date(b.deadline);
        const aIsExpired = aDeadline < now;
        const bIsExpired = bDeadline < now;

        if (aIsExpired && !bIsExpired) {
          return 1;
        } else if (!aIsExpired && bIsExpired) {
          return -1;
        } else {
          return 0;
        }
      });
    },
    toggleTag(tag) {
      const index = this.selectedTags.indexOf(tag);
      if (index >= 0) {
        // 이미 선택된 태그인 경우 선택을 해제합니다.
        this.selectedTags.splice(index, 1);
      } else {
        // 선택된 태그가 없으면 선택한 태그로 설정합니다.
        if (this.selectedTags.length === 0) {
          this.selectedTags.push(tag);
        } else {
          // 이미 선택된 태그가 있으면 첫 번째 것을 교체합니다.
          this.selectedTags.splice(0, 1, tag);
        }
      }
    },
    toggleCategory(category) {
      const index = this.selectedCategories.indexOf(category);
      if (index >= 0) {
        this.selectedCategories.splice(index, 1);
      } else {
        this.selectedCategories.push(category);
      }
    },
    fetchProducts() {
      axios.get("http://localhost:8080/products")
        .then(response => {
          this.products = response.data;
          this.sortProducts(); // 상품을 받아온 후 정렬을 수행
          console.log(this.products);
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    },
    updateSearchQuery(newQuery) {
      this.searchQuery = newQuery;
    }
  },
  mounted() {
    this.fetchProducts();
    // this.searchQuery = ''; // URL에서 검색어를 가져옴
  },
  watch: {
    '$route.query.search'(newSearchQuery) {
      this.searchQuery = newSearchQuery || '';
      this.fetchProducts();
    },
    '$route.query.sort'(newSort) {
        this.selectedSorting = newSort || '1';
        this.sortPorudcts();
    }
  }
};
</script>

<style scoped>
.interests,
.categories {
  margin-top: 20px;
  margin-bottom: 20px;
}

.buttons-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.interests button,
.categories button {
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  cursor: pointer;
  background-color: white;
  color: black;
}

.interests .selected,
.categories .selected {
  background-color: #ffb400;
  color: white;
}
</style>
