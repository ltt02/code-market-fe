<template>
    <el-header>
        <HeaderMenu />
    </el-header>
    <el-main>
        <div class="max-w-6xl mx-auto pb-[90px]">
            <header class="flex justify-between items-center mb-8">
                <h1 class="text-4xl font-bold">Giỏ hàng</h1>
                <!-- <div class="flex items-center space-x-2">
                    <span class="text-gray-400">Epic Rewards</span>
                    <ExternalLinkIcon class="w-4 h-4 text-gray-400" />
                    <div class="bg-gray-700 rounded-full px-3 py-1 text-sm">40</div>
                </div> -->
            </header>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div class="lg:col-span-2 space-y-4">
                    <div v-for="item in applicationInCart" :key="item.application.id"
                        class="shadow-md hover:shadow-lg rounded-lg p-4">
                        <div class="flex items-start space-x-4">
                            <router-link :to="{
                                name: 'application',
                                params: {
                                    id: item.application.id,
                                },
                            }">
                                <img :src="item.application.images" :alt="item.application.name"
                                    class="w-48 h-24 object-cover rounded" />
                            </router-link>
                            <router-link :to="{
                                name: 'application',
                                params: {
                                    id: item.application.id,
                                },
                            }"  class="flex-grow">
                                <div class="flex-grow">
                                    <div class="flex justify-between items-start">
                                        <div>
                                            <span class="text-xs text-gray-400">{{
                                                getApplicationType(item.application.type)
                                                }}</span>
                                            <h2 class="text-l font-semibold">{{ item.application.name }}</h2>
                                        </div>
                                        <span v-if="item.application.price > 0" class="text-xl">{{
                                            VND.format(item.application.price) }}</span>
                                        <span v-else class="text-xl">Miễn phí</span>
                                    </div>
                                    <!-- <div v-if="item.rating"
                                    class="mt-2 inline-flex items-center bg-gray-700 rounded px-2 py-1">
                                    <span class="text-sm font-bold mr-1">{{ item.rating }}+</span>
                                    <span class="text-xs text-gray-400">{{ item.ratingDescription }}</span>
                                </div>
                                <div v-if="item.reward" class="mt-2 text-sm text-yellow-500">
                                    <Coins class="inline w-4 h-4 mr-1" />
                                    {{ item.reward }}
                                </div>
                                <div v-if="item.refundable" class="mt-2 text-sm text-gray-400">
                                    Self-Refundable
                                    <InfoIcon class="inline w-4 h-4" />
                                </div> -->
                                </div>
                            </router-link>

                        </div>
                        <div class="flex justify-end space-x-4 mt-4" @click.prevent="removeFromCart(item.cartDetailId)">
                            <button class="text-gray-600 hover:text-gray-400 transition-colors">
                                <Trash2></Trash2>
                            </button>
                            <!-- <button class="text-gray-400 hover:text-white transition-colors">Move to wishlist</button> -->
                        </div>
                    </div>
                </div>

                <div class="shadow-md rounded-lg p-6 h-fit">
                    <h2 class="text-2xl font-semibold mb-4">Tổng cộng</h2>
                    <div class="space-y-2 mb-4">
                        <div class="flex justify-between">
                            <span>Số tiền</span>
                            <span>{{ totalPriceFormated }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Thuế</span>
                            <span>0%</span>
                        </div>
                    </div>
                    <div class="border-t border-gray-700 pt-4 mb-6">
                        <div class="flex justify-between font-semibold">
                            <span>Tổng tiền</span>
                            <span>{{ totalPriceFormated }}</span>
                        </div>
                    </div>
                    <button @click="placeOrder"
                        class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded transition-colors">
                        Thanh toán
                    </button>
                </div>
            </div>
        </div>
    </el-main>
    <el-footer>
        <FooterComponent />
    </el-footer>
</template>

<script setup>
import { ref, reactive, computed, onBeforeMount } from 'vue'
import { ExternalLinkIcon, Coins, InfoIcon, Trash2  } from 'lucide-vue-next'
import CartService from "@/services/cart.service.ts"
import { APPLICATION_TYPE } from '@/const.js';

const cartItems = ref([
    {
        id: 1,
        type: 'Base Game',
        title: 'Black Myth: Wukong',
        price: '1299000',
        image: 'https://code.market/imgproxy/2024/08/Spike_Free_Angular_715X364-Code.market.png',
        rating: '16',
        ratingDescription: 'Strong Violence',
        reward: 'Earn 5% back in Epic Rewards',
        refundable: true
    },
    {
        id: 2,
        type: 'App',
        title: 'Discord',
        price: '0',
        image: 'https://code.market/imgproxy/2024/05/Nuva-Diving-Swimming-School-Angular-Template.jpeg',
        description: 'May include in-app purchases'
    },
    {
        id: 2,
        type: 'App',
        title: 'Test',
        price: '1299000',
        image: 'https://code.market/imgproxy/2024/05/StarSync-Astro-App-React-Native-Template.jpg',
        description: 'May include in-app purchases'
    }
])

const applicationInCart = ref([]);
const paymentUrl = ref("");

const totalPrice = computed(() => {
    return applicationInCart.value.reduce((sum, item) => {
        return sum + parseInt(item.application.price)
    }, 0)
})

const totalPriceFormated = computed(() => `${totalPrice.value.toLocaleString()} ₫`)

const VNDFormatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

const VND = computed(() => ({
    format: (value) => VNDFormatter.format(value)
}));

const getApplicationType = (type) => {
    return APPLICATION_TYPE[type] || '';  // Default to 'Unknown' if not found
}

const getCart = async () => {
    const response = await CartService.getCart();
    applicationInCart.value = response;
    const cartDetails = CartService.cartItems.value.map((item) => item.cartDetailId );
    CartService.cartDetailsToOrder.value = CartService.cartDetailsToOrder.value.concat(cartDetails);
    return response;
}

const removeFromCart = async (cartDetailId) => {
    const response = await CartService.deleteCartDetail(cartDetailId);
    applicationInCart.value = response;
    return response;
}

const placeOrder = async () => {
  let data = {
    status: "PROCESSING",
    total: totalPrice.value
  };
  paymentUrl.value = (await CartService.addCartDetailToOrder_payment(data)).data;
  if (paymentUrl.value != null)
    window.location.href = paymentUrl.value;
}

onBeforeMount(() => {
    getCart();
});

</script>