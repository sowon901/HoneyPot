<template>
    <div class="user-list">
        <div class="table-responsive">
            <table class="table">
                <thead>
                <tr>
                    <th>시리얼 넘버</th>
                    <th>회원 아이디</th>
                    <th>성별</th>
                    <th>생년월일</th>
                    <th>가입일</th>
                    <th>상태</th>
                    <th>작업</th>
                </tr>
                </thead>
                <tbody>
                <UserDetails v-for="user in users" :key="user.serialNumber" :user="user" />
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import UserDetails from './UserDetails.vue';

export default {
    name: 'UserList',
    components: {
        UserDetails
    },
    props: {
        users: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>

</style>
