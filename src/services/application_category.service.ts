import { ref } from "vue";
import axios from "axios";
// import type { CartDetailObject } from '@/components/cart/CartComponent.vue';

class ApplicationCategoryService {
  public categoryId;
  public categoryName;

  constructor() {
    this.categoryId = ref<number[]>([]);
    this.categoryName = ref<String>("");
  }

  getBaseUri() {
    return import.meta.env.VITE_BACKEND_BASE_URL;
  }

  public async getCategoryList() {
    const baseUri = this.getBaseUri();
    const response = await axios.get(`${baseUri}/application-category-list`);
    return response.data;
  }
}

const applicationCategoryService = new ApplicationCategoryService();

export default applicationCategoryService;

export const provideApplicationCategoryService = () => {
  applicationCategoryService.getCategoryList();
  return {
    applicationCategoryService,
  };
};