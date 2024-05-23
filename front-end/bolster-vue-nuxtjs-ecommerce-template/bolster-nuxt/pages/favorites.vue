<template>
    <div>
        <div class="page-title-area">
            <div class="container">
                <ul>
                    <li><nuxt-link to="/">Home</nuxt-link></li>
                    <li>회원가입</li>
                    <li>아티스트 선택</li>
                </ul>
            </div>
        </div>
<br><br><br>
        <div class="container">
            <div class="step-indicator">
                <div class="step active">
                    <div class="step-number">1</div>
                    <div class="step-text">약관 동의</div>
                </div>
                <div class="step-line"></div>
                <div class="step">
                    <div class="step-number">2</div>
                    <div class="step-text">정보 입력</div>
                </div>
                <div class="step-line"></div>
                <div class="step current">
                    <div class="step-number">3</div>
                    <div class="step-text">아티스트 선택</div>
                </div>
            </div>

            <div class="idol-selector">
            <br><br><br>
            <h3 style="font-weight: bold;">꿀단지에 담을 아티스트를 선택해주세요 🐝</h3>
            <h6 style="color:darkgray">* 최대 3 아티스트 선택 가능</h6>
            <br><br><br>
            <form @submit.prevent="submitSelection">
                <div class="idol-list">
                    <div v-for="idol in idols" :key="idol.name" class="idol-item" @click="toggleSelection(idol.name)">
                        <div :class="{'image-container': true, 'selected': isSelected(idol.name)}">
                            <img :src="idol.image" :alt="idol.name" class="idol-image"><br>
                        </div>
                        <p class="chosen-idol-name">{{ idol.name }}</p>

                    </div>
                </div>

                <div class="selected-idols">
                    <span v-for="(idolTag, index) in selectedIdolsTags" :key="index" class="idol-tag">{{ idolTag }}</span>
                </div>
                <br><br>
                <button type="button" class="btn btn-primary" @click="submitSelection" :disabled="selectedIdols.length === 0">단지에 담기</button>
            </form>
        </div>
            </div>
        <br><br>
    </div>
</template>

<style scoped>
.idol-selector {
    width: 50%; /* 컨테이너의 너비의 절반으로 설정 */
    margin: 0 auto; /* 화면 가운데 정렬 */
}

