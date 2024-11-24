<template>
    <div class="block text-center carousel-container">
        <el-carousel height="380px" motion-blur>
            <el-carousel-item v-for="item in bannerList" :key="item">
                <img :src="item.imgUrl" alt="" style="width: 1392px; height: 380px;" />
                <!-- <h3 class="small justify-center" text="">{{  }}</h3> -->
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const bannerList = [
    {
        id: 1,
        imgUrl: 'src\\banner\\1\\img.jpg',
    },
    {
        id: 2,
        imgUrl: 'src\\banner\\2\\img.jpg',
    },
    {
        id: 3,
        imgUrl: 'src\\banner\\3\\img.jpg',
    },
    {
        id: 4,
        imgUrl: 'src\\banner\\4\\img.jpg',
    },
]
</script>

<style scoped>
.carousel-container {
    margin-bottom: 64px;
    position: relative;
}

.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 380px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>