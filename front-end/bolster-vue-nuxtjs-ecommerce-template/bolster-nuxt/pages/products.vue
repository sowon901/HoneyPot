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
      <button v-for="tag in tags" :key="tag" :class="{ 'selected': selectedTags.includes(tag) }"
        @click="toggleTag(tag)">
        {{ tag }}
      </button>
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
      // 선택된 태그가 없을 때는 모든 상품을 반환합니다.
      if (this.selectedTags.length === 0) {
        return this.products;
      } else {
        // 선택된 태그로 필터링된 상품 목록을 반환합니다.
        return this.products.filter(product => this.selectedTags.includes(product.idolName));
      }
    },
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 4,
      selectedSorting: '1',
      tags: ['AESPA','BLACKPINK','BOYNEXTDOOR', 'BTS', 'ENHYPEN', 'EXO','GIRLSRENERATION','ITZY','LESSERAFIM','NCT','NEWJEANS','NMIXX','FROMIS_9','RIIZE','STRAYKIDS','SEVENTEEN', 'SHINEE','SUPERJUNIOR','TXT','TWICE','WINNER'],
      selectedTags: [],
      products: [],
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

  },
  mounted() {
    // 컴포넌트가 마운트된 후에 서버에서 제품 목록을 가져오는 HTTP GET 요청을 수행
    axios.get("http://localhost:8080/products")
      .then(response => {
        console.log("success");
        console.log(response.data);
        this.products = response.data; // 받은 데이터를 컴포넌트의 products 데이터에 저장

      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  },
};
</script>

<style scoped>
.interests {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.interests button {
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  cursor: pointer;
  background-color: white;
  color: black;
}

.interests .selected {
  background-color: #ffb400;
  color: white;
}
</style>
