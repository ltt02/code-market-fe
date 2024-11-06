<template>
    <div class="product-form__float" :class="productStore.isShowAddFormClick ? 'is-active' : ''">
        <div class="container flex justify-center items-center" :class="{ 'max-w-full': !props.isShowSidebar }">
            <div class="product-form-container">
                <div class="title text-center">Thêm ứng dụng</div>
                <div>
                    <div id="customer-info-block">
                        <div class="grid-view">
                            <div class="grid-column">
                                <label for="productName">Tên ứng dụng:</label>
                                <input v-model="productForAdding.name" type="productName" name="productName"
                                    placeholder=""
                                    class="form-control block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
                            </div>
                        </div>
                        <div class="grid-view">
                            <div class="grid-column six-twelfths">
                                <label for="productPrice">Giá:</label>
                                <input v-model="productForAdding.price" type="number" id="productPrice"
                                    name="productPrice" required placeholder=""
                                    class="form-control block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
                            </div>
                            <!-- <div class="grid-column six-twelfths">
                                <label for="productSalePercent">Giảm giá (%):</label>
                                <input v-model="productForAdding.salePercent" type="number" id="productSalePercent" name="productSalePercent" required
                                    placeholder="" class="form-control" />
                            </div> -->
                        </div>
                        <!-- <div class="grid-view">
                            <div class="grid-column six-twelfths">
                                <label for="productType">Chất liệu:</label>
                                <input v-model="productForAdding.material" type="text" id="productType"
                                    name="productType" required placeholder="" class="form-control" />
                            </div>
                            <div class="grid-column six-twelfths">
                                <label for="productType">Loại:</label>
                                <input v-model="productForAdding.type" type="text" id="productType" name="productType"
                                    required placeholder="" class="form-control" />
                            </div>
                        </div> -->
                        <div class="grid-view">
                            <div class="grid-column six-twelfths">
                                <label for="productType">Framework:</label>
                                <Menu as="div" class="frorelative inline-block text-left w-full ">
                                    <div>
                                        <MenuButton
                                            class="inline-flex justify-between w-full gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 h-10 border border-solid outline-[light-gray] font-extrabold">
                                            {{ selectedFrameworkOption }}
                                            <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </MenuButton>
                                    </div>


                                    <transition enter-active-class="transition ease-out duration-100"
                                        enter-from-class="transform opacity-0 scale-95"
                                        enter-to-class="transform opacity-100 scale-100"
                                        leave-active-class="transition ease-in duration-75"
                                        leave-from-class="transform opacity-100 scale-100"
                                        leave-to-class="transform opacity-0 scale-95">
                                        <div class="relative">
                                            <MenuItems
                                                class="custom-scrollbar absolute left-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-36 overflow-y-auto">
                                                <!-- <div class="relative p-[9px]"> -->
                                                <MenuItem v-for="(framework, index) in frameworkList"
                                                    v-slot="{ active }">
                                                <a href="#"
                                                    :class="[active ? 'bg-gray-100 text-gray-900 outline-none' : 'text-gray-700', 'block px-4 py-2 text-sm']"
                                                    @click="selectFrameworkOption(framework)">
                                                    {{ framework }}
                                                </a>
                                                </MenuItem>
                                                <form method="POST" action="#">
                                                    <MenuItem v-slot="{ active }">
                                                    <button type="submit"
                                                        :class="[active ? 'bg-gray-100 text-gray-900 outline-none' : 'text-gray-700', 'block w-full px-4 py-2 text-left text-sm']">Sign
                                                        out</button>
                                                    </MenuItem>
                                                </form>
                                                <!-- </div> -->
                                            </MenuItems>
                                        </div>

                                    </transition>

                                </Menu>
                            </div>
                            <div class="grid-column six-twelfths">
                                <label for="productType">Lĩnh vực:</label>
                                <Menu as="div" class="frorelative inline-block text-left w-full ">
                                    <div>
                                        <MenuButton
                                            class="inline-flex justify-between w-full gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 h-10 border border-solid outline-[light-gray] font-extrabold">
                                            {{ selectedFrameworkOption }}
                                            <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </MenuButton>
                                    </div>


                                    <transition enter-active-class="transition ease-out duration-100"
                                        enter-from-class="transform opacity-0 scale-95"
                                        enter-to-class="transform opacity-100 scale-100"
                                        leave-active-class="transition ease-in duration-75"
                                        leave-from-class="transform opacity-100 scale-100"
                                        leave-to-class="transform opacity-0 scale-95">
                                        <div class="relative">
                                            <MenuItems
                                                class="custom-scrollbar absolute left-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-36 overflow-y-auto">
                                                <!-- <div class="relative p-[9px]"> -->
                                                <MenuItem v-for="(framework, index) in frameworkList"
                                                    v-slot="{ active }">
                                                <a href="#"
                                                    :class="[active ? 'bg-gray-100 text-gray-900 outline-none' : 'text-gray-700', 'block px-4 py-2 text-sm']"
                                                    @click="selectFrameworkOption(framework)">
                                                    {{ framework }}
                                                </a>
                                                </MenuItem>
                                                <form method="POST" action="#">
                                                    <MenuItem v-slot="{ active }">
                                                    <button type="submit"
                                                        :class="[active ? 'bg-gray-100 text-gray-900 outline-none' : 'text-gray-700', 'block w-full px-4 py-2 text-left text-sm']">Sign
                                                        out</button>
                                                    </MenuItem>
                                                </form>
                                                <!-- </div> -->
                                            </MenuItems>
                                        </div>

                                    </transition>

                                </Menu>
                            </div>
                        </div>
                    </div>
                    <button v-if="productStore.isShowAddFormClick" @click.prevent="addProduct"
                        class="mr-2 bg-green-500 hover:opacity-60 text-white font-bold py-2 px-4 rounded w-full mt-3">
                        Thêm
                    </button>
                    <button v-else @click.prevent="addProduct"
                        class="mr-2 bg-gradient-to-b from-green-500 to-sky-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-3">
                        Sửa
                    </button>
                </div>
                <button class="product-form__close" style="z-index: 10;">
                    <svg width="18" height="18" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"
                        @click.prevent="closeProductAddForm">
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
        </div>
        <div class="product-form__background" @click="closeProductAddForm"></div>
    </div>

