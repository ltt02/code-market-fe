<template>
    <div class="grid grid-rows-1 grid-flow-col gap-4 mt-5 ">
        <div class=""><AccountSidebar/></div>
        <div class="col-span-2"><router-view></router-view></div>
    </div>
</template>

<script setup lang="ts">
import AccountSidebar from '../profile/AccountSideBar.vue';
</script>