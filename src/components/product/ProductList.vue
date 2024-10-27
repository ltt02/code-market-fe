<template>
  <div class="product-list-container">
    <div class="product-list-title">
      <a href="#">
        <h5 class="">
          {{ props.listType.title }}
        </h5>
      </a>
    </div>
    <Carousel class="product-list-slide" :autoplay="0" :wrap-around="true" :transition="500" :breakpoints="breakpoints">
      <Slide v-for="application in props.applicationList[props.listType.name]" :key="application">
        <!-- <div class="bg-white rounded-lg shadow"> -->
        <ProductCard :application="application" />
        <!-- </div> -->
      </Slide>

      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ProductCard from '@/components/product/ProductCard.vue'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import ApplicationService from "@/services/application.service.js"

const props = defineProps({
  applicationList: {
    type: Object,
    required: true,
  },
  listType: {
    type: Object,
    required: true,
  },
})

const breakpoints = {
  768: {
    itemsToShow: 2,
    snapAlign: 'center',
  },
  1024: {
    itemsToShow: 3,
    snapAlign: 'start',
  },
}
</script>

<style scoped>
.product-list-container {
  margin-bottom: 64px;
  position: relative;
  width: 100%;
}

.product-list-title {
  margin: 0 0 18px;
  display: flex;
  justify-content: space-between;
}

.product-list-title a {
  text-decoration: none;
}

.product-list-title a h5 {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  margin: 0;
  padding: 0;
}

.carousel-wrapper {
  position: relative;
}

.product-list-slide {
  display: flex;
}

/* :deep(.carousel__slide) {
  padding: 0 15px;
}

:deep(.carousel__viewport) {
  padding-left: 0;
  padding-right: 0;
}

:deep(.carousel__track) {
  padding-left: 0;
  padding-right: 0;
} */

:deep(.carousel__next),
:deep(.carousel__prev) {
  background-color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

:deep(.carousel__next) {
  right: -6px;
}

:deep(.carousel__prev) {
  left: -8px;
}

:deep(.carousel__icon) {
  width: 20px;
  height: 20px;
  fill: #333;
}
</style>