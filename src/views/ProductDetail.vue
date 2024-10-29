<template>
    <el-header>
        <HeaderMenu />
    </el-header>
    <el-main>
        <div class="fixed top-20 bg-green-100 text-green-700 p-6 text-center text-lg z-50 rounded-md" role="alert"
            id="addCartMessage" style="right: 4px; margin-top: 15px; display: none;">
            <span class="font-medium">Thêm vào giỏ hàng thành công!</span>
        </div>
        <div class="fixed top-20 bg-red-100 text-red-700 p-6 text-center text-lg z-50 rounded-md" role="alert"
            id="addExistedCartMessage" style="right: 4px; margin-top: 15px; display: none;">
            <span class="font-medium">Đã tồn tại trong giỏ hàng!</span>
        </div>
        <div class="product-detail-container">
            <div class="product-detail-main-content">
                <div class="product-detail-main">
                    <div class="product-detail-title">
                        <div class="product-detail-title-flex">
                            <div class="product-detail-title-text-container">
                                <h1>{{ application.name }}</h1>
                            </div>
                        </div>
                    </div>
                    <div class="product-detail-body">
                        <div class="product-detail-body-container">
                            <div class="product-detail-basic-info">
                                <div class="product-detail-media">
                                    <div class="product-detail-media-container">
                                        <div class="product-detail-media-container-lv2">
                                            <div class="product-detail-media-container-lv2">
                                                <div class="product-detail-image-container">
                                                    <div class="product-detail-image-container-lv2">
                                                        <div class="product-detail-image-container-lv3">
                                                            <div class="product-detail-image-container-lv4">
                                                                <div class="product-detail-image-container-lv5">
                                                                    <img :src="application.images" alt="">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="product-detail-media">
                                    <div class="product-detail-description">
                                        <div class="product-detail-description-container">
                                            <div class="product-detail-description-section">
                                                <span>
                                                    <div class="product-detail-description-text-container">
                                                        <div class="product-detail-description-text">
                                                            {{ application.description }}
                                                        </div>
                                                    </div>
                                                </span>
                                            </div>
                                            <div class="product-detail-description-section">
                                                <div class="product-detail-description-genres">
                                                    <div class="product-detail-description-genres-section pr-20">
                                                        <div class="genres-text-container">
                                                            <div class="genres-text-container-lv2">
                                                                <div class="genres-text-container-lv3">
                                                                    <p>Thể loại</p>
                                                                </div>
                                                            </div>
                                                            <div class="genres-text-container-lv2">
                                                                <div class="genres-badge">
                                                                    <a href="" class="genres-badge-link">
                                                                        <span>
                                                                            <span>Trò chuyện</span>
                                                                        </span>
                                                                    </a>
                                                                    <a href="" class="genres-badge-link">
                                                                        <span>
                                                                            <span>Cộng đồng</span>
                                                                        </span>
                                                                    </a>
                                                                    <a href="" class="genres-badge-link">
                                                                        <span>
                                                                            <span>Nhiều người</span>
                                                                        </span>
                                                                    </a>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="product-detail-description-genres-section p-0-20 border-l">
                                                        <div class="genres-text-container">
                                                            <div class="genres-text-container-lv2">
                                                                <div class="genres-text-container-lv3">
                                                                    <p>Đặc trưng</p>
                                                                </div>
                                                            </div>
                                                            <div class="genres-text-container-lv2">
                                                                <span>-</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <aside class="product-detail-aside">
                                <div class="aside-container">
                                    <div class="aside-flex">
                                        <!-- <div class="aside-thumbnail-container">
                                            <div class="aside-thumbnail-container-lv2">
                                                <div class="aside-thumbnail-container-lv3">
                                                    <div class="aside-thumbnail-container-lv4">
                                                        <div class="aside-thumbnail-container-lv5">
                                                            <img src="https://cdn2.unrealengine.com/egs-rpginabox-justinarnold-ic1-400x222-8e9399741aa6.png?h=270&quality=medium&resize=1&w=480"
                                                                alt="">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> -->
                                        <div class="aside-tag-container">
                                            <div class="aside-tag-container-lv2">
                                                <div class="aside-tag-container-lv3">
                                                    <span>
                                                        <div class="aside-tag-container-lv4">
                                                            <span>{{ getApplicationType(application.type) }}</span>
                                                        </div>
                                                    </span>
                                                </div>

                                            </div>
                                        </div>
                                        <div class="aside-price-container">
                                            <div class="aside-price-container-lv2">
                                                <div class="aside-price-container-lv3">
                                                    <div class="aside-price-container-lv4">
                                                        <div class="aside-price-container-lv5">
                                                            <span>
                                                                <b>
                                                                    <span v-if="application.price == 0">Miễn phí</span>
                                                                    <span v-else>{{ formatedPrice }}</span>
                                                                </b>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                        <!-- <div class="aside-dont-care">
                                            <a href="">
                                                <span>Có thể bao gồm các giao dịch mua hàng</span>
                                            </a>
                                        </div> -->
                                        <div class="aside-button-list">
                                            <button
                                                class="aside-button buy-now bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-full transition-colors duration-200">
                                                <span>
                                                    <span>Mua</span>
                                                </span>
                                            </button>
                                            <button class="aside-button add-to-cart" @click.prevent="addToCart()">
                                                <span>
                                                    <span>Thêm vào giỏ hàng</span>
                                                </span>
                                            </button>
                                        </div>
                                        <div class="aside-basic-info">
                                            <div class="aside-basic-info-section">
                                                <div class="aside-basic-info-container">
                                                    <span>Nhà phát triển</span>
                                                    <div class="aside-basic-info-value">
                                                        <span>
                                                            {{ author.userName }}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- <div class="aside-basic-info-section">
                                                <div class="aside-basic-info-container">
                                                    <span>Nhà phát hành</span>
                                                    <div class="aside-basic-info-value">
                                                        <span>
                                                            Discord
                                                        </span>
                                                    </div>
                                                </div>
                                            </div> -->
                                            <div class="aside-basic-info-section">
                                                <div class="aside-basic-info-container">
                                                    <span>Lượt mua</span>
                                                    <div class="aside-basic-info-value">
                                                        <span>
                                                            {{ formatNumber(application.downloads) }}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="aside-basic-info-section">
                                                <div class="aside-basic-info-container">
                                                    <span>Dung lượng</span>
                                                    <div class="aside-basic-info-value">
                                                        <span>
                                                            {{ application.storageCapacity }} MB
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- <div class="aside-basic-info-section">
                                                <div class="aside-basic-info-container">
                                                    <span>Ngày ra mắt</span>
                                                    <div class="aside-basic-info-value">
                                                        <span>
                                                            06/10/21
                                                        </span>
                                                    </div>
                                                </div>
                                            </div> -->
                                            <div class="aside-basic-info-section">
                                                <div class="aside-basic-info-container">
                                                    <span>Nền tảng</span>
                                                    <div class="aside-basic-info-value">
                                                        <span>
                                                            <ul class="platform-list">
                                                                <li class="platform">
                                                                    <span>
                                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                                            class="svg platform-svg"
                                                                            viewBox="0 0 512 512">
                                                                            <title>Windows</title>
                                                                            <g>
                                                                                <path fill="currentColor"
                                                                                    d="M0.175 256l-0.175-156.037 192-26.072v182.109zM224 69.241l255.936-37.241v224h-255.936zM479.999 288l-0.063 224-255.936-36.008v-187.992zM192 471.918l-191.844-26.297-0.010-157.621h191.854z">
                                                                                </path>
                                                                            </g>
                                                                        </svg>
                                                                    </span>
                                                                </li>
                                                                <li class="platform">
                                                                    <span>
                                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                                            class="svg platform-svg"
                                                                            viewBox="0 0 105 43">
                                                                            <title>Mac OS</title>
                                                                            <g>
                                                                                <path
                                                                                    d="M40.152 39.6706H34.5029V10.4623H34.3002L22.3433 39.3667H17.7834L5.80114 10.4623H5.59848V39.6706H0V0H7.11843L19.962 31.3109H20.19L32.9829 0H40.1267V39.6706H40.152Z"
                                                                                    fill="currentColor"></path>
                                                                                <path
                                                                                    d="M46.2617 31.4377C46.2617 26.3459 50.1376 23.4327 57.2814 23.002L64.9571 22.5207V20.3421C64.9571 17.1249 62.8292 15.377 59.08 15.377C55.9641 15.377 53.7095 16.9729 53.2535 19.4048H47.6803C47.8577 14.2623 52.6962 10.5385 59.232 10.5385C66.2744 10.5385 70.8596 14.2117 70.8596 19.9368V39.6708H65.1598V34.9083H65.0078C63.3865 38.0242 59.8146 39.9748 55.9387 39.9748C50.2643 39.9748 46.2617 36.5549 46.2617 31.4377ZM64.9571 28.9045V26.6752L58.1173 27.1312C54.2668 27.3845 52.2655 28.8032 52.2655 31.3111C52.2655 33.743 54.3681 35.3136 57.636 35.3136C61.7905 35.2629 64.9571 32.603 64.9571 28.9045Z"
                                                                                    fill="currentColor"></path>
                                                                                <path
                                                                                    d="M96.5139 20.798C95.9819 17.7328 93.626 15.4528 89.7501 15.4528C85.2156 15.4528 82.201 19.278 82.201 25.2312C82.201 31.387 85.2409 35.0602 89.8008 35.0602C93.4486 35.0602 95.8806 33.2362 96.5645 29.8923H102.264C101.631 35.9975 96.7672 40 89.7754 40C81.5424 40 76.1719 34.4015 76.1719 25.2312C76.1719 16.2888 81.5677 10.4877 89.7248 10.4877C97.1218 10.4877 101.707 15.1235 102.214 20.7727H96.5139V20.798Z"
                                                                                    fill="currentColor"></path>
                                                                            </g>
                                                                        </svg>
                                                                    </span>
                                                                </li>
                                                            </ul>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="aside-share-report">
                                            <!-- <div class="aside-share-report-section">
                                                <button>
                                                    <svg aria-hidden="true" class="eds_5nt5ak0 eds_5nt5ak9 eds_14hl3lj7"
                                                        width="24" height="24" viewBox="0 0 24 24">
                                                        <path
                                                            d="M16.5 3.25a2.75 2.75 0 1 0 0 5.5 2.75 2.75 0 0 0 0-5.5M12.25 6a4.25 4.25 0 1 1 .937 2.662l-3.655 1.993a4.25 4.25 0 0 1 0 2.69l3.655 1.993a4.25 4.25 0 1 1-.72 1.316l-3.654-1.992a4.25 4.25 0 1 1 0-5.323l3.654-1.994A4.3 4.3 0 0 1 12.25 6M5.5 9.25a2.75 2.75 0 1 0 0 5.5 2.75 2.75 0 0 0 0-5.5m11 6a2.75 2.75 0 1 0 0 5.5 2.75 2.75 0 1 0 0-5.5"
                                                            clip-rule="evenodd" fill-rule="evenodd"></path>
                                                    </svg>
                                                    <span class="eds_14hl3lj6"><span>Chia sẻ</span></span>
                                                </button>
                                            </div> -->
                                            <div class="aside-share-report-section">
                                                <button>
                                                    <svg aria-hidden="true" class="eds_5nt5ak0 eds_5nt5ak9 eds_14hl3lj7"
                                                        width="24" height="24" viewBox="0 0 24 24">
                                                        <path
                                                            d="M6.5 2.25A2.25 2.25 0 0 0 4.25 4.5V21a.75.75 0 0 0 1.5 0v-7.25H20a.75.75 0 0 0 .586-1.219L16.96 8l3.625-4.531A.75.75 0 0 0 20 2.25zM5.75 4.5a.75.75 0 0 1 .75-.75h11.94l-3.026 3.781a.75.75 0 0 0 0 .938l3.025 3.781H5.75z"
                                                            clip-rule="evenodd" fill-rule="evenodd"></path>
                                                    </svg>
                                                    <span class="eds_14hl3lj6"><span>Báo cáo</span></span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </aside>
                        </div>
                        <div class="product-detail-body-container">
                            <div class="product-detail-basic-info">
                                <div class="product-detail-rating">
                                    <div class="rating-title">
                                        <h3 class="rating-title-text">
                                            <span>Đánh giá từ {{ formatNumber(application.downloads) }} người dùng</span>
                                        </h3>
                                    </div>
                                </div>
                                <div class="product-detail-star">
                                    <div class="star-container">
                                        <div class="star-value">
                                            <h2>{{ application.ratings }}</h2>
                                        </div>
                                        <div class="star-icon">
                                            <svg class="hidden">
                                                <symbol id="star" width="32" height="30" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M31.77 11.857H19.74L15.99.5l-3.782 11.357H0l9.885 6.903-3.692 11.21 9.736-7.05 9.796 6.962-3.722-11.18 9.766-6.845z"
                                                        fill="currentColor" />
                                                </symbol>
                                            </svg>
                                            <div class="relative inline-block">
                                                <div class="text-gray-200 inline-flex">
                                                    <svg viewBox="0 0 36 34" class="star">
                                                        <use xlink:href="#star"></use>
                                                    </svg>
                                                    <svg viewBox="0 0 36 34" class="star">
                                                        <use xlink:href="#star"></use>
                                                    </svg>
                                                    <svg viewBox="0 0 36 34" class="star">
                                                        <use xlink:href="#star"></use>
                                                    </svg>
                                                    <svg viewBox="0 0 36 34" class="star">
                                                        <use xlink:href="#star"></use>
                                                    </svg>
                                                    <svg viewBox="0 0 36 34" class="star">
                                                        <use xlink:href="#star"></use>
                                                    </svg>
                                                </div>
                                                <div class="overflow-hidden absolute left-0 top-0 text-yellow-400 flex"
                                                    :style="{ 'width': (application.ratings * 100 / 5) + '%' }">
                                                    <svg viewBox="0 0 36 34" class="star flex-shrink-0">
                                                        <use xlink:href="#star"></use>
                                                    </svg>

                                                    <svg viewBox="0 0 36 34" class="star flex-shrink-0">
                                                        <use xlink:href="#star"></use>
                                                    </svg>

                                                    <svg viewBox="0 0 36 34" class="star flex-shrink-0">
                                                        <use xlink:href="#star"></use>
                                                    </svg>

                                                    <svg viewBox="0 0 36 34" class="star flex-shrink-0">
                                                        <use xlink:href="#star"></use>
                                                    </svg>

                                                    <svg viewBox="0 0 36 34" class="star flex-shrink-0">
                                                        <use xlink:href="#star"></use>
                                                    </svg>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="product-detail-body-container">
                            <div class="product-detail-basic-info">
                                <ProductReview/>
                            </div>
                        </div>
                        <div class="product-detail-body-container mt-8">
                            <ProductList :application-list="applicationListResponse" :list-type="listSlides[0]" :key="listSlides[0]"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </el-main>

    <el-footer>
        <FooterComponent />
    </el-footer>
