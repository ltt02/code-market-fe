import { ref } from "vue";
import axios from "axios";
// import type { CartDetailObject } from '@/components/cart/CartComponent.vue';

class HeaderNavService {
  public navId;
  public navName;
  public subNavList;

  constructor() {
    this.navId = ref<number[]>([]);
    this.navName = ref<String>("");
    this.subNavList = ref([]);
  }

  getBaseUri() {
    return import.meta.env.VITE_BACKEND_BASE_URL;
  }

  public async getHeaderNavList() {
    const baseUri = this.getBaseUri();
    const response = await axios.get(`${baseUri}/header-nav`);
    return response.data;
  }
}

const headerNavService = new HeaderNavService();

export default headerNavService;

export const provideHeaderNavService = () => {
  headerNavService.getFrameworkList();
  return {
    headerNavService,
  };
};