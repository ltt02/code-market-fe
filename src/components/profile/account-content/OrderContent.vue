<script setup lang="ts">
import { ref, onMounted, inject } from 'vue';
import CartService from "@/services/cart.service.ts"
import OrderCard from "./OrderCard.vue";
import DataView from 'primevue/dataview';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Rating from 'primevue/rating';
import FloatLabel from 'primevue/floatlabel';
import Textarea from 'primevue/textarea';
import axios from 'axios';

const isReviewDone = ref(false);

const visible = ref(false);

const ratingValue = ref(1);
const reviewContent = ref();

const selectedApplication = ref();

const baseUrl = 'http://localhost:8080';

const formatNumber = (number) => {
  return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const responseCode = ref<any>(null);

const getQueryParamByName = (name: string) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

const isLoading = ref(true)
const orderItems = ref([]);

const onReview = async (item) => {
  selectedApplication.value = {
    ...item,
  }
  visible.value = true;
}

const addReview = async (data) => {
  try {
    const request = {
      content: reviewContent.value,
      rate: ratingValue.value,
      userId: JSON.parse(localStorage.getItem('user')).id,
    }
    const response = await axios.post(`${baseUrl}/customers/1/orders/detail/${data.id}`, request);

    if (response.status === 200) {
      isReviewDone.value = true;
      visible.value = false;
      selectedApplication.value = null;
      reviewContent.value = null;
      ratingValue.value = null;
      setTimeout(() => {
        isReviewDone.value = false;
      }, 1000)
    }
  } catch (error) {
    console.log(error);
  }
}

// Call the function to get the value of the 'paramName' query parameter
onMounted(async () => {
  orderItems.value = (await CartService.getAllOrders()).data;

  // responseCode.value = getQueryParamByName('vnp_ResponseCode');
  // if (responseCode.value == '00') {
  //   console.log("Giao dịch thành công");
  //   cartService.addOrderToSuccessful(+getQueryParamByName('orderId')!);
  //   window.location.href = "http://localhost:8081/account/orders"
  // }
});


// setTimeout(async () => {
//   isLoading.value = false;
// }, 1000);

</script>

<template>
  <!-- <span class="loader" v-show="isLoading"></span> -->
  <div class="account-content my-50">
    <!-- Thông báo lỗi -->
    <div v-if="isReviewDone"
      class="fixed top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-100 text-green-700 p-6 text-center text-lg z-50 rounded-md"
      role="alert">
      <span class="font-medium">Đánh giá thành công!</span>
    </div>
    <div id="info-tab" class="account-info">
      <h2 class="account-page-title">Lịch sử mua hàng</h2>
      <!-- <div class="account-page-label">
        Đơn hàng của bạn
        <span class="d-grid justify-content-center">
          Bạn chưa có đơn hàng nào...
        </span>
      </div> -->
      <div>
        <div class="account-page-label">
          Tổng đơn hàng đã mua của bạn<span>: {{ orderItems.length }}</span>
        </div>
        <Dialog class="review-dialog" v-model:visible="visible" modal header="Edit Profile" :style="{ width: '50rem' }">
          <template #header>
            <div class="inline-flex items-center justify-center">
              <span class="text-2xl font-bold whitespace-nowrap">Đánh giá phần mềm</span>
            </div>
          </template>
          <div class="flex mb-4">
            <div class="md:w-40 relative">
              <img class="block xl:block mx-auto rounded w-full h-full"
                :src="selectedApplication.application.applicationImages[0]?.link"
                :alt="selectedApplication?.application.name" />
            </div>
            <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
              <div class="flex flex-row md:flex-col justify-between items-start gap-2 pl-4">
                <div>
                  <div class="text-lg font-medium">{{ selectedApplication?.application.name }}</div>
                </div>
              </div>
            </div>
          </div>

          <span class="text-surface-500 dark:text-surface-400 block mb-4">
            <Rating v-model="ratingValue" />
          </span>
          <div class="flex items-center mb-4">
            <FloatLabel variant="on">
              <Textarea id="over_label" v-model="reviewContent" rows="5" cols="80" style="resize: none" />
              <label for="on_label">Nội dung đánh giá</label>
            </FloatLabel>
          </div>
          <template #footer>
            <Button label="Trở lại" button severity="secondary" @click="visible = false" autofocus />
            <Button label="Hoàn thành" button severity="success" @click="addReview(selectedApplication)" autofocus />
          </template>
        </Dialog>
        <DataView :value="orderItems" paginator :rows="2">
          <template #list="slotProps">
            <div class="flex flex-col">
              <div v-for="(item, index) in slotProps.items" :key="index">
                <div class="flex flex-col p-6 gap-4"
                  :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }">
                  <div class="text-2xl">
                    <p>Mã đơn hàng: #{{ item.id }}</p>
                  </div>
                  <h2 class="text-xl">Nhà phát triển: {{ item.developer.userName }}</h2>
                  <div v-for="(subItem, index) in item.orderDetailDtoList" class="flex">
                    <div class="md:w-40 relative">
                      <img class="block xl:block mx-auto rounded w-full h-full"
                        :src="subItem.application.applicationImages[0]?.link" :alt="item.name" />
                      <div class="absolute bg-black/70 rounded-border" style="left: 4px; top: 4px">
                        <!-- <Tag :value="item.inventoryStatus" :severity="getSeverity(item)"></Tag> -->
                      </div>
                    </div>
                    <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                      <div class="flex flex-row md:flex-col justify-between items-start gap-2 pl-4">
                        <div>
                          <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">
                            {{ item.category }}
                          </span>
                          <div class="text-lg font-medium mt-2">{{ subItem.application.name }}</div>
                        </div>
                        <div class="bg-surface-100" style="border-radius: 30px">
                          <div class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2"
                            style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                            <span v-if="subItem.application.ratings" class="text-surface-900 font-medium text-sm">{{
                              subItem.application.ratings }}</span>
                            <span v-else class="text-surface-900 font-medium text-sm">Chưa có đánh giá</span>
                            <i class="pi pi-star-fill text-yellow-500"></i>
                          </div>
                        </div>
                      </div>
                      <div class="flex flex-col md:items-end gap-8">
                        <span class="text-xl font-bold">{{ formatNumber(subItem.application.price) }} ₫</span>
                        <div class="flex flex-row-reverse md:flex-row gap-2">
                          <!-- <Button icon="pi pi-heart" severity="danger" outlined></Button> -->
                          <Button icon="pi pi-pencil" label="Đánh giá" severity="contrast"
                            :disabled="item.inventoryStatus === 'OUTOFSTOCK'"
                            class="flex-auto md:flex-initial whitespace-nowrap" @click="onReview(subItem)"></Button>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div class="text-xl font-semibold text-right">Thành tiền: <span class="font-bold">{{
                    formatNumber(item.total) }} ₫</span></div>
                </div>
              </div>
            </div>
          </template>
        </DataView>
      </div>
    </div>
  </div>
