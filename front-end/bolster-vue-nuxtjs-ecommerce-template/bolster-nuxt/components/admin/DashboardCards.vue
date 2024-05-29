<template>
    <div class="row">
        <div class="col-md-4 mb-3" v-for="card in cards" :key="card.title">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{{ card.title }}</h5>
                    <p class="card-text">{{ card.value }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'DashboardCards',
    data() {
        return {
            todayVisitors: 152,
            todayRegistrations: 15,
            todayDeactivations: 2,
            todayBids: 135,
            ongoingAuctions: 21,
            closedAuctions: 6
        };
    },
    computed: {
        cards() {
            return [
                { title: '오늘 접속자 수', value: this.todayVisitors },
                { title: '오늘 회원 가입 수', value: this.todayRegistrations },
                { title: '오늘 탈퇴한 수', value: this.todayDeactivations },
                { title: '오늘 총 입찰 수', value: this.todayBids },
                { title: '진행 중인 경매 건 수', value: this.ongoingAuctions },
                { title: '오늘 마감된 건수', value: this.closedAuctions }
            ];
        }
    },
    created() {
        this.fetchDashboardData();
    },
    methods: {
        fetchDashboardData() {
            axios.get('/admin/bids/today-count')
                .then(response => {
                    this.todayBids = response.data;
                });

            axios.get('/admin/visitors/today-count')
                .then(response => {
                    this.todayVisitors = response.data;
                });

            axios.get('/admin/registrations/today-count')
                .then(response => {
                    this.todayRegistrations = response.data;
                });

            axios.get('/admin/deactivations/today-count')
                .then(response => {
                    this.todayDeactivations = response.data;
                });

            axios.get('/admin/auctions/ongoing-count')
                .then(response => {
                    this.ongoingAuctions = response.data;
                });

            axios.get('/admin/auctions/closed-today-count')
                .then(response => {
                    this.closedAuctions = response.data;
                });
        }
    }
}
</script>

<style scoped>
.card {
    margin-bottom: 20px;
    text-align: center;
}

.card-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100px;
}

.card-text {
    font-size: 2em;
    font-weight: bold;
}
</style>
