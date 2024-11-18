import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cartStore', {
  state: () => {
    return {
      cartDetails: []
    }
  },
  actions: {
    setCartDetails(cartDetails) {
      this.cartDetails = cartDetails;
    },
    addCartDetail(cartDetail) {
      this.cartDetails.push(cartDetail);
    }
  }
})
