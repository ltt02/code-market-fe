<template>
    <div class="search-input-container">
        <el-autocomplete v-model="state" :fetch-suggestions="querySearchAsync" placeholder="Tìm kiếm"
            @select="handleSelect" />
        <div class="cart-nav-container">
            <a class="cart-nav-link" href="#">
                <span class="cart-nav">Giỏ hàng</span>
            </a>
            <div class="cart-quantity-container">
                <span class="cart-quantity">1</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const state = ref('')

interface LinkItem {
    value: string
    link: string
}

const links = ref<LinkItem[]>([])

const loadAll = () => {
    return [
        { value: 'vue', link: 'https://github.com/vuejs/vue' },
        { value: 'element', link: 'https://github.com/ElemeFE/element' },
        { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
        { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
        { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
        { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
        { value: 'babel', link: 'https://github.com/babel/babel' },
    ]
}

let timeout: ReturnType<typeof setTimeout>
const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
    const results = queryString
        ? links.value.filter(createFilter(queryString))
        : links.value

    clearTimeout(timeout)
    timeout = setTimeout(() => {
        cb(results)
    }, 3000 * Math.random())
}
const createFilter = (queryString: string) => {
    return (restaurant: LinkItem) => {
        return (
            restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
    }
}

const handleSelect = (item: Record<string, any>) => {
    console.log(item)
}

onMounted(() => {
    links.value = loadAll()
})
</script>

<style>
.search-input-container {
    margin-left: auto;
    margin-right: auto;
    width: 75%;
    max-width: 1600px;
    display: flex;
    align-items: center;
    height: 100%;
    -webkit-box-pack: justify;
    justify-content: space-between;
    position: relative;
    z-index: 999;
}

.el-autocomplete {
    -webkit-box-align: center;
    align-items: center;
    display: flex;
    height: 40px;
    margin: 8px 0;
    min-width: 230px;
    width: 230px;
}

.cart-nav-container {
    display: flex;
    align-items: center;
    position: relative;
    white-space: nowrap;
    flex-direction: row;
    padding: 10px;
}

.cart-nav-link {
    text-decoration: none;
}

.cart-nav {
    text-align: left;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: var(--el-text-color-primary);
    padding: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
    -webkit-flex-shrink: 1;
    -ms-flex-negative: 1;
    flex-shrink: 1;
}

.cart-nav::before {
    transition: border 125ms ease-in-out;
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border: 1px solid transparent;
    border-radius: 4px;
    pointer-events: none;
}

.cart-quantity-container {
    margin-left: 2px;
    width: 30px;
    height: 20px;
    opacity: 1;
    transform: translateX(0px);
    background-color: rgb(38, 187, 255);
    color: rgb(0, 0, 0);
    border-radius: 16px;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    overflow: hidden;
    font-weight: bold;
    box-shadow: rgb(16, 16, 20) 0px 0px 0px 2px;
    transition: transform 250ms ease-in-out 0s, opacity 250ms ease-in-out 0s, width 250ms ease-in 0s;
}

.cart-quantity {
    line-height: 20px;
    font-size: 14px;
    position: absolute;
    text-align: center;
    font-weight: 700;
}
</style>