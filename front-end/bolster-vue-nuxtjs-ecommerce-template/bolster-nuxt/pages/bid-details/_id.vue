<template>
    <div class="container" v-if="product">
        <div class="wrapper">
            <div class="content">
                <div class="bid-details-content">
                    <!-- 상품 메인 이미지 및 상세 이미지 -->
                    <div class="product-layout" ref="imageContainer" @mousemove="moveLens" @mouseleave="zoomOut">
                        <div class="product-main-image">
                            <img class="main-image" :src="mainImage" alt="Product Image" ref="mainImage" />
                            <div class="zoom-lens" v-if="isZooming" :style="lensStyle" ref="lens"></div>
                        </div>
                        <div class="zoom-result" v-show="isZooming" :style="resultStyle"></div>
                        <div class="product-detail-image-list">
                            <div v-for="(image, index) in productImages" :key="index" class="product-detail-image"
                                @click="showMainImage(image)">
                                <img :src="image" :alt="'Image ' + (index + 1)" />
                            </div>
                        </div>
                    </div>

                    <!-- 상품 상세 설명 -->
                    <div class="product-details">
                        <div class="timer">
                            <b>
                                <div class="days">{{ days }} Days</div>
                                <div class="hours">{{ hours }}:</div>
                                <div class="minutes">{{ minutes }}:</div>
                                <div class="seconds">{{ seconds }}</div>
                            </b>
                        </div>

                        <div class="description">
                            <div class="product-name">
                                <b>{{ product.productName }}</b>
                            </div>
                            <hr />
                            <table>
                                <tbody>
                                    <tr>
                                        <td class="left-column"><b>상품판매자</b></td>
                                        <td class="right-column">{{ product.userId }}</td>
                                    </tr>
                                    <tr>
                                        <td class="left-column"><b>경매시작가</b></td>
                                        <td class="right-column">{{ product.startPrice }}원</td>
                                    </tr>
                                    <tr>
                                        <td class="left-column"><b>현재최고가</b></td>
                                        <td class="right-column">{{ product.price }}원</td>
                                    </tr>
                                    <tr>
                                        <td class="left-column"><b>즉시판매가</b></td>
                                        <td class="right-column">{{ product.buyNow }}원</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="caution">
                            <hr />
                            <b>주의사항</b>
                            <div class="terms">
                                <textarea readonly>
