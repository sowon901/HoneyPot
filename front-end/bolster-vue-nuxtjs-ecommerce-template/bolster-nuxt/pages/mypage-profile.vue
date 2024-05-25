<template>
    <div class="container">
        <div class="wrapper">
            <div class="content">
                <div class="sidebar">
                    <Sidebar/>
                </div>
                <div class="user-info">
                    <div class="header">
                        <h4>프로필 관리</h4>
                        <button @click="saveProfile" class="save-button">저장</button>
                    </div>
                    <hr class="section-divider"/>
                    <div class="profile-container">
                        <div class="profile-pic">
                            <!-- 이미지 또는 기본 이미지를 v-show로 제어 -->
                            <img v-show="profileImage" :src="profileImage" alt="프로필 사진" class="image"/>
                            <div v-show="!profileImage" class="default-image"></div>
                            <button class="upload-button" @click.stop="triggerUpload">+</button>
                            <input type="file" ref="fileInput" @change="previewImage" style="display: none;"/>
                        </div>

                        <input v-model="nickname" placeholder="닉네임" class="nickname-input"/>
                    </div>
                    <hr class="section-divider"/>
                    <div class="interests">
                        <button v-for="(tag, index) in tags" :key="tag"
                                :class="{ selected: isSelectedTag(index + 1) }"
                                @click="toggleTag(index + 1)">
                            {{ tag }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from '../components/all-products/Sidebar'
import apiClient from '../api/apiClient';

export default {
    components: {
        Sidebar
    },
    data() {
        return {
            defaultImage: require('@/assets/img/favicon-honeyPot.png'),
            profileImage: null,
            nickname: '',
            tags: ['AESPA', 'BLACKPINK', 'BOYNEXTDOOR', 'BTS', 'ENHYPEN', 'EXO', 'GIRLSRENERATION', 'ITZY', 'LESSERAFIM', 'NCT', 'NEWJEANS', 'NMIXX', 'FROMIS_9', 'RIIZE', 'STRAYKIDS', 'SEVENTEEN', 'SHINEE', 'SUPERJUNIOR', 'TXT', 'TWICE', 'WINNER', 'OTHERS'],
            selectedTags: [],
            profile: null,
            serialNumber: null
        }
    },
    async mounted() {
        const accessToken = sessionStorage.getItem('JWT_TOKEN');
        const accessTokenExpiration = sessionStorage.getItem('ACCESS_TOKEN_EXPIRATION');

        console.log('Access Token:', accessToken);
        console.log('Access Token Expiration:', accessTokenExpiration);

        if (new Date(accessTokenExpiration) <= new Date()) {
            console.log('Access Token is expired. Need to refresh token.');
            await this.refreshAccessToken();
        }

        await this.fetchProfile();
    },
    methods: {
        async refreshAccessToken() {
            const refreshToken = sessionStorage.getItem('REFRESH_TOKEN');
            try {
                const response = await apiClient.post('/auth/refresh', {refreshToken});
                const newAccessToken = response.data.accessToken;
                const newAccessTokenExpiration = response.data.accessTokenExpiration;

                sessionStorage.setItem('JWT_TOKEN', newAccessToken);
                sessionStorage.setItem('ACCESS_TOKEN_EXPIRATION', newAccessTokenExpiration);

                console.log('Access Token refreshed successfully:', newAccessToken);
            } catch (error) {
                console.error('Failed to refresh access token:', error);
                this.formError = 'Failed to refresh access token. Please log in again.';
            }
        },
        async fetchProfile() {
            try {
                const response = await apiClient.get('/auth/user-info');
                console.log('User info fetched successfully:', response.data);
                this.serialNumber = response.data.data.serialNumber;
                console.log(this.serialNumber);
            } catch (error) {
                console.error('Error fetching user info:', error);
                this.formError = 'Failed to fetch user information.';
            }

            if (!this.serialNumber) {
                console.error('Serial number is not available.');
                this.formError = 'Failed to fetch profile information.';
                return;
            }

            try {
                const response = await apiClient.get(`/mypage-profile/${this.serialNumber}`); // 백엔드 엔드포인트에 맞게 수정
                console.log('Profile fetched successfully:', response.data);
                const { profileImage, nickname, tag1, tag2, tag3 } = response.data;
                this.profileImage = profileImage;
                this.nickname = nickname;
                this.selectedTags = [tag1, tag2, tag3].map(Number).filter(tag => tag); // null 또는 빈 태그 제거
            } catch (error) {
                console.error('Error fetching profile:', error);
                this.formError = 'Failed to fetch profile information.';
            }
        },
        async saveProfile() {
            if (!this.serialNumber) {
                console.error('Serial number is not available.');
                this.formError = 'Failed to save profile information.';
                return;
            }
            const formData = new FormData();
            const userDTO = {
                nickname: this.nickname,
                tag1: this.selectedTags[0] || '',
                tag2: this.selectedTags[1] || '',
                tag3: this.selectedTags[2] || ''
            };
            formData.append('userDTO', new Blob([JSON.stringify(userDTO)], {type: 'application/json'}));
            if (this.$refs.fileInput.files[0]) {
                formData.append('profileImageFile', this.$refs.fileInput.files[0]);
            }

            try {
                const response = await apiClient.post(`/mypage-profile/${this.serialNumber}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log("Profile updated successfully:", response.data);
                alert("Profile updated successfully");
            } catch (error) {
                console.error("Failed to update profile:", error);
                alert("Failed to update profile");
            }
        },
        toggleTag(tag) {
            const index = this.selectedTags.indexOf(tag);
            if (index >= 0) {
                this.selectedTags.splice(index, 1);
            } else {
                if (this.selectedTags.length < 3) {
                    this.selectedTags.push(tag);
                } else {
                    alert('최대 3개까지만 선택 가능합니다!');
                }
            }
        },
        isSelectedTag(tag) {
            return this.selectedTags.includes(tag);
        },
        triggerUpload() {
            this.$refs.fileInput.click();
        },
        previewImage(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.profileImage = e.target.result;
                };
                reader.readAsDataURL(file);
            } else {
                this.profileImage = this.defaultImage; // 파일이 없을 경우 기본 이미지 설정
            }
        },
    }
}
</script>


<style scoped>


.wrapper .content {
    display: flex;
    width: 100%;
    padding-top: 100px;
}

.sidebar {
    flex: 1;
}

.user-info {
    flex: 3;
    padding: 5px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.save-button {
    background-color: #ffb400;
    color: white;
    border-radius: 10px;
    padding: 7px 15px;
    border: none;
    cursor: pointer;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;
}

.nickname-input {
    margin-left: 20px;
    padding: 5px 10px;
    border-radius: 10px;
    border: 1px solid #ccc;
    width: 200px;
}

.upload-button {
    position: absolute;
    bottom: 0px;
    right: 0px;
    width: 30px;
    height: 30px;
    background-color: black;
    color: white;
    border-radius: 50%;
    border: none;
    font-size: 16px;
    cursor: pointer;
}

.profile-container {
    display: flex;
    align-items: center;
    position: relative;
}

.profile-pic {
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #dfdfdf;
    display: flex;
    justify-content: center;
    align-items: center;
}

.profile-pic .default-image {
    width: 100%;
    height: 100%;
    background-image: url('@/assets/img/favicon-honeyPot.png');
    background-size: cover;
    border-radius: 50%;
    overflow: hidden;
}

.image {
    width: 100%;
    height: 100%;
    background-size: cover;
    border-radius: 50%;
    overflow: hidden;
}

.interests {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
}

.interests button {
    border: none;
    border-radius: 10px;
    padding: 5px 10px;
    cursor: pointer;
    background-color: white;
    color: black;
}

.interests .selected {
    background-color: #ffb400;
    color: white;
}

.section-divider {
    margin-top: 10px;
    border: 1px #ccc;

}
</style>