</template>

<style scoped>
.review-dialog .p-rating-option svg {
  width: 28px;
  height: 28px;
}

.loader {
  display: block;
  border-radius: 50%;
  position: relative;
  animation: rotate 1s linear infinite;
  width: 200px;
  height: 200px;
  background: rgba(255, 255, 255, 0.5);
  position: fixed;
  top: 40%;
  left: 40%;
  z-index: 100;
}

.loader::before,
.loader::after {
  content: "";
  box-sizing: border-box;
  position: absolute;
  inset: 0px;
  border-radius: 50%;
  border: 20px solid #e5e3e3;
  animation: prixClipFix 2s linear infinite;
  z-index: 1000;
}

.loader::after {
  border-color: #2424be;
  animation: prixClipFix 2s linear infinite, rotate 0.5s linear infinite reverse;
  inset: 6px;
  z-index: 1000;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg)
  }

  100% {
    transform: rotate(360deg)
  }
}

@keyframes prixClipFix {
  0% {
    clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0)
  }

  25% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0)
  }

  50% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%)
  }

  75% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%)
  }

  100% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0)
  }
}

.account-content {
  position: relative;
  /* display: flex; */
  align-items: center;
  padding: 3rem 3rem;
  transition: all 0.2s;
  border-radius: 0.5rem;
  font-size: 1rem;
  box-sizing: border-box;
  background-color: white;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.account-page-title {
  margin-bottom: 25px;
  font-size: 2.5rem;
}

.account-page-label {
  font-size: 18px;
  color: rgba(0, 0, 0, 0.5333333333);
}

a {
  background-color: transparent;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s;
}

.order:not(:last-child) {
  margin-bottom: 27px;
}

*,
:after,
:before {
  box-sizing: border-box;
}
</style>
