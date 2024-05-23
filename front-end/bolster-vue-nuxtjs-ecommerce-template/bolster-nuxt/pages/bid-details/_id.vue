<template>
    <div class="container">
        <div class="bid-details-content">
            <!-- 상품 메인 이미지 및 상세 이미지 -->

            <div class="product-layout">
                <div class="product-main-image">
                    <img
                        class="main-image" :src="mainImage" alt="Product Image"/>
                </div>
                <div class="product-detail-image-list">
                  
                    <div
                        v-for="(image, index) in productImages"
                        :key="index"
                        class="product-detail-image"
                        @click="showMainImage(image)"
                    >
                    <img :src="image" :alt="'Image ' + (index + 1)" />
                    </div>
                </div>
            </div>

            <!-- 상품 상세 설명 -->
            <div class="product-details">
                <div class="timer" style="display:flex;">
                    <b>
                        <div class="days">{{days}}Days</div>
                        <div class="hours"> {{hours}}:</div>
                        <div class="minutes"> {{minutes}}:</div>
                        <div class="seconds"> {{seconds}}</div>
                    </b>
                </div>

                <div class="description">
                    <div class="product-name">
                        <b>{{ product.productName }}</b>
                    </div>
                    <hr />
                    <table>
                        <tr>
                            <td><b>판매자</b></td>
                            <td style="padding-left: 300px;">
                                {{ product.userId }}
                            </td>
                        </tr>
                        <tr>
                            <td><b>시작가</b></td>
                            <td style="padding-left: 300px;">
                                {{ product.startPrice }}원
                            </td>
                        </tr>
                        <td><b>현재가</b></td>
                        <td style="padding-left: 300px;">
                            {{ product.price }}원
                        </td>

                        <tr>
                            <td><b>즉시 판매가</b></td>
                            <td style="padding-left: 300px;">
                                {{product.buyNow}}원
                            </td>
                        </tr>
                    </table>
                </div>

                <div class="caution">
                    <!-- 이용약관-->
                    <b>주의사항</b>
                    <hr>
                    <div class="terms">
                        <span>제 1항</span>
                    </div>
                    <div class="confirm">
                        <input
                            class="inp-cbx"
                            id="cbx"
                            type="checkbox"
                            v-model="agree"
                        />
                        <label class="cbx" for="cbx">
                            <span
                                >이용약관을 확인하였으며 이에 동의합니다.</span
                            >
                        </label>
                    </div>
                
            </div>

                <div class="buttons">
                    <button class="btn-bid" @click="bid" :disabled="!agree || bidButtonDisabled" >
                        입찰하기
                    </button>
                </div>
                    <!-- <a href="#" class="btn btn-bid">입찰하기</a> -->
                    <div class="wishlist-btn">
                        <!-- <a href="#" class="btn-wish">
                            <i
                                class="far fa-heart"
                                style="color:red; text-align:center"
                            >
                            </i>
                        </a> -->
                        <div
                            style="text-align: right; vertical-align:bottom; margin-top:20px;"
                        >
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
                <!-- 상품 상세 설명 추가 -->
                <!-- {{ product.productInfo }} -->
                <div v-html="product.productInfo"></div>
            </div>
        </div>

        <!-- <div class="detail-image-description">
            <div class="big-detail-image-list">
                <div v-for="(image, index) in productImages" :key="index" class="detail-big-image"> -->
                    <!-- 이미지가 null이 아닌 경우에만 보여줍니다. -->
                    <!-- <img v-if="image" :src="image" :alt="'Image ' + (index + 1)" />
                </div>
            </div>
        </div> -->

        <div style="text-align: center;" v-if="!hideMoreButton">
            <hr class="hr-effect" />
            <button class="more-button" @click="more">더보기 +</button>
        </div>

        <div class="modal-background" v-if="bidCheck == true">
            <div class="bid-modal">
                <div class="bid-modal-container">
                    <div class="input-layer">
                        <div
                            class="label"
                            style="display: flex; justify-content: space-around;"
                        >
                            <div class="input-label">
                                현재 최고가
                            </div>
                            <div class="input">{{ product.price }} 원</div>
                        </div>
                        <div
                            class="label"
                            style="display: flex; justify-content: space-around;"
                        >
                            <div class="input-label">
                                호가 단위
                            </div>
                            <div class="input">
                                <div
                                    class="count"
                                    style="display: flex; margin-left: 20px; justify-content:space-around; text-align:right;"
                                >
                                    <button class="btn-minus">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                    <div class="price">
                                        {{this.price}}
                                    </div>

                                    <button class="btn-plus" @click="bidPlus">
                                        <i class="fas fa-plus "></i>
                                    </button>
                                    <!-- <div>
                                        <div style="text-align:right">
                                            {{product.price + price }}원
                                        </div>
                                    </div> -->
                                </div>
                            </div>
                        </div>
                        <div
                            class="label"
                            style="display: flex; justify-content: space-around;"
                        >
                            <div class="input-label">
                                총 금액
                            </div>
                            <div class="input">{{product.price + this.price }} 원</div>
                        </div>
                        <div class="modal-btn" style="display:flex;">
                            <button class="btn-bid-confirm" @click="bidConfirm">
                                입찰
                            </button>
                            <button class="btn-bid-cancel"  @click="bidCancel">
                                취소
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Timer from '../../components/landing-one/Timer'