</template>


<script setup>
import { ref, reactive, computed, onBeforeMount, onMounted, inject } from 'vue';
import { useRoute } from 'vue-router';
import HeaderMenu from '@/components/common/HeaderMenu.vue'
import SearchInput from '@/components/common/SearchInput.vue'
import CarouselSlide from '@/components/common/CarouselSlide.vue'
import FooterComponent from '@/components/common/FooterComponent.vue'
import ProductList from '@/components/product/ProductList.vue'
import ProductReview from '@/components/product/ProductReview.vue'
import ApplicationService from "@/services/application.service.js"
import CartService from "@/services/cart.service.ts"
import UserService from "@/services/user.service.ts"
import { APPLICATION_TYPE } from '@/const.js';

const listSlides = [
  { id: 1, title: 'Ứng dụng bạn có thể quan tâm', name: 'newApplications' },
]

const applicationListResponse = ref([]);

const retrieveApplicationList = async () => {
  try {
    applicationListResponse.value = await ApplicationService.getAll();
  } catch (error) {
    console.log(error);
  }
}

const init = () => {
  retrieveApplicationList();
}

onMounted(() => {
    init();
})

const getApplicationType = (type) => {
    return APPLICATION_TYPE[type] || '';  // Default to 'Unknown' if not found
}

