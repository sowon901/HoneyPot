<template>
  <div class="container">
      <div class="main-layout" style="text-align: center;">
          <Banner></Banner>
          <!-- <Category></Category> -->

          <div class="products">


            <div class="user-idol">
              <div class="section-title">  
                <span style="padding-right: 10px"><b>관심 상품 추천</b></span>    
              </div>   
              <Category></Category>
            </div>

            <div class="latest-products">
              <div class="section-title-filter">
                <button class="category">
                  <nuxt-link to="/products" class="category-link">
                    <span style="padding-right: 10px">최신 등록 상품</span>
                    <i class='fa fa-arrow-right'></i>
                  </nuxt-link>
                </button>            
              </div>   
                <LatestProducts></LatestProducts>
            </div>

            <div class="best-sellers">
              <div class="section-title-filter">
                <button class="category">
                  <nuxt-link to="/products" class="category-link">
                    <span style="padding-right: 10px">인기 상품</span>
                    <i class='fas fa-arrow-right'></i>
                  </nuxt-link>
                </button>            
              </div>
              <BestSellers></BestSellers>
            </div>

            <div class = "deadline">
              <div class="section-title-filter">
                <button class="category">
                  <nuxt-link to="/products" class="category-link">
                    <span style="padding-right: 10px">마감 임박 상품</span>
                    <i class='fas fa-arrow-right'></i>
                  </nuxt-link>
                </button>            
              </div>
              <DeadlineProducts></DeadlineProducts>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import TopHeader from '../layouts/TopHeader'
import Menubar from '../layouts/Menubar'
import Banner from '../components/landing-one/Banner';
import LatestProducts from '../components/landing-one/LatestProducts';
import DeadlineProducts from '../components/landing-one/DeadlineProducts.vue';
import BestSellers from '../components/landing-one/BestSellers.vue';
import Category from '../components/landing-one/Category.vue';
import axios from 'axios';
import apiClient from '../api/apiClient'; // apiClient를 가져옵니다

export default {
  components: {
      TopHeader, Menubar, Banner, LatestProducts,
      BestSellers, DeadlineProducts, Category,
  },
  data() {
      return {
          category: "latest"
      }
  },
  methods: {
        async refreshAccessToken() {
            const refreshToken = sessionStorage.getItem('REFRESH_TOKEN');

            try {
                const response = await apiClient.post('/auth/refresh', {refreshToken});
                const newAccessToken = response.data.accessToken;
                const newAccessTokenExpiration = response.data.accessTokenExpiration;

                sessionStorage.setItem('JWT_TOKEN', newAccessToken);
                sessionStorage.setItem('ACCESS_TOKEN_EXPIRATION', newAccessTokenExpiration);

                console.log('Access Token refreshed successfully:', newAccessToken);
            } catch (error) {
                console.error('Failed to refresh access token:', error);
                // 필요한 경우 사용자를 로그인 페이지로 리디렉션하거나, 에러 메시지를 표시합니다.
            }
        },
     
  },
  async mounted() {
    // 컴포넌트가 마운트된 후에 서버에서 제품 목록을 가져오는 HTTP GET 요청을 수행
    // axios.get("http://localhost:8080/")
    //   .then(response => {
    //     console.log("success");
    //     console.log(response.data);
    //     this.products = response.data; // 받은 데이터를 컴포넌트의 products 데이터에 저장

    //   })
    //   .catch(error => {
    //     console.error('Error fetching products:', error);
    //   });
        // 페이지가 로드될 때 세션 스토리지에서 토큰 정보를 가져옵니다.
        const accessToken = sessionStorage.getItem('JWT_TOKEN');
        const refreshToken = sessionStorage.getItem('REFRESH_TOKEN');
        const accessTokenExpiration = sessionStorage.getItem('ACCESS_TOKEN_EXPIRATION');
        const refreshTokenExpiration = sessionStorage.getItem('REFRESH_TOKEN_EXPIRATION');

        console.log('Access Token:', accessToken);
        console.log('Refresh Token:', refreshToken);
        console.log('Access Token Expiration:', accessTokenExpiration);
        console.log('Refresh Token Expiration:', refreshTokenExpiration);

        // 필요에 따라 토큰 유효성을 검사하고, 만료되었으면 리프레시 토큰을 사용하여 새로운 액세스 토큰을 요청합니다.
        if (new Date(accessTokenExpiration) <= new Date()) {
            console.log('Access Token is expired. Need to refresh token.');
            await this.refreshAccessToken();
        }
    },
}

</script>

<style scoped>

.container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.main-layout {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.main-label {
    margin-top: 30px;
    justify-content: space-around;
}

.section-title-latest, .section-title-best, .section-title-deadline {
    cursor: pointer;
}

.active {
    color: #ffb400;
    font-style: bold;
}

.section-title-filter {
    text-align: left;
    margin-top: 50px;
    height: 70px;
}

.latest-products, .best-sellers, .deadline {
  margin-top: 80px;
  margin-bottom: 80px;
}

.category {
    margin-left: 11px;
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
    width: 180px;
    text-align: center;
    align-items: center;
    transition: background-color 0.3s, box-shadow 0.3s;
}


.category:hover {
    border-width: 3px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.category-link {
    display: inline-block;
    text-decoration: none;
    color: black;
}

  .product{
    padding-top: 100px;
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

</style>

