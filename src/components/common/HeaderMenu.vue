<template>
    <header class="bg-gradient-to-r from-gray-900 to-gray-800 w-screen h-20 text-white fixed top-0 z-50">
        <div class="container mx-auto px-4 py-3 h-20">
            <div class="flex items-center justify-between container py-3 absolute h-20 top-0">
                <!-- Logo -->
                <router-link :to="{
                    name: 'home',
                }" class="mb-1.5">
                    <div class="flex items-center">
                        <a href="/" class="text-2xl font-bold">
                            <span class="text-blue-400">app</span>
                            <span class="text-white">shop</span>
                        </a>
                    </div>
                </router-link>
                <!-- Navigation -->
                <nav class="hidden md:flex space-x-6">
                    <div v-for="item in navItems" :key="item.id" @click.stop="toggleSubNav(item.id)">
                        <a :id="item.id"
                            class="text-md font-medium hover:text-blue-400 transition-colors duration-200 flex items-center cursor-pointer">
                            {{ item.name }}
                            <ChevronDown v-if="item.subNavList.length > 0" :size="20" :stroke-width="1" />
                        </a>
                        <div v-if="item.subNavList.length > 0" :id="'dropdown-' + item.id"
                            :class="{ 'hidden': openedSubNav !== item.id, 'block': openedSubNav === item.id }"
                            class="z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute top-16">
                            <ul class="py-2 text-sm text-gray-700 dark:text-gray-400">
                                <li v-for="subItem in item.subNavList" :key="subItem.id">
                                    <router-link
                                        :to="{ name: 'applicationList', query: { filterItemName: subItem.name } }"
                                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        {{ subItem.name }}
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <!-- Search Bar -->
                <div class="hidden md:block flex-grow max-w-md mx-6">
                    <div class="relative"
                        @keyup.enter="router.push({ name: 'applicationList', query: { query: model } })">
                        <input v-model="model" type="text" placeholder="Tìm kiếm..."
                            class="w-full bg-gray-700 rounded-full py-2 px-4 pl-10 text-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        <router-link :to="{ name: 'applicationList', query: { query: model } }">
                            <SearchIcon class="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        </router-link>
                    </div>
                </div>

                <!-- User Menu -->
                <div class="flex items-center space-x-4">
                    <button v-if="!isLoggedIn"
                        class="hidden md:block bg-blue-500 hover:bg-blue-600 text-white text-md font-medium py-2 px-4 rounded-full transition-colors duration-200">
                        <router-link :to="{
                            name: 'login',
                        }">
                            Đăng nhập
                        </router-link>
                    </button>
                    <div v-else class="flex">
                        <button class="text-gray-300 hover:text-white">
                            <a @click.stop="toggleSubNavUser()">
                                <UserIcon class="h-6 w-6" />
                            </a>
                        </button>
                        <div id="dropdown-user" :class="{ 'hidden': !isOpenedSubNavUser, 'block': isOpenedSubNavUser }"
                            class="z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute top-16">
                            <ul class="py-2 text-sm text-gray-700 dark:text-gray-400">
                                <li v-for="subItem in userMenu" :key="subItem.id">
                                    <router-link v-if="subItem.name !== 'Đăng xuất'"
                                        :to="{ name: subItem.componentName }"
                                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        {{ subItem.name }}
                                    </router-link>
                                    <a v-else @click="handleLogout"
                                        class="w-full text-left block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">
                                        {{ subItem.name }}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <button class="md:hidden text-gray-300 hover:text-white" @click="toggleMobileMenu">
                        <MenuIcon class="h-6 w-6" />
                    </button>
                    <router-link :to="{
                        name: 'cart',
                    }" class="h-6">
                        <button class="text-gray-300 hover:text-white">
                            <ShoppingCart class="h-6 w-6" />
                        </button>
                    </router-link>
                </div>
            </div>

            <!-- Mobile Menu -->
            <div v-if="mobileMenuOpen" class="md:hidden mt-4">
                <nav class="flex flex-col space-y-2">
                    <a v-for="item in navItems" :key="item.name" :href="item.href"
                        class="text-sm font-medium hover:text-blue-400 transition-colors duration-200">
                        {{ item.name }}
                    </a>
                </nav>
                <div class="mt-4">
                    <input type="text" placeholder="Tìm kiếm..."
                        class="w-full bg-gray-700 rounded-full py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>
            </div>
        </div>
    </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { SearchIcon, UserIcon, MenuIcon, ShoppingCart, ChevronDown } from 'lucide-vue-next'
import HeaderNavService from "@/services/header_nav.service.ts"

const router = useRouter();
const model = defineModel()
const navItems = ref([])
const mobileMenuOpen = ref(false)
const openedSubNav = ref(null)
const isOpenedSubNavUser = ref(false)
const isLoggedIn = ref(false);

const userMenu = [
    { id: 1, name: 'Thông tin tài khoản', url: '/user', componentName: 'profile' },
    { id: 2, name: 'Đăng xuất', url: '/logout', componentName: 'login' },
]

const toggleMobileMenu = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value
}

// Function to toggle sub-navigation visibility
const toggleSubNav = (id) => {
    openedSubNav.value = openedSubNav.value === id ? null : id
}

const toggleSubNavUser = () => {
    isOpenedSubNavUser.value = !isOpenedSubNavUser.value
}

// Function to close sub-navigation if clicked outside
const closeSubNav = (event) => {
    if (!event.target.closest('nav')) {
        openedSubNav.value = null
        isOpenedSubNavUser.value = false
    }
}

// Function to handle logout
const handleLogout = () => {
    // Clear user session or token
    localStorage.removeItem('user');
    isLoggedIn.value = false;

    // Redirect to login page
    router.push({ name: 'login' });
}

const getHeaderNavList = async () => {
    const response = await HeaderNavService.getHeaderNavList();
    navItems.value = response;
    return response;
}

// Initialize component and attach click event for detecting outside clicks
onMounted(() => {
    isLoggedIn.value = localStorage.getItem('user') ? true : false;
    getHeaderNavList()
    document.addEventListener('click', closeSubNav)
})
</script>

<style lang="css" scoped></style>