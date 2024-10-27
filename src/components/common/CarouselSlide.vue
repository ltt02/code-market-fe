<template>
    <div class="block text-center carousel-container">
        <el-carousel height="380px" motion-blur>
            <el-carousel-item v-for="item in 4" :key="item">
                <img src="https://placehold.co/1392x380" alt="">
                <!-- <h3 class="small justify-center" text="">{{  }}</h3> -->
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

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