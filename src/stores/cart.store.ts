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
    addToCartDetail(cartDetail) {
      this.cartDetails.push(cartDetail);
    }
    // removeFromCartDetail(cartDetail) {
      // this.cartDetails.pop(cartDetail);
    // }
  }
})
