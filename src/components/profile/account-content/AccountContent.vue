<template>
    <div v-if="isUpdatedOK"
        class="fixed top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-200 text-green-700 p-6 text-center text-lg z-50 rounded-md mt-16"
        role="alert">
        <span class="font-medium">Cập nhật thành công!!!</span>
    </div>
    <div v-if="isUpdatedFailed"
        class="fixed top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-200 text-red-700 p-6 text-center text-lg z-50 rounded-md mt-16"
        role="alert">
        <span class="font-medium">Cập nhật thất bại!!!</span>
    </div>
    <div class="account-content my-50 shadow-md">
        <div id="info-tab" class="account-info">
            <h2 class="account-page-title">
                Thông tin tài khoản
            </h2>
            <div>
                <div class="account-info-form">
                    <div class="account-info-field">
                        <div class="account-info-label">
                            Họ và tên
                        </div>
                        <div class="account-info-value">
                            {{ userInfo && userInfo.fullName ? userInfo.fullName : 'Chưa cập nhật!' }}
                        </div>
                    </div>
                    <div class="account-info-field">
                        <div class="account-info-label">
                            Email
                        </div>
                        <div class="account-info-value">
                            <span style="opacity: 0.6; font-size: 0.85em;">
                                <i>{{ userInfo && userInfo.email ? userInfo.email : 'Chưa cập nhật!' }}</i>
                            </span>
                        </div>
                    </div>
                    <div class="account-info-field">
                        <div class="account-info-label">
                            Số điện thoại
                        </div>
                        <div class="account-info-value">
                            <span style="opacity: 0.6; font-size: 0.85em;">
                                <i>{{ userInfo && userInfo.phone ? userInfo.phone : 'Chưa cập nhật!' }}</i>
                            </span>
                        </div>
                    </div>
                    <div class="account-info-field" style="position: relative;">
                        <div class="account-info-label">
                            Ngày sinh <i class="bday-note">(YYYY-MM-DD)</i>
                        </div>
                        <div class="account-info-value">
                            <span style="opacity: 0.6; font-size: 0.85em;">
                                <i>{{ userInfo && userInfo.dob ? formatDateFromLongString(userInfo.dob) : 'Chưa cập nhật!' }}</i>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="account-info-field">
                    <button @click="clickUpdate()" class="btn account-info-btn">
                        Cập nhật
                    </button>
                </div>
                <h3 class="account-page-title">
                    Thông tin đăng nhập
                </h3>
                <div class="account-info-field">
                    <div class="account-info-label">
                        Tên người dùng
                    </div>
                    <div class="account-info-value">
                        {{ userInfo && userInfo.userName ? userInfo.userName : 'Chưa cập nhật!' }}
                    </div>
                </div>
                <div class="account-info-field">
                    <div class="account-info-label">
                        Mật khẩu
                    </div>
                    <div class="account-info-value">
                        **********************
                    </div>
                </div>
                <div class="account-info-field">
                    <button @click="clickUpdate()" class="btn account-info-btn">
                        Đổi mật khẩu
                    </button>
                </div>

                <!-- Pop-up cập nhật thông tin -->
                <div v-if="showUpdateModal" class="fixed inset-0 flex items-center justify-center z-50">
                    <Toast />
                    <Form v-slot="$form" :resolver="resolver" @submit="onFormSubmit"
                        class="flex flex-col gap-4 w-full max-w-3xl mt-5 items-center">
                        <div
                            class="z-20 bg-white dark:bg-gray-800 shadow-2xl rounded-lg overflow-hidden w-screen max-w-xl pt-10 px-6 pb-4 relative">
                            <h2 class="text-3xl text-gray-900 dark:text-gray-300 pb-2 font-bold">
                                Cập nhật thông tin tài khoản
                            </h2>
                            <div class="flex flex-col gap-2 w-full border-gray-400">
                                <div>
                                    <label class="text-gray-600 dark:text-gray-400">Họ và tên
                                    </label>
                                    <InputText class="w-full" type="text" name="fullName" v-model="userInfo!.fullName" />
                                    <Message v-if="$form.fullName?.invalid" severity="error" size="small" variant="simple">{{ $form.fullName.error.message }}</Message>

                                </div>
                                <div>
                                    <label class="text-gray-600 dark:text-gray-400">Ngày sinh</label>
                                    <!-- <input v-model="userInfo!.dob"
                                        class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                                        type="date"> -->
                                    <DatePicker :maxDate="new Date()" class="w-full" v-model="userInfo!.dob" dateFormat="dd/mm/yy" />
                                </div>
                                <div>
                                    <label class="text-gray-600 dark:text-gray-400">Email</label>
                                    <input v-model="userInfo!.email"
                                        class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                                        type="email">
                                </div>
                                <!-- <div>
                                    <input v-model="userInfo!.phone"
                                    class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                                    type="text">
                                </div> -->
                                <div class="flex flex-col gap-1">
                                    <label class="text-gray-600 dark:text-gray-400">Số điện thoại</label>
                                    <InputText class="w-full" type="text" v-model="userInfo!.phone" />
                                    <!-- <Message v-if="$form.amount?.invalid" severity="error" size="small"
                                        variant="simple">{{ $form.amount.error?.message }}</Message> -->
                                </div>
                                <div class="flex justify-end">
                                    <button
                                        class="py-1.5 px-3 m-1 text-center bg-violet-700 border rounded-md text-white  hover:bg-violet-500 hover:text-gray-100 dark:text-gray-200 dark:bg-violet-700"
                                        type="submit" @click="submitUpdateInfo">
                                        Lưu thay đổi
                                    </button>
                                </div>
                                <!-- <Button type="submit" severity="secondary" label="Lưu thay đổi" /> -->
                            </div>
                            <button @click.prevent="closeForm" class="form__close" style="z-index: 10;">
                                <svg width="18" height="18" viewBox="0 0 22 22" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g opacity="0.6">
                                        <path
                                            d="M0.710153 1.39081C1.10215 0.719768 1.8828 0.603147 2.4538 1.13033L20.9665 18.2226C21.5375 18.7498 21.6826 19.7211 21.2906 20.3922V20.3922C20.8986 21.0632 20.118 21.1798 19.547 20.6526L1.03426 3.56039C0.463267 3.0332 0.318158 2.06185 0.710153 1.39081V1.39081Z"
                                            fill="black"></path>
                                        <path
                                            d="M0.821701 20.5854C0.421822 19.9218 0.552504 18.9506 1.11359 18.4163L19.4354 0.967765C19.9965 0.433427 20.7755 0.538253 21.1754 1.2019V1.2019C21.5753 1.86555 21.4446 2.83671 20.8835 3.37105L2.56168 20.8196C2.00059 21.3539 1.22158 21.2491 0.821701 20.5854V20.5854Z"
                                            fill="black"></path>
                                    </g>
                                </svg>
                            </button>
                        </div>
                    </Form>
                    <div class="form__background z-10" @click.prevent="closeForm"></div>
                    <!-- <form class="max-w-3xl mt-5 z-20" @submit.prevent="submitUpdateInfo">
                        <div
                            class="bg-white dark:bg-gray-800 shadow-2xl rounded-lg overflow-hidden w-screen max-w-xl pt-10 px-6 pb-4 relative">
                            <h2 class="text-3xl text-gray-900 dark:text-gray-300 pb-2 font-bold">
                                Cập nhật thông tin tài khoản
                            </h2>
                            <div class="flex flex-col gap-2 w-full border-gray-400">
                                <div>
                                    <label class="text-gray-600 dark:text-gray-400">Họ và tên
                                    </label>
                                    <InputText class="w-full" type="text" v-model="userInfo!.fullName" />
                                </div>
                                <div>
                                    <label class="text-gray-600 dark:text-gray-400">Ngày sinh</label> -->
                    <!-- <input v-model="userInfo!.dob"
                                        class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                                        type="date"> -->
                    <!-- <DatePicker class="w-full" v-model="userInfo!.dob" dateFormat="dd/mm/yy" />
                                </div>
                                <div>
                                    <label class="text-gray-600 dark:text-gray-400">Email</label>
                                    <input v-model="userInfo!.email"
                                        class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                                        type="email">
                                </div> -->
                    <!-- <div>
                                    <input v-model="userInfo!.phone"
                                    class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                                    type="text">
                                </div> -->
                    <!-- <div class="flex flex-col gap-1">
                                    <label class="text-gray-600 dark:text-gray-400">Số điện thoại</label>
                                    <InputText class="w-full" type="text" v-model="userInfo!.phone" /> -->
                    <!-- <Message v-if="$form.amount?.invalid" severity="error" size="small"
                                        variant="simple">{{ $form.amount.error?.message }}</Message> -->
                    <!-- </div>
                                <div class="flex justify-end">
                                    <button
                                        class="py-1.5 px-3 m-1 text-center bg-violet-700 border rounded-md text-white  hover:bg-violet-500 hover:text-gray-100 dark:text-gray-200 dark:bg-violet-700"
                                        type="submit">Lưu thay đổi</button>
                                </div>
                            </div>
                            <button @click.prevent="closeForm" class="form__close" style="z-index: 10;">
                                <svg width="18" height="18" viewBox="0 0 22 22" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g opacity="0.6">
                                        <path
                                            d="M0.710153 1.39081C1.10215 0.719768 1.8828 0.603147 2.4538 1.13033L20.9665 18.2226C21.5375 18.7498 21.6826 19.7211 21.2906 20.3922V20.3922C20.8986 21.0632 20.118 21.1798 19.547 20.6526L1.03426 3.56039C0.463267 3.0332 0.318158 2.06185 0.710153 1.39081V1.39081Z"
                                            fill="black"></path>
                                        <path
                                            d="M0.821701 20.5854C0.421822 19.9218 0.552504 18.9506 1.11359 18.4163L19.4354 0.967765C19.9965 0.433427 20.7755 0.538253 21.1754 1.2019V1.2019C21.5753 1.86555 21.4446 2.83671 20.8835 3.37105L2.56168 20.8196C2.00059 21.3539 1.22158 21.2491 0.821701 20.5854V20.5854Z"
                                            fill="black"></path>
                                    </g>
                                </svg>
                            </button>
                        </div>
                    </form> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Form } from '@primevue/forms';
