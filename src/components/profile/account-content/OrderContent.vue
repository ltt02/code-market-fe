<script setup lang="ts">
import { ref, onMounted, inject } from 'vue';
import CartService from "@/services/cart.service.ts"
import OrderCard from "./OrderCard.vue";
import DataView from 'primevue/dataview';
import Button from 'primevue/button';

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
                          <Button icon="pi pi-heart" severity="danger" outlined></Button>
                          <Button icon="pi pi-pencil" label="Đánh giá" severity="contrast" :disabled="item.inventoryStatus === 'OUTOFSTOCK'"
                            class="flex-auto md:flex-initial whitespace-nowrap"></Button>
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

/* 
.order {
  position: relative;
  display: block;
}

.order-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  background-color: #2f5acf;
  border-radius: 0.5rem;
  padding: 10px 30px;
  position: relative;
  z-index: 2;
  box-sizing: border-box;
}

.order-header .order-title {
  font-weight: bold;
  font-size: 1.1rem;
}

.order-title,
.order-date {
  margin: 0px;
}

.order-header .order-date {
  font-size: 0.8rem;
}

.order-status-wait {
  display: flex;
  padding: 6px 12px;
  justify-content: center;
  align-items: center;
  background-color: #f2fd5d;
  border-radius: 47px;
  color: #000;
}

.order-status-done {
  display: flex;
  padding: 6px 12px;
  justify-content: center;
  align-items: center;
  background-color: #57e37f;
  border-radius: 47px;
  color: #000;
}

.order-body {
  border: 1px solid #d9d9d9;
  background-color: rgb(232, 232, 232);
  margin-top: -16px;
  position: relative;
  z-index: 1;
  padding-top: 16px;
}

.order-item:not(:last-child) {
  border-bottom: 1px solid #d9d9d9;
}

.order-item {
  padding: 1rem 30px;
  display: flex;
  width: 100%;
  position: relative;
}

.order-item-thumbnail {
  position: relative;
  width: 100px;
  margin-right: 1rem;
}

.order-item-thumbnail::before {
  content: "";
  display: block;
  padding-top: 111.7647058824%;
  height: 0;
  width: 100%;
}

.order-item-thumbnail img {
  border-radius: 8px;
}

.order-item-thumbnail img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
}

.order-item-info {
  flex: 1;
}

.order-item-title,
.order-item-price {
  font-weight: 600;
}

.order-item-variant-label,
.order-item-quantity {
  color: rgba(0, 0, 0, 0.6);
}

.order-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border: 1px solid #d9d9d9;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 0.5rem 30px 0.5rem;
  border-radius: 0 0 0.5rem 0.5rem;
  position: relative;
  z-index: 1;
  box-sizing: border-box;
}

.order-footer-left {
  display: flex;
}

.order-footer-left .btn {
  height: auto;
  padding: 0.5rem 2rem;
  border-radius: 100vmax;
  line-height: 1.5;
  box-sizing: border-box;
  font-family: "CriteriaCF", "Pangea", sans-serif;
  margin-right: 10px;
  border: 2px solid #000;
  cursor: pointer;
}

.btn--outline {
  background-color: transparent;
  color: #000;
}

.btn--outline:hover {
  background-color: #000;
  color: #fff;
  border: 2px solid #000;
}

.order-footer-right {
  text-align: right;
} */

*,
:after,
:before {
  box-sizing: border-box;
}
</style>
