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
    <!-- <div class="card flex justify-center z-50">
        <ProgressSpinner />
    </div> -->
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
                                <i>{{ userInfo && userInfo.dob ? formatDate(userInfo.dob) : 'Chưa cập nhật!' }}</i>
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
                    <button @click="showChangePasswordModal = true" class="btn account-info-btn">
                        Đổi mật khẩu
                    </button>
                </div>

                <!-- Pop-up cập nhật thông tin -->


                <div v-if="showUpdateModal" class="fixed inset-0 flex items-center justify-center z-40">
                    <!-- <Toast /> -->
                    <Form v-slot="$form" :initialValues :resolver :validateOnValueUpdate="true" :validateOnBlur="true"
                        @submit="onFormSubmit" class="flex flex-col gap-4 w-full max-w-3xl mt-5 items-center">
                        <div
                            class="z-20 bg-white dark:bg-gray-800 shadow-2xl rounded-lg overflow-hidden w-screen max-w-xl pt-10 px-6 pb-4 relative">
                            <h2 class="text-3xl text-gray-900 dark:text-gray-300 pb-2 font-bold">
                                Cập nhật thông tin tài khoản
                            </h2>
                            <div class="flex flex-col gap-2 w-full border-gray-400">
                                <div>
                                    <label class="text-gray-600 dark:text-gray-400">Họ và tên
                                    </label>
                                    <InputText class="w-full" type="text" name="fullName" />
                                    <Message v-if="$form.fullName?.invalid" severity="error" size="small"
                                        variant="simple">{{ $form.fullName.error.message }}</Message>
                                </div>
                                <div>
                                    <label class="text-gray-600 dark:text-gray-400">Ngày sinh</label>
                                    <!-- <input v-model="userInfo!.dob"
                                        class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                                        type="date"> -->
                                    <DatePicker showIcon fluid iconDisplay="input" :maxDate="maxDate" class="w-full"
                                        dateFormat="dd/mm/yy" name="dob" />
                                    <Message v-if="$form.dob?.invalid" severity="error" size="small" variant="simple">{{
                                        $form.dob.error.message }}</Message>
                                </div>
                                <div>
                                    <label class="text-gray-600 dark:text-gray-400">Email</label>
                                    <InputText class="w-full" type="email" name="email" />
                                    <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">
                                        {{ $form.email.error.message }}</Message>
                                </div>
                                <!-- <div>
                                    <input v-model="userInfo!.phone"
                                    class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                                    type="text">
                                </div> -->
                                <div class="flex flex-col gap-1">
                                    <label class="text-gray-600 dark:text-gray-400">Số điện thoại</label>
                                    <InputText class="w-full" type="text" name="phone" />
                                    <Message v-if="$form.phone?.invalid" severity="error" size="small" variant="simple">
                                        {{ $form.phone.error.message }}</Message>
                                </div>
                                <div class="flex justify-end">
                                    <button
                                        class="py-1.5 px-3 m-1 text-center bg-violet-700 border rounded-md text-white  hover:bg-violet-500 hover:text-gray-100 dark:text-gray-200 dark:bg-violet-700">
                                        Lưu thay đổi
                                    </button>
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
                    </Form>
                    <div class="form__background z-10" @click.prevent="closeForm"></div>
                </div>

                <div v-if="showChangePasswordModal" class="fixed inset-0 flex items-center justify-center z-40">
                    <Form v-slot="$form" :initialValuesForPasswordForm :resolver :validateOnValueUpdate="true" :validateOnBlur="true"
                        @submit="onFormSubmit" class="flex flex-col gap-4 w-full max-w-3xl mt-5 items-center">
                        <div
                            class="z-20 bg-white dark:bg-gray-800 shadow-2xl rounded-lg overflow-hidden max-w-xl pt-10 px-6 pb-4 relative">
                            <h2 class="text-3xl text-gray-900 dark:text-gray-300 pb-2 font-bold">
                                Đổi mật khẩu
                            </h2>
                            <div class="flex flex-col gap-2 w-full border-gray-400">
                                <div class="flex flex-col">
                                    <label class="text-gray-600 dark:text-gray-400">Mật khẩu hiện tại</label>
                                    <Password name="currentPassword" v-model="currentPassword" toggleMask :feedback="false"/>
                                    <Message v-if="$form.currentPassword?.invalid" severity="error" size="small"
                                        variant="simple">{{ $form.currentPassword.error.message }}</Message>
                                </div>
                                <div class="flex flex-col">
                                    <label class="text-gray-600 dark:text-gray-400">Mật khẩu mới</label>
                                    <Password name="newPassword" v-model="newPassword" toggleMask promptLabel="Nhập mật khẩu" weakLabel="Yếu" mediumLabel="Trung bình" strongLabel="Mạnh" />
                                    <Message v-if="$form.newPassword?.invalid" severity="error" size="small"
                                        variant="simple">{{ $form.newPassword.error.message }}</Message>
                                </div>
                                <div class="flex flex-col">
                                    <label class="text-gray-600 dark:text-gray-400">Nhập lại mật khẩu mới</label>
                                    <Password name="confirmedPassword" v-model="confirmedPassword" toggleMask promptLabel="Nhập mật khẩu" weakLabel="Yếu" mediumLabel="Trung bình" strongLabel="Mạnh" />
                                    <Message v-if="$form.confirmedPassword?.invalid" severity="error" size="small"
                                        variant="simple">{{ $form.confirmedPassword.error.message }}</Message>
                                </div>
                                <div class="flex justify-end">
                                    <button @click="changePassword"
                                        class="py-1.5 px-3 m-1 text-center bg-violet-700 border rounded-md text-white  hover:bg-violet-500 hover:text-gray-100 dark:text-gray-200 dark:bg-violet-700">
                                        Lưu thay đổi
                                    </button>
                                </div>
                            </div>
                            <button @click.prevent="showChangePasswordModal = false" class="form__close" style="z-index: 10;">
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
                    <div class="form__background z-10" @click.prevent="showChangePasswordModal = false"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { Form } from '@primevue/forms';