</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { ref, computed, onBeforeMount } from 'vue';
import { useProductStore } from '@/stores/application.store';
import ProductService from "@/services/application.service";
import ApplicationFrameworkService from "@/services/application_framework.service.ts"
import ApplicationCategoryFrameworkService from "@/services/application_category.service.ts"

import axios from 'axios';

const emit = defineEmits(['add-product-done']);

const props = defineProps({
    isShowSidebar: {
        type: Boolean,
    }
})

interface ProductObject {
    name: String,
    price: number,
    salePercent: number,
    type: String,
    material: String,
}

const productForAdding = ref<ProductObject>({ name: '', price: 0, salePercent: 0, material: '', type: '' });

const productStore = useProductStore();

const showSidebar = ref(props.isShowSideBar);

const frameworkList = ref([]);
const categoryList = ref([]);

const selectedFrameworkOption = ref('-');
const selectedCategoryOption = ref('-');



const getFrameworkList = async () => {
    const response = await ApplicationFrameworkService.getFrameworkList();
    frameworkList.value = response.map(framework => framework.name);
}

const selectFrameworkOption = (framework) => {
    selectedFrameworkOption.value = framework;
}

const closeProductAddForm = () => {
    productStore.setIsShowAddFormClick(false);
}

const addProduct = async () => {
    try {
        const response = await axios.post("http://localhost:8080/products", productForAdding.value);
        closeProductAddForm();
        emit('add-product-done');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const updateProduct = async () => {
    try {
        const response = await axios.put("http://localhost:8080/products", productForAdding.value);
        closeProductAddForm();
        emit('add-product-done');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

onBeforeMount(async () => {
    await getFrameworkList();
});
</script>

<style>
.title {
    font-size: 30px;
    font-weight: 700;
    margin: 1rem 0 1rem;
}

.grid-view {
    display: flex;
    display: -webkit-flex;
    -moz-flex-direction: row;
    flex-direction: row;
    flex-wrap: wrap;
    margin-left: -9px;
    margin-right: -9px;
    padding: 0;
    position: relative;
    float: none;
}

.grid-column {
    position: relative;
    box-sizing: border-box;
    min-height: 1px;
    vertical-align: top;
    margin-left: 0 !important;
    margin-right: 0 !important;
    padding: 9px;
    width: 100%;
}

.six-twelfths {
    width: 50%;
}

.four-twelfths {
    width: 33.333%;
}

.grid:after {
    content: "";
    display: table;
    clear: both;
}

.form-control {
    background: #fff;
    border: 1px solid #d9d9d9;
    box-sizing: border-box;
    height: 40px;
    width: 100%;
    padding: 5px 20px;
    transition: all 0.2s;
}

.form-control:focus,
.form-control:active {
    border-color: inherit !important;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
    outline: none !important;
    border: 1px solid #2f5acf !important;
}

/* body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 88vh;
    margin: 0;
} */

.product-form-container {
    position: relative;
    width: 800px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 16px;
    background-color: #f9f9f9;
    z-index: 2;
}

.product-form-container label,
.product-form-container input {
    display: block;
    margin-bottom: 10px;
}

.product-form-container input[type="submit"] {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
}

.product-form-container input[type="submit"]:hover {
    background-color: #0056b3;
}

.product-form__float {
    display: none;
    top: 92px;
    position: fixed;
    width: 100%;
    height: 100%;
    pointer-events: visible;
    transition: all .3s;
    z-index: 2;
}

.product-form__float.is-active {
    display: block;
    opacity: 1;
    pointer-events: visible;
    visibility: visible;
}

.product-product-form-content {
    background: #fff;
    display: block;
    width: 800px;
    overflow: hidden;
    border-radius: 10px;
    margin: 10px auto 0;
}

.product-product-form-content__wrapper {
    position: relative;
    min-height: 200px;
    background-color: #fff;
    z-index: 10;
}

.product-form__close {
    position: absolute;
    height: 0;
    top: 24px;
    right: 16px;
    background-color: #0000;
    border: 0;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

.product-form__background {
    position: absolute;
    top: -20px;
    left: 0;
    width: 100%;
    height: 100%;
    transition: all .3s;
    background: rgba(0, 0, 0, .6);
}
</style>