<template>
  <div class="container">
    <div class="wrapper">
      <div class="content">
        <div class="sidebar">
          <Sidebar />
        </div>
        <div class="stock-request">
          <div class="header">
            <h4>상품 등록</h4>
          </div>
          <hr class="section-divider" />
          <form @submit.prevent="submitForm">
            <div class="inline-control">
              <label for="productName">상품명:</label>
              <input type="text" id="productName" v-model="product.name" required>
            </div>
            <div class="price-control">
              <label for="priceUnit">호가 단위:</label>
              <button type="button" @click="decrementPriceUnit">-</button>
              <input id="priceUnit" type="number" v-model.number="product.priceUnit">
              <button type="button" @click="incrementPriceUnit">+</button>
            </div>
            <!-- <div class="price-control">
              <label for="buyNow">즉시 구매가:</label>
              <button type="button" @click="decrementBuyNow">-</button>
              <input id="buyNow" type="number" v-model.number="product.buyNowPrice">
              <button type="button" @click="incrementBuyNow">+</button>
            </div> -->
            <div class="price-control">
              <label for="startingBid">경매 시작가:</label>
              <button type="button" @click="decrementStartingBid">-</button>
              <input id="startingBid" type="number" v-model.number="product.startingBid">
              <button type="button" @click="incrementStartingBid">+</button>
            </div>
            <div class="auction-time-control">
              <label for="auctionDays">경매 일수:</label>
              <select id="auctionDays" v-model.number="auctionDays">
                <option v-for="n in 21" :key="n" :value="n">{{ n }}일</option>
              </select>
              <label for="auctionHours" class="auction-hours-label">경매 시간:</label>
              <select id="auctionHours" v-model.number="auctionHours">
                <option v-for="n in 24" :key="n-1" :value="n-1">{{ n-1 }}시간</option>
              </select>
            </div>

            <hr class="section-divider" />

            <div class="categories">
              <label>카테고리 선택:</label>
              <button v-for="(category, index) in categories" :key="category"
                :class="{ selected: selectedCategory === index + 1 }" @click.prevent="selectCategory(index + 1)">
                {{ category }}
              </button>
            </div>

            <hr class="section-divider" />

            <div class="interests">
              <label>아이돌 선택:</label>
              <button v-for="(tag, index) in tags" :key="tag" :class="{ selected: selectedTag === index + 1 }" @click.prevent="selectTag(index + 1)">
                {{ tag }}
              </button>
            </div>

            <hr class="section-divider" />

            <div class="image-upload-header">
              <label>이미지 업로드:</label>
              <button type="button" @click="addImage" v-if="images.length < 5">+ 추가</button>
            </div>
            <div class="image-upload-list">
              <div v-for="(image, index) in images" :key="index" class="image-upload-control">
                <input :key="imageKeys[index]" type="file" @change="onFileChange($event, index)" accept="image/*">
                <button type="button" v-if="image" @click="cancelImageUpload(index)">x</button>
              </div>
            </div>

            <div>
              <label>상품 상세 설명:</label>
              <client-only>
                <Editor 
                  api-key="bxo41dc5dxyisscks24w4z5z8j8rnp1ox7245kjjvz6kq2ni"
                  :init="editorConfig"
                  v-model="product.description"/>
              </client-only>            
            </div>
            <button type="submit">상품 등록</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api';
import Sidebar from '../components/all-products/Sidebar';
import Editor from '@tinymce/tinymce-vue';
import axios from 'axios';
import { mapState, mapActions } from 'vuex';

