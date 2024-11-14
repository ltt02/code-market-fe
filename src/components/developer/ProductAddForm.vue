<template>
    <div class="product-form__float" :class="productStore.isShowAddFormClick ? 'is-active' : ''">
        <div class="container flex justify-center items-center" :class="{ 'max-w-full': !props.isShowSidebar }">
            <div class="product-form-container custom-scrollbar">
                <div class="title text-center m-0">Thêm ứng dụng</div>
                <div>
                    <div id="customer-info-block">
                        <div class="grid-view">
                            <div class="grid-column">
                                <label for="productName">Tên ứng dụng:</label>
                                <input v-model="applicationForAdding.name" type="productName" name="productName"
                                    placeholder=""
                                    class="form-control block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 font-medium" />
                            </div>
                        </div>
                        <div class="grid-view">
                            <div class="grid-column six-twelfths">
                                <label for="productPrice">Giá (VND):</label>
                                <InputNumber v-model="applicationForAdding.price" inputId="integeronly" fluid />
                                <!--  -->
                                <!-- <input v-model="applicationForAdding.price" type="number" id="productPrice"
                                    name="productPrice" required placeholder=""
                                    class="form-control block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 font-medium" /> -->
                            </div>
                            <div class="grid-column six-twelfths">
                                <label for="applicationSource">File mã nguồn (.zip):</label>
                                <div class="flex items-center">
                                    <FileUpload ref="" mode="basic" name="" url="" accept=".zip"
                                        :maxFileSize="999999999999" @upload="onUpload" @select="onFileSelect"
                                        chooseLabel="Thêm" />
                                    <p v-if="selectedSource">{{ ": " + formatFileSize(selectedSource.size) }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="grid-view">
                            <div class="grid-column">
                                <label for="applicationThumbnail">Hình ảnh minh họa:</label>
                                <FileUpload name="" url="/api/upload" :multiple="true" accept="image/*"
                                    :maxFileSize="999999999999" chooseLabel="Thêm" :showUploadButton="false"
                                    :showCancelButton="false" @select="handleImagesInputChange">
                                    <template #empty>
                                        <span>Bạn có thể kéo và thả file vào đây.</span>
                                    </template>
                                </FileUpload>
                            </div>
                        </div>
                        <!-- <div class="grid-view">
                            <div class="grid-column six-twelfths">
                                <label for="productType">Chất liệu:</label>
                                <input v-model="applicationForAdding.material" type="text" id="productType"
                                    name="productType" required placeholder="" class="form-control" />
                            </div>
                            <div class="grid-column six-twelfths">
                                <label for="productType">Loại:</label>
                                <input v-model="applicationForAdding.type" type="text" id="productType" name="productType"
                                    required placeholder="" class="form-control" />
                            </div>
                        </div> -->
                        <div class="grid-view">
                            <div class="grid-column six-twelfths">
                                <label for="productType">Framework:</label>
                                <MultiSelect v-model="selectedFrameworkOptionList" :options="frameworkList"
                                    optionLabel="name" filter placeholder="Chọn framework:" :maxSelectedLabels="4"
                                    class="w-full font-medium" overlayClass="custom-scrollbar"
                                    emptyFilterMessage="Không tìm thấy!" selectionMessage="abc" display="chip" />
                            </div>
                            <div class="grid-column six-twelfths">
                                <label for="productType">Lĩnh vực:</label>
                                <MultiSelect v-model="selectedCategoryOptionList" :options="categoryList"
                                    optionLabel="name" filter placeholder="Chọn lĩnh vực:" :maxSelectedLabels="4"
                                    class="w-full font-medium" overlayClass="custom-scrollbar"
                                    emptyFilterMessage="Không tìm thấy!" selectionMessage="abc" display="chip" />
                            </div>
                        </div>
                        <div class="grid-view">
                            <div class="grid-column six-twelfths">
                                <label for="productType">Loại ứng dụng:</label>
                                <Menu as="div" class="frorelative inline-block text-left w-full ">
                                    <div>
                                        <MenuButton
                                            class="inline-flex justify-between w-full gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 h-10 border border-solid outline-[light-gray] font-medium">
                                            {{ selectedTypeOption.name }}
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
                                                <MenuItem v-for="(type, index) in typeList" v-slot="{ active }">
                                                <a href="#" class="font-medium"
                                                    :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']"
                                                    @click="selectTypeOption(type)">
                                                    {{ type.name }}
                                                </a>
                                                </MenuItem>
                                            </MenuItems>
                                        </div>

                                    </transition>

                                </Menu>
                            </div>
                            <div class="grid-column six-twelfths">
                                <label for="productType">Nền tảng:</label>
                                <MultiSelect v-model="selectedPlatformOptionList" :options="platformList"
                                    optionLabel="name" filter placeholder="Chọn platform:" :maxSelectedLabels="4"
                                    class="w-full font-medium" overlayClass="custom-scrollbar"
                                    emptyFilterMessage="Không tìm thấy!" selectionMessage="abc" display="chip" />
                            </div>
                        </div>
                        <div class="grid-view">
                            <div class="grid-column">
                                <label for="productType">Mô tả:</label>
                                <Editor v-model="applicationForAdding.description" editorStyle="height: 120px"
                                    class="font-medium" />
                            </div>
                        </div>

                    </div>
                    <button v-if="productStore.isShowAddFormClick" @click.prevent="addApplication"
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
import Editor from 'primevue/editor';
import FileUpload from 'primevue/fileupload';
import MultiSelect from 'primevue/multiselect';
import InputNumber from 'primevue/inputnumber';
import { ref, computed, onBeforeMount, toRaw } from 'vue';
import { useProductStore } from '@/stores/application.store';
import ProductService from "@/services/application.service";
import ApplicationFrameworkService from "@/services/application_framework.service.ts"
import ApplicationCategoryService from "@/services/application_category.service.ts"
import ApplicationTypeService from "@/services/application_type.service.ts"
import ApplicationpPlatformService from "@/services/application_platform.service.ts"

import axios from 'axios';

const emit = defineEmits(['add-product-done']);

const props = defineProps({
    isShowSidebar: {
        type: Boolean,
    }
})

interface ApplicationObject {
    name: String,
    price: number,
    storageCapacity: number,
    applicationCategoryList: any,
    applicationFrameworkList: any,
    applicationPlatformList: any,
    applicationType: any,
    description: any,
    sourceCode: File,
    images: File[],
    authorId: number,
}

const applicationForAdding = ref<ApplicationObject>({
    name: '',
    price: 0,
    storageCapacity: 0,
    applicationCategoryList: [],
    applicationFrameworkList: [],
    applicationPlatformList: [],
    applicationType: null,
    description: '',
    sourceCode: null,
    images: [],
    authorId: JSON.parse(localStorage.getItem('developer')).id,
});

const productStore = useProductStore();

const showSidebar = ref(props.isShowSideBar);

const nextImgIndex = ref(0);

const frameworkList = ref([]);
const categoryList = ref([]);
const platformList = ref([]);
const typeList = ref([]);
const thumbnailList = ref([]);
const selectedSource = ref(null);

const selectedFrameworkOptionList = ref([]);
const selectedCategoryOptionList = ref([]);
const selectedPlatformOptionList = ref([]);
const selectedTypeOption = ref({ id: 0, name: '-' });

const getFrameworkList = async () => {
    const response = await ApplicationFrameworkService.getFrameworkList();
    frameworkList.value = response;
}

const getCategoryList = async () => {
    const response = await ApplicationCategoryService.getCategoryList();
    categoryList.value = response;
}

const getPlatformList = async () => {
    const response = await ApplicationpPlatformService.getPlatformList();
    platformList.value = response;
}

const getTypeList = async () => {
    const response = await ApplicationTypeService.getTypeList();
    typeList.value = response;
}

const selectTypeOption = (type) => {
    selectedTypeOption.value = type;
}

const closeProductAddForm = () => {
    productStore.setIsShowAddFormClick(false);
}

// Handle file selection
const onFileSelect = (event) => {
    selectedSource.value = event.files[0]; // Get the first file only
};

// Format file size to KB, MB, etc.
const formatFileSize = (size) => {
    const units = ['bytes', 'KB', 'MB', 'GB'];
    let unitIndex = 0;
    let formattedSize = size;

    while (formattedSize >= 1024 && unitIndex < units.length - 1) {
        formattedSize /= 1024;
        unitIndex++;
    }

    return `${formattedSize.toFixed(2)} ${units[unitIndex]}`;
};

const handleImagesInputChange = async (event) => {
    const files = event.files;

    for (let i = nextImgIndex.value; i < files.length; i++) {
        thumbnailList.value.push(files[i]);
        nextImgIndex.value++;
    }
};

const addApplication = async () => {
    try {
        const formData = new FormData();
        formData.append("name", applicationForAdding.value.name);
        formData.append("price", applicationForAdding.value.price);
        formData.append("storageCapacity", applicationForAdding.value.storageCapacity);
        formData.append("authorId", applicationForAdding.value.authorId);
        formData.append("description", applicationForAdding.value.description);

        const plainCategoryOptionList = selectedCategoryOptionList.value.map(item => ({
            id: item.id,
            name: item.name
        }));
        const plainFrameworkOptionList = selectedFrameworkOptionList.value.map(item => ({
            id: item.id,
            name: item.name
        }));
        const plainPlatformOptionList = selectedPlatformOptionList.value.map(item => ({
            id: item.id,
            name: item.name
        }));

        // Append selected options
        formData.append("applicationType", JSON.stringify({
            id: selectedTypeOption.value.id,
            name: selectedTypeOption.value.name
        }));
        formData.append("applicationCategoryList", JSON.stringify(plainCategoryOptionList));
        formData.append("applicationFrameworkList", JSON.stringify(plainFrameworkOptionList));
        formData.append("applicationPlatformList", JSON.stringify(plainPlatformOptionList));

        // Append the source code file
        formData.append("sourceCode", selectedSource.value);

        // Append images
        thumbnailList.value.forEach((file, index) => {
            formData.append("images", file);
        });


        const response = await axios.post("http://localhost:8080/applications", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        closeProductAddForm();
        emit('add-product-done');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const updateProduct = async () => {
    try {
        const response = await axios.put("http://localhost:8080/products", applicationForAdding.value);
        closeProductAddForm();
        emit('add-product-done');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

onBeforeMount(async () => {
    await getFrameworkList();
    await getCategoryList();
    await getPlatformList();
    await getTypeList();
});
</script>

<style>
.p-fileupload-basic {
    justify-content: start !important;
}

.p-multiselect-overlay.custom-scrollbar {
    .p-multiselect-list-container::-webkit-scrollbar {
        width: 5px;
        height: 5px;
    }

    .p-multiselect-list-container::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 3px;
    }

    .p-multiselect-list-container::-webkit-scrollbar-track {
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 3px;
    }
}

.title {
    font-size: 30px;
    font-weight: 700;
    margin: 1rem 0 0;
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
    overflow-y: scroll;
    position: relative;
    height: 850px;
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