export default {
    components: {
        Timer,
    },

    data() {
        return {
            getExistPId: false,
            quantity: 1,
            agree: false, //체크박스 상태 저장
            product: null,
            bidCheck: false,
            price: "",
            product: "",
            days: '',
            hours: '',
            minutes: '',
            seconds: '',
            timeDate: this.dateTime,
            productImages: [],
        // 추가 이미지 보여주는 변수
            showMoreImages: false,
        // 더보기 버튼 숨김 여부 변수
            hideMoreButton: false,
            mainImage: "",
            priceUnit: "",
            bidButtonDisabled: false,
        }
    },
    mounted() {
        // 동적 라우트 매개변수인 상품 ID를 가져옵니다.
        const productId = this.$route.params.id
        // Vuex 스토어에서 해당 상품을 조회합니다.
        // this.product = this.$store.state.products.all.find(product => product.id === parseInt(productId));
        // 상품 ID를 기반으로 서버로부터 상품 데이터를 가져옵니다.
        axios
            .get(`http://localhost:8080/bid-details/${productId}`)
            .then(response => {
                // 성공적으로 데이터를 가져왔을 때 product 변수에 할당합니다.
                this.product = response.data;
                this.updateProductImages();
                this.mainImage = this.productImages[0];
                this.priceUnit = this.product.priceUnit;
                this.price = this.priceUnit;
            })
            .catch(error => {
                // 오류가 발생했을 때 오류 메시지를 출력합니다.
                console.error('Error fetching product data:', error)
            })
    },
    props: ['dateTime'],
    
    created() { // Turn data into viewable values
        this.interval = setInterval(() => this.timing(this.product.timeLimit), 1000);
    },


    computed: {
        productImages() {
            // product 객체에서 이미지 속성을 배열로 반환합니다.
            return [
                this.product.image1,
                this.product.image2,
                this.product.image3,
                this.product.image4,
                this.product.image5,
            ].filter(image => image); // 유효한 이미지 URL만 반환
        },
    },
    methods: {
        showMainImage(image) {
            this.mainImage = image;
        },
        updateProductImages() {
            this.productImages = [
                this.product.image1,
                this.product.image2,
                this.product.image3,
                this.product.image4,
                this.product.image5,
            ].filter(image => image)
        },
        more() {

            // 추가 이미지를 보여주는 변수를 true로 설정합니다.
            this.showMoreImages = true;
            // 더보기 버튼을 숨깁니다.
            this.hideMoreButton = true;
        },

        bid() {
            this.bidCheck = true

            // 입찰 페이지 이동
        },

        bidCancel() {
            this.bidCheck = false;
            window.location.reload();
        },

        wish() {

            this.isWished = !this.isWished
        },
        bidPlus() {
            this.price = this.price + this.priceUnit;
         },

         bidConfirm() {
            const bidData = {
                productId: this.product.id,
                bidAmount: this.totalAmount,
            };
            axios.post('http://localhost:8080/bid', bidData)
                .then(response => {
                    console.log('입찰 성공:', response.data);
                    this.bidCheck = false;
                    window.location.reload();
                })
                .catch(error => {
                    console.error('입찰 실패:', error);
                });
        },

        // remainingTime() {
        //     const currentTime = new Date();
        //     const timeLimit = new Date(this.product.timeLimit);
        //     if (currentTime > timeLimit) {
        //         return "종료됨";
        //     } else {
        //         const remainingMilliseconds = timeLimit - currentTime;
        //         const days = Math.floor(remainingMilliseconds / (1000 * 60 * 60 * 24));
        //         const hours = Math.floor((remainingMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        //         let remainingTimeStr = "";
        //         if (days > 0) {
        //             remainingTimeStr += `${days}일 `;
        //         }
        //         if (hours > 0) {
        //             remainingTimeStr += `${hours}시간 `;
        //         }
        //         return `${remainingTimeStr}`;
        //     }
        // }

        timing(dateTime) {
            let durationTime = this.product.timeLimit;

            //durationTime을 밀리초단위로 변환
            let durationTimeParse = durationTime * 60 * 60;

            let registerTime = this.product.registrationDate;
            let registerTimeParse = (Date.parse(registerTime)) / 1000;

            let now = new Date();
            let nowParse = (Date.parse(now) / 1000);
            let timeLeft = registerTimeParse + durationTimeParse - nowParse;

            let days = Math.floor(timeLeft / 86400); 
            let hours = Math.floor((timeLeft - (days * 86400)) / 3600);
            let minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
            let seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));
            
            if (hours < "10") { hours = "0" + hours; }
            if (minutes < "10") { minutes = "0" + minutes; }
            if (seconds < "10") { seconds = "0" + seconds; }

            if(timeLeft < "0") {
                days = " - ";
                hours = " -- ";
                minutes = " -- ";
                seconds = " -- ";
            }

            this.days = days;
            this.hours = hours;
            this.minutes = minutes;
            this.seconds = seconds;

            if(timeLeft<=0) {
                clearInterval(this.interval);
                this.bidButtonDisabled = true; 
            } else {
                this.bidButtonDisabled = false; 
            }
        }
    }
}

