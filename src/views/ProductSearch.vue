<template>
  <div class="min-h-screen">
    <!-- Header -->
    <el-header>
      <HeaderMenu />
    </el-header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8 el-main h-96">
      <div class="flex flex-col md:flex-row">
        <!-- Sidebar -->
        <!-- <aside class="w-full md:w-64 mb-8 md:mb-0">
          <h2 class="text-lg font-semibold mb-4">Bộ lọc</h2>
          <div v-for="(filter, index) in filters" :key="index" class="mb-6">
            <h3 class="font-medium mb-2">{{ filter.name }}</h3>
            <ul class="space-y-2">
              <li v-for="option in filter.options" :key="option" class="flex items-center">
                <Checkbox v-model="optionCheckedList" name="optionCheckedList" inputId="option" :value="option.name"
                  class="mr-2" @change="onChangeOption" />
                <label :for="option" class="text-sm text-gray-600">{{ option.name }}</label>
              </li>
            </ul>
          </div>
        </aside> -->

        <!-- Product Grid -->
        <div class="flex-1 md:ml-8">
          <!-- <h1 class="text-3xl font-bold mb-4">Các mẫu thiết kế Flutter, Tải về mã nguồn</h1>
          <p class="text-gray-600 mb-6">Các mẫu thiết kế Flutter, Phần mềm di động, Mã nguồn, UX, Bộ dụng cụ UI, Mã
            nguồn phần mềm. Hãy bắt đầu việc tạo ra
            phần mềm di động của bản thân bạn trong hôm nay! Khám phá chợ phần mềm Flutter #1 để mua hoặc tải về các mẫu
            thiết kế Flutter cao cấp và miễn phí</p> -->

          <!-- Search and Tags -->
          <!-- <div class="mb-6">
            <div class="flex mb-4">
              <input type="text" placeholder="Nhập vào gì đó..." class="flex-grow px-4 py-2 border rounded-l-lg" />
              <button class="bg-blue-500 text-white px-4 py-2 rounded-r-lg">Tìm kiếm</button>
            </div>
            <div class="flex flex-wrap gap-2">
              <span v-for="tag in tags" :key="tag" class="bg-gray-200 text-sm px-2 py-1 rounded">{{ tag }}</span>
            </div>
          </div> -->

          <!-- Product Grid -->
          <div v-if="applicationForRender.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 product-list-view mb-12">
            <div v-for="app in applicationForRender" :key="app.id" class="bg-white rounded-lg shadow">
              <ProductCard :application="app" />
            </div>
          </div>

          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 product-list-view h-100">
            <p class="text-3xl font-medium">Không có phần mềm thỏa</p>
          </div>

          <!-- Pagination -->
          <!-- <div v-if="filteredApplications?.length >= 9 || queryApplications?.length >= 9"
            class="flex justify-center mt-8 space-x-2 mb-16">
            <button v-for="page in 5" :key="page"
              :class="['px-3 py-1 rounded', page === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200']">
              {{ page }}
            </button>
            <button class="px-3 py-1 rounded bg-gray-200">Tiếp</button>
          </div> -->
        </div>
      </div>
    </main>

    <!-- Footer -->
    <el-footer>
      <FooterComponent />
    </el-footer>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router';
import { GithubIcon, SendIcon, TwitterIcon, FacebookIcon } from 'lucide-vue-next'
import Checkbox from 'primevue/checkbox';
import ApplicationFrameworkService from "@/services/application_framework.service.ts"
import ApplicationCategoryService from "@/services/application_category.service.ts"
import ApplicationTypeService from "@/services/application_type.service.ts"
import ApplicationpPlatformService from "@/services/application_platform.service.ts"
import ApplicationService from "@/services/application.service.js"

const route = useRoute();
const queryName = route.query.query;


const applicationListResponse = ref([]);

const applicationForRender = ref([]);


const retrieveApplicationList = async () => {
  try {
    applicationListResponse.value = await ApplicationService.getAll();
    applicationForRender.value = applicationListResponse.value.allApplications.filter((application) => application.name.toLowerCase().includes(queryName.toLowerCase()));
  } catch (error) {
    console.log(error);
  }
}

const init = async () => {
  await retrieveApplicationList();
}

init();
</script>

<style>
.product-list-view .product-card {
  margin: 0;
  padding-bottom: 0;
}

.product-list-view .product-card__thumbnail {
  margin-bottom: 0;
}

.product-list-view .product-card__image-container img {
  height: 184px;
}

.product-list-view .product-card__content {
  padding: 12px;
}
</style>