import InputText from 'primevue/inputtext';
import DatePicker from 'primevue/datepicker';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import Message from 'primevue/message';
import Toast from 'primevue/toast';
import { useToast } from "primevue/usetoast";
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';

const toast = useToast();

const showUpdateModal = ref(false);
const isUpdatedOK = ref(false);
const isUpdatedFailed = ref(false);

const clickUpdate = () => {
    showUpdateModal.value = true;
}

const closeForm = () => {
    showUpdateModal.value = false;
}

const resolver = ref(zodResolver(
    z.object({
        fullName: z.string().min(1, { message: 'Trường này không được rỗng!' })
    })
));

const onFormSubmit = ({ valid }) => {
    if (valid) {
        toast.add({ severity: 'success', summary: 'Cập nhật thành công.', life: 3000 });
    }
}

const submitUpdateInfo = async () => {
    try {
        if (userInfo.value?.dob) {
            const date = new Date(userInfo.value?.dob);
            // console.log(userInfo.value?.dob)
            // const day = date.getDate();
            // const month = date.getMonth();
            // const year = date.getFullYear();
            userInfo.value.dob = formatDateFromLongString(date);
        }

        const response = await axios.put(`${baseUrl}/users/${userInfo.value.id}/update-info`, userInfo.value);
        if (response.status === 200) {
            isUpdatedOK.value = true;
            userInfo.value = response.data;
            setTimeout(() => {
                isUpdatedOK.value = false;
            }, 2000);
            showUpdateModal.value = false;
        } else {
            isUpdatedFailed.value = false;
        }
    } catch (error) {
        console.error(error);
    }
}

