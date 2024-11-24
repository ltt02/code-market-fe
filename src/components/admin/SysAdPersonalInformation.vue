<template>
    <!-- <ThemeSwitcher /> -->
    <div class="w-full h-full flex mt-6">
        <div class="w-1/3">
            <div class="my-2 text-center">
                <div class="flex flex-col items-center"><img class="w-48 h-48 rounded-full"
                        :src="sysAdInfo ? sysAdInfo.avatar : 'https://inkythuatso.com/uploads/thumbnails/800/2023/03/9-anh-dai-dien-trang-inkythuatso-03-15-27-03.jpg'">
                </div>
                <div class="my-2 text-2xl">{{ sysAdInfo &&
                    sysAdInfo.userName ? sysAdInfo.userName : 'Chưa cập nhật!' }}</div>
            </div>
            <div class="flex items-center justify-center">
                <div class="py-4"></div>
                <div class="py-4"><button
                        class="text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Cập nhật
                        thông tin
                    </button>
                </div>
                <div class="py-8"></div>
            </div>

        </div>

        <div class="w-2/3 mx-3 overflow-auto " style="max-height: 500px;">
            <div class="text-xl shadow-md w-2/3 m-2 px-3 py-4 bg-white rounded-lg font-light overflow-auto"><b
                    class="font-bold">
                    Họ và tên:</b> {{
                        sysAdInfo &&
                            sysAdInfo.fullName ? sysAdInfo.fullName : 'Chưa cập nhật! ' }}</div>

            <div class="text-xl shadow-md w-2/3 m-2 px-3 py-4 bg-white rounded-lg font-light overflow-auto"><b
                    class="font-bold">
                    Số điện thoại:</b>
                {{ sysAdInfo &&
                    sysAdInfo.phone ? sysAdInfo.phone : 'Chưa cập nhật!' }}</div>

            <div class="text-xl shadow-md w-2/3 m-2 px-3 py-4 bg-white rounded-lg font-light overflow-auto"><b
                    class="font-bold">
                    Email:</b> {{
                        sysAdInfo &&
                            sysAdInfo.email ? sysAdInfo.email : 'Chưa cập nhật!' }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeMount } from 'vue';
import axios from 'axios';
// import ThemeSwitcher from '@/components/common/ThemeSwitcher.vue'

interface SysAdInfo {
    userName: string;
    dob: string;
    phone: string;
    email: string;
    fullName: string;
}

const sysAdInfo = ref<SysAdInfo | null>(null);
const userInfo = ref<SysAdInfo | null>(null);
const isDataLoaded = ref(false);

onBeforeMount(() => {
    const storedAccount = localStorage.getItem('sysad');
    if (storedAccount) {
        sysAdInfo.value = JSON.parse(storedAccount);
        if (sysAdInfo.value) {
            isDataLoaded.value = true;
        }
    }
});
</script>

<style scoped></style>