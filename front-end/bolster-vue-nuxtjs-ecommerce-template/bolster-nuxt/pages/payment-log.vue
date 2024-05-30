<template>
    <div>
        <div class="container-fluid">
            <div class="row">
                <Sidebar />
                <main role="main" class="col-md-12 ml-sm-auto col-lg-10 px-4">
                    <div
                        class="d-md-flex d-lg-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
                    >
                        <h1 class="h2">Payment List</h1>
                    </div>

                    <Loader v-if="loading" />
                    <div v-if="!loading">
                        <table border="1">
                            <thead>
                            <tr>
                                <th>Order ID (merchantUid)</th>
                                <th>Serial Number</th>
                                <th>Payment Gateway (pg)</th>
                                <th>Payment Method</th>
                                <th>Escrow</th>
                                <th>Product Name</th>
                                <th>Amount</th>
                                <th>Buyer Name</th>
                                <th>Date Added</th>
                                <th>Status</th>
                                <th>Success</th>
                                <th>Receipt URL</th>
                                <th>Product ID</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="payment in payments" :key="payment.merchantUid">
                                <td>{{ payment.merchantUid }}</td>
                                <td>{{ payment.serialNumber }}</td>
                                <td>{{ payment.pg }}</td>
                                <td>{{ payment.payMethod }}</td>
                                <td>{{ payment.escrow }}</td>
                                <td>{{ payment.name }}</td>
                                <td>{{ payment.amount }}</td>
                                <td>{{ payment.buyerName }}</td>
                                <td>{{ payment.dateAdded }}</td>
                                <td>{{ payment.status }}</td>
                                <td>{{ payment.success }}</td>
                                <td>
                                    <a :href="payment.receiptUrl" target="_blank">View Receipt</a>
                                </td>
                                <td>{{ payment.productId }}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Sidebar from '../components/admin/Sidebar';
import Loader from '../components/common/Loader';

export default {
    layout: 'admin',
    components: {
        Sidebar,
        Loader
    },
    data() {
        return {
            payments: [],
            loading: true
        };
    },
    created() {
        this.fetchPayments();
    },
    methods: {
        async fetchPayments() {
            try {
                const response = await axios.get('http://localhost:8080/payment/admin/payments/list');
                this.payments = response.data;
            } catch (error) {
                console.error('There was an error fetching the payments!', error);
            } finally {
                this.loading = false;
            }
        }
    }
};
</script>

<style scoped>
.container-fluid {
    padding: 0;
}

.row {
    margin: 0;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    padding: 8px 12px;
    text-align: left;
}

th {
    background-color: #f4f4f4;
}

.main {
    padding-top: 20px;
}

.card {
    margin-bottom: 20px;
}
</style>
