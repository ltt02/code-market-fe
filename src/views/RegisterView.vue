<template>
    <div class="max-md:gap-3 max-md:flex-col min-h-screen h-screen flex">
        <!-- Thông báo lỗi -->
        <div v-if="isRegisterFailed"
            class="fixed top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-100 text-red-700 p-6 text-center text-lg z-50 rounded-md"
            role="alert">
            <span class="font-medium">Lỗi!</span> Đăng ký không thành công. Vui lòng thử lại.
        </div>
        <div v-if="isRegisterOk"
            class="fixed top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-100 text-green-700 p-6 text-center text-lg z-50 rounded-md"
            role="alert">
            <span class="font-medium">Đăng ký thành công!</span>
        </div>

        <!-- <div class="max-md:h-[250px] lg:flex-auto bg-[#191a24] flex items-center px-10">
            <img class="w-full h-full object-cover opacity-[45%]" src="@/assets/img_register.jpg" alt="" />
        </div> -->
        <div class="max-md:w-full w-[65%] flex justify-center items-center mx-auto">
            <div class="max-md:w-full w-[80%] flex flex-col items-center justify-center h-fit px-10 shadow-md py-6">
                <div class="w-full flex flex-col items-center justify-center">
                    <p class="text-4xl font-bold">Đăng ký</p>
                    <p class="text-base font-medium mt-2">Hãy đăng ký và thoả thích mua sắm!</p>
                </div>
                <div class="w-full flex flex-col items-center justify-center mt-10">
                    <div class="w-full mt-5">
                        <AInput v-model="name" name="name" label="Tên đăng nhập"
                            style-custom="border-[#AFA2C3] py-3 p-2 border-[1px] border-[#3E334E] cursor-text"
                            is-required placeholder=" Nhập tên đăng nhập..." />
                    </div>
                    <div class="w-full mt-3">
                        <AInput v-model="password" name="password" label="Mật khẩu"
                            style-custom="border-[#AFA2C3] py-3 p-2 border-[1px] border-[#3E334E] cursor-text"
                            is-required placeholder=" Nhập mật khẩu..." type="password" />
                    </div>
                    <div class="w-full mt-3">
                        <AInput v-model="confirmPassword" name="confirmPassword" label="Xác nhận mật khẩu"
                            style-custom="border-[#AFA2C3] py-3 p-2 border-[1px] border-[#3E334E] cursor-text"
                            is-required placeholder=" Nhập lại mật khẩu xác nhận..." type="password" />
                    </div>
                    <div class="w-full mt-3 flex gap-3">
                        <AInput v-model="fullName" name="fullName" label="Họ và tên"
                            style-custom="border-[#AFA2C3] py-3 p-2 border-[1px] border-[#3E334E] cursor-text"
                            is-required placeholder=" Nhập họ và tên..." />
                        <AInput v-model="email" name="email" label="Email"
                            style-custom="border-[#AFA2C3] py-3 p-2 border-[1px] border-[#3E334E] cursor-text"
                            is-required placeholder=" Nhập email..." />
                    </div>
                    <div class="w-full mt-3 flex gap-3">
                        <!-- <div class="flex flex-col gap-1">
                            <InputText name="phone" type="text" placeholder="Nhập số điện thoại..." fluid />
                            <Message v-if="$form.phone?.invalid" severity="error" size="small" variant="simple">{{
                                $form.phone.error.message }}</Message>
                        </div> -->
                        <div class="flex flex-col gap-1">
                            <label for="buttondisplay" class="font-bold block mb-2"> Ngày sinh </label>
                            <DatePicker inputClass="border-[#AFA2C3] py-3 p-2 border-[1px]" v-model="icondisplay"
                                showIcon iconDisplay="input" :maxDate="maxDate" showButtonBar dateFormat="dd/mm/yy" />
                        </div>
                    </div>
                    <div class="w-full flex gap-3 mt-5">
                        <button @click="onRegister"
                            class="bg-[#3E334E] text-white flex-[1] w-full py-3 font-bold rounded-lg">
                            Đăng ký
                        </button>
                        <RouterLink to="/login"
                            class="block text-center border-[1px] border-[#3E334E] text-[#3E334E] flex-[1] w-full font-bold py-3 rounded-lg">
                            Đăng nhập
                        </RouterLink>
                    </div>
                    <div class="w-full flex justify-center gap-3 mt-4">HOẶC </div>
                    <div class="w-full flex gap-3 mt-3">
                        <div class="flex justify-center w-full">
                            <RouterLink to="/register-dev"
                                class="social-button flex items-center bg-[#3E334E] text-white border border-gray-300 rounded shadow-md max-w-xs px-6 py-2 text-sm font-medium hover:opacity-60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                <span>Đăng ký trở thành nhà phát triển</span>
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { Form } from '@primevue/forms';
import AInput from '@/components/form/AInput.vue';
import DatePicker from 'primevue/datepicker';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import { ref } from 'vue';
// import bcrypt from 'bcryptjs';

const isRegisterFailed = ref(false);
const isRegisterOk = ref(false);
const router = useRouter();

let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();
let prevMonth = (month === 0) ? 11 : month - 1;
let prevYear = (prevMonth === 11) ? year - 1 : year;
let nextMonth = (month === 11) ? 0 : month + 1;
let nextYear = (nextMonth === 0) ? year + 1 : year;

const date = ref();
const minDate = ref(new Date());
const maxDate = ref(new Date());

minDate.value.setMonth(prevMonth);
minDate.value.setFullYear(prevYear);
maxDate.value.setMonth(month);
maxDate.value.setFullYear(year);

const register = async (data) => {
    try {
        const response = await axios.post(`http://localhost:8080/customers/register`, {
            userName: data.name,
            password: data.password,
        });
        if (response.data) {
            isRegisterOk.value = true; // Set the flag to true
            setTimeout(() => {
                isRegisterOk.value = false;
            }, 1500);
            console.log(response.data);
        }
        setTimeout(() => {
            router.push('/login');
        }, 1000);
    } catch (error) {
        console.error(error);
        //toast.error('Register failed!');
        isRegisterFailed.value = true; // Set the flag to true
        setTimeout(() => {
            isRegisterFailed.value = false; // Clear the flag after 5 seconds
        }, 5000);
    }
};

const { handleSubmit } = useForm({
    validationSchema: yup.object({
        name: yup.string().required("Tên đăng nhập là trường bắt buộc"),
        password: yup
            .string()
            .matches(/^(?=.*[A-Za-z])(?=.*\d).+$/, 'Mật khẩu phải chứa ít nhất 1 số và 1 chữ cái')
            .min(8, 'Mật khẩu ít nhất 8 ký tự')
            .max(20, 'Mật khẩu tối đa 20 ký tự')
            .required('Mật khẩu là trường bắt buộc'),
        confirmPassword: yup
            .string()
            .required('Xác nhận mật khẩu là trường bắt buộc')
            .oneOf([yup.ref('password'), null], 'Mật khẩu không khớp'),
        fullName: yup
            .string()
            .required('Họ và tên là trường bắt buộc')
    }),
});

const onRegister = () => {
    handleSubmit(async (values) => {
        await register(values);
    })();
};
</script>