.idol-selector form {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.idol-list {
    display: flex;
    flex-wrap: wrap; /* 요소들이 여러 줄에 걸쳐 나타날 수 있도록 설정 */
    justify-content: space-between; /* 요소들 사이에 공간을 균등하게 배분 */
}

.idol-item {
    width: calc(25% - 20px); /* 한 행에 4개의 이미지를 표시하도록 너비 설정 */
    cursor: pointer;
    margin-bottom: 20px; /* 이미지 아래에 간격 추가 */
    margin-right: 20px; /* 이미지 사이의 간격을 좁힘 */
}
.chosen-idol-name {
    text-align: center; /* 텍스트를 가운데 정렬합니다. */
    margin-right: 20px; /* 이미지 사이의 간격을 좁힘 */
    margin-bottom: 20px; /* 이미지 아래에 간격 추가 */
}

.image-container {
    margin: 10px;
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-radius: 50%;
    transition: border 0.3s;
}
.idol-image {
    width: 100%;
    height: auto;
}
.selected {
    border: 2px solid #FFB400;
}
.selected-idols {
    margin-top: 20px; /* 선택된 아이돌 태그와 버튼 사이의 간격 조정 */
}

.idol-tag {
    display: inline-block;
    padding: 5px 10px;
    background-color: #FFD97F;
    color: white;
    border-radius: 20px;
    margin-right: 5px;
    cursor: pointer;
}

.step-indicator {
    width: 50%; /* 컨테이너의 너비의 절반으로 설정 */
    margin: 0 auto; /* 화면 가운데 정렬 */
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
}

.step {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.step-number {
    width: 30px;
    height: 30px;
    line-height: 30px;
    border-radius: 50%;
    border: 2px solid gainsboro;
    background-color: white;
    color: gainsboro;
    margin-bottom: 5px;
}

.step-text {
    color: darkgray;
}

.step.active .step-number {
    border-color: gainsboro;
    background-color: white;
}

.step.current .step-number {
    border-color: #FFB400;
    background-color: #FFB400;
    color: white;
}

.step.current .step-text {
    color: black;
}

.step-line {
    height: 1px;
    flex-grow: 1; /* 이 부분을 조정하여 실선이 원 사이에서 꽉 차도록 합니다 */
    background-color: gainsboro;
    margin: 0 5px; /* 원과 실선 사이의 간격을 조절합니다 */
}

</style>


<script>
import TopHeader from '../layouts/TopHeader'
import Menubar from '../layouts/Menubar'
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
    components: {
        TopHeader,
        Menubar,
    },
    setup() {
        const serialNumber = ref('');
        const idols = ref([
            { name: 'AESPA', image: require('~/assets/img/idol-logo-image/aespa.jpg') },
            { name: 'BLACKPINK', image: require('~/assets/img/idol-logo-image/blackpink.jpg') },
            { name: 'BOYNEXTDOOR', image: require('~/assets/img/idol-logo-image/boynextdoor.jpg') },
            { name: 'BTS', image: require('~/assets/img/idol-logo-image/bts.jpg') },
            { name: 'ENHYPEN', image: require('~/assets/img/idol-logo-image/enhypen.jpg') },
            { name: 'EXO', image: require('~/assets/img/idol-logo-image/exo.png') },
            { name: 'GIRLSGENERATION', image: require('~/assets/img/idol-logo-image/girlsgeneration.jpg') },
            { name: 'ITZY', image: require('~/assets/img/idol-logo-image/itzy.jpg') },
            { name: 'LE SSERAFIM', image: require('~/assets/img/idol-logo-image/leserrafim.jpg') },
            { name: 'NCT', image: require('~/assets/img/idol-logo-image/nct.png') },
            { name: 'NEWJEANS', image: require('~/assets/img/idol-logo-image/newjeans.jpg') },
            { name: 'NMIXX', image: require('~/assets/img/idol-logo-image/nmixx.jpg') },
            { name: 'FROMIS_9', image: require('~/assets/img/idol-logo-image/fromis9.jpg') },
            { name: 'RIIZE', image: require('~/assets/img/idol-logo-image/riiz.jpg') },
            { name: 'STRAYKIDS', image: require('~/assets/img/idol-logo-image/straykids.jpg') },
            { name: 'SEVENTEEN', image: require('~/assets/img/idol-logo-image/seventeen.jpg') },
            { name: 'SHINEE', image: require('~/assets/img/idol-logo-image/shinee.jpg') },
            { name: 'SUPERJUNIOR', image: require('~/assets/img/idol-logo-image/superjunior.jpg') },
            { name: 'TXT', image: require('~/assets/img/idol-logo-image/txt.jpg') },
            { name: 'TWICE', image: require('~/assets/img/idol-logo-image/twice.jpg') },
            { name: 'WINNER', image: require('~/assets/img/idol-logo-image/winner.jpg') },
            { name: 'OTHERS', image: require('~/assets/img/idol-logo-image/honeypot_mascot.png') },
            { name: '', image: require('~/assets/img/idol-logo-image/blank.png') },
            { name: '', image: require('~/assets/img/idol-logo-image/blank.png') },
        ]);
        const selectedIdols = ref([]);
        const selectedIdolsTags = ref([]);

        onMounted(() => {
            const urlParams = new URLSearchParams(window.location.search);
            serialNumber.value = urlParams.get('serialNumber') || 'No serial number provided';
        });

        const toggleSelection = (idolName) => {
            const index = selectedIdols.value.indexOf(idolName);
            if (index !== -1) {
                selectedIdols.value.splice(index, 1);
                selectedIdolsTags.value.splice(index, 1); // 아이돌 선택 해제 시 해당 태그 제거
            } else if (selectedIdols.value.length < 3) {
                selectedIdols.value.push(idolName);
                selectedIdolsTags.value.push(idolName); // 아이돌 선택 시 해당 태그 추가
            }
        };

        const isSelected = (idolName) => {
            return selectedIdols.value.includes(idolName);
        };

        const submitSelection = async () => {
            try {
                const selectedIdolIds = selectedIdols.value.map(idol => {
                    const idolMap = {
                        'AESPA': 1,
                        'BLACKPINK': 2,
                        'BOYNEXTDOOR': 3,
                        'BTS': 4,
                        'ENHYPEN': 5,
                        'EXO': 6,
                        'GIRLSGENERATION': 7,
                        'ITZY': 8,
                        'LE SSERAFIM': 9,
                        'NCT': 10,
                        'NEWJEANS': 11,
                        'NMIXX': 12,
                        'FROMIS_9': 13,
                        'RIIZE': 14,
                        'STRAYKIDS': 15,
                        'SEVENTEEN': 16,
                        'SHINEE': 17,
                        'SUPERJUNIOR': 18,
                        'TXT': 19,
                        'TWICE': 20,
                        'WINNER': 21,
                        'OTHERS': 22,
                    };
                    return idolMap[idol];
                });

                await axios.post('http://localhost:8080/user-idol', {
                    serialNumber: serialNumber.value,
                    idolIds: selectedIdolIds,
                });

                alert('회원가입이 완료되었습니다! \n꿀단지를 채워보세요🍯');
            } catch (error) {
                console.error('Error during idol selection:', error.response?.data || error.message);
                alert('아이돌 선택에 실패했습니다: ' + (error.response?.data || error.message));
            }
        };

        return {
            idols,
            selectedIdols,
            selectedIdolsTags,
            toggleSelection,
            isSelected,
            submitSelection,
        };
    },
};
</script>
