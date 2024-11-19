<template>
    <div class="flex grid grid-cols-12 gap-4 min-h-[720px]">
        <div class="col-span-3"><AccountSidebar/></div>
        <div class="col-span-9"><router-view></router-view></div>
    </div>
</template>

<script setup lang="ts">
import AccountSidebar from '../profile/AccountSideBar.vue';
</script>