1) 물품을 구매하고자 하는 회원은 회사가 제공하는 서비스화면에서 입찰하여야 합니다. 입찰에 대하여는 서비스이용료가 부과되지 않습니다.
2) 입찰/구매신청방법
- 회원은 물품등록정보를 자세히 살펴본 후 구매의사가 있을 때에 한하여 신중히 입찰(또는 구매신청)하여야 합니다.
- 회원은 경매진행 중에는 고객센터에 있는 [문의게시판]을 통해 물품에 관한 질문을 할 수 있습니다.
- 입찰은 지정된 경매마감일시까지 여러 번 할 수 있으나, 연속적인 중복입찰은 허용되지 않습니다. 즉시구매의 경우에는 최초의 구매신청이 이루어진 이후에도 경매가 진행중인 경우에는 추가구매를 할 수 있습니다. 입찰가격은 현재가에서 선정된 입찰폭 이상의 금액부터 자유롭게 책정할 수 있습니다.
- 일반경매에서 입찰을 한 회원은 경매가 낙찰될 때까지는 판매자의 승낙 없이는 임의로 입찰을 철회할 수 없습니다.
3) 구매과정
- 구매자는 경매종료 후 회사가 24시간 이내에 발송하는 낙찰확인 e-mail 또는 마이페이지에서 낙찰 여부를 확인할 수 있습니다.
- 즉시구매가가 설정된 경매는 경매기간이 만료하기 이전에 [(즉시)구매하기] 항목을 클릭하고 결제를 완료하면 즉시 낙찰이 이루어집니다. 다만, 무통장입금의 방식으로 결제하는 경우에는 주문서 작성 즉시 낙찰이 이루어집니다.
- 구매자는 낙찰된 이후에도 서비스화면에서 [구매거부] 또는 [결제취소] 항목을 클릭함으로써 구매를 거부할 수 있습니다. 이러한 구매거부에 대해서는 이 약관 제15조가 적용됩니다. 다만, 물품발송지연의 사유로 구매자가 [결제취소]항목을 클릭한 경우에는 구매거부로 처리되지 않습니다.
- 구매자는 일반경매의 경우 낙찰 후 3일(토요일, 공휴일 제외), 주문서 작성으로써 낙찰이 이루어지는 즉시구매의 경우 낙찰 후 5일(토요일, 공휴일 제외), 이내에 물품대금을 회사에 입금하여야 합니다. 해당기간이 경과하도록 입금이 확인되지 않는 경우에 구매자의 구매거부로 간주되며 해당 경매는 취소됩니다. 이러한 구매거부에 대해서는 이 약관 제15조가 적용됩니다.
- 구매자는 회사가 제공하는 서비스화면에 주문사항, 물품수령지 정보를 정확히 기재하여야 하며, 미기재 또는 오기로 인한 불이익은 구매자가 부담합니다.
4) 미성년자인 회원이 법정대리인의 동의 없이 물품을 구매하는 경우 본인 또는 법정대리인이 이를 취소할 수 있습니다. 이 경우 회사는 해당 경매를 취소합니다. 다만, 회사가 이 약관에서 정한 바에 따라 물품대금을 판매자에게 송금한 이후에는 구매자는 회사에 대하여 이의를 제기할 수 없고 판매자와 사이에 직접 거래취소, 대금환불 등의 모든 문제를 해결하여야 합니다.
                                </textarea>
                            </div>
                            <div class="confirm">
                                <input class="inp-cbx" id="cbx" type="checkbox" v-model="agree"
                                    @change="updateBidButtonStyle(agree)" :disabled="isAuctionEnded" />
                                <label class="cbx" for="cbx">
                                    <span>이용약관을 확인하였으며 이에 동의합니다.</span>
                                </label>
                            </div>
                        </div>

                        <div class="buttons">
                            <button class="btn-bid" @click="bid" :disabled="!agree || bidButtonDisabled">
                                입찰하기
                            </button>
                        </div>
                        <div class="wishlist-btn">
                            <div style="text-align: right; vertical-align:bottom; margin-top:20px;">
                                <span class="views">조회수</span>
                                <span>{{ product.view }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="text-description">
                    제품 정보
                    <hr />
                    <div class="detail-desciprtion-text">
                        <div v-html="product.productInfo"></div>
                    </div>
                </div>

                <div style="text-align: center;" v-if="!hideMoreButton">
                    <hr class="hr-effect" />
                    <button class="more-button" @click="more">더보기 +</button>
                </div>

                <div class="modal-background" v-if="bidCheck">
                    <div class="bid-modal">
                        <div class="bid-modal-container">
                            <div class="modal-header">
                                <h4>입찰하기</h4>
                                <span @click="bidCancel" class="close">&times;</span>
                            </div>
                            <div class="input-layer">
                                <div class="label">
                                    <div class="input-label">현재 최고가</div>
                                    <div class="input">{{ product.price }}</div>
                                </div>
                                <div class="label">
                                    <div class="input-label">지정 금액 입찰</div>
                                    <input id="input" type="text" v-model="specifiedBid" class="text-input"
                                        @input="updateTotalAmount">
                                </div>
                                <div class="label">
                                    <div class="input-label">호가 단위 입찰</div>
                                    <div class="input">
                                        <div class="count">
                                            <button :class="['btn-minus', { disabled: price <= priceUnit }]"
                                                @click="bidMinus"><i class="fas fa-minus"></i></button>
                                            <div class="price">{{ price }}</div>
                                            <button class="btn-plus" @click="bidPlus"><i
                                                    class="fas fa-plus"></i></button>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div class="label">
                                    <div class="input-label">총 금액</div>
                                    <div class="input">{{ totalAmount }} 원</div>
                                </div>
                                <div class="modal-btn">
                                    <button class="btn-bid-confirm" @click="bidConfirm">입찰하기</button>
                                    <button class="btn-bid-cancel" @click="bidCancel">입찰취소</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

import { mapState, mapActions } from 'vuex';

export default {
    data() {
        return {
            getExistPId: false,
            quantity: 1,
            agree: false,
            product: null,
            bidCheck: false,
            price: 0,
            specifiedBid: 0,
            days: '--',
            hours: '--',
            minutes: '--',
            seconds: '--',
            timeDate: this.dateTime,
            productImagesData: [],
            showMoreImages: false,
            hideMoreButton: false,
            mainImage: '',
            priceUnit: 0,
            bidButtonDisabled: false,
            interval: null,
            zoomedImage: null,
            isZoomed: false,
            lensStyle: {},
            isZooming: false, // Define isZooming here
            resultStyle: {},
            formError: null // 추가
        };
    },

    async mounted() {
        await this.loadProductData();
        const accessToken = sessionStorage.getItem('JWT_TOKEN');
        const accessTokenExpiration = sessionStorage.getItem('ACCESS_TOKEN_EXPIRATION');

        console.log('Access Token:', accessToken);
        console.log('Access Token Expiration:', accessTokenExpiration);

        if (new Date(accessTokenExpiration) <= new Date()) {
            console.log('Access Token is expired. Need to refresh token.');
            await this.refreshAccessToken();
        }
        await this.fetchProfile();
    },

    beforeDestroy() {
        // 컴포넌트가 파괴되기 전에 타이머를 제거합니다.
        clearInterval(this.interval);
    },
    props: ['dateTime'],

    computed: {
        ...mapState(['user', 'serialNumber', 'isLoggedIn']), // Assuming user state is managed in Vuex
        productImages() {
            // product 객체가 null이 아닌 경우에만 이미지 속성을 배열로 반환합니다.
            if (this.product) {
                return [
                    this.product.image1,
                    this.product.image2,
                    this.product.image3,
                    this.product.image4,
                    this.product.image5,
                ].filter((image) => image); // 유효한 이미지 URL만 반환
            }
            return [];
        },
        totalAmount() {
            return this.product.price + this.price + parseInt(this.specifiedBid);
        },
        isAuctionEnded() {
            return this.days === ' -- ' && this.hours === ' -- ' && this.minutes === ' -- ' && this.seconds === ' -- ';
        }
    },
    methods: {
        ...mapActions(['refreshAccessToken', 'fetchProfile']),
        async loadProductData() {
            const productId = this.$route.params.id;
            try {
                const response = await axios.get(`http://localhost:8080/bid-details/${productId}`);
                console.log('Product data fetched:', response.data);
                this.product = response.data;
                this.updateProductImages();
                this.mainImage = this.productImages[0];
                this.priceUnit = this.product.priceUnit || 0;
                this.price = this.priceUnit;
                this.setTimer(); // Product를 받은 후 타이머 설정
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        },
        showMainImage(image) {
            this.mainImage = image;
        },
        moveLens(event) {
      this.isZooming = true;
      const imageContainer = this.$refs.imageContainer;
      const image = this.$refs.mainImage;
      const lens = this.$refs.lens;

      // Ensure refs are defined
      if (!imageContainer || !image || !lens) {
        return;
      }

      const rect = imageContainer.getBoundingClientRect();
      let x = event.clientX - rect.left - lens.offsetWidth / 2;
      let y = event.clientY - rect.top - lens.offsetHeight / 2;

      // Ensure the lens doesn't go out of the image bounds
      if (x > image.width - lens.offsetWidth) x = image.width - lens.offsetWidth;
      if (x < 0) x = 0;
      if (y > image.height - lens.offsetHeight) y = image.height - lens.offsetHeight;
      if (y < 0) y = 0;

      const bgPosX = (x / image.width) * 100;
      const bgPosY = (y / image.height) * 100;
      const zoomFactor = 2; // 확대 비율 설정, 기본값 2배

      this.lensStyle = {
        left: `${x}px`,
        top: `${y}px`,
      };

      this.resultStyle = {
        backgroundImage: `url(${this.mainImage})`,
        backgroundSize: `${image.naturalWidth * zoomFactor}px ${image.naturalHeight * zoomFactor}px`,
        backgroundPosition: `${bgPosX}% ${bgPosY}%`,
      };
    },
    zoomOut() {
      this.isZooming = false;
    }, 
        updateProductImages() {
            if (this.product) {
                this.productImagesData = [
                    this.product.image1,
                    this.product.image2,
                    this.product.image3,
                    this.product.image4,
                    this.product.image5,
                ].filter((image) => image);
            }
        },
        more() {
            // 추가 이미지를 보여주는 변수를 true로 설정합니다.
            this.showMoreImages = true;
            // 더보기 버튼을 숨깁니다.
            this.hideMoreButton = true;
        },
        bid() {
            if (!this.isLoggedIn) {
                this.redirectToLogin();
                return;
            }
            this.bidCheck = true;
        },
        bidCancel() {
            this.bidCheck = false;
        },
        wish() {
            this.isWished = !this.isWished;
        },
        bidPlus() {
            this.price += this.priceUnit;
        },
        bidMinus() {
            if (this.price > this.priceUnit) {
                this.price -= this.priceUnit;
            }
        },
        updateBidButtonStyle() {
            const bidButton = document.querySelector('.btn-bid');
            if (this.agree) {
                bidButton.classList.add('active');
                this.bidButtonDisabled = false;
                console.log('Checkbox checked, bid button activated.');
            } else {
                bidButton.classList.remove('active');
                this.bidButtonDisabled = true;
                console.log('Checkbox unchecked, bid button deactivated.');
            }
        },
        bidConfirm() {
            const bidData = {
                productId: this.product.productId,
                serialNumber: this.serialNumber,
                bidAmount: this.totalAmount,
            };
            axios
                .post('http://localhost:8080/bids/place', null, { params: bidData })
                .then((response) => {
                    console.log('입찰 성공:', response.data);
                    alert('입찰에 성공하였습니다.');
                    this.bidCheck = false;
                    window.location.reload();
                })
                .catch((error) => {
                    console.error('입찰 실패:', error);
                    alert('입찰에 실패하였습니다.');
                });
        },
        updateTotalAmount() {
            // This method triggers a recompute of totalAmount when the specifiedBid changes
        },
        timing() {
            if (!this.product) return;

            let durationTime = this.product.timeLimit;
            if (!durationTime) return;

            // durationTime을 초 단위로 변환
            let durationTimeParse = durationTime * 3600;
            let registerTime = this.product.registrationDate;
            let registerTimeParse = Date.parse(registerTime) / 1000;
            let now = new Date();
            let nowParse = Date.parse(now) / 1000;
            let timeLeft = registerTimeParse + durationTimeParse - nowParse;

            let days = Math.floor(timeLeft / 86400);
            let hours = Math.floor((timeLeft - days * 86400) / 3600);
            let minutes = Math.floor((timeLeft - days * 86400 - hours * 3600) / 60);
            let seconds = Math.floor((timeLeft - days * 86400 - hours * 3600 - minutes * 60));

            if (hours < 10) { hours = '0' + hours; }
            if (minutes < 10) { minutes = '0' + minutes; }
            if (seconds < 10) { seconds = '0' + seconds; }
            if (timeLeft < 0) {
                days = ' -- ';
                hours = ' -- ';
                minutes = ' -- ';
                seconds = ' -- ';
            }

            this.days = days;
            this.hours = hours;
            this.minutes = minutes;
            this.seconds = seconds;

            if (timeLeft <= 0) {
                clearInterval(this.interval);
                this.bidButtonDisabled = true;
            } else {
                this.bidButtonDisabled = false;
            }
        },
        setTimer() {
            // 이미 설정된 타이머가 있다면 지웁니다.
            if (this.interval) {
                clearInterval(this.interval);
            }
            // 매 초마다 timing 메서드를 호출합니다.
            this.interval = setInterval(this.timing, 1000);
            console.log('Timer set.');
        },
        toggleImageZoom(image) {
            this.zoomedImage = image;
        },
        async updateAuctionResult() {
            try {
                const productId = this.product.productId;
                await axios.post(`http://localhost:8080/updateAuctionResult/${productId}`);
            } catch (error) {
                console.error('Error updating auction result:', error);
            }
        },
        zoomIn() {
            this.isZoomed = true;
        },
    
        redirectToLogin() {
            alert('로그인이 필요합니다.');
            this.$router.push({ path: '/login' });
        },
    },
};
</script>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center; /* 중앙 정렬 */
    max-width: 1200px; /* 전체 컨테이너의 최대 너비 설정 */
    margin: auto; /* 중앙 정렬 */
    padding: 20px;
    padding-top: 100px;
}

.content {
    width: 100%;
}

.bid-details-content {
    display: flex;
    justify-content: space-between;
    width: 100%;
    flex-wrap: wrap;
}

.product-layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 20px;
    flex-basis: 40%; /* 왼쪽 이미지 영역 너비 */
    position: relative; /* 추가 */
}