const route = useRoute();

const application = ref({});

const author = ref({});

const applicationId = computed(() => {
    return parseInt(route.params.id);
});

const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

const applicationPrice = computed(() => {
    return application.value.price;
})

const formatedPrice = computed(() => {
    return VND.format(application.value.price);
});

const formatedSalePrice = computed(() => {
    let salePrice = application.value.price * (1 - application.value.salePercent / 100);
    salePrice = Math.floor(salePrice / 1000);
    salePrice *= 1000;
    return VND.format(salePrice);
})

const formatNumber = (number) => {
    return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const addToCart = async () => {
    var toastContainer = document.getElementById('addCartMessage');
    var toastExistedContainer = document.getElementById('addExistedCartMessage');
    const response = await CartService.addApplicationToCart(12, application.value.id);
    if (response == 1) {
        toastExistedContainer.display = 'none';
        toastExistedContainer.style.display = '';
        setTimeout(function () {
            toastExistedContainer.style.display = 'none';
        }, 1000);
    } else {
        toastContainer.style.display = 'none';
        toastContainer.style.display = '';
        setTimeout(function () {
            toastContainer.style.display = 'none';
        }, 1000);
    }
};

const retrieveApplication = async (id) => {
    try {
        application.value = await ApplicationService.get(id);
    } catch (error) {
        console.log(error);
    }
};

const retrieveAuthor = async (id) => {
    try {
        author.value = await UserService.get(id);
    } catch (error) {
        console.log(error);
    }
};

onBeforeMount( async () => {
    await retrieveApplication(applicationId.value);
    await retrieveAuthor(application.value.authorId);
});
</script>

<style>
.pr-20 {
    padding-right: 20px;
}

.p-0-20 {
    padding: 0 20px;
}

.border-l {
    border-left: 1px solid rgb(64, 64, 68);
}

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

.product-detail-container {
    padding-top: 0;
}

.product-detail-main-content {
    padding-bottom: 90px;
}

.product-detail-main {
    display: flex;
    flex-direction: column;
}

.product-detail-title {
    margin-bottom: 8px;
}

.product-detail-title-flex {
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    -webkit-box-align: center;
    align-items: center;
}

.product-detail-title-text-container {
    -webkit-box-flex: 1;
    flex-grow: 1;
}

.product-detail-title-text-container h1 {
    font-weight: 900;
    letter-spacing: 0em;
    line-height: 125%;
    font-size: 2.5rem;
    margin: 0;
    padding: 0;
}

.product-detail-body {
    display: flex;
    flex-direction: column;
}

.product-detail-body-container {
    display: flex;
    flex-direction: row;
}

.product-detail-basic-info {
    width: calc(100% - 384px);
}

.product-detail-media+.product-detail-media {
    margin-top: 20px;
}

.product-detail-media-container {
    width: 100%;
}

.product-detail-media-container-lv2 {
    position: relative;
    overflow: hidden;
}

.product-detail-image-container {
    border-radius: 12px;
    position: relative;
    overflow: hidden;
    flex-basis: 100%;
    flex-shrink: 0;
}

.product-detail-image-container-lv2 {
    border-radius: 4px;
}

.product-detail-image-container-lv3 {
    position: relative;
    padding-bottom: calc(56.25%);
}

.product-detail-image-container-lv4 {
    -webkit-box-align: center;
    align-items: center;
    display: flex;
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: absolute;
}

.product-detail-image-container-lv5 {
    width: 100%;
    height: 100%;
}

.product-detail-image-container-lv5 img {
    transition: opacity 125ms ease-in-out 450ms;
    width: 100%;
    height: 100%;
    opacity: 1;
}

.product-detail-description {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
}

.product-detail-description-container {
    display: flex;
    flex-direction: column;
}

.product-detail-description-section {
    flex-basis: 100%;
}

.product-detail-description-section:not(:empty) {
    margin-bottom: 50px;
}

.product-detail-description-section span {
    font-size: 1rem;
    font-weight: 400;
    letter-spacing: 0em;
    line-height: 165%;
    margin: 0;
    padding: 0;
}

.product-detail-description-text-container {
    display: grid;
}

.product-detail-description-text {
    display: -webkit-box;
    overflow: hidden;
    word-break: break-word;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 6;
    text-align: justify;
}

.product-detail-description-genres {
    display: flex;
    flex-direction: row;
    width: 100%;
    -webkit-box-align: stretch;
    align-items: stretch;
}

.product-detail-description-genres-section {
    flex: 1 1 calc(33.3333%);
    -webkit-box-flex: 1;
    display: flex;
    flex-direction: column;
}

.genres-text-container {
    display: flex;
    flex-direction: column;
}

.genres-text-container-lv2 {
    flex: 0 1 100%;
    -webkit-box-flex: 0;
}

.genres-text-container-lv3 {
    margin-bottom: 8px;
}

.genres-text-container-lv3 p {
    color: #333;
    font-weight: 600;
    font-size: 0.875rem;
    letter-spacing: 0.02em;
    line-height: 165%;
    margin: 0;
    padding: 0;
}

.genres-text-container-lv2 span {
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0px;
    transition: color 125ms ease-in-out 0s;
    font-weight: normal;
}

.genres-badge {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: stretch;
    align-content: flex-start;
    justify-content: flex-start;
    gap: 0.5rem;
}

:not(button).genres-badge-link {
    text-decoration: none;
}

.genres-badge-link {
    transition: background-color 125ms ease-in-out 0s;
    background-color: #000;
    position: relative;
    border-radius: 4px;
    font-size: 0.75rem;
    gap: 0.25rem;
    height: 1.5rem;
    padding-inline: 0.5rem;
    text-rendering: geometricPrecision;
    align-items: center;
    color: #fff;
    cursor: pointer;
    display: flex;
    max-width: fit-content;
    border: none;
    list-style: none;
    margin: 0;
    outline: none;
    padding-bottom: 2px;
}

.genres-badge-link span {
    color: rgb(255, 255, 255);
    line-height: 165%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 600;
    letter-spacing: 0.02em;
    font-size: 0.875rem;
    margin: 0;
    padding: 0;
}

.product-detail-aside {
    margin-left: 64px;
    width: 320px;
}

.aside-container {
    position: sticky;
    top: 0;
}

.aside-container .aside-flex {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.aside-flex .aside-thumbnail-container {
    border-radius: 4px;
    overflow: hidden;
}

.aside-thumbnail-container-lv2 {
    border-radius: 4px;
    padding: 20px;
}

.aside-thumbnail-container-lv3 {
    position: relative;
    padding-bottom: calc(56.25%);
}

.aside-thumbnail-container-lv4 {
    -webkit-box-align: center;
    align-items: center;
    display: flex;
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: absolute;
}

.aside-thumbnail-container-lv5 {
    height: 100%;
    width: 100%;
    overflow: hidden;
}

.aside-thumbnail-container-lv5>div {
    height: 100%;
    width: 100%;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
}

.aside-thumbnail-container-lv5 img {
    width: 100%;
    object-fit: contain;
    transition: opacity 125ms ease-in-out 450ms;
    max-width: 100%;
    max-height: 100%;
    opacity: 1;
}

.aside-tag-container {
    display: flex;
    flex-flow: wrap;
    gap: 10px;
}

.aside-tag-container-lv2 {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.aside-tag-container-lv3 {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    padding: 3px 8px;
    background-color: #333;
    border-radius: 4px;
}

.aside-tag-container-lv3 span {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    color: rgb(255, 255, 255);
    font-weight: 600;
    letter-spacing: 0.02em;
    font-size: 0.875rem;
    line-height: 140%;
    margin: 0;
    padding: 0;
}

.aside-tag-container-lv4 {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.aside-tag-container-lv4 span {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    color: rgb(255, 255, 255);
}

.aside-price-container {
    display: flex;
    flex-direction: row;
    -webkit-box-pack: start;
    justify-content: flex-start;
}

.aside-price-container-lv2 {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.aside-price-container-lv3 {
    display: flex;
}

.aside-price-container-lv4 {
    display: flex;
    flex-direction: row;
    -webkit-box-pack: end;
    justify-content: flex-end;
    align-items: center;
    flex-wrap: wrap;
}

.aside-price-container-lv5 {
    display: flex;
}

.aside-price-container-lv5 span {
    font-size: 1.25rem;
    letter-spacing: 0em;
    line-height: 150%;
    font-weight: 700;
    margin: 0;
    padding: 0;
}

.aside-price-container-lv5 span b {
    font-weight: 700;
}

.aside-dont-care a {
    font-size: 0.875rem;
    display: inline;
    max-width: fit-content;
    position: relative;
    box-sizing: border-box;
    text-decoration: none;
    font-weight: 600;
    letter-spacing: 0.02em;
    line-height: 165%;
}

.aside-button-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.buy-now {
    /* background: none;
    background-color: rgb(38, 187, 255);
    color: rgb(0, 0, 0); */
}

.add-to-cart {
    background: none;
    background-color: #333;
    color: #fff;
}

.aside-button {
    padding-inline-end: 1.25rem;
    padding-inline-start: 1.25rem;
    border-radius: 10px;
    height: 3rem;
    padding-block-end: 0.75rem;
    padding-block-start: 0.75rem;
    border: none;
    width: 100%;
    align-items: center;
    box-sizing: border-box;
    cursor: pointer;
    display: inline-flex;
    font-weight: 700;
    justify-content: center;
    outline: none;
    position: relative;
    text-align: center;
    letter-spacing: 0.02em;
    font-size: 0.875rem;
    line-height: 140%;
    margin: 0;
    padding: 0;
    vertical-align: middle;
    white-space: normal;
}

.aside-button.buy-now:hover {
    /* background-color: #61CDFF !important; */
}

.aside-button.add-to-cart:hover {
    opacity: .8;
}

.aside-basic-info {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.aside-basic-info-section {
    display: flex;
    flex-direction: row;
    -webkit-box-pack: justify;
    justify-content: space-between;
    padding: 10px 0px;
    border-bottom: 1px solid #ccc;
}

.aside-basic-info-container {
    display: flex;
    flex-direction: row;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    width: 100%;
}

.aside-basic-info-container span {
    color: #333;
    font-weight: 600;
    letter-spacing: 0.02em;
    font-size: 0.875rem;
    line-height: 140%;
    margin: 0;
    padding: 0;
}

.aside-basic-info-value {
    text-align: right;
    margin-left: 5px;
}

.aside-basic-info-value span {
    color: #000;
    font-weight: 600;
    letter-spacing: 0.02em;
    font-size: 0.875rem;
    line-height: 140%;
    margin: 0;
    padding: 0;
}

.aside-basic-info-value ul {
    margin: 0px;
    padding: 0px;
    list-style-type: none;
    display: flex;
    flex-direction: row;
}

.aside-basic-info-value .platform:not(:last-child) {
    margin-right: 1em;
}

.platform span {
    display: block;
    line-height: 0;
    width: 20px;
    height: 20px;
}

.platform-svg {
    width: 100%;
    height: 100%;
}

.aside-share-report {
    margin-top: 15px;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
}

.aside-share-report-section {
    -webkit-box-flex: 1;
    flex-grow: 1;
}

.aside-share-report-section button {
    background: none;
    gap: 0.25rem;
    padding-inline-end: 0.75rem;
    padding-inline-start: 0.5rem;
    border-radius: 6px;
    font-size: 0.875rem;
    height: 2rem;
    padding-block-end: 0.25rem;
    padding-block-start: 0.25rem;
    background-color: #333;
    border: none;
    color: #fff;
    width: 100%;
    align-items: center;
    box-sizing: border-box;
    cursor: pointer;
    display: inline-flex;
    font-weight: 700;
    justify-content: center;
    outline: none;
    position: relative;
    text-align: center;
    letter-spacing: 0.02em;
    line-height: 140%;
    margin: 0;
    padding: 0;
    vertical-align: middle;
    white-space: normal;
}

.aside-share-report-section button:hover {
    opacity: .8;
}

.aside-share-report svg {
    height: 1.25rem;
    width: 1.25rem;
    fill: currentcolor;
}

.product-detail-rating {
    margin-bottom: 30px;
    margin-top: 60px;
}

.rating-title {
    margin-bottom: 10px;
}

.rating-title-text {
    margin: 0;
    padding: 0;
    font-weight: 700;
    letter-spacing: 0.02em;
    line-height: 125%;
    font-size: 1.25rem;
}

.product-detail-star {
    margin: 30px 0px;
    display: flex;
    flex-flow: wrap;
    -webkit-box-pack: center;
    justify-content: center;
}

.star-container {
    -webkit-box-align: center;
    align-items: center;
    display: flex;
    flex-flow: wrap;
    -webkit-box-pack: center;
    justify-content: center;
}

.star-value {
    margin-right: 15px;
    margin-top: 5px;
}

.star-value h2 {
    font-weight: 900;
    font-size: 2.5rem;
    letter-spacing: 0;
    line-height: 125%;
    margin: 0;
    padding: 0;
}

.star-icon {
    margin-top: 14px;
}

svg.star {
    margin-left: 4px;
    height: 40px;
    width: 43px;
}

.star:first-of-type {
    margin-left: 0px;
}

/* svg.star {
    width: 100%;
    height: 100%;
} */
</style>