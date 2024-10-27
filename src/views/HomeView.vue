<template>
    <el-header>
        <HeaderMenu />
    </el-header>

    <el-main>
        <CarouselSlide />
        <div v-for="type in listSlides">
            <ProductList :application-list="applicationListResponse" :list-type="type" :key="type"/>
        </div>
    </el-main>

    <el-footer>
        <FooterComponent />
    </el-footer>
</template>


<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import HeaderMenu from '@/components/common/HeaderMenu.vue'
import SearchInput from '@/components/common/SearchInput.vue'
import CarouselSlide from '@/components/common/CarouselSlide.vue'
import FooterComponent from '@/components/common/FooterComponent.vue'
import ProductList from '@/components/product/ProductList.vue'
import ApplicationService from "@/services/application.service.js"

const listSlides = [
  { id: 1, title: 'Ứng dụng mới', name: 'newApplications' },
  { id: 2, title: 'Ứng dụng được tải nhiều', name: 'mostDownloadedApplications' },
  { id: 3, title: 'Ứng dụng giảm giá nhiều nhất', name: 'mostSaleApplications' },
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

.el-header, .el-footer, .el-main {
    padding: 0;
}
</style>