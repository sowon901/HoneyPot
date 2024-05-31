<template>
    <div>
        <div class="container-fluid">
            <div class="row">
                <Sidebar />
                <main role="main" class="col-md-12 ml-sm-auto col-lg-10 px-4">
                    <div
                        class="d-md-flex d-lg-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
                    >
                        <h1 class="h2">Dashboard</h1>
                        <div class="btn-toolbar">
                            <div class="btn-group mr-2">
                                <button
                                    v-b-tooltip.hover
                                    title="Coming Soon"
                                    type="button"
                                    class="btn btn-sm btn-outline-secondary"
                                >Share</button>
                                <button
                                    v-b-tooltip.hover
                                    title="Coming Soon"
                                    type="button"
                                    class="btn btn-sm btn-outline-secondary ml-2"
                                >Export</button>
                            </div>
                            <button
                                v-b-tooltip.hover
                                title="Coming Soon"
                                type="button"
                                class="btn btn-sm btn-outline-secondary dropdown-toggle"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="feather feather-calendar"
                                >
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                                This week
                            </button>
                        </div>
                    </div>

                    <Loader v-if="loading" />
                    <div v-if="!loading">
                        <DashboardCards
                            :todayVisitors="todayVisitors"
                            :todayRegistrations="todayRegistrations"
                            :todayDeactivations="todayDeactivations"
                            :todayBids="todayBids"
                            :ongoingAuctions="ongoingAuctions"
                            :closedAuctions="closedAuctions"
                        />
                    </div>
                </main>
            </div>
        </div>
    </div>
</template>

<script>
import Loader from '../components/common/Loader'
import Sidebar from '../components/admin/Sidebar'
import DashboardCards from '../components/admin/DashboardCards'
import axios from 'axios';

export default {
    layout: 'admin', // 관리자 레이아웃을 사용하도록 설정
    components: {
        Sidebar,
        Loader,
        DashboardCards
    },
    data() {
        return {
            loading: true,
            todayVisitors: 0,
            todayRegistrations: 0,
            todayDeactivations: 0,
            todayBids: 0,
            ongoingAuctions: 0,
            closedAuctions: 0,
        }
    },
    methods: {
        async fetchData() {
            try {
                const response = await axios.get('http://10.0.11.7:8080/admin/dashboard-stats');
                const data = response.data;
                this.todayVisitors = data.todayVisitors;
                this.todayRegistrations = data.todayRegistrations;
                this.todayDeactivations = data.todayDeactivations;
                this.todayBids = data.todayBids;
                this.ongoingAuctions = data.ongoingAuctions;
                this.closedAuctions = data.closedAuctions;
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                this.loading = false;
            }
        }
    },
    mounted() {
        this.fetchData();
    }
}
</script>

<style lang="scss">
.container-fluid {
    padding: 0;
}

.row {
    margin: 0;
}

.sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 100; /* Behind the navbar */
    padding: 48px 0 0; /* Height of navbar */
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
}

.main {
    padding-top: 20px;
}

.card {
    margin-bottom: 20px;
}
</style>
