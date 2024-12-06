<template>
    <Dialog v-model:visible="visible" modal header="Xác nhận" :style="{ width: '25rem' }">
        <!-- <span class="text-surface-500 dark:text-surface-400 block mb-8">Update your information.</span> -->
        <!-- <div class="flex items-center gap-4 mb-4">
            <label for="username" class="font-semibold w-24">Username</label>
            <InputText id="username" class="flex-auto" autocomplete="off" />
        </div> -->
        <div class="flex items-center gap-4 mb-8">
            <p>Bạn có chắc chắn muốn gửi yêu cầu cập nhật thông tin cho phần mềm này không?</p>
        </div>
        <div class="flex justify-end gap-2">
            <Button type="button" label="Không" severity="secondary" @click="closeDialog"></Button>
            <Button type="button" label="Có" @click="updateApplication"></Button>
        </div>
    </Dialog>
    <div class="alerts">
        <div v-if="isNoSelectedApplication"
            class="fixed top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-100 text-red-700 p-6 text-center text-lg z-50 rounded-md"
            role="alert">
            <span class="font-medium">Lỗi!</span> Chưa chọn phần mềm.
        </div>
        <div v-if="isAddedOK"
            class="fixed top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-100 text-green-700 p-6 text-center text-lg z-50 rounded-md"
            role="alert">
            <span class="font-medium">Gửi yêu cầu thành công!</span>
        </div>
    </div>
    <div class="product-form__float" :class="productStore.isShowUpdateFormClick ? 'is-active' : ''">
        <div class="container flex justify-center items-center" :class="{ 'max-w-full': !props.isShowSidebar }">
            <div class="product-form-container custom-scrollbar">
                <div class="title text-center m-0">Cập nhật thông tin phần mềm</div>
                <div>
                    <div id="customer-info-block">
                        <div class="grid-view">
                            <div class="grid-column">
                                <label for="productName">Tên phần mềm:</label>
                                <InputText v-model="applicationForUpdating.name" type="text" name="productName"
                                    placeholder=""
                                    class="form-control block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 font-medium" />
                                <Message v-if="!firstTimeOpenForm && !applicationForUpdating.name" severity="error"
                                    size="small" variant="simple">
                                    Tên phần mềm là bắt buộc
                                </Message>
                            </div>
                        </div>
                        <div class="grid-view">
                            <div class="grid-column six-twelfths">
                                <label for="productPrice">Giá (VND):</label>
                                <InputNumber v-model="applicationForUpdating.price" inputId="integeronly" fluid />

                                <Message v-if="!firstTimeOpenForm && applicationForUpdating.price <= 0" severity="error"
                                    size="small" variant="simple">
                                    Số tiền phải là số dương
                                </Message>
                                <!--  -->
                                <!-- <input v-model="applicationForUpdating.price" type="number" id="productPrice"
                                    name="productPrice" required placeholder=""
                                    class="form-control block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 font-medium" /> -->
                            </div>
                            <div class="grid-column six-twelfths">
                                <label for="salePercent">Giảm giá (%):</label>
                                <InputNumber v-model="applicationForUpdating.salePercent" inputId="integeronly" fluid />
                                <Message
                                    v-if="applicationForUpdating.salePercent < 0 || !applicationForUpdating.salePercent"
                                    severity="error" size="small" variant="simple">
                                    Phần trăm giảm giá phải lớn hơn hoặc bằng 0
                                </Message>
                                <Message v-if="applicationForUpdating.salePercent > 100"
                                    severity="error" size="small" variant="simple">
                                    Phần trăm giảm giá phải nhỏ hơn 100
                                </Message>
                            </div>
                        </div>
                        <div class="grid-view">
                            <div class="grid-column">
                                <label for="applicationSource">File mã nguồn (.zip) hiện tại:</label>
                                <Button class="mb-4" type="button" label="Download" severity="info" @click="downloadApplication(applicationForUpdating.sourceCode)"></Button>
                                <div class="flex items-center">
                                    <FileUpload ref="" mode="basic" name="" url="" accept=".zip"
                                        :maxFileSize="999999999999" @upload="onUpload" @select="onFileSelect"
                                        chooseLabel="Cập nhật" />
                                    <p v-if="!firstTimeOpenForm && selectedSource">{{ ": " +
                                        formatFileSize(selectedSource.size) }}</p>
                                </div>
                                <Message v-if="!firstTimeOpenForm && !applicationForUpdating.sourceCode && !selectedSource" severity="error" size="small"
                                    variant="simple">
                                    Bạn phải thêm vào file mã nguồn ở định dạng .zip
                                </Message>
                            </div>
                        </div>
                        <div class="grid-view">
                            <div class="grid-column">
                                <label for="applicationThumbnail">Hình ảnh minh họa: {{ applicationForUpdating.applicationImages?.length }}</label>
                                <Galleria :value="applicationForUpdating.applicationImages" :responsiveOptions="responsiveOptions" :numVisible="5"
                                    containerStyle="max-width: 100%">
                                    <template #item="slotProps">
                                        <img :src="slotProps.item.link" :alt="slotProps.item.link"
                                            style="width: 100%" />
                                    </template>
                                    <template #thumbnail="slotProps">
                                        <img :src="slotProps.item.link" :alt="slotProps.item.link" />
                                    </template>
                                </Galleria>
                                <FileUpload name="" url="/api/upload" :multiple="true" accept="image/*"
                                    :maxFileSize="999999999999" chooseLabel="Thêm" :showUploadButton="false"
                                    :showCancelButton="false" @select="handleImagesInputChange"
                                    @remove="handleImagesInputRemove">
                                    <template #empty>
                                        <span>Bổ sung thêm hình ảnh minh họa</span>
                                    </template>
                                </FileUpload>
                            </div>
                        </div>
                        <div class="grid-view">
                            <div class="grid-column six-twelfths">
                                <label for="productType">Công nghệ:</label>
                                <MultiSelect v-model="applicationForUpdating.applicationFrameworkList"
                                    :options="frameworkList" optionLabel="name" filter placeholder="Chọn framework:"
                                    :maxSelectedLabels="4" class="w-full font-medium" overlayClass="custom-scrollbar"
                                    emptyFilterMessage="Không tìm thấy!" selectionMessage="abc" display="chip" />
                                <Message
                                    v-if="!firstTimeOpenForm && applicationForUpdating.applicationFrameworkList.length <= 0"
                                    severity="error" size="small" variant="simple">
                                    Bạn cần chọn ít nhất 1 công nghệ
                                </Message>
                            </div>
                            <div class="grid-column six-twelfths">
                                <label for="productType">Lĩnh vực:</label>
                                <MultiSelect v-model="applicationForUpdating.applicationCategoryList"
                                    :options="categoryList" optionLabel="name" filter placeholder="Chọn lĩnh vực:"
                                    :maxSelectedLabels="4" class="w-full font-medium" overlayClass="custom-scrollbar"
                                    emptyFilterMessage="Không tìm thấy!" selectionMessage="abc" display="chip" />
                                <Message
                                    v-if="!firstTimeOpenForm && applicationForUpdating.applicationCategoryList.length <= 0"
                                    severity="error" size="small" variant="simple">
                                    Bạn cần chọn ít nhất 1 lĩnh vực phù hợp
                                </Message>
                            </div>
                        </div>
                        <div class="grid-view">
                            <div class="grid-column six-twelfths">
                                <label for="productType">Loại phần mềm:</label>
                                <Select v-model="applicationForUpdating.applicationType" :options="typeList"
                                    optionLabel="name" placeholder="Chọn loại:" class="w-full font-medium" />

                                <Message v-if="!firstTimeOpenForm && applicationForUpdating.applicationType.id == 0"
                                    severity="error" size="small" variant="simple">
                                    Bạn cần chọn loại cho phần mềm
                                </Message>
                            </div>
                            <div class="grid-column six-twelfths">
                                <label for="productType">Nền tảng:</label>
                                <MultiSelect v-model="applicationForUpdating.applicationPlatformList"
                                    :options="platformList" optionLabel="name" filter placeholder="Chọn platform:"
                                    :maxSelectedLabels="4" class="w-full font-medium" overlayClass="custom-scrollbar"
                                    emptyFilterMessage="Không tìm thấy!" selectionMessage="abc" display="chip" />
                                <Message
                                    v-if="!firstTimeOpenForm && applicationForUpdating.applicationPlatformList.length <= 0"
                                    severity="error" size="small" variant="simple">
                                    Bạn cần chọn ít nhất 1 nền tảng phù hợp
                                </Message>
                            </div>
                        </div>
                        <div class="grid-view">
                            <div class="grid-column">
                                <label for="productType">Mô tả:</label>
                                <Editor v-model="description" editorStyle="height: 120px"
                                    class="font-medium"
                                    @text-change="handleTextChange(applicationForUpdating.description)" />
                                <Message v-if="!firstTimeOpenForm && !applicationForUpdating.description"
                                    severity="error" size="small" variant="simple">
                                    Bạn cần phải có mô tả cho phần mềm
                                </Message>
                            </div>
                        </div>

                    </div>
                    <button @click.prevent="openDialog"
                        class="mr-2 bg-green-500 hover:opacity-60 text-white font-bold py-2 px-4 rounded w-full mt-3">
                        Cập nhật
                    </button>
                </div>
                <button class="product-form__close" style="z-index: 10;">
                    <svg width="18" height="18" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"
                        @click.prevent="closeProductUpdateForm">
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
        <div class="product-form__background" @click="closeProductUpdateForm"></div>
    </div>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { Form } from '@primevue/forms';
