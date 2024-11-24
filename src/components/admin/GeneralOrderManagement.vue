<template>
    <div class="customer-management m-3">
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
                </div>
                <!-- Tìm kiếm và Khoá/Mở Khoá tài khoản khách hàng -->
                <div class="w-full flex">
                    <!-- <div class="w-1/6 mr-2">
                        <label class="text-gray-700" for="id">
                            ID:
                        </label>
                        <input v-model="selectedEmployee.id"
                            class="input-id w-full bg-gray-200 text-gray-800 py-2 px-3 rounded-md focus:outline-none">
                    </div>
                    <div class="w-1/6 mr-2">
                        <label class="text-gray-700" for="id">
                            Tên tài khoản:
                        </label>
                        <input v-model="selectedEmployee.account"
                            class="w-full bg-gray-200 text-gray-800 py-2 px-3 rounded-md focus:outline-none">
                    </div> -->
                    <div class="w-1/6 mr-2">
                        <label class="text-gray-700" for="id">
                            Trạng thái
                        </label>
                        <div
                            class="input-container w-full bg-gray-200 text-gray-800 py-2 px-3 rounded-md focus:outline-none focus:bg-white">
                            {{ selectedEmployee?.account == '' ? 'Chọn tk...' :
                                (selectedEmployee?.locked ? "Đã bị khoá" : "Hoạt động") }}</div>
                    </div>
                    <div class="w-2/6 mr-2 flex items-end">
                        <button @click="blockAndUnblock(selectedEmployee)"
                            class=" mr-2 bg-gradient-to-b from-green-500 to-sky-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            {{ selectedEmployee?.locked ? "Mở khoá" : "Khoá" }}
                        </button>
                        <button @click="searchEmployee"
                            class="mr-2 bg-gradient-to-b from-blue-500 to-sky-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Tìm
                            kiếm</button>
                    </div>
                    <!-- <div class="filter-employee w-1/6 mr-2">
                        <label for="userType" class="text-gray-700">Chức vụ:</label>
                        <select v-model="selectedUserType" @change="filterEmployeesByUserType" id="userType"
                            class="w-full bg-gray-200 text-gray-800 py-2 px-3 rounded-md focus:outline-none">
                            <option value="all">Tất cả</option>
                            <option value="admin">Admin</option>
                            <option value="manager">Manager</option>
                            <option value="senior_manager">Senior Manager</option>
                            <option value="staff">Staff</option>
                        </select>
                    </div> -->
                </div>
                <div class="flex items-end mt-2">Tổng số: {{ currentTotalOrder }}</div>
            </div>
        </div>
        <DataTable v-model:expandedRows="expandedRows" v-model:selection="selectedApplication"
            :value="orderListResponse" tableStyle="min-width: 50rem" stripedRows paginator :rows="5"
            :rowsPerPageOptions="[5, 10, 20, 50]" sortable sortMode="multiple" removableSort :loading="loading"
            scrollable scrollHeight="600px" ref="dt" dataKey="id" @rowExpand="onRowExpand" @rowCollapse="onRowCollapse"
            :row-class="rowClass">
            <template #header>
                <div class="flex flex-wrap justify-end gap-2">
                    <Button text icon="pi pi-plus" label="Expand All" @click="expandAll" />
                    <Button text icon="pi pi-minus" label="Collapse All" @click="collapseAll" />
                </div>
            </template>
            <template #empty> Không tìm thấy đơn hàng nào. </template>
            <template #loading> Đang tải. Vui lòng chờ. </template>
            <Column expander style="width: 5rem">
                <template #body="slotProps">
                    <div v-if="slotProps.data.orderDetailsDtoList?.length > 0">
                        <Button />
                    </div>
                </template>
            </Column>
            <Column sortable field="id" header="ID">

            </Column>
            <Column sortable field="name" header="Khách hàng">
                <template #body="{ data }">
                    {{ data.customer.userName }}
                </template>
            </Column>
            <Column sortable field="total" header="Tổng tiền" bodyStyle="text-align:right">
                <template #header>
                    <span class="flex-1 text-right"></span>
                </template>
                <template #body="slotProps">
                    {{ formatNumber(slotProps.data.total) }}
                </template>
            </Column>

            <Column sortable field="createDate" header="Ngày mua hàng">
                <template #body="slotProps">
                    {{ formatDate(slotProps.data.createDate) }}
                </template>
            </Column>
            <Column sortable field="status" header="Trạng thái">
                <template #body="slotProps">
                    <Tag :value="getStatus(slotProps.data.status)" :severity="getSeverity(slotProps.data.status)" />
                </template>
            </Column>
            <template #expansion="slotProps">
                <div class="p-4">
                    <h5>Chi tiết đơn hàng #{{ slotProps.data.id }}</h5>
                    <DataTable :value="slotProps.data.orderDetailDtoList" removableSort>
                        <Column field="id" header="ID" sortable></Column>
                        <Column field="application.id" header="Mã phần mềm" sortable></Column>
                        <Column field="application.name" header="Tên phần mềm" sortable></Column>
                        <Column field="application.price" header="Giá tiền" sortable bodyStyle="text-align:right">
                            <template #header>
                                <span class="flex-1 text-right"></span>
                            </template>
                            <template #body="slotProps">
                                {{ formatNumber(slotProps.data.application.price) }}
                            </template>
                        </Column>
                        <!-- <Column field="status" header="Status" sortable>
                            <template #body="slotProps">
                                <Tag :value="slotProps.data.status.toLowerCase()"
                                    :severity="getOrderSeverity(slotProps.data)" />
                            </template>
                        </Column>
                        <Column headerStyle="width:4rem">
                            <template #body>
                                <Button icon="pi pi-search" />
                            </template>
                        </Column> -->
                    </DataTable>
                </div>
            </template>
        </DataTable>
    </div>