</script>

<style scoped>
.bid-details-content {
    display: flex;
    width: 100%;
}

.product-layout {
    margin-right: 50px;
    width: 100%;
}

.product-name {
    padding-bottom: 10px;
    font-size: 30px;
    text-align: left;
}

.tr {
    font-size: 30px;
}

.main-image-layout {
    justify-content: center;
    display: flex;
}

.product-main-image {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%; /* 필요한 경우 너비를 조정합니다 */
    height: 70%; /* 필요한 경우 높이를 조정합니다 */
    padding-top: 100px;
    padding-bottom: 30px;
    margin: auto;
}

.product-main-image .img {
    width : 120%;
    height: 120%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.main-image {
    max-width: 500px;
    max-height: 500px;
    display:block;
}
.product-detail-image-list{
    padding-top: 30px;
    display:flex;
    justify-content: center;

}

.product-detail-image{
    width: 15%; /* 이미지 너비를 조정합니다. */
    max-height: 100%; /* 최대 높이를 100%로 설정하여 비율을 유지합니다. */
    margin-right: 10px;
    object-fit: contain;
}

.timer {
    display: flex;         /* 자식 요소들을 가로로 정렬 */
    justify-content: right;
    align-items: center;   /* 자식 요소들을 세로로 가운데 정렬 */
    font-size: 60px;
    margin-bottom: 20px;
    margin-top: 80px;
    text-align: right;
}
.timer b {
    display: flex;         /* 자식 요소들을 가로로 정렬 */
    gap: 10px;             /* 자식 요소들 사이의 간격 */
}

.product-details {
    justify-content: center;
    text-align: center;
    align-items: center;
    align-content: center;
    width: 50%;
}

/* .description{
    text-align: left;
    line-height: 50px;
    font-size: 15px;
    width: 50%;
} */

.td {
    text-align:left;
}


.caution {
    margin-top: 30px;
    text-align: left;
}

.terms {
    width: 800px;
    height: 100px;
}

.confirm {
    justify-content: center;
    align-content: center;
    font-size: 20px;
    text-align: center;
}

.buttons {
    display: flex;
    justify-content: space-around;
    margin-top: 50px;
    width: 100%;

}

.btn-wish {
    background-color: white;
    width: 50px;
    height: 50px;
    font-size: 20px;
    align-content: center;
    border: black solid 1px;
    text-align: center;
}

.btn-bid {
    background-color: #ffb400;
    width: 50%;
    height: 50px;
    color: white;
    font-size: 20px;
    border: #ffb400 solid 1px;
}

.text-description {
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-top: 100px;
    margin-bottom: 30px;
}

.detail-desciprtion-text {
    margin-top: 30px;
}


.detail-image-description {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.big-detail-image-list {
    justify-content: center;
}


.more-button {
    width: 500px;
    height:40px;

    background-color: white;
    border: 1px solid white;
    transition: color 0.5s ease;
}

.hr-effect:hover, .more-button:hover {
    color: #ffb400; 
}

.bid-modal {
    position: fixed;
    top: 50%; /* 화면 상단 기준으로 50% 위치에 배치 */
    left: 50%; /* 화면 좌측 기준으로 50% 위치에 배치 */
    transform: translate(-50%, -50%); /* 수평 및 수직으로 -50%씩 이동하여 중앙으로 정렬 */
    width: 600px;
    height: 600px; /* 모달 높이 설정 */
    z-index: 1000; /* 다른 요소보다 위에 표시되도록 설정 */
    /* background: #fff; 배경색 설정 */
    border-radius: 10px; /* 모달의 둥근 모서리 설정 */
    padding: 20px; /* 모달 내부 여백 설정 */
    box-sizing: border-box; /* padding이 박스 크기에 포함되도록 설정 */
}

/* modal or popup */
.bid-modal-container {
  background: #fff;
  border-radius: 10px;
  height: 600px;
  padding: 20px;
  box-sizing: border-box;
  align-items: center;
  border-color: black;
}

.label {
    justify-content: space-around;
    
}

.input-label {
    text-align: left;
    width: 50%;
    align-items: center;
    height: 50px;
    margin-top: 20px;
    font-size: 20px;
}

.input {
    text-align: right;
    width: 50%;
    font-size: 20px;
}

.btn-bid-confirm {
    background-color: #ffb400;
    color: white;
    font-size: 20px;
    border: #ffb400 solid 1px;
    width: 50%;
}

.btn-bid-cancel {
    background-color: white;
    color: black;
    font-size: 20px;
    border: white solid 1px;
    width: 50%;
}

.wishlist-btn {
    text-align: center;
}

.btn-minus {
    border:#ffb400 solid 1px;
    background-color: #ffb400;
    color: white;
    border-radius: 50%;
    width: 40px;
    height: 40px;
}

.btn-plus{
    border:#ffb400 solid 1px;
    background-color: #ffb400;
    color: white;
    border-radius: 50%;
    width: 40px;
    height: 40px;
}

.input-layer {
    margin-top: 30px;
}

.modal-btn {
    margin-top: 40px;
}

.count {
    margin-top: 20px;
    justify-content: space-around;
    width: 280px;
}


.hr-effect {
    border: 2px solid #ddd;
    transition: border-color 0.5s ease; /* 테두리 색상 변화에 대한 전환 설정 */
}


.price {
    width: 30px;
}

.detail-big-image {
    margin-bottom: 30px;
}

.modal-background {
  position: fixed;
  top:0; left: 0; bottom: 0; right: 0;
  background: rgba(0, 0, 0, 0.8);
}
</style>