<template>
  <div v-if="isSuccessfulPayment"
    class="fixed top-20 bg-green-100 text-green-700 p-6 text-center text-lg z-50 rounded-md" role="alert"
    id="successPayment" style="right: 4px; margin-top: 15px;">
    <span class="font-medium">Thanh toán thành công!</span>
  </div>
  <div v-if="isFailedPayment" class="fixed top-20 bg-red-100 text-red-700 p-6 text-center text-lg z-50 rounded-md" role="alert"
    id="addExistedCartMessage" style="right: 4px; margin-top: 15px;">
    <span class="font-medium">Thanh toán thất bại, xin thử lại!</span>
  </div>

  <el-header>
    <HeaderMenu :cart-quantity-after-payment="CartService.cartQuantity.value"/>
  </el-header>

  <el-main>
    <CarouselSlide />
    <div v-for="type in listSlides">
      <ProductList :application-list="applicationListResponse" :list-type="type" :key="type" />
    </div>
  </el-main>

  <el-footer>
    <FooterComponent />
  </el-footer>
</template>


<script setup>
import { ref, reactive, computed, onBeforeMount, onMounted, watch } from 'vue';
import HeaderMenu from '@/components/common/HeaderMenu.vue'
import SearchInput from '@/components/common/SearchInput.vue'
import CarouselSlide from '@/components/common/CarouselSlide.vue'
import FooterComponent from '@/components/common/FooterComponent.vue'
import ProductList from '@/components/product/ProductList.vue'
import ApplicationService from "@/services/application.service.js"
import CartService from "@/services/cart.service.ts"

const listSlides = [
  { id: 1, title: 'Ứng dụng mới', name: 'newApplications' },
  { id: 2, title: 'Ứng dụng được tải nhiều', name: 'mostDownloadedApplications' },
  { id: 3, title: 'Ứng dụng giảm giá nhiều nhất', name: 'mostSaleApplications' },
]

const applicationListResponse = ref([]);
const isSuccessfulPayment = ref();
const isFailedPayment = ref();

const retrieveApplicationList = async () => {
  try {
    applicationListResponse.value = await ApplicationService.getAll();
  } catch (error) {
    console.log(error);
  }
}

const getQueryParamByName = (name) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

const init = () => {
  retrieveApplicationList();
}

watch(isSuccessfulPayment,)

onBeforeMount(() => {
  if (getQueryParamByName('vnp_ResponseCode')) {
    const code = getQueryParamByName('vnp_ResponseCode');
    if (code == '00') {
      CartService.cartQuantity.value = 0;
      CartService.addOrderToSuccessful(+getQueryParamByName('orderId'));
      isSuccessfulPayment.value = true;
      setTimeout(() => {
        isSuccessfulPayment.value = null;
      }, 2000); 
    } else {
      isFailedPayment.value = true;
      setTimeout(() => {
        isFailedPayment.value = null;
      }, 2000);
    }
  }
})

onMounted(() => {
  init();
})
</script>

<style>
.el-main {
  --el-main-padding: 15px;
  padding: var(--el-main-padding);
  margin-left: auto;
  margin-right: auto;
  width: 75%;
  max-width: 1600px;
  margin-top: 60px;
}

.el-header,
.el-footer,
.el-main {
  padding: 0;
}
</style>