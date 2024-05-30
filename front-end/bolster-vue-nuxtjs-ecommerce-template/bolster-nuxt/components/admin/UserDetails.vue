<template>
    <tr>
        <td>{{ user.serialNumber }}</td>
        <td>{{ user.userId }}</td>
        <td>{{ genderDisplay }}</td>
        <td>{{ user.birthdate }}</td>
        <td>{{ user.registrationDate }}</td>
        <td>{{ user.state }}</td>
        <td>
            <div class="btn-group-vertical">
<!--                <button class="btn btn-view btn-sm">보기</button>-->
                <div class="btn-group-horizontal">
                    <button class="btn btn-success btn-sm" @click="updateUserState('ACTIVE')">활동</button>
                    <button class="btn btn-warning btn-sm" @click="updateUserState('SUSPENDED')">정지</button>
                    <button class="btn btn-danger btn-sm" @click="updateUserState('DEACTIVATED')">제명</button>
                </div>
            </div>
        </td>
    </tr>
</template>

<script>
import axios from 'axios';

export default {
    name: 'UserDetails',
    props: {
        user: {
            type: Object,
            required: true
        }
    },
    computed: {
        genderDisplay() {
            if (this.user.gender === 'female') return '여성';
            if (this.user.gender === 'male') return '남성';
            return '미정';
        }
    },
    methods: {
        async updateUserState(newState) {
            try {
                const response = await axios.post('http://localhost:8080/admin/user-state', {
                    userId: this.user.userId,
                    state: newState
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.status === 200) {
                    this.user.state = newState; // 상태를 직접 업데이트하여 UI에 반영
                } else {
                    console.error('Error updating user state:', response.data);
                }
            } catch (error) {
                console.error('Error updating user state:', error);
            }
        }
    }
}
</script>

<style scoped>
.btn-group-vertical {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
}
.btn-group-horizontal {
    display: flex;
    align-items: center;
    width: 100%;
}
.btn-view {
    background-color: lightgray;
    color: black;
    margin-bottom: 5px;
    width: 100%;
}
.btn-view:hover {
    background-color: #e6e6e6;
    color: black;
}
.btn-group-horizontal .btn {
    flex: 1;
    margin-right: 2px;
}
.btn-group-horizontal .btn:last-child {
    margin-right: 0;
}
</style>