interface AccountInfo {
    id: number;
    fullName: string;
    userName: string;
    dob: string;
    phone: string;
    email: string;
}

const accountInfo = ref<AccountInfo | null>(null);
const userInfo = ref<AccountInfo | null>(null);
onMounted(() => {
    const storedAccount = localStorage.getItem('user');
    if (storedAccount) {
        accountInfo.value = JSON.parse(storedAccount);
        if (accountInfo.value) {
            fetchUserInfo(accountInfo.value.userName);
        }
    }
});

const baseUrl = 'http://localhost:8080';
async function fetchUserInfo(username: string) {
    try {
        const response = await axios.get(`${baseUrl}/users/username/${username}`);
        userInfo.value = response.data;
    } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
    }
}

const formatDateFromLongString = (dob: string) => {
    const dateObject = new Date(dob);

    const formattedDate = dateObject.getFullYear() + '-' +
        String(dateObject.getMonth() + 1).padStart(2, '0') + '-' +
        String(dateObject.getDate()).padStart(2, '0');

    return formattedDate
}

const formatDate = (Dob: string) => {
    const parts = Dob.split('-');
    const reversedDob = `${parts[2]}/${parts[1]}/${parts[0]}`;
    const dateOfBirthToDisplay = reversedDob;
    return dateOfBirthToDisplay;
}
</script>

<style scoped>
.account-content {
    position: relative;
    display: flex;
    align-items: center;
    padding: 2rem 3rem;
    transition: all .2s;
    border-radius: 0.5rem;
    font-size: 1rem;
    box-sizing: border-box;
    background-color: white;
    width: 100%;
    /* box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; */
}

.account-page-title {
    margin-bottom: 25px;
    font-size: 2.5rem;
}

.account-info-field {
    display: flex;
    align-items: center;
    font-size: 18px;
    margin-bottom: 1.5rem;
}

.account-info-label {
    width: 300px;
    max-width: 50%;
    font-size: 18px;
    color: rgba(0, 0, 0, .5333333333);
}

.account-info-value {
    text-wrap: wrap;
}

.account-info-btn {
    height: 50px;
    border: 1px solid #000;
    background-color: #fff;
    border-radius: 100vmax;
    color: #000;
    text-transform: uppercase;
    font-weight: 700;
    padding: 0px 30px;
}

.account-info-btn:hover {
    background-color: #000;
    border: 1px solid #000;
    color: #fff;
    transition: 0.4s;
}

.bday-note {
    color: #999;
    font-size: 0.9rem;
}

.form__close {
    position: absolute;
    height: 0;
    top: 1rem;
    right: 1rem;
    background-color: #0000;
    border: 0;
    cursor: pointer;
}

.form__background {
    position: absolute;
    width: 100%;
    height: 100%;
    transition: all .3s;
    background: rgba(0, 0, 0, .6);
}
</style>