import Editor from 'primevue/editor';
import FileUpload from 'primevue/fileupload';
import MultiSelect from 'primevue/multiselect';
import InputNumber from 'primevue/inputnumber';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Toast from 'primevue/toast';
import Message from 'primevue/message';
import Select from 'primevue/select';
import Galleria from 'primevue/galleria';
import { ref, computed, onBeforeMount, onMounted, toRaw } from 'vue';
import { useProductStore } from '@/stores/application.store';
import ProductService from "@/services/application.service";
import ApplicationFrameworkService from "@/services/application_framework.service.ts"
import ApplicationCategoryService from "@/services/application_category.service.ts"
import ApplicationTypeService from "@/services/application_type.service.ts"
import ApplicationpPlatformService from "@/services/application_platform.service.ts"

import axios from 'axios';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const firstTimeOpenForm = ref(true);

const initialValues = ref({
    username: '',
    firstName: '',
    lastName: ''
});

const description = ref('');

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
const emit = defineEmits(['add-product-done']);

const props = defineProps({
    isShowSidebar: {
        type: Boolean,
    },
    currentApplication: {
        type: Object,
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
    salePercent: number,
}

const applicationForUpdating = ref<ApplicationObject>({
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
    salePercent: 0,
});

const visible = ref(false);

const isAddedOK = ref(false);

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

const uploadedImages = new Set(); // Keeps track of uploaded image URLs

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

const closeProductUpdateForm = () => {
    productStore.setIsShowUpdateFormClick(false);
}

// Handle file selection
const onFileSelect = (event) => {
    selectedSource.value = event.files[0]; // Get the first file only
    applicationForUpdating.value.sourceCode = event.files[0];
};

const openDialog = () => {
    if (!applicationForUpdating.value.name
        || applicationForUpdating.value.price <= 0
        || applicationForUpdating.value.salePercent < 0 || applicationForUpdating.value.salePercent === null
        || applicationForUpdating.value.salePercent > 100
        || !selectedSource
        || !applicationForUpdating.value.sourceCode
        // || selectedFrameworkOptionList.value.length <= 0
        // || selectedCategoryOptionList.value.length <= 0
        // || selectedTypeOption.value.id == 0
        // || selectedPlatformOptionList.value.length <= 0
        || applicationForUpdating.value.applicationFrameworkList.length <= 0
        || applicationForUpdating.value.applicationCategoryList.length <= 0
        || applicationForUpdating.value.applicationType.id == 0
        || applicationForUpdating.value.applicationPlatformList.length <= 0
        || !applicationForUpdating.value.description) {
        firstTimeOpenForm.value = false
    }
    else {
        visible.value = true
    }
}

const closeDialog = () => {
    visible.value = false;
    firstTimeOpenForm.value = true
}


const downloadApplication = (url) => {
    if (url) {
        window.open(url, '_blank').focus();
    }
}


// Function to upload image to server
const uploadImage = async (base64Image) => {
    try {
        // Replace with your API endpoint
        const formData = new FormData();
        formData.append("sourceCode", base64Image);
        const response = await axios.post("http://localhost:8080/application-images/application/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response; // Get URL from the response
    } catch (error) {
        console.error("Image upload failed", error);
        return null;
    }
};

// Intercept text changes in the editor
const handleTextChange = async (content) => {
    const imgTags = content.match(/<img[^>]+src="data:image\/[^">]+"[^>]*>/g);

    if (imgTags) {
        for (const imgTag of imgTags) {
            // Extract the base64 image source
            const base64Src = imgTag.match(/src="([^"]+)"/)[1];

            // Skip uploading if the image has already been uploaded
            if (uploadedImages.has(base64Src)) {
                continue;
            }

            const serverUrl = await uploadImage(base64Src);

            if (serverUrl) {
                // Add the base64 image source to the Set
                uploadedImages.add(base64Src);
                // Replace the base64 image with the server URL
                applicationForUpdating.value.description = applicationForUpdating.value.description.replace(base64Src, serverUrl);
            }
        }
    }
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
        applicationForUpdating.value.images.push(files[i]);
        nextImgIndex.value++;
    }
};

const handleImagesInputRemove = async (event) => {
    const files = event.files;
    thumbnailList.value = files;
};


const updateApplication = async () => {
    try {
        // visible.value = true;

        const formData = new FormData();
        formData.append("name", applicationForUpdating.value.name);
        formData.append("price", applicationForUpdating.value.price);
        formData.append("storageCapacity", selectedSource.value.size);
        formData.append("authorId", applicationForUpdating.value.authorId);
        formData.append("description", applicationForUpdating.value.description);

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


        visible.value = false;
        isAddedOK.value = true;
        setTimeout(() => {
            isAddedOK.value = false;
        }, 2000);
        closeProductAddForm();
        emit('add-product-done');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const updateProduct = async () => {
    try {
        const response = await axios.put("http://localhost:8080/products", applicationForUpdating.value);
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

onMounted(async () => {
    applicationForUpdating.value = {
        ...props.currentApplication
    }
    console.log(applicationForUpdating.value.description);
    description.value = applicationForUpdating.value.description;
})
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
    height: 700px;
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