<template>
  <div class="min-h-screen">
    <!-- Header -->
    <el-header>
      <HeaderMenu />
    </el-header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8 el-main">
      <div class="flex flex-col md:flex-row">
        <!-- Sidebar -->
        <aside class="w-full md:w-64 mb-8 md:mb-0">
          <h2 class="text-lg font-semibold mb-4">Bộ lọc</h2>
          <div v-for="(filter, index) in filters" :key="index" class="mb-6">
            <h3 class="font-medium mb-2">{{ filter.name }}</h3>
            <ul class="space-y-2">
              <li v-for="option in filter.options" :key="option" class="flex items-center">
                <input :id="option" type="checkbox" :checked="isOptionChecked(option)" class="mr-2" @click.prevent="reRenderList()"/>
                <label :for="option" class="text-sm text-gray-600">{{ option }}</label>
              </li>
            </ul>
          </div>
        </aside>

        <!-- Product Grid -->
        <div class="flex-1 md:ml-8">
          <!-- <h1 class="text-3xl font-bold mb-4">Các mẫu thiết kế Flutter, Tải về mã nguồn</h1>
          <p class="text-gray-600 mb-6">Các mẫu thiết kế Flutter, Ứng dụng di động, Mã nguồn, UX, Bộ dụng cụ UI, Mã
            nguồn ứng dụng. Hãy bắt đầu việc tạo ra
            ứng dụng di động của bản thân bạn trong hôm nay! Khám phá chợ ứng dụng Flutter #1 để mua hoặc tải về các mẫu
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
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 product-list-view">
            <div v-for="app in applicationList" :key="app.id" class="bg-white rounded-lg shadow">
              <ProductCard :application="app" />
            </div>
          </div>

          <!-- Pagination -->
          <div v-if="filteredApplications?.length >= 9 || queryApplications?.length >= 9" class="flex justify-center mt-8 space-x-2 mb-16">
            <button v-for="page in 5" :key="page"
              :class="['px-3 py-1 rounded', page === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200']">
              {{ page }}
            </button>
            <button class="px-3 py-1 rounded bg-gray-200">Tiếp</button>
          </div>
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
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router';
import { GithubIcon, SendIcon, TwitterIcon, FacebookIcon } from 'lucide-vue-next'
import ApplicationFrameworkService from "@/services/application_framework.service.ts"
import ApplicationService from "@/services/application.service.js"

const route = useRoute();
const filterItemName = route.query.filterItemName;
const queryName = route.query.query;

const navItems = ['WordPress', 'React', 'Bootstrap', 'Android', 'React Native', 'Flutter', 'Ionic', 'iOS', 'Unity', 'AI Tools']

const filters = ref([
  {
    name: 'Framework',
    options: []
  },
  {
    name: 'Thể loại',
    options: ['Sách, Khóa học', 'Trò chuyện', 'Crypto & Blockchain', 'Công cụ phát triển', 'Thương mại điện tử', 'Sự kiện & Từ thiện']
  },
  {
    name: 'Loại',
    options: ['Mẫu thiết kế', 'Bộ UI', 'Chủ đề', 'Plugins']
  }
])

const tags = ['Ứng dụng Flutter', 'Mẫu thiết kế Flutter', 'Bộ UI Flutter', 'Flutter UX', 'Bộ ứng dụng UI Flutter', 'Chủ đề Flutter', 'Flutterflow', 'Thiết kế Flutter', 'Bộ dụng cụ Flutter']

const products = [
  { id: 1, title: 'Flutterflow Template Personal...', price: 20, image: 'https://placehold.co/192x256', description: 'A beautiful personal portfolio template' },
  { id: 2, title: 'Biddo Full Flutter auction app', price: 26, image: 'https://placehold.co/192x256', description: 'Complete auction app solution' },
  { id: 3, title: 'GoMart - Flutter Grocery Stor...', price: 20, image: 'https://placehold.co/192x256', description: 'Fully functional grocery store app' },
  { id: 4, title: 'Recipe App - Get Recipes UI ...', price: 39, image: 'https://placehold.co/192x256', description: 'Sleek recipe app UI kit' },
  { id: 5, title: 'Enatega Multi Vendor Food D...', price: 3478, image: 'https://placehold.co/192x256', description: 'Complete food delivery solution' },
  { id: 6, title: 'FTwitter - Clone Simply Twit...', price: 150, image: 'https://placehold.co/192x256', description: 'Twitter clone template' },
]

const applicationListResponse = ref([]);

const isOptionChecked = (option) => {
  return option === filterItemName
}

const filteredApplications = computed(() => {
  if (filterItemName){
    return applicationListResponse.value.allApplications.filter((application) => application.applicationFramework.name === filterItemName);
  }
});

const queryApplications = computed(() => {
  if (queryName){
    return applicationListResponse.value.allApplications.filter((application) => application.name.toLowerCase().includes(queryName.toLowerCase()));
  }
});

const applicationList = computed(() => {
  if (filterItemName) {
    return filteredApplications.value;
  } else if (queryName) {
    return queryApplications.value;
  } else {
    return applicationListResponse.value.allApplications;
  }
});

const getFrameworkList = async () => {
  const response = await ApplicationFrameworkService.getFrameworkList();
  filters.value[0].options = response.map(framework => framework.name);
  return response;
}

const retrieveApplicationList = async () => {
  try {
    applicationListResponse.value = await ApplicationService.getAll();
  } catch (error) {
    console.log(error);
  }
}

const init = async () => {
  await getFrameworkList();
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