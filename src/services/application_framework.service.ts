import { ref } from "vue";
import axios from "axios";
// import type { CartDetailObject } from '@/components/cart/CartComponent.vue';

class ApplicationFrameworkService {
  public frameworkId;
  public frameworkName;

  constructor() {
    this.frameworkId = ref<number[]>([]);
    this.frameworkName = ref<String>("");
  }

  getBaseUri() {
    return import.meta.env.VITE_BACKEND_BASE_URL;
  }

  public async getFrameworkList() {
    const baseUri = this.getBaseUri();
    const response = await axios.get(`${baseUri}/application-framework-list`);
    return response.data;
  }
}

const applicationFrameworkService = new ApplicationFrameworkService();

export default applicationFrameworkService;

export const provideApplicationFrameworkService = () => {
  applicationFrameworkService.getFrameworkList();
  return {
    applicationFrameworkService,
  };
};