</template>

<script setup lang="ts">
import ProductAddForm from '@/components/developer/ProductAddForm.vue';
import ProductUpdateForm from '@/components/developer/ProductUpdateForm.vue';
import ProductDetails from '@/components/developer/ProductDetails.vue';
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
import Button from 'primevue/button';
import { FilterMatchMode } from '@primevue/core/api';
import ApplicationService from "@/services/application.service.js"
import CartService from "@/services/cart.service.js"
import { APPLICATION_APPROVAL_STATUS } from '@/const.js';
import { ref, onBeforeMount } from 'vue';
import { useProductStore } from '@/stores/application.store';
import { useToast } from 'primevue/usetoast';
import axios from 'axios';

const expandedRows = ref({});
const toast = useToast();

const productStore = useProductStore();

interface ApplicationObject {
    id: number,
    name: String,
    price: number,
    downloads: number,
    storageCapacity: number,
    applicationCategory: any,
    applicationFramework: any,
}

interface OrderDetailObject {
    id: number,
    application: ApplicationObject,
}

const applicationListResponse = ref<ApplicationObject[] | null>(null);
const orderListResponse = ref<OrderDetailObject[] | null>(null);

const selectedProduct = ref<ApplicationObject>({
    id: 0,
    name: '',
    price: 0,
    downloads: 0,
    storageCapacity: 0,
    applicationCategory: null,
    applicationFramework: null,
});

const selectedOrder = ref<OrderDetailObject>({
    id: 0,
    name: '',
    price: 0,
    downloads: 0,
    storageCapacity: 0,
    applicationCategory: null,
    applicationFramework: null,
});

const onRowExpand = (event) => {
    toast.add({
        severity: 'info',
        summary: 'Product Expanded',
        detail: event.data.name,
        life: 3000,
    });
};
const onRowCollapse = (event) => {
    toast.add({
        severity: 'success',
        summary: 'Product Collapsed',
        detail: event.data.name,
        life: 3000,
    });
};
const expandAll = () => {
    expandedRows.value = orderListResponse.value.reduce(
        (acc, p) => (acc[p.id] = true) && acc,
        {}
    );
};
const collapseAll = () => {
    expandedRows.value = null;
};

const rowClass = (rowData) => {
    return rowData.orderDetailDtoList.length > 0 ? "" : "no-expander";
}


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
const currentTotalOrder = ref<number>(0);
const dt = ref();
const exportCSV = () => {
    dt.value.exportCSV();
};
const getStatus = (statusId) => {
    switch (statusId) {
        case null:
            return "Đang chờ";
            break;
        case "SUCCESSFUL":
            return "Thành công";
            break;
        case "REFUNDED":
            return "Đã hoàn tiền";
            break;
        default:
            break;
    }
}

const getSeverity = (status) => {
    switch (status) {
        case null:
            return "warn";
            break;
        case "SUCCESSFUL":
            return "success";
            break;
        case "REFUNDED":
            return "danger";
            break;
        default:
            break;
    }
}

const formatNumber = (number) => {
    return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const formatDate = (dateString) => {

    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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

const retrieveApplicationListByDeveloperId = async () => {
    try {
        isLoading.value = true;
        // setTimeout(async () => {
        const developerId = JSON.parse(localStorage.getItem('developer')).id;
        const response = await ApplicationService.getAllByDeveloperId(developerId);
        applicationListResponse.value = response.data;
        currentTotalApplications.value = applicationListResponse.value?.length!;
        // }, 10000);
        isLoading.value = false;
    } catch (error) {
        console.log(error);
    }
}

const retrieveOrderListByDeveloperId = async () => {
    try {
        isLoading.value = true;
        // setTimeout(async () => {
        const developerId = JSON.parse(localStorage.getItem('developer')).id;
        const response = await CartService.getAllOrderByDeveloperId(developerId);
        orderListResponse.value = response.data;
        currentTotalOrder.value = orderListResponse.value?.length!;
        // }, 10000);
        isLoading.value = false;
    } catch (error) {
        console.log(error);
    }
}

onBeforeMount(async () => {
    await retrieveApplicationListByDeveloperId();
    await retrieveOrderListByDeveloperId();
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
.p-datatable-table .p-datatable-tbody>tr.no-expander {
    display: none !important;
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