export default defineComponent({
  components: { 
    Sidebar,
    Editor
  },
  data() {
    return {
      product: {
        name: "",
        buyNowPrice: 0,
        startingBid: 0,
        priceUnit: 0,
        description: "",
      },
      images: ["", ""],
      imageKeys: [0, 0, 0, 0, 0],
      auctionDays: 0,
      auctionHours: 0,
      categories: ["Photo","Official Fanlight","Fashion","Acc","Stationery","DVD","Music","Living"],
      tags: ['AESPA','BLACKPINK','BOYNEXTDOOR', 'BTS', 'ENHYPEN', 'EXO','GIRLSRENERATION','ITZY','LESSERAFIM','NCT','NEWJEANS','NMIXX','FROMIS_9','RIIZE','STRAYKIDS','SEVENTEEN', 'SHINEE','SUPERJUNIOR','TXT','TWICE','WINNER','OTHERS'],
      selectedCategory: null,
      selectedTag: null,
      editorConfig: {
        toolbar_mode: 'sliding',
        plugins: 'paste image',
        toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | image',
        paste_data_images: true,
        file_picker_types: 'image',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        mergetags_list: [
          { value: 'First.Name', title: 'First Name' },
          { value: 'Email', title: 'Email' },
        ],
        images_upload_handler(blobInfo, success, failure) {
          console.log('images_upload_handler called');
          const file = new File([blobInfo.blob()], blobInfo.filename());
          const fileName = blobInfo.filename();
          console.log('File:', file);
          console.log('FileName:', fileName);

          if (fileName.includes('blobid')) {
            success(URL.createObjectURL(file));
          } else {
            success(URL.createObjectURL(file));
          }
        },
        content_style: 'img { max-width: 100%; height: auto; }',
        height: 500,
        width: '100%',
        setup: (editor) => {
          const self = this;
          editor.on('init', () => {
            console.log('Editor init event');
            editor.setContent(self.product.description || '');
          });

          editor.on('change keyup', () => {
            console.log('Editor change or keyup event');
            const content = editor.getContent();
            console.log('Editor content:', content);
            self.product.description = content;
          });
        }
      }
    };
  },
  async mounted() {
    const accessToken = sessionStorage.getItem('JWT_TOKEN');
    const accessTokenExpiration = sessionStorage.getItem('ACCESS_TOKEN_EXPIRATION');
    const serialNumber = sessionStorage.getItem('serialNumber');

    console.log('Access Token:', accessToken);
    console.log('Access Token Expiration:', accessTokenExpiration);
    console.log('Serial Number:', serialNumber);

    if (new Date(accessTokenExpiration) <= new Date()) {
      console.log('Access Token is expired. Need to refresh token.');
      try {
        await this.refreshAccessToken();
      } catch (error) {
        console.error('Failed to refresh access token:', error);
        this.redirectToLogin();
        return;
      }
    }
    await this.fetchProfile();
  },

  computed: {
    ...mapState(['user', 'serialNumber', 'isLoggedIn']),
  },
  methods: {
    ...mapActions(['refreshAccessToken', 'fetchProfile']),
    redirectToLogin() {
        alert('로그인이 필요합니다.');
        this.$router.push({ path: '/login' });
    },
  
    submitForm() {
      console.log('submitForm called');
      console.log('Product description:', this.product.description);

      if (!this.product.name) {
        alert("Product name is required");
        console.log('Product name is required');
        return;
      }
      if (!this.product.priceUnit) {
        alert("Price unit is required");
        console.log('Price unit is required');
        return;
      }
      // if (!this.product.buyNowPrice) {
      //   alert("Buy now price is required");
      //   console.log('Buy now price is required');
      //   return;
      // }
      if (!this.product.startingBid) {
        alert("Starting bid is required");
        console.log('Starting bid is required');
        return;
      }
      if (!this.product.description) {
        alert("Product description is required");
        console.log('Product description is required');
        return;
      }

      const formData = new FormData();
      formData.append("productName", this.product.name);
      formData.append("priceUnit", this.product.priceUnit);
      formData.append("buyNow", 0);
      formData.append("startPrice", this.product.startingBid);
      formData.append("productInfo", this.product.description);
      formData.append("auctionDays", this.auctionDays);
      formData.append("auctionHours", this.auctionHours);
      formData.append("categoryName", this.selectedCategory);
      formData.append("tagName", this.selectedTag);
      this.images.forEach((image, index) => {
        if (image) {
          formData.append(`image${index + 1}`, image);
          console.log(`Image ${index + 1} added to formData:`, image);
        }
      });
    formData.append("serialNumber", this.serialNumber);

      formData.forEach((value, key) => {
        console.log('FormData key-value pair:', key, value);
      });

      axios
        .post('http://localhost:8080/mypage-stock', formData, {
          headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('JWT_TOKEN')}`,
                    'Content-Type': 'multipart/form-data'
                }
        })
        .then((response) => {
          console.log("Product registered successfully:", response.data);
          alert("Product registered successfully");
          window.location.reload(); // 등록 성공 후 페이지 새로고침
        })
        .catch((error) => {
          console.error("Registration failed:", error);
          if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
            console.error("Response headers:", error.response.headers);
          } else if (error.request) {
            console.error("Request data:", error.request);
          } else {
            console.error("Error message:", error.message);
          }
          alert("Failed to register product");
        });
    },
    onFileChange(event, index) {
      console.log('onFileChange called for index:', index);
      const file = event.target.files[0];
      if (file) {
        this.images.splice(index, 1, file);
        console.log(`File at index ${index} updated:`, file);
      } else {
        this.images.splice(index, 1, "");
        console.log(`File at index ${index} cleared`);
      }
    },
    addImage() {
      console.log('addImage called');
      if (this.images.length < 5) {
        this.images.push("");
        console.log('Image slot added');
      }
    },
    cancelImageUpload(index) {
      console.log('cancelImageUpload called for index:', index);
      this.$set(this.images, index, "");
      this.imageKeys[index]++;
      console.log(`Image upload cancelled for index ${index}`);
    },
    incrementBuyNow() {
      console.log('incrementBuyNow called');
      this.product.buyNowPrice += 1000;
      console.log('Buy now price incremented to:', this.product.buyNowPrice);
    },
    decrementBuyNow() {
      console.log('decrementBuyNow called');
      this.product.buyNowPrice = Math.max(0, this.product.buyNowPrice - 1000);
      console.log('Buy now price decremented to:', this.product.buyNowPrice);
    },
    incrementStartingBid() {
      console.log('incrementStartingBid called');
      this.product.startingBid += 1000;
      console.log('Starting bid incremented to:', this.product.startingBid);
    },
    decrementStartingBid() {
      console.log('decrementStartingBid called');
      this.product.startingBid = Math.max(0, this.product.startingBid - 1000);
      console.log('Starting bid decremented to:', this.product.startingBid);
    },
    incrementPriceUnit() {
      console.log('incrementPriceUnit called');
      this.product.priceUnit += 1000;
      console.log('Price unit incremented to:', this.product.priceUnit);
    },
    decrementPriceUnit() {
      console.log('decrementPriceUnit called');
      this.product.priceUnit = Math.max(0, this.product.priceUnit - 1000);
      console.log('Price unit decremented to:', this.product.priceUnit);
    },
    selectCategory(category) {
      console.log('selectCategory called with:', category);
      this.selectedCategory = this.selectedCategory === category ? null : category;
    },
    selectTag(tag) {
      console.log('selectTag called with:', tag);
      this.selectedTag = this.selectedTag === tag ? null : tag;
    },
  }
});
</script>

<style scoped>
.wrapper .content {
  display: flex;
  width: 100%;
  padding-top: 100px;
}

.sidebar {
  flex: 1;
}

.section-divider {
  margin-top: 17px;
  border: 1px #ccc;
}

.stock-request {
  flex: 3;
  padding: 5px;
}

button {
  background-color: white;
  color: black;
  border: 1px solid #ccc;
  padding: 5px 15px;
  margin: 5px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 15px;
}

button:hover {
  background-color: #f0f0f0;
}

input[type="text"], input[type="number"], input[type="file"] {
  width: 100%;
  padding: 8px;
  margin: 5px 0;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
}

label {
  margin: 10px 0;
  display: block;
  font-weight: bold;
  font-size: medium;
}

textarea {
  width: 100%;
  height: 150px;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.inline-control {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.inline-control label, .image-upload-control label {
  white-space: nowrap;
  margin-right: 10px;
}

.image-upload-header {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.image-upload-list {
  display: flex;
  flex-direction: column;
}

.image-upload-control {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 5px;
}

.image-upload-control input[type="file"] {
  flex-grow: 1;
  margin-right: 10px;
}

.price-control {
  display: flex;
  align-items: center;
  justify-content: start;
}

.price-control label {
  white-space: nowrap;
  margin-right: 10px;
}

.price-control input[type="number"] {
  flex-grow: 1;
  width: 60%;
  margin: 0 5px;
}

.stock-request button[type="submit"] {
  background-color: #ffb400;
  color: white;
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
}
.auction-time-control {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  
}

.auction-time-control label {
  white-space: nowrap;
  margin-right: 10px;
}

.auction-time-control .auction-hours-label {
  margin-left: 20px; /* Add margin to the left to create space between the dropdowns */
}

.auction-time-control select {
  width: 100px;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.categories, .interests {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}

.categories label, .interests label {
  margin-right: 10px;
  font-weight: bold;
}

.categories button, .interests button {
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  cursor: pointer;
  background-color: white;
  color: black;
}

.categories .selected, .interests .selected {
  background-color: #ffb400;
  color: white;
}


.interests {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}

.interests label {
  margin-right: 10px;
  font-weight: bold;
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