<template>
    <div>
        <div class="container-fluid">
            <div class="row">
                <Sidebar />
                <main role="main" class="col-md-12 ml-sm-auto col-lg-10 px-4">
                    <div
                        class="d-md-flex d-lg-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
                    >
                        <h1 class="h2">회원 관리</h1>
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
                    <UserList :users="users" />
                    <Loader v-if="loading" />
                    <div v-if="ordersData.length > 0">
                    </div>
<!--                    <div v-else>
                        <h3>
                            <i>There are no orders right now!!</i>
                        </h3>
                    </div>-->
                </main>
            </div>
        </div>
    </div>
</template>

<script>
import Loader from '../components/common/Loader'
import UserList from '../components/admin/UserList'
import Sidebar from '../components/admin/Sidebar'

export default {
    layout: 'admin',
    components: {
        UserList,
        Loader,
        Sidebar
    },
    data() {
        return {
            loading: true,
            ordersData: [],
            users: []  // Add users array
        }
    },
    mounted() {
        // Fetch user data from Spring Boot endpoint
        fetch('http://localhost:8080/admin/get-users') // Include the full URL with port if necessary
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                this.users = data;
                this.loading = false;
            })
            .catch(error => {
                console.error('Error fetching users:', error);
                this.loading = false;
            });

        this.loadScript("https://code.jquery.com/jquery-3.3.1.slim.min.js", () => {
            this.loadScript("https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js", () => {
                this.loadScript("https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js", () => {
                    console.log("All scripts loaded");
                });
            });
        });
    },
    methods: {
        loadScript(src, callback) {
            let script = document.createElement('script');
            script.onload = () => {
                if (callback) callback();
            };
            script.src = src;
            document.head.appendChild(script);
        }
    },
}
</script>

<style lang="scss">
/* Add your styles here */
</style>
