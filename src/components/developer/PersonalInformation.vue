<template>
    <!-- <ThemeSwitcher /> -->
    <div class="w-full h-full flex mt-6">
        <div class="w-1/3">
            <div class="my-2 text-center">
                <div class="flex flex-col items-center"><img class="w-48 h-48 rounded-full"
                        :src="developerInfo ? developerInfo.avatar : 'https://inkythuatso.com/uploads/thumbnails/800/2023/03/9-anh-dai-dien-trang-inkythuatso-03-15-27-03.jpg'">
                </div>
                <div class="my-2 text-2xl">{{ developerInfo &&
                    developerInfo.userName ? developerInfo.userName : 'Chưa cập nhật!' }}</div>
            </div>
            <div class="flex items-center justify-center">
                <div class="py-4"></div>
                <div class="py-4"><button
                        class="text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Cập nhật
                        thông tin</button></div>
                <div class="py-8"></div>
            </div>

        </div>

        <div class="w-2/3 mx-3 overflow-auto " style="max-height: 500px;">
            <div class="shadow-md w-2/3 m-2 px-3 py-4 bg-white rounded-lg font-light overflow-auto"><b
                    class="font-bold">
                    Mã số sinh viên:</b>
                {{ developerInfo &&
                    developerInfo.studentId ? developerInfo.studentId : 'Chưa cập nhật!' }}</div>
            <div class="shadow-md w-2/3 m-2 px-3 py-4 bg-white rounded-lg font-light overflow-auto"><b
                    class="font-bold">
                    Họ và tên:</b> {{
                        developerInfo &&
                            developerInfo.fullName ? developerInfo.fullName : 'Chưa cập nhật! ' }}</div>
            <div class="shadow-md w-2/3 m-2 px-3 py-4 bg-white rounded-lg font-light overflow-auto"><b
                    class="font-bold">
                    Chuyên ngành:</b> {{
                        developerInfo &&
                            developerInfo.major.name ? developerInfo.major.name : 'Chưa cập nhật!' }}
            </div>
            <div class="shadow-md w-2/3 m-2 px-3 py-4 bg-white rounded-lg font-light overflow-auto"><b
                    class="font-bold">
                    Có kinh nghiệm làm việc với:</b> {{
                        developerInfo &&
                            developerInfo.skills ? skillList : 'Chưa cập nhật!' }}
            </div>

            <div class="shadow-md w-2/3 m-2 px-3 py-4 bg-white rounded-lg font-light overflow-auto"><b
                    class="font-bold">
                    Số điện thoại:</b>
                {{ developerInfo &&
                    developerInfo.phone ? developerInfo.phone : 'Chưa cập nhật!' }}</div>
            <div class="shadow-md w-2/3 m-2 px-3 py-4 bg-white rounded-lg font-light overflow-auto"><b
                    class="font-bold">
                    Email:</b> {{
                        developerInfo &&
                            developerInfo.email ? developerInfo.email : 'Chưa cập nhật!' }}</div>
            <div class="shadow-md w-2/3 m-2 px-3 py-4 bg-white rounded-lg font-light overflow-auto"><b
                    class="font-bold">
                    Github:</b> {{
                        developerInfo &&
                            developerInfo.githubProfile ? developerInfo.githubProfile : 'Chưa cập nhật! ' }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeMount } from 'vue';
import axios from 'axios';
// import ThemeSwitcher from '@/components/common/ThemeSwitcher.vue'

interface DeveloperInfo {
    studentId: string;
    userName: string;
    dob: string;
    phone: string;
    email: string;
    fullName: string;
    major: string;
    skills: [];
}

const developerInfo = ref<DeveloperInfo | null>(null);
const userInfo = ref<DeveloperInfo | null>(null);
const isDataLoaded = ref(false);
const skillList = ref([]);

onBeforeMount(() => {
    const storedAccount = localStorage.getItem('developer');
    if (storedAccount) {
        developerInfo.value = JSON.parse(storedAccount);
        skillList.value = developerInfo.value.skills.map(skill => skill.name).sort().join(', ');
        if (developerInfo.value) {
            fetchUserInfo(developerInfo.value.account);
            isDataLoaded.value = true;
        }
    }
});

async function fetchUserInfo(username: string) {
    try {
        const response = await axios.get(`http://localhost:8080/users/username/${username}`);
        userInfo.value = response.data;
        if (userInfo.value && userInfo.value.dob) {
            const parts = userInfo.value.dob.split('-');
            const reversedDob = `${parts[2]}/${parts[1]}/${parts[0]}`;
            userInfo.value.dob = reversedDob;
        }
    } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
    }
}
</script>

<style scoped></style>