.product-main-image {
    width: 400px; /* 고정된 너비 */
  height: 400px; /* 고정된 높이 */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  background-color: white;
  overflow: hidden;
  position: relative; /* 추가: 확대 렌즈 위치를 위해 필요 */
}

.main-image {
    width: 100%;
    height: 100%;
    object-fit: contain; /* 이미지가 영역을 채우도록 */
}

.product-detail-image-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap; /* 작은 화면에서 이미지가 줄 바꿈되도록 설정 */
    margin-top: 20px;
}

.product-detail-image {
    width: 80px; /* 이미지 너비 조정 */
    height: 80px; /* 이미지 높이 조정 */
    margin: 5px;
    object-fit: cover;
    overflow: hidden; /* 이미지가 영역을 벗어나면 숨김 */
}

.product-detail-image img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* 이미지가 영역을 채우도록 */
}

.product-details {
    flex-basis: 55%; /* 오른쪽 상품 데이터 영역 너비 */
    text-align: left;
    margin-bottom: 30px;
}

.timer {
    display: flex;
    justify-content: flex-end; /* 우측 정렬 */
    align-items: center;
    font-size: 40px; /* 글씨 크기 증가 */
    margin-bottom: 20px;
}

.timer b {
    display: flex;
    gap: 5px;
}

