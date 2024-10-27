import { ref } from "vue";
import axios from "axios";

class UserService {
  public userId;
  public userName;

  constructor() {
    this.userId = ref<number[]>([]);
    this.userName = ref<String>("");
  }

  getBaseUri() {
    return import.meta.env.VITE_BACKEND_BASE_URL;
  }

  public async getAll() {
    const baseUri = this.getBaseUri();
    const response = await axios.get(`${baseUri}/users`);
    return response.data;
  }

  public async get(id) {
    const baseUri = this.getBaseUri();
    const response = await axios.get(`${baseUri}/users/${id}`);
    return response.data;
  }
}

const userService = new UserService();

export default userService;