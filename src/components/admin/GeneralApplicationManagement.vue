<template>
    <!-- <div class="card flex justify-center items-center fixed w-full h-full z-10 bg-gray-400	">
        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="transparent" animationDuration=".5s"
            aria-label="Custom ProgressSpinner" />
    </div> -->
    <Dialog v-model:visible="visibleConfirmDialog" modal header="Xác nhận" :style="{ width: '25rem' }">
        <!-- <span class="text-surface-500 dark:text-surface-400 block mb-8">Update your information.</span> -->
        <!-- <div class="flex items-center gap-4 mb-4">
            <label for="username" class="font-semibold w-24">Username</label>
            <InputText id="username" class="flex-auto" autocomplete="off" />
        </div> -->
        <div class="flex items-center gap-4 mb-8">
            <p>Bạn có chắc với thao tác này không?</p>
        </div>
        <div class="flex justify-end gap-2">
            <Button type="button" label="Không" severity="secondary" @click="visibleConfirmDialog = false"></Button>
            <Button type="button" label="Có" @click="confirm"></Button>
        </div>
    </Dialog>
    <div class="product-managemen p-3">

        <div class="w-full">
            <div class="w-full">
                <!-- Các thông báo -->
                <div class="alerts">
                    <div v-if="isUpdatedOK"
                        class="fixed top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-100 text-green-700 p-6 text-center text-lg z-50 rounded-md"
                        role="alert">
                        <span class="font-medium">Cập nhật thành công!!!</span>
                    </div>
                    <div v-if="isNotEnteredID"
                        class="fixed top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-100 text-red-700 p-6 text-center text-lg z-50 rounded-md"
                        role="alert">
                        <span class="font-medium">Chưa nhập ID!!!</span>
                    </div>
                    <div v-if="isNotFoundEmployee"
                        class="fixed top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-100 text-red-700 p-6 text-center text-lg z-50 rounded-md"
                        role="alert">
                        <span class="font-medium">Không tìm thấy khách hàng!!!</span>
                    </div>
                    <div v-if="isNoSelectedApplication"
                        class="fixed top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-100 text-red-700 p-6 text-center text-lg z-50 rounded-md"
                        role="alert">
                        <span class="font-medium">Lỗi!</span> Chưa chọn phần mềm.
                    </div>
                    <div v-if="isActionOK"
                        class="fixed top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-100 text-green-700 p-6 text-center text-lg z-50 rounded-md"
                        role="alert">
                        <span class="font-medium">Thao tác thành công!</span>
                    </div>
                </div>
                <!-- Tìm kiếm và Khoá/Mở Khoá tài khoản khách hàng -->
                <div class="w-full flex">
                    <!-- <div class="w-1/6 mr-2">
                        <label class="text-gray-700" for="id">
                            ID:
                        </label>
                        <input v-model="selectedProduct.id"
                            class="input-id w-full bg-gray-200 text-gray-800 py-2 px-3 rounded-md focus:outline-none">
                    </div> -->
                    <!-- <div class="mr-2">
                        <label class="text-gray-700" for="id">
                            Tên sản phẩm:
                        </label>
                        <input v-model="selectedProduct.name"
                            class="w-full bg-gray-200 text-gray-800 py-2 px-3 rounded-md focus:outline-none">
                    </div> -->
                    <div class="mr-2 flex items-end">
                        <!-- <button @click=""
                            class="mr-2 bg-gradient-to-b from-blue-500 to-sky-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Tìm
                            kiếm
                        </button> -->
                        <button @click="showDetails"
                            class="mr-2 bg-gray-500 hover:opacity-60 text-white font-bold py-2 px-4 rounded">
                            Xem chi tiết
                        </button>
                        <button @click="openDialog(1)"
                            class="mr-2 bg-green-500 hover:opacity-60 text-white font-bold py-2 px-4 rounded">
                            Phê duyệt
                        </button>
                        <button @click="openDialog(2)"
                            class="mr-2 bg-red-500 hover:opacity-60 text-white font-bold py-2 px-4 rounded">
                            Từ chối
                        </button>
                        <button @click="exportCSV($event)"
                            class="mr-2 bg-purple-500 hover:opacity-60 text-white font-bold py-2 px-4 rounded">
                            Xuất file
                        </button>
                    </div>
                </div>
                <div class="flex items-end mt-2">Tổng số: {{ currentTotalApplications }}</div>
            </div>
        </div>

        <!-- <div class="relative overflow-x-auto custom-scrollbar" style="max-height: 500px;">
            <table id="table-data" class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead
                    class="fixed-header font-sans text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400 text-center">
                    <tr>
                        <th scope="col" class="px-4 py-3">
                            ID
                        </th>
                        <th scope="col" class="px-4 py-3">
                            Tên phần mềm
                        </th>
                        <th scope="col" class="px-4 py-3 text-right">
                            Dung lượng (MB)
                        </th>
                        <th scope="col" class="px-4 py-3 text-right">
                            Giá
                        </th>
                        <th scope="col" class="px-4 py-3">
                            Đánh giá trung bình
                        </th>
                        <th scope="col" class="px-4 py-3 text-right">
                            Lượt tải
                        </th>
                        <th scope="col" class="px-4 py-3">
                            Trạng thái
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in applicationListResponse" :key="index" @click="selectProduct(item)"
                        class="row-data border-b dark:bg-gray-800 cursor-pointer">
                        <th scope="row"
                            class="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                            {{ item.id ? item.id :
                                "Chưa cập nhật" }}
                        </th>
                        <td class="px-4 py-4">
                            {{ item.name ? item.name :
                                "Chưa cập nhật" }}
                        </td>
                        <td class="px-4 py-4 text-right">
                            {{ item.storageCapacity ? formatNumber(item.storageCapacity) :
                                "Chưa cập nhật" }}
                        </td>
                        <td class="px-4 py-4 text-right">
                            {{ item.price ? formatNumber(item.price) :
                                "Chưa cập nhật" }}
                        </td>
                        <td class="px-4 py-4 text-center">
                            {{ item.ratings ? item.ratings :
                                "Chưa cập nhật" }}
                            <span class="fa fa-star text-yellow-500"></span>
                        </td>
                        <td class="px-4 py-4 text-right">
                            {{ item.downloads ? formatNumber(item.downloads) :
                                "Chưa cập nhật" }}
                        </td>
                        <td class="px-4 py-4 text-green-500 text-center
                        .">
                            {{ "Đã được chấp thuận" }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div> -->
        <DataTable v-model:selection="selectedApplication" :value="applicationListResponse"
            tableStyle="min-width: 50rem" stripedRows paginator :rows="10" :rowsPerPageOptions="[10, 20, 50]" sortable
            sortMode="multiple" removableSort :loading="loading" scrollable scrollHeight="600px" ref="dt">

            <!-- <template #header>
                <div class="flex justify-end">
                    <IconField>
                        <InputIcon>
                            <i class="pi pi-search"></i>
                        </InputIcon>
                        <InputText v-model="filters['global'].value" placeholder="Tìm theo từ khóa" />
                    </IconField>
                </div>
            </template> -->
            <template #empty> Không tìm thấy phần mềm. </template>
            <template #loading> Đang tải. Vui lòng chờ. </template>
            <Column selectionMode="single" headerStyle="width: 3rem"></Column>
            <Column sortable field="id" header="ID" bodyStyle="text-align:right">
                <template #header>
                    <span class="flex-1 text-right"></span>
                </template>
            </Column>
            <Column sortable field="name" header="Tên phần mềm">
                <template #body="{ data }">
                    {{ data.name }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                        placeholder="Tìm theo tên" />
                </template>
            </Column>
            <Column sortable field="storageCapacity" header="Dung lượng" bodyStyle="text-align:right">
                <template #header>
                    <span class="flex-1 text-right"></span>
                </template>
                <template #body="slotProps">
                    {{ formatNumber(formatStorageCapacity(slotProps.data.storageCapacity)) }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                        placeholder="Search by country" />
                </template>
            </Column>
            <Column sortable field="price" header="Giá (VNĐ)" bodyStyle="text-align:right">
                <template #header>
                    <span class="flex-1 text-right"></span>
                </template>
                <template #body="slotProps">
                    {{ formatNumber(slotProps.data.price) }}
                </template>
                <!-- <template #filter="{ filterModel, filterCallback }">
                    <MultiSelect v-model="filterModel.value" @change="filterCallback()" :options="representatives"
                        optionLabel="name" placeholder="Any" style="min-width: 14rem" :maxSelectedLabels="1">
                        <template #option="slotProps">
                            <div class="flex items-center gap-2">
                                <img :alt="slotProps.option.name"
                                    :src="`https://primefaces.org/cdn/primevue/images/avatar/${slotProps.option.image}`"
                                    style="width: 32px" />
                                <span>{{ slotProps.option.name }}</span>
                            </div>
                        </template>
                    </MultiSelect>
                </template> -->
            </Column>
            <Column sortable field="ratings" header="Đánh giá trung bình" bodyStyle="text-align:right">
                <template #header>
                    <span class="flex-1 text-right"></span>
                </template>
                <template #body="slotProps">
                    <div v-if="slotProps.data.ratings">
                        {{ slotProps.data.ratings?.toFixed(1) }}
                        <span class="fa fa-star text-yellow-500"></span>
                    </div>
                    <div v-else>
                        Chưa có dữ liệu
                    </div>
                </template>
                <!-- <template #filter="{ filterModel, filterCallback }">
                    <Select v-model="filterModel.value" @change="filterCallback()" :options="statuses"
                        placeholder="Select One" style="min-width: 12rem" :showClear="true">
                        <template #option="slotProps">
                            <Tag :value="slotProps.option" :severity="getSeverity(slotProps.option)" />
                        </template>
                    </Select>
                </template> -->
            </Column>
            <Column sortable field="status" header="Trạng thái">
                <template #body="slotProps">
                    <Tag :value="getStatus(slotProps.data.status)" :severity="getSeverity(slotProps.data.status)" />
                </template>
                <!-- <template #filter="{ filterModel, filterCallback }">
                    <Select v-model="filterModel.value" @change="filterCallback()" :options="statuses"
                        placeholder="Select One" style="min-width: 12rem" :showClear="true">
                        <template #option="slotProps">
                            <Tag :value="slotProps.option" :severity="getSeverity(slotProps.option)" />
                        </template>
                    </Select>
                </template> -->
            </Column>
        </DataTable>
    </div>
</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';
import Rating from 'primevue/rating';
import Tag from 'primevue/tag';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import MultiSelect from 'primevue/multiselect';
import ProgressSpinner from 'primevue/progressspinner';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import { FilterMatchMode } from '@primevue/core/api';
import ApplicationService from "@/services/application.service.js"
import { APPLICATION_APPROVAL_STATUS } from '@/const.js';
import { ref, onBeforeMount } from 'vue';
import { useProductStore } from '@/stores/application.store';
import axios from 'axios';

const productStore = useProductStore();
const isNoSelectedApplication = ref(false);
const isActionOK = ref(false);
const visibleConfirmDialog = ref(false);
const action = ref(0);

interface ApplicationObject {
    id: number,
    name: String,
    price: number,
    downloads: number,
    storageCapacity: number,
    applicationCategory: any,
    applicationFramework: any,
}

const applicationListResponse = ref<ApplicationObject[] | null>(null);
const selectedProduct = ref<ApplicationObject>({
    id: 0,
    name: '',
    price: 0,
    downloads: 0,
    storageCapacity: 0,
    applicationCategory: null,
    applicationFramework: null,
});

const props = defineProps({
    isShowSidebar: {
        type: Boolean,
    }
})

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    verified: { value: null, matchMode: FilterMatchMode.EQUALS }
})

const representatives = ref([
    { name: 'Amy Elsner', image: 'amyelsner.png' },
    { name: 'Anna Fali', image: 'annafali.png' },
    { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
    { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
    { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
    { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
    { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
    { name: 'Onyama Limba', image: 'onyamalimba.png' },
    { name: 'Stephen Shaw', image: 'stephenshaw.png' },
    { name: 'XuXue Feng', image: 'xuxuefeng.png' }
])

const statuses = ref(['unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal']);

const loading = ref(false);
const isLoading = ref(false);

const selectedApplication = ref<ApplicationObject>();
const currentTotalApplications = ref<number>(0);
const dt = ref();
const exportCSV = () => {
    dt.value.exportCSV();
};
const getStatus = (statusId) => {
    switch (statusId) {
        case APPLICATION_APPROVAL_STATUS.REQUESTING:
            return "Đang chờ được chấp thuận";
            break;
        case APPLICATION_APPROVAL_STATUS.APPROVED:
            return "Đã được chấp thuận";
            break;
        case APPLICATION_APPROVAL_STATUS.REJECTED:
            return "Đã bị từ chối";
            break;
        case APPLICATION_APPROVAL_STATUS.DELETE_REQUEST:
            return "Đang yêu cầu được xóa";
            break;
        case APPLICATION_APPROVAL_STATUS.DELETED:
            return "Đã xóa";
            break;
        default:
            break;
    }
}

const getSeverity = (statusId) => {
    switch (statusId) {
        case APPLICATION_APPROVAL_STATUS.REQUESTING:
            return "warn";
            break;
        case APPLICATION_APPROVAL_STATUS.APPROVED:
            return "success";
            break;
        case APPLICATION_APPROVAL_STATUS.REJECTED:
            return "danger";
            break;
        case APPLICATION_APPROVAL_STATUS.DELETE_REQUEST:
            return "warn";
            break;
        case APPLICATION_APPROVAL_STATUS.DELETED:
            return "secondary";
            break;
        default:
            break;
    }
}



const openDialog = (type: number) => {
    isNoSelectedApplication.value = false;
    if (selectedApplication.value) {
        isNoSelectedApplication.value = false;
        visibleConfirmDialog.value = true;
        action.value = type;
    } else {
        isNoSelectedApplication.value = true;
        setTimeout(() => { isNoSelectedApplication.value = false; }, 2000);
    }
}


const confirm = async () => {
    if (action.value === 1) {
        if (selectedApplication.value.status === APPLICATION_APPROVAL_STATUS.REQUESTING) {
            try {
                const applicationId = selectedApplication.value.id;
                const response = await axios.put(`http://localhost:8080/applications/${applicationId}/accept`);
                if (response.status === 200) {
                    console.log('Xác nhận thành công')
                    visibleConfirmDialog.value = false;
                    isActionOK.value = true;
                    setTimeout(() => {
                        isActionOK.value = false;
                    }, 2000);
                }
            } catch (error) {
                console.error('Lỗi khi xác nhận', error);
            }
        }

        if (selectedApplication.value.status === APPLICATION_APPROVAL_STATUS.DELETE_REQUEST) {
            try {
                const applicationId = selectedApplication.value.id;
                const response = await axios.put(`http://localhost:8080/applications/${applicationId}/delete`);
                if (response.status === 200) {
                    console.log('Xóa thành công')
                    visibleConfirmDialog.value = false;
                    isActionOK.value = true;
                    setTimeout(() => {
                        isActionOK.value = false;
                    }, 2000);
                }
            } catch (error) {
                console.error('Lỗi khi xóa', error);
            }
        }
    }

    else if (action.value === 2) {
        if (selectedApplication.value.status === APPLICATION_APPROVAL_STATUS.REQUESTING 
            || selectedApplication.value.status === APPLICATION_APPROVAL_STATUS.DELETE_REQUEST) {
            try {
                const applicationId = selectedApplication.value.id;
                const response = await axios.put(`http://localhost:8080/applications/${applicationId}/reject`);
                if (response.status === 200) {
                    console.log('Từ chối thành công')
                    visibleConfirmDialog.value = false;
                    isActionOK.value = true;
                    setTimeout(() => {
                        isActionOK.value = false;
                    }, 2000);
                }
            } catch (error) {
                console.error('Lỗi khi từ chối', error);
            }
        }
    }

    await retrieveApplicationList();
}

const formatNumber = (number) => {
    return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const formatStorageCapacity = (bytes) => {
    if (bytes >= 1024 ** 3) {
        return `${(bytes / 1024 ** 3).toFixed(2)} GB`;
    } else if (bytes >= 1024 ** 2) {
        return `${(bytes / 1024 ** 2).toFixed(2)} MB`;
    } else if (bytes >= 1024) {
        return `${(bytes / 1024).toFixed(2)} KB`;
    } else {
        return `${bytes} B`;
    }
}

const retriveProducts = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/applications`);
        products.value = response.data;
        currentTotalApplications.value = products.value?.length!;
    } catch (error) {
        console.error('Lỗi khi lấy thông tin sản phẩm', error);
    }
}

const retrieveApplicationList = async () => {
    try {
        isLoading.value = true;
        // setTimeout(async () => {
        const response = await ApplicationService.getAllByAdmin();
        applicationListResponse.value = response.data;
        currentTotalApplications.value = applicationListResponse.value?.length!;
        // }, 10000);
        isLoading.value = false;
    } catch (error) {
        console.log(error);
    }
}

onBeforeMount(async () => {
    await retrieveApplicationList();
    // const developer = JSON.parse(localStorage.getItem('developer'))
    // applicationListResponse.value = developer.applicationList;
});
const isNotEnteredID = ref(false);
const isUpdatedOK = ref(false);
// const blockAndUnblock = async (employee: Employee) => {
//     try {
//         let idToSearch = parseInt(selectedEmployee.value.id);
//         console.log(idToSearch);
//         if (isNaN(idToSearch)) {
//             isNotEnteredID.value = true;
//             setTimeout(() => {
//                 isNotEnteredID.value = false;
//             }, 1500);
//             return;
//         }
//         const response = await axios.put(`http://localhost:8080/users/${employee.id}/updateLockedStatus`);
//         if (response.status === 200) {
//             let index = employees.value?.findIndex((a) => a.id === employee.id)
//             employee.locked = !employee.locked;
//             if (index != undefined && index >= 0) {
//                 employees.value?.splice(index, 1, employee)
//                 isUpdatedOK.value = true;
//                 setTimeout(() => {
//                     isUpdatedOK.value = false;
//                 }, 1500);
//             } else {
//                 return;
//             }
//         } else {
//             console.error('Error updating lock status');
//         }
//     } catch (error) {
//         console.error('Error updating lock status:', error);
//     }
// };

const isNotFoundProductDetail = ref(false);
// const" = () => {
//     let idToSearch = parseInt(selectedProduct.value.id);
//     console.log(idToSearch);
//     if (isNaN(idToSearch)) {
//         isNotEnteredID.value = true;
//         setTimeout(() => {
//             isNotEnteredID.value = false;
//         }, 1500);
//     } else {
//         const index = productDetails.value?.findIndex(detail => parseInt(detail.id) === idToSearch);
//         if (index !== undefined && index !== -1) {
//             const element = document.querySelectorAll('.row-data')[index];
//             element.scrollIntoView({ behavior: 'smooth', block: 'center' });
//             element.classList.add('found');
//             setTimeout(() => {
//                 element.classList.remove('found');
//             }, 4000);
//         } else {
//             isNotFoundProductDetail.value = true;
//             setTimeout(() => {
//                 isNotFoundProductDetail.value = false;
//             }, 1500);
//         }
//     }
// };

const selectProduct = (product: ProductObject) => {
    selectedProduct.value = { ...product };
};

const activeAddForm = () => {
    productStore.setIsShowAddFormClick(true);
}

const activeUpdateForm = () => {
    if (selectedProduct.value.id > 0)
        productStore.setIsShowUpdateFormClick(true);
}
const showDetails = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/products/${selectedProduct.value.id}/details`);
        productDetails.value = response.data;
        productDetails.value.forEach(detail => {
            const imageLinksArray = detail.imageLinks.split(", ");
            detail.imageLinks = imageLinksArray;
        })
    } catch (error) {
        console.error('Lỗi khi lấy thông tin sản phẩm', error);
    }
    productStore.setIsShowDetails(true);
}

const reloadDetails = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/products/${selectedProduct.value.id}/details`);
        productDetails.value = response.data;
        productDetails.value.forEach(detail => {
            const imageLinksArray = detail.imageLinks.split(", ");
            detail.imageLinks = imageLinksArray;
        })
    } catch (error) {
        console.error('Lỗi khi lấy thông tin sản phẩm', error);
    }
}

const deteleProduct = async () => {
    try {
        const response = await axios.delete(`http://localhost:8080/products/${selectedProduct.value.id}`);
        Object.keys(selectedProduct).forEach((i) => selectedProduct[i] = null);
        retriveProducts();
        return response;
    } catch (error) {
        console.error('Lỗi khi xóa sản phẩm', error);
    }
}

</script>
<style scoped>
.column-text-right {
    .p-datatable-column-header-content {
        text-align: right;
        display: block !important;
    }
}

.w-1\/8 {
    width: 12.5%;
}

.w-1\/10 {
    width: 10%;
}

.w-1\/12 {
    width: 8.33%;
}

.fixed-header {
    position: sticky;
    top: 0;
    z-index: 1;
}

.custom-scrollbar::-webkit-scrollbar {
    width: 5px;
    height: 5px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
}

.row-data:hover {
    background-color: rgb(237, 239, 238) !important;
}

.row-data.font-bold {
    border: 2px solid blue;
}

.found {
    background-color: rgb(196, 199, 199);
}
</style>