import { FormField } from '@primevue/forms';
import InputText from 'primevue/inputtext';
import DatePicker from 'primevue/datepicker';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Message from 'primevue/message';
import Toast from 'primevue/toast';
import ProgressSpinner from 'primevue/progressspinner';
import Password from 'primevue/password';
import { useToast } from "primevue/usetoast";
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { yupResolver } from '@primevue/forms/resolvers/yup';
import * as yup from 'yup';
import _ from 'lodash';
import { z } from 'zod';
import axios from 'axios';


const toast = useToast();

const maxDate = ref(new Date());
const minDate = ref(new Date());
const visible = ref(false);
const isDialogOK = ref(false);
const currentPassword = ref('');
const newPassword = ref('');
const confirmedPassword = ref('');

const initialValues = ref({
    fullName: '',
    dob: '',
    email: '',
    phone: '',
});

const initialValuesForPasswordForm = ref({
    currentPassword: '',
    newPassword: '',
    confirmedPassword: '',
});

const showUpdateModal = ref(false);
const showChangePasswordModal = ref(false);
const isUpdatedOK = ref(false);
const isUpdatedFailed = ref(false);
const isLoading = ref(false);

const changePassword = async () => {
    
}

const clickUpdate = () => {
    showUpdateModal.value = true;
}

const closeForm = () => {
    showUpdateModal.value = false;
}

const resolver = ref(yupResolver(
    yup.object().shape({
        fullName: yup
            .string()
            .min(2, 'Họ và tên phải có ít nhất 2 ký tự')
            .required('Họ và tên không được để trống'),
        dob: yup
            .string()
            .required('Ngày sinh không được để trống'),
        email: yup
            .string()
            .email('Email không hợp lệ')
            .required('Email không được để trống'),
        phone: yup
            .string()
            .matches(
                /^(?:\+84|0)(?:3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])\d{7}$/,
                'Số điện thoại không đúng định dạng!'
            )
            .required('Số điện thoại không được để trống'),
        newPassword: yup
            .string()
            .matches(/^(?=.*[A-Za-z])(?=.*\d).+$/, 'Mật khẩu phải chứa ít nhất 1 số và 1 chữ cái')
            .min(8, 'Mật khẩu ít nhất 8 ký tự')
            .max(20, 'Mật khẩu tối đa 20 ký tự')
            .required('Mật khẩu là trường bắt buộc'),
        confirmedPassword: yup
            .string()
            .required('Xác nhận mật khẩu là trường bắt buộc')
            .oneOf([yup.ref('password'), null], 'Mật khẩu nhập lại không khớp'),
    })
));

const onFormSubmit = async ({ valid, values }) => {
    await submitUpdateInfo(values);
    if (valid) {
        toast.add({ severity: 'success', summary: 'Cập nhật thành công.', life: 3000 });
    }
}

const submitUpdateInfo = async (data) => {
    try {
        const request = {
            ...data,
            dob: formatDateFromLongString(data.dob),
        }
        const { fullName, dob, email, phone } = userInfo.value;
        const obj2 = { fullName, dob, email, phone };
        if (_.isEqual(request, obj2)) {
            const response = await axios.put(`${baseUrl}/users/${userInfo.value?.id}`, request);
            if (response.status === 200) {
                isUpdatedOK.value = true;
                isLoading.value = true;
                userInfo.value = {
                    ...response.data,
                    dob: formatDateFromLongString(data.dob),
                }
                initialValues.value.fullName = response.data.fullName;
                initialValues.value.dob = formatDateFromLongString(response.data.dob);
                initialValues.value.email = response.data.email;
                initialValues.value.phone = response.data.phone;
                setTimeout(() => {
                    isUpdatedOK.value = false;
                    isLoading.value = false;
                }, 2000);
                showUpdateModal.value = false;
            } else {
                isUpdatedFailed.value = false;
            }
        } else {
            isUpdatedFailed.value = true;
            setTimeout(() => {
                isUpdatedFailed.value = false;
            }, 2000);
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
        initialValues.value.fullName = userInfo.value.fullName;
        initialValues.value.dob = formatDate(userInfo.value.dob);
        initialValues.value.email = userInfo.value.email;
        initialValues.value.phone = userInfo.value.phone;
    } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
    }
}


const formatDate = (Dob: string) => {
    const parts = Dob.split('-');
    const reversedDob = `${parts[2]}/${parts[1]}/${parts[0]}`;
    const dateOfBirthToDisplay = reversedDob;
    return dateOfBirthToDisplay;
}

const formatDateFromLongString = (dob: string) => {
    const dateObject = new Date(dob);

    const formattedDate = dateObject.getFullYear() + '-' +
        String(dateObject.getMonth() + 1).padStart(2, '0') + '-' +
        String(dateObject.getDate()).padStart(2, '0');

    return formattedDate
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