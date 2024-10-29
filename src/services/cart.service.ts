import { ref } from "vue";
import axios from "axios";
// import type { CartDetailObject } from '@/components/cart/CartComponent.vue';

class CartService {
  public cartItems;
  public orderId?;
  public cartDetailsToOrder?;
  public shipCost?;
  public total?;
  public discount?;
  public subTotal?;
  public customerId!: number;
  public cartQuantity;

  constructor() {
    this.cartItems = ref<number[]>([]);
    this.orderId = ref<number>(0);
    this.cartDetailsToOrder = ref<number[]>([]);
    this.shipCost = ref<number>(0);
    this.total = ref<number>(0);
    this.discount = ref<number>(0);
    this.subTotal = ref<number>(0);
    this.cartQuantity = ref<number>(0);
    if (localStorage.getItem("account")) {
      this.customerId = JSON.parse(localStorage.getItem("account")!).id || 0;
    }
  }

  public async getCart() {
    const baseUri = this.getBaseUri();
    if (localStorage.getItem("account")) {
      this.customerId = JSON.parse(localStorage.getItem("account")!).id;
    } else {
      this.customerId = 12;
    }

    const response = await axios.get(
      `${baseUri}/customers/${this.customerId}/cart`
    );
    this.cartItems.value = response.data;

    this.subTotal.value = 0;
    this.total.value = 0;
    if (this.cartItems._rawValue) {
      this.cartItems._rawValue.forEach((item) => {
        this.subTotal.value += item.application.price;
      });
    }
    this.cartQuantity.value = 0;

    this.subTotal.value =
      this.total.value + this.shipCost.value - this.discount.value;
    response.data.forEach((item) => {
      this.cartQuantity.value++;
    });

    return response.data;
  }

