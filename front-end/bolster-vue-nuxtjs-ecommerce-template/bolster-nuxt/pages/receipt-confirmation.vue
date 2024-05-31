<template>
    <div>
        <div class="container-fluid">
            <div class="row">
                <Sidebar/>
                <main role="main" class="col-md-12 ml-sm-auto col-lg-10 px-4">
                    <div
                        class="d-md-flex d-lg-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
                    >
                        <h1 class="h2">입고/상품등록 관리</h1>
                        <div class="btn-toolbar">
                            <div class="btn-group mr-2">
                                <button
                                    v-b-tooltip.hover
                                    title="Coming Soon"
                                    type="button"
                                    class="btn btn-sm btn-outline-secondary"
                                >Share
                                </button>
                                <button
                                    v-b-tooltip.hover
                                    title="Coming Soon"
                                    type="button"
                                    class="btn btn-sm btn-outline-secondary ml-2"
                                >Export
                                </button>
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
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                    <line x1="16" y1="2" x2="16" y2="6"/>
                                    <line x1="8" y1="2" x2="8" y2="6"/>
                                    <line x1="3" y1="10" x2="21" y2="10"/>
                                </svg>
                                This week
                            </button>
                        </div>
                    </div>

                    <Loader v-if="loading"/>
                    <div v-if="ordersData.length > 0">
                        <OrderPerson ref="orderPerson" :data="ordersData" />
                    </div>
                </main>
            </div>
        </div>
    </div>
</template>

<script>
import Loader from '../components/common/Loader';
import OrderPerson from '../components/admin/OrderPerson';
import Sidebar from '../components/admin/Sidebar';
import axios from 'axios';

export default {
    layout: 'admin',
    components: {
        OrderPerson,
        Loader,
        Sidebar
    },
    data() {
        return {
            loading: true,
            ordersData: []
        };
    },
    methods: {
        async fetchData() {
            try {
                const response = await axios.get('http://10.0.11.7:8080/admin/pending-processing-products', {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('JWT_TOKEN')}`
                    }
                });
                this.ordersData = response.data.map(item => ({
                    ...item,
                    images: [item.image1, item.image2, item.image3, item.image4, item.image5].filter(Boolean)
                }));
            } catch (error) {
                console.error('Error fetching orders data:', error);
            } finally {
                this.loading = false;
            }
        },
    },
    mounted() {
        this.fetchData();
    }
};
</script>

<style lang="scss">
</style>
