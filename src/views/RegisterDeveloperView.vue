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
                <Toast />
                <Form v-slot="$form" :initialValues :resolver :validateOnValueUpdate="false" :validateOnBlur="true" :validateOnMount="['firstName']" @submit="onFormSubmit" class="flex flex-col gap-4 w-full sm:w-56">
            <div class="flex flex-col gap-1">
                <InputText name="username" type="text" placeholder="Username" fluid />
                <!-- <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{ $form.username.error.message }}</Message> -->
            </div>
            <div class="flex flex-col gap-1">
                <InputText name="firstName" type="text" placeholder="First Name" fluid :formControl="{ validateOnValueUpdate: true }" />
                <!-- <Message v-if="$form.firstName?.invalid" severity="error" size="small" variant="simple">{{ $form.firstName.error.message }}</Message> -->
            </div>
            <div class="flex flex-col gap-1">
                <InputText name="lastName" type="text" placeholder="Last Name" fluid />
                <!-- <Message v-if="$form.lastName?.invalid" severity="error" size="small" variant="simple">{{ $form.lastName.error.message }}</Message> -->
            </div>
            <Button type="submit" severity="secondary" label="Submit" />
        </Form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useRouter } from 'vue-router';
import axios from 'axios';
import AInput from '@/components/form/AInput.vue';
import Toast from 'primevue/toast';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import Fieldset from 'primevue/fieldset';
import Button  from 'primevue/button';
import { ref, reactive } from 'vue';
// import bcrypt from 'bcryptjs';

const isRegisterFailed = ref(false);
const isRegisterOk = ref(false);
const router = useRouter();
import { useToast } from 'primevue/usetoast';

const initialValues = ref({
    username: '',
    firstName: '',
    lastName: ''
});

const resolver = ({ values }) => {
    const errors = {};

    if (!values.username) {
        errors.username = [{ message: 'Username is required.' }];
    }

    if (!values.name) {
        errors.firstName = [{ message: 'First name is required.' }];
    }

    if (!values.surname) {
        errors.lastName = [{ message: 'Last name is required.' }];
    }

    return {
        errors
    };
};

const onFormSubmit = ({ valid }) => {
    if (valid) {
        toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 });
    }
}


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
    }),
});

const onRegister = () => {
    handleSubmit(async (values) => {
        await register(values);
    })();
};
</script>
