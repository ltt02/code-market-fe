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
                <Checkbox v-model="optionCheckedList" name="optionCheckedList" inputId="option" :value="option.name"
                  class="mr-2" @change="onChangeOption" />
                <label :for="option" class="text-sm text-gray-600">{{ option.name }}</label>
              </li>
            </ul>
          </div>
        </aside>

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
          <div v-if="applicationForRender.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 product-list-view">
            <div v-for="app in applicationForRender" :key="app.id" class="bg-white rounded-lg shadow">
              <ProductCard :application="app" />
            </div>
          </div>

          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 product-list-view h-100">
            <p class="text-3xl font-medium">Không có phần mềm thỏa</p>
          </div>

          <!-- Pagination -->
          <div v-if="filteredApplications?.length >= 9 || queryApplications?.length >= 9"
            class="flex justify-center mt-8 space-x-2 mb-16">
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
const filterItemName = route.query.filterItemName;
const queryName = route.query.query;

const frameworkList = ref([]);
const categoryList = ref([]);
const platformList = ref([]);
const typeList = ref([]);

const optionList = ref([]);
const optionCheckedList = ref([]);
const applicationWithOptionList = ref([]);

const navItems = ['WordPress', 'React', 'Bootstrap', 'Android', 'React Native', 'Flutter', 'Ionic', 'iOS', 'Unity', 'AI Tools']

const filters = ref([
  {
    name: 'Công nghệ',
    options: []
  },
  {
    name: 'Lĩnh vực',
    options: []
  },
  {
    name: 'Loại',
    options: []
  },
  {
    name: 'Nền tảng',
    options: []
  }
])

const tags = ['Phần mềm Flutter', 'Mẫu thiết kế Flutter', 'Bộ UI Flutter', 'Flutter UX', 'Bộ phần mềm UI Flutter', 'Chủ đề Flutter', 'Flutterflow', 'Thiết kế Flutter', 'Bộ dụng cụ Flutter']

const products = [
  { id: 1, title: 'Flutterflow Template Personal...', price: 20, image: 'https://placehold.co/192x256', description: 'A beautiful personal portfolio template' },
  { id: 2, title: 'Biddo Full Flutter auction app', price: 26, image: 'https://placehold.co/192x256', description: 'Complete auction app solution' },
  { id: 3, title: 'GoMart - Flutter Grocery Stor...', price: 20, image: 'https://placehold.co/192x256', description: 'Fully functional grocery store app' },
  { id: 4, title: 'Recipe App - Get Recipes UI ...', price: 39, image: 'https://placehold.co/192x256', description: 'Sleek recipe app UI kit' },
  { id: 5, title: 'Enatega Multi Vendor Food D...', price: 3478, image: 'https://placehold.co/192x256', description: 'Complete food delivery solution' },
  { id: 6, title: 'FTwitter - Clone Simply Twit...', price: 150, image: 'https://placehold.co/192x256', description: 'Twitter clone template' },
]

const applicationListResponse = ref([]);

const applicationForRender = ref([]);

const isOptionChecked = (option) => {
  return option === filterItemName
}

const onChangeOption = () => {
  if (optionCheckedList.value.length == 0) {
    applicationForRender.value = applicationList.value;
    return;
  }
  console.log("applicationWithOptionList:", applicationWithOptionList.value);
  console.log("optionCheckedList:", optionCheckedList.value);
  applicationForRender.value = applicationWithOptionList.value
    .filter((app) => {
      console.log("App:", app);
      const result = app.option.some((option) => optionCheckedList.value.includes(option));
      console.log("App passes filter:", result);
      return result;
    });
  console.log("optionCheckedList types:", optionCheckedList.value.map((item) => typeof item));
  console.log("option types:", app.option.map((item) => typeof item));
}

const filteredApplications = computed(() => {
  if (filterItemName) {
    return applicationListResponse.value.allApplications.filter((application) => application.applicationFramework.name === filterItemName);
  }
});

const queryApplications = computed(() => {
  if (queryName) {
    return applicationListResponse.value.allApplications.filter((application) => application.name.toLowerCase().includes(queryName.toLowerCase()));
  }
});

const applicationList = computed(() => {
  if (queryName) {
    return queryApplications.value;
  } else {
    return applicationListResponse.value.allApplications;
  }
});

const retrieveApplicationList = async () => {
  try {
    applicationListResponse.value = await ApplicationService.getAll();
    applicationForRender.value = applicationListResponse.value.allApplications.filter(app => app.status == 1);
  } catch (error) {
    console.log(error);
  }
}

const getFrameworkList = async () => {
  const response = await ApplicationFrameworkService.getFrameworkList();
  frameworkList.value = response;
  filters.value[0].options = response;
}

const getCategoryList = async () => {
  const response = await ApplicationCategoryService.getCategoryList();
  categoryList.value = response;
  filters.value[1].options = response;
}

const getPlatformList = async () => {
  const response = await ApplicationpPlatformService.getPlatformList();
  platformList.value = response;
  filters.value[3].options = response;
}

const getTypeList = async () => {
  const response = await ApplicationTypeService.getTypeList();
  typeList.value = response;
  filters.value[2].options = response;
}

const init = async () => {
  await retrieveApplicationList();
}

onBeforeMount(async () => {
  await getFrameworkList();
  await getCategoryList();
  await getPlatformList();
  await getTypeList();
  optionList.value = [
    ...frameworkList.value.map(item => item.name),
    ...categoryList.value.map(item => item.name),
    ...platformList.value.map(item => item.name),
    ...typeList.value.map(item => item.name)];
  await init();
  applicationWithOptionList.value = applicationList.value.map(app => ({
    ...app,
    option: [
      ...app.applicationFrameworkList.map(item => item.name),
      ...app.applicationCategoryList.map(item => item.name),
      ...app.applicationPlatformList.map(item => item.name),
      app.applicationType.name,
    ],
  }));
});
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