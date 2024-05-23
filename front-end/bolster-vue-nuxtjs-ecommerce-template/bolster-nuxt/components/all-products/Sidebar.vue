<template>
    <div class="container">
    <div>
        <div class="content">
        <h4>마이페이지</h4>
    </div>
        <hr>
        <div>
            <h5>계정 관리</h5>
            <ul style="list-style-type: none;">
                <li>
                    <a href="/mypage-profile">프로필 관리</a>
                </li>
                <li>
                    <a href="/mypage-payment">결제수단 관리</a>
                </li>
                <li>
                    <a href="/mypage-password">비밀번호 변경</a>
                </li>
                <li>
                    <a href="/mypage-address">배송지 관리</a>
                </li>
                <li>
                    <a href="/mypage-stock">입고 요청</a>
                </li>
            </ul>
        </div>
        <div>
            <h5>내역</h5>
            <ul style="list-style-type: none;">
                <li :class="{ active: isActive }">
                    <nuxt-link to="/purchase-history">구매 목록</nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/sales-history">판매 목록</nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/bid-history">입찰 목록</nuxt-link>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>
<script>
export default {
    props: {
        isActive: Boolean
    }
}
</script>
<style scoped="scoped">
.content {
    flex: 3;
  padding: 3px;
}
li {
    margin: 15px 0;
    font-size: 18px;
}

a {
    color: black;
}

.active,
a:hover {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    /* 호버시에 텍스트 그림자 효과 추가 */
}
</style>