  async createOrder(data) {
    try {
      const baseUri = this.getBaseUri();
      this.subTotal.value = data.total;
      const response = await axios.post(
        `${baseUri}/customers/${this.customerId}/orders`,
        data
      );
      this.orderId.value = response.data.id;

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async addApplicationToCart(customerId, applicationId) {
    const baseUri = this.getBaseUri();
    let cartDetail = {
      customerId: customerId,
      applicationId: applicationId,
    };
    const response = await axios.post(
      `${baseUri}/customers/${customerId}/cart`,
      cartDetail
    );
    if (response.data === "This application is existed") {
      return 1;
    }
    this.cartQuantity.value++;
    return response;
  }

  async addCartDetailToOrder_payment(data) {
    try {
      const newOrder = await this.createOrder(data);
      this.orderId.value = newOrder.id;
      return await this.paymentByVNPay(this.orderId.value);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async paymentByVNPay(orderId: Number) {
    const baseUri = this.getBaseUri();
    let data = {
      amount: this.subTotal.value,
      method: "vnpay",
      status: "PENDING",
    };

    localStorage.setItem("amount", this.subTotal.value);

    localStorage.setItem(
      "cartDetails",
      this.cartDetailsToOrder.value.toString()
    );

    return axios.post(`${baseUri}/payment/${orderId}/vnpay`, data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
    });
  }

  async paymentByCOD(orderId: Number) {
    const baseUri = this.getBaseUri();
    let data = {
      amount: this.subTotal.value,
      method: "COD",
      status: "COD",
    };

    localStorage.setItem("amount", this.subTotal.value);

    localStorage.setItem(
      "cartDetails",
      this.cartDetailsToOrder.value.toString()
    );

    return axios.post(`${baseUri}/payment/${orderId}/cod`, data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
    });
  }

  async addOrderToSuccessful(orderId: number) {
    const baseUri = this.getBaseUri();

    this.orderId.value = orderId;

    const regularArray = localStorage.getItem("cartDetails")!.split(",");

    await axios.post(
      `${baseUri}/customers/${this.customerId}/orders/${this.orderId.value}`,
      regularArray
    );

    const order = await this.getOrderById(this.orderId.value);

    let data = {
      ...order,
      status: "PROCESSING",
      total: localStorage.getItem("amount"),
    };

    localStorage.removeItem("amount");

    // update payment
    await axios.put(
      `${baseUri}/customers/${this.customerId}/orders/${this.orderId.value}`,
      data
    );
  }

  async createShipment(data) {
    const baseUri = this.getBaseUri();
    return (await axios.post(`${baseUri}/shipment/${this.orderId.value}`, data))
      .data;
  }

  async deleteCartDetail(cartDetailId) {
    const baseUri = this.getBaseUri();
    const response = await axios.delete(
      `${baseUri}/customers/${this.customerId}/cart/${cartDetailId}`
    );
    if (this.cartQuantity.value == 0) {
      this.cartQuantity.value = 0;
    } else {
      this.cartQuantity.value--;
    }
    return response.data;
  }

  async getOrderById(orderId: Number) {
    const baseUri = this.getBaseUri();
    return axios.get(
      `${baseUri}/customers/${this.customerId}/orders/${orderId}`
    );
  }

  async getAllOrders() {
    const baseUri = this.getBaseUri();
    return await axios.get(`${baseUri}/customers/${this.customerId}/orders`);
  }

  async getOrderDetailsByOrderId(orderId) {
    const baseUri = this.getBaseUri();
    return await axios.get(
      `${baseUri}/customers/${this.customerId}/orders/${orderId}/details`
    );
  }

  async updateCartDetail(cartDetail) {
    const baseUri = this.getBaseUri();
    return await axios.put(
      `${baseUri}/customers/${this.customerId}/cart/${cartDetail.id}`,
      cartDetail
    );
  }

  async getCity() {
    const baseUri = this.getGHNUri();
    return axios.get(`${baseUri}/master-data/province`, {
      headers: {
        "Content-Type": "application/json",
        Token: "726cd839-e9d8-11ee-b1d4-92b443b7a897",
        ShopId: "191483",
      },
    });
  }

  async getDistrict(provinceId) {
    const baseUri = this.getGHNUri();
    console.log("Province id : ", provinceId);
    return axios.get(`${baseUri}/master-data/district`, {
      headers: {
        "Content-Type": "application/json",
        Token: "726cd839-e9d8-11ee-b1d4-92b443b7a897",
        ShopId: "191483",
      },
      params: {
        province_id: provinceId,
      },
    });
  }

  async getWard(districtId) {
    const baseUri = this.getGHNUri();
    return axios.get(`${baseUri}/master-data/ward`, {
      headers: {
        "Content-Type": "application/json",
        Token: "726cd839-e9d8-11ee-b1d4-92b443b7a897",
        ShopId: "191483",
      },
      params: {
        district_id: districtId,
      },
    });
  }

  async getShippingService(fromDistrictId, toDistrictId) {
    const baseUri = this.getGHNUri();

    let data = {
      shop_id: 191483,
      from_district: fromDistrictId,
      to_district: toDistrictId,
    };

    return axios.post(`${baseUri}/v2/shipping-order/available-services`, data, {
      headers: {
        "Content-Type": "application/json",
        Token: "726cd839-e9d8-11ee-b1d4-92b443b7a897",
      },
    });
  }

  async getShipCost(
    fromDistrictId,
    fromWardCode,
    serviceId,
    toDistrictId,
    toWardCode
  ) {
    let data = {
      from_district_id: fromDistrictId,
      from_ward_code: fromWardCode,
      service_id: serviceId,
      service_type_id: null,
      to_district_id: toDistrictId,
      to_ward_code: toWardCode,
      height: 50,
      length: 20,
      weight: 10,
      width: 20,
      insurance_value: 10000,
      cod_failed_amount: 2000,
      coupon: null,
    };
    const baseUri = this.getGHNUri();
    return axios.post(`${baseUri}/v2/shipping-order/fee`, data, {
      headers: {
        "Content-Type": "application/json",
        Token: "726cd839-e9d8-11ee-b1d4-92b443b7a897",
        ShopId: "191483",
      },
    });
  }

  getBaseUri() {
    return import.meta.env.VITE_BACKEND_BASE_URL;
  }

  getGHNUri() {
    return `https://dev-online-gateway.ghn.vn/shiip/public-api`;
  }
}

const cartService = new CartService();

export default cartService;

export const provideCartService = () => {
  cartService.getCart();
  return {
    cartService,
  };
};
