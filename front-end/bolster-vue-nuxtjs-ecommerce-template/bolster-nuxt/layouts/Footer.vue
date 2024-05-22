<template>
    <footer class="footer-area">
            <hr class="footer-line" />
            <div class="container">
                <div class="footer-links" style="font-size: 18px; margin-bottom: 20px;">
                    <div class="footer-link">회사소개</div>
                    <div class="footer-link">
                        <nuxt-link to="/policy">이용약관</nuxt-link>
                    </div>
                    <div class="footer-link">개인정보처리방침</div>
                </div>
                <div class="footer-text" style="color: #666;">
                    주식회사 봄비 . 대표 꿀벌 . 사업자등록번호 : 123-45-67890 . 통신판매업 : 제2024-벌집-1139
                    <br>
                    사업장 소재지 : 꿀벌특별시 아카시아구 조청419길 11, 벌집빌딩 1층(12345) 개인정보보호책임 일벌1
                    <br>
                    <div style="margin-top: 10px;">
                    Copyright C 2024 봄비 All Rights Reserved
                    </div>
                </div>
            </div>
    </footer>
</template>
<style scoped>
.footer-links {
    display: flex; /* Flexbox를 사용하여 가로로 나열 */
    flex-direction: row; /* 기본값은 row이므로, 요소들을 가로로 정렬 */
    align-items: center; /* 세로 중앙 정렬 */
    margin-bottom: 20px; /* 하단 여백 추가 */
}

.footer-link {
    margin-right: 20px; /* 각 링크 사이의 오른쪽 마진 */
    color: black; /* 글자 색상 */
}

.footer-link nuxt-link, .footer-link a {
    color: black; /* 링크 글자색 변경 */
    text-decoration: none; /* 밑줄 제거 */
}

</style>