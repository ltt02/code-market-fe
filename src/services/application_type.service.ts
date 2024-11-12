import { ref } from "vue";
import axios from "axios";
// import type { CartDetailObject } from '@/components/cart/CartComponent.vue';

class ApplicationTypeService {
  public typeId;
  public typeName;

  constructor() {
    this.typeId = ref<number[]>([]);
    this.typeName = ref<String>("");
  }

  getBaseUri() {
    return import.meta.env.VITE_BACKEND_BASE_URL;
  }

  public async getTypeList() {
    const baseUri = this.getBaseUri();
    const response = await axios.get(`${baseUri}/application-type-list`);
    return response.data;
  }
}

const applicationTypeService = new ApplicationTypeService();

export default applicationTypeService;

export const provideApplicationTypeService = () => {
  applicationTypeService.getTypeList();
  return {
    applicationTypeService,
  };
};