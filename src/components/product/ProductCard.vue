<template>
    <div class="product-card card" :class="gridCol">
        <div class="product-card__thumbnail">
            <div class="product-card__image-container">
                <router-link :to="{
                    name: 'application',
                    params: {
                        id: application.id,
                    },
                }" :application-id="application.id">
                    <img class="card-img-top" :src=application.images alt="Card image" style="width:100%">
                </router-link>
            </div>
            <!-- <span class="product-card__tags">New</span> -->
            <div class="product-card__select"></div>
        </div>
        <div class="product-card__content card-body">
            <div class="product-card__options"></div>
            <h3 class="product-card__title card-title">
                <router-link :to="{
                    name: 'application',
                    params: {
                        id: application.id,
                    },
                }">
                    {{ application.name }}
                </router-link>
            </h3>
            <p class="product-card__sub-title card-text">{{ getApplicationType(application.type) }}</p>
            <div class="product-card__prices">
                <span v-if="application.price == 0" class="free">
                    <ins>Miễn phí</ins>
                </span>
                <div v-else class="product-prices">
                    <ins>{{ formatedPrice }}</ins>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { APPLICATION_TYPE } from '@/const.js';

const getApplicationType = (type) => {
    return APPLICATION_TYPE[type] || '';  // Default to 'Unknown' if not found
}

const props = defineProps({
    application: {
        type: Object,
        required: true,
    },
    gridCol: String
})

const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

const formatedPrice = computed(() => {
    return VND.format(props.application.price);
});

const formatedSalePrice = computed(() => {
    let salePrice = props.application.price * (1 - props.application.salePercent / 100);
    salePrice = Math.floor(salePrice / 1000);
    salePrice *= 1000;
    return VND.format(salePrice);
})
</script>

<style>
.col-2 {
    width: 16.67%;
}

.col-2-4 {
    width: 20%;
}

a {
    background-color: transparent;
    text-decoration: none;
    color: inherit;
    transition: all .2s;
}

.product-card {
    position: relative;
    padding-bottom: 12px;
    border: none;
    margin-right: 20px;
    text-align: left;
}

.product-card>* {
    transition: all .3s;
}

.product-card__thumbnail {
    position: relative;
    margin-bottom: 15px;
    border-radius: 8px;
    overflow: hidden;
}

.product-card__image-container {
    position: relative;
}

.product-card__image-container img {
    background-color: transparent;
    text-decoration: none;
    color: inherit;
    transition: all .2s;
    border-radius: 8px;
    height: 232.97px;
}

.product-card__tags {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0.625rem;
    right: 0.75rem;
    font-size: .625rem;
    height: 21px;
    padding: 0 10px;
    border-radius: 5px;
    font-weight: 500;
    color: #fff;
    background-color: #2f5acf;
    text-transform: capitalize;
    z-index: 2;
}

.product-card__title {
    font-size: 1.1rem;
    letter-spacing: 0.02em;
    line-height: 125%;
    height: 2.4em;
    font-weight: 600;
    margin-bottom: 0.75rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
}

.product-card__sub-title {
    font-size: 14px;
    color: #0009;
    margin-bottom: 5px;
}

.product-prices,
.free {
    display: flex;
    justify-content: flex-end;
    flex-flow: row-reverse;
    font-size: 1.25rem;
    font-weight: 400;
}

.product-prices span {
    color: red;
    margin-left: 10px;
}

.product-prices del+ins {
    margin-right: 14px;
}

.product-prices del {
    color: #c4c4c4;
}

.product-prices ins,
.free ins {
    text-decoration: none;
    color: #242424;
    font-weight: 700;
}
</style>