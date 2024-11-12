import { ref } from "vue";
import axios from "axios";
// import type { CartDetailObject } from '@/components/cart/CartComponent.vue';

class ApplicationPlatformService {
  public platformId;
  public platformName;

  constructor() {
    this.platformId = ref<number[]>([]);
    this.platformName = ref<String>("");
  }

  getBaseUri() {
    return import.meta.env.VITE_BACKEND_BASE_URL;
  }

  public async getPlatformList() {
    const baseUri = this.getBaseUri();
    const response = await axios.get(`${baseUri}/application-platform-list`);
    return response.data;
  }
}

const applicationPlatformService = new ApplicationPlatformService();

export default applicationPlatformService;

export const provideApplicationPlatformService = () => {
  applicationPlatformService.getPlatformList();
  return {
    applicationPlatformService,
  };
};