.description {
    margin-bottom: 20px;
}

.product-name {
    padding-bottom: 10px;
    font-size: 35px; /* 글씨 크기 증가 */
}

.description td {
    font-size: 18px;
    padding-left: 10px;
}

.left-column {
    text-align: left; /* 좌측 정렬 */
}

.right-column {
    text-align: right; /* 우측 정렬 */
}

.description table {
    width: 100%;
}

.caution {
    margin-top: 20px;
    font-size: 20px; /* 글씨 크기 조정 */
}

.terms textarea {
    width: 100%;
    height: 100px; /* 높이 증가 */
    resize: none; /* 텍스트박스 크기 조정 불가 */
    border: 1px solid #ccc;
    padding: 10px;
    font-size: 12px; /* 글씨 크기 감소 */
    color: gray; /* 글씨 색상 회색 */
    background-color: #f9f9f9;
    box-sizing: border-box; /* padding 포함 */
    overflow-y: auto; /* 스크롤 추가 */
    margin-bottom: 10px; /* 여백 제거 */
}

.confirm {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 14px; /* 글씨 크기 감소 */
    color: gray; /* 글씨 색상 회색 */
    margin: 0; /* 여백 제거 */
}

.buttons {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.btn-bid {
    background-color: #ccc; /* 기본 회색 */
    width: 200px;
    height: 50px;
    color: white;
    font-size: 20px;
    border: #ccc solid 1px;
    border-radius: 10px; /* radius 10으로 수정 */
    text-align: center;
}

.btn-bid.active {
    background-color: #ffb400; /* 체크박스 체크 시 컬러 변경 */
    border: #ffb400 solid 1px;
}

.wishlist-btn {
    display: flex;
    justify-content: flex-end;
    width: 100%;
}

.views {
    margin-right: 5px;
}

.text-description {
    width: 100%;
    margin-top: 40px;
    margin-bottom: 30px;
    font-size: 18px;
    text-align: center;
}

.detail-desciprtion-text {
    margin-top: 20px;
    text-align: center;
}

.more-button {
    width: 200px;
    height: 40px;
    background-color: white;
    border: 1px solid white;
    transition: color 0.5s ease;
    text-align: center;
}

.hr-effect:hover, .more-button:hover {
    color: #ffb400;
}

.bid-modal {
    position: fixed;
    top: 50%; /* 화면 상단 기준으로 50% 위치에 배치 */
    left: 50%; /* 화면 좌측 기준으로 50% 위치에 배치 */
    transform: translate(-50%, -50%); /* 수평 및 수직으로 -50%씩 이동하여 중앙으로 정렬 */
    width: 450px; /* 모달 너비 조정 */
    height: auto; /* 모달 높이 자동 */
    z-index: 1000; /* 다른 요소보다 위에 표시되도록 설정 */
    background: #fff;
    border-radius: 10px; /* 모달의 둥근 모서리 설정 */
    padding: 20px; /* 모달 내부 여백 설정 */
    box-sizing: border-box; /* padding이 박스 크기에 포함되도록 설정 */
}

.bid-modal-container {
    background: #fff;
    border-radius: 10px;
    padding: 20px;
    box-sizing: border-box;
    align-items: center;
    border-color: black;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.close {
    font-size: 24px;
    cursor: pointer;
}

.label {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}

.input-label {
    text-align: left;
    width: 50%;
    align-items: center;
    height: 50px;
    font-size: 20px;
}

.input {
    text-align: right;
    align-items: right;
    justify-content: flex-end;
    /* width: 50%; */
    font-size: 20px;
}

.text-input {
    font-size: 20px;
    padding: 10px;
    border-radius: 15px;
    border: 1px solid #ccc;
    width: 50%;
    box-sizing: border-box;
    text-align: right;
}

.btn-bid-confirm {
    background-color: #ffb400;
    color: white;
    font-size: 20px;
    border: #ffb400 solid 1px;
    width: 48%;
    border-radius: 10px;
    padding: 7px;
}

.btn-bid-cancel {
    background-color: white;
    color: black;
    font-size: 20px;
    border: #ccc solid 1px;
    width: 48%;
    border-radius: 10px;
}

.btn-minus {
    border: #ccc solid 1px;
    background-color: #ccc;
    color: white;
    border-radius: 50%;
    width: 30px;
    height: 30px;
}

.btn-plus {
    border: #ffb400 solid 1px;
    background-color: #ffb400;
    color: white;
    border-radius: 50%;
    width: 30px;
    height: 30px;
}

.btn-minus.disabled {
    background-color: #eee;
    border-color: #eee;
    cursor: not-allowed;
}

.input-layer {
    margin-top: 30px;
}

.modal-btn {
    margin-top: 20px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
}

.count {
    display: flex;
    justify-content: flex-end;
    width: 150px;
}

.hr-effect {
    border: 2px solid #ddd;
    transition: border-color 0.5s ease; /* 테두리 색상 변화에 대한 전환 설정 */
}

.price {
    width: 60px;
    text-align: center;
}

.detail-big-image {
    margin-bottom: 30px;
}

.modal-background {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.8);
}

.zoom-lens {
    position: absolute;
    border: 1px solid #d4d4d4;
    width: 100px;
    height: 100px;
    background: rgba(0, 0, 0, 0.4);
    pointer-events: none;
}

.zoom-result {
  position: absolute;
  top: 0;
  left: 410px; /* Adjust based on your layout */
  width: 400px;
  height: 400px;
  background-repeat: no-repeat;
  border: 1px solid #d4d4d4;
}

.product-detail-image-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 20px;
}

.product-detail-image {
  width: 80px;
  height: 80px;
  margin: 5px;
  object-fit: cover;
  overflow: hidden;
}

.product-detail-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-details {
  flex-basis: 55%;
  text-align: left;
  margin-bottom: 30px;
}
</style>