<template>
    <div class="all overflow-y-auto custom-scrollbar" style="max-height: 880px;">
        <!-- <div class="flex shadow-lg rounded-lg mx-4 my-2 px-4 pb-2">
            <div class="w-2/5">
                <div class="mb-2 text-4xl mt-3 ">
                    Chúc mừng bạn 🎉🎉🎉
                </div>
                <div class="my-2 font-light text-xl">
                    Hôm nay bạn đã bán được thêm 72% 🤩.
                </div>
                <div class="my-2 font-light text-xl">Kiểm tra huy hiệu nâng cao mới trong hồ sơ của bạn.</div>
                <button type="button" class="text-indigo-500 bg-indigo-300 p-2 my-1 hover:bg-indigo-700 rounded-lg ">
                    XEM HUY HIỆU</button>
            </div>
            <div class="w-2/6"></div>
            <div class="grid justify-items-end w-1/4"><img
                    src="https://sneat-vuetify-admin-template.vercel.app/assets/illustration-john-light-0061869a.png"
                    alt="">
            </div>
        </div> -->
        <div class="flex flex-col">
            <div class="flex">
                <div class="w-1/4 mt-5 rounded-lg shadow-xl p-4 big-scale">
                    <div class="media-body text-left">
                        <h6 class="text-muted mb-2">Tổng doanh thu (tháng) </h6>
                        <h3>{{ totalRevenue < 1500000 ? formatNumberWithCommas(15652000) :
                            formatNumberWithCommas(totalRevenue) }} (VND)</h3>
                    </div>
                    <div class="align-self-center">
                        <i class="fa fa-trophy text-lime-400 fa-2x float-right"></i>
                    </div>
                </div>
                <div class="w-1/4 mt-5 rounded-lg shadow-xl p-4 ml-4  big-scale">
                    <div class="media-body text-left">
                        <h6 class="text-muted mb-2">Số đơn thành công </h6>
                        <h3>{{ orderDelivered < 23 ? 23 : orderDelivered }}</h3>
                    </div>
                    <div class="align-self-center">
                        <i class="fa fa-crown text-teal-200 fa-2x float-right"></i>
                    </div>
                </div>
                <div class="w-1/4 mt-5 rounded-lg shadow-xl p-4 ml-4  big-scale">
                    <div class="media-body text-left">
                        <h6 class="text-muted mb-2">Số lượng phần mềm </h6>
                        <h3>{{ 9 }} </h3>
                    </div>
                    <div class="align-self-center">
                        <i class="fa-solid fa-file-zipper fa-2x text-yellow-400 float-right"></i>
                    </div>
                </div>
                <div class="w-1/4 mt-5 rounded-lg shadow-xl p-4 ml-4  big-scale">
                    <div class="media-body text-left">
                        <h6 class="text-muted mb-2">Số người dùng</h6>
                        <h3>{{ orderCancelled < 6 ? 6 : orderCancelled }}</h3>
                    </div>
                    <div class="align-self-center rounded-lg">
                        <i class="fa-regular fa-user text-rose-500 fa-2x float-right"></i>
                    </div>
                </div>
            </div>

            <div class="flex">
                
            </div>
        </div>
        <div class="flex m-2">
            <div class="card shadow-lg w-3/5 rounded-lg p-4">
                <div class="font-bold text-2xl mb-4">Thống kê doanh thu</div>
                <div class="mb-4 flex flex-wrap gap-4">
                    <Dropdown v-model="selectedTimeRange" :options="timeRanges" optionLabel="name" placeholder="Tuần"
                        class="w-48" />
                    <Calendar v-model="startDate" :showIcon="true" placeholder="Ngày bắt đầu" class="w-48"
                        dateFormat="yy/mm/dd" />
                    <Calendar v-model="endDate" :showIcon="true" placeholder="Ngày kết thúc" class="w-48"
                        dateFormat="yy/mm/dd" />
                    <Button label="Cập nhật" @click="fetchDataAndUpdateChart" />
                </div>
                <Chart type="line" :data="orderChartData" :options="orderChartOptions" class="h-[30rem]" />
            </div>
            <div class="card shadow-lg w-2/5 rounded-lg p-4">
                <div class="font-bold text-2xl mb-4">Thống kê người dùng</div>
                <!-- <div class="w-1/2 mt-3 rounded-lg shadow-xl p-4 ml-4 big-scale">
                    <div class="media-body text-left">
                        <h6 class="text-muted mb-2">Số đơn đã vận chuyển</h6>
                        <h3>{{ orderShipped < 5 ? 5 : orderShipped }}</h3>
                    </div>
                    <div class="align-self-center rounded-lg">
                        <i class="fa-solid fa-truck-fast text-indigo-600 fa-2x float-right"></i>
                    </div>
                </div> -->
                <Chart type="bar" :data="userChartData" :options="userChartOptions" class="h-[30rem]" />
            </div>
        </div>
        <div class="flex m-2">
            <div class="card shadow-lg w-3/5 rounded-lg p-4">
                <div class="font-bold text-2xl mb-4">Phần mềm được mua nhiều</div>
                <DataTable :value="applicationMostSaleListResponse" tableStyle="min-width: 50rem" stripedRows paginator
                    :rows="5" ref="dt">
                    <template #empty> Không tìm thấy phần mềm. </template>
                    <template #loading> Đang tải. Vui lòng chờ. </template>
                    <Column field="name" header="Tên phần mềm">
                        <template #body="{ data }">
                            {{ data.name }}
                        </template>
                    </Column>
                    <Column field="downloads" header="Lượt mua" bodyStyle="text-align:right">
                        <template #header>
                            <span class="flex-1 text-right"></span>
                        </template>
                        <template #body="slotProps">
                            {{ formatNumber(slotProps.data.downloads) }}
                        </template>
                    </Column>
                    <Column field="price" header="Giá (VNĐ)" bodyStyle="text-align:right">
                        <template #header>
                            <span class="flex-1 text-right"></span>
                        </template>
                        <template #body="slotProps">
                            {{ formatNumber(slotProps.data.price) }}
                        </template>
                    </Column>
                    <Column field="ratings" header="Đánh giá trung bình" bodyStyle="text-align:right">
                        <template #header>
                            <span class="flex-1 text-right"></span>
                        </template>
                        <template #body="slotProps">
                            <div v-if="slotProps.data.ratings">
                                {{ slotProps.data.ratings?.toFixed(1) }}
                                <span class="fa fa-star text-yellow-500"></span>
                            </div>
                            <div v-else>
                                Chưa có dữ liệu
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </div>
            <div class="card shadow-lg w-2/5 rounded-lg p-4">
                <div class="">
                    <div class="font-bold text-2xl mb-4">Phần mềm theo loại</div>
                    <Chart type="doughnut" :data="applicationTypeChartData" :options="applicationTypeChartOptions"
                        class="w-full md:w-[30rem]" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
// import Chart from 'chart.js/auto';
import Chart from 'primevue/chart';
import axios from 'axios';
import type { ProductObject } from '../cart/cart-item/DefaultCartItem.vue';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';
import Rating from 'primevue/rating';

const orderChartData = ref();
const orderChartOptions = ref();

const userChartData = ref();
const userChartOptions = ref();

const applicationChartData = ref();
const applicationChartOptions = ref();

const applicationTypeChartData = ref();
const applicationTypeChartOptions = ref();

const applicationMostSaleListResponse = ref();

const selectedTimeRange = ref({ name: 'Tuần', value: 'week' });
const startDate = ref();
const endDate = ref();

const timeRanges = [
    { name: 'Tuần', value: 'week' },
    { name: 'Tháng', value: 'month' },
    { name: 'Quý', value: 'quarter' },
    { name: 'Năm', value: 'year' }
];

onMounted(async () => {
    orderChartData.value = setOrderChartData();
    orderChartOptions.value = setOrderChartOptions();
    userChartData.value = setUserChartData();
    userChartOptions.value = setUserChartOptions();
    await fetchDataAndUpdateUserChart();
    await fetchDataAndUpdateApplicationTypeChart();
    await setApplicationChartData();
});

const setOrderChartData = (labels = [], dataset1 = [], dataset2 = []) => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: labels.length ? labels : ['Jan', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'triệu đồng',
                data: dataset1.length ? dataset1 : [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
                tension: 0.4
            },
            // {
            //     label: 'Second Dataset',
            //     data: dataset2.length ? dataset2 : [28, 48, 40, 19, 86, 27, 90],
            //     fill: false,
            //     borderColor: documentStyle.getPropertyValue('--p-gray-500'),
            //     tension: 0.4
            // }
        ]
    };
};

const setOrderChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

    return {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };
}

const setUserChartData = (userCountList = []) => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: ['Khách hàng', 'Nhà phát triển', 'Quản trị hệ thống'],
        datasets: [
            {
                label: 'Số lượng',
                backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
                borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
                data: userCountList.length ? userCountList : [5, 10, 15],
            }
        ],
    };
};
const setUserChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

    return {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };
}

const setApplicationTypeChartData = (labels = [], counts = []) => {
    const documentStyle = getComputedStyle(document.body);

    return {
        labels: labels.length ? labels : ['A', 'B', 'C'],
        datasets: [
            {
                data: counts.length ? counts : [540, 325, 702],
                backgroundColor: [documentStyle.getPropertyValue('--p-cyan-500'), documentStyle.getPropertyValue('--p-orange-500'), documentStyle.getPropertyValue('--p-gray-500')],
                hoverBackgroundColor: [documentStyle.getPropertyValue('--p-cyan-400'), documentStyle.getPropertyValue('--p-orange-400'), documentStyle.getPropertyValue('--p-gray-400')]
            }
        ]
    };
};
const setApplicationTypeChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');

    return {
        plugins: {
            legend: {
                labels: {
                    cutout: '60%',
                    color: textColor
                }
            }
        }
    };
}


const setApplicationChartData = async () => {
    try {
        // Replace this with your actual API call
        const response = await axios.get(`${apiUrl}/applications/most-sale`);

        if (response.status === 200) {
            applicationMostSaleListResponse.value = response.data;
        }
        // Update chart data with the fetched data
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed to fetch data. Please try again.');
    }
};
const setApplicationChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

    return {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };
}

const fetchDataAndUpdateChart = async () => {
    if (!selectedTimeRange.value || !startDate.value || !endDate.value) {
        alert('Please select time range, start date, and end date');
        return;
    }

    try {
        // Replace this with your actual API call
        // const response = await fetch('/api/chart-data', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         timeRange: selectedTimeRange.value,
        //         startDate: startDate.value,
        //         endDate: endDate.value,
        //     }),
        // });

        // if (!response.ok) {
        //     throw new Error('Failed to fetch data');
        // }

        // const data = await response.json();

        const data = {
            labels: ['05/12-11/12', '12/12-18/12', '19/12-25/12', '26/12-02/01'],
            dataset1: [500000, 200000, 1000000, 700000],
        }

        // Update chart data with the fetched data
        orderChartData.value = setOrderChartData(data.labels, data.dataset1, data.dataset2);
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed to fetch data. Please try again.');
    }
};

const fetchDataAndUpdateUserChart = async () => {
    try {
        // Replace this with your actual API call
        const response = await axios.get(`${apiUrl}/users/count-group-by-type`);

        if (response.status === 200) {
            const data = response.data;
            userChartData.value = setUserChartData(data);
        }
        // Update chart data with the fetched data
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed to fetch data. Please try again.');
    }
};

const fetchDataAndUpdateApplicationTypeChart = async () => {
    try {
        // Replace this with your actual API call
        const response = await axios.get(`${apiUrl}/applications/group-by-type`);

        if (response.status === 200) {
            const data = response.data;
            applicationTypeChartData.value = setApplicationTypeChartData(data.labels, data.counts);
        }
        // Update chart data with the fetched data
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed to fetch data. Please try again.');
    }
};

const formatNumber = (number) => {
    return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const formatStorageCapacity = (bytes) => {
    if (bytes >= 1024 ** 3) {
        return `${(bytes / 1024 ** 3).toFixed(2)} GB`;
    } else if (bytes >= 1024 ** 2) {
        return `${(bytes / 1024 ** 2).toFixed(2)} MB`;
    } else if (bytes >= 1024) {
        return `${(bytes / 1024).toFixed(2)} KB`;
    } else {
        return `${bytes} B`;
    }
}

interface Order {
    id: string,
    createDate: string,
    status: string,
    total: string,
    couponId: string,
    customer: Customer,
    paymentId: string;
    shipmentId: string;
    staff: Staff;
    warehouseId: string;
    orderDetails: OrderDetail[];
    phone: string;
}

interface Customer {
    id: string;
    phone: string;
}

export interface OrderDetail {
    id: string;
    productDetail: ProductDetail;
    quantity: number,
    total: number
}

interface ProductDetail {
    id: string;
    quantity: string,
    imageLinks: string,
    product: ProductObject,
    color: string,
    size: string,
    sold: number,
}

interface Staff {
    id: string;
    name: string;
}

const apiUrl = 'http://localhost:8080'
const orderDelivered = ref<number>(0);
const totalRevenue = ref<number>(0);
const orderProcessing = ref<number>(0);
const orderCancelled = ref<number>(0);
const orderShipped = ref<number>(0);
const totalPorfit = ref<number>(0);
const totalCost = ref<number>(0);
const customerNumber = ref<number>(0);
const staffNumber = ref<number>(0);
const managerNumber = ref<number>(0);
const adminNumber = ref<number>(0);
const accountAvailable = ref<number>(0);
const accountLocked = ref<number>(0);
const topProducts = ref<ProductObject[]>();
const monthlyRevenues2024 = new Array(12).fill(0);

const orders = ref<Order[]>();
function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const chartCanvas = ref<HTMLCanvasElement | null>(null);
const columnChartCanvas = ref<HTMLCanvasElement | null>(null);
const doughnutChartCanvas = ref<HTMLCanvasElement | null>(null);


onMounted(async () => {
    try {
        const response = await axios.get(`${apiUrl}/OrderForEmployee`);
        if (response.status === 200) {
            orders.value = response.data;
            // nếu muốn lọc theo thời gian, lọc ngay đây (vd lấy số đơn hàng có số ngày...)
            orderDelivered.value = orders.value!.filter(order => order.status === 'DELIVERED').length;
            // totalRevenue.value = Number(orders.value!.filter(order => order.status === 'DELIVERED')
            if (orders.value) {
                const currentMonth = new Date().getMonth() + 1;

                totalRevenue.value = orders.value
                    .filter(order => {
                        const orderDate = new Date(order.createDate);
                        return orderDate.getFullYear() === new Date().getFullYear() && orderDate.getMonth() + 1 === currentMonth && order.status === 'DELIVERED';
                    })
                    .reduce((total, order) => total + Number(order.total), 0);
                // console.log(totalRevenue.value)
            }
            orderProcessing.value = orders.value!.filter(order => order.status === 'PROCESSING').length;
            orderCancelled.value = orders.value!.filter(order => order.status === 'CANCELLED').length;
            orderShipped.value = orders.value!.filter(order => order.status === 'SHIPPED').length;


            //Lấy dữ liệu biểu đồ tổng doanh thu
            const monthlyRevenuesByMonth = new Array(12).fill(null);
            if (orders.value) {
                orders.value.filter(order => order.status === 'DELIVERED').forEach(order => {
                    const orderDate = new Date(order.createDate);
                    const month = orderDate.getMonth();
                    const orderTotal = Number(order.total);

                    if (orderDate.getFullYear() === 2024) {
                        monthlyRevenuesByMonth[month] += orderTotal;
                    }
                });
                monthlyRevenues2024.splice(0, 12);
                monthlyRevenues2024.push(...monthlyRevenuesByMonth);
                monthlyRevenues2024.map(value => value === 0 ? null : value);
                // console.log(monthlyRevenues2024)
            }

            //Lấy dữ liệu lợi nhuận

            if (orders.value) {
                const currentMonth = new Date().getMonth() + 1;
                // console.log(totalRevenue.value)
                await Promise.all(orders.value.filter(order => {
                    const orderDate = new Date(order.createDate);
                    return orderDate.getFullYear() === new Date().getFullYear() && orderDate.getMonth() + 1 === currentMonth && order.status === 'DELIVERED';
                }).map(async (order) => {
                    try {
                        const orderDetailsResponse = await axios.get(`${apiUrl}/OrderForEmployee/${order.id}/details`);
                        order.orderDetails = orderDetailsResponse.data;
                        totalCost.value += order.orderDetails.reduce((total, orderDetail) => total + orderDetail.quantity * orderDetail.productDetail.product.cost, 0);
                    } catch (error) {
                        console.error(`Error fetching order details for order ${order.id}:`, error);
                    }
                }));
                totalPorfit.value = totalRevenue.value - totalCost.value;
                if (totalPorfit.value < 0) {
                    totalPorfit.value = 0
                }
            }
        }

        const responseUser = await axios.get(`http://localhost:8080/users`);
        if (responseUser.status === 200) {
            customerNumber.value = responseUser.data.filter(user => user.userType === 'customer').length;
            staffNumber.value = responseUser.data.filter(user => user.userType === 'staff').length;
            managerNumber.value = responseUser.data.filter(user => user.userType === 'manager').length;
            adminNumber.value = responseUser.data.filter(user => user.userType === 'admin').length;
            accountAvailable.value = responseUser.data.filter(user => user.locked === false).length;
            accountLocked.value = responseUser.data.filter(user => user.locked === true).length;
        }

        //Lấy dữ liệu top5 sản phẩm bán chạy 
        const products = ref<ProductObject[]>();
        if (orders.value) {
            try {
                const productsResponse = await axios.get(`${apiUrl}/products`);
                products.value = productsResponse.data;
                // Bước 2 và Bước 3: Tính tổng số lượng đã bán của mỗi sản phẩm
                const soldProductsMap = new Map<string, number>(); // Map để lưu trữ tổng số lượng đã bán của mỗi sản phẩm
                await Promise.all(products.value!.map(async (product) => {
                    const detailsResponse = await axios.get(`${apiUrl}/products/${product.id}/details`);
                    const details = detailsResponse.data;
                    details.forEach((detail: ProductDetail) => {
                        const productId = product.id;
                        const quantitySold = detail.sold;
                        // Cập nhật hoặc thêm mới tổng số lượng đã bán của sản phẩm vào Map
                        soldProductsMap.set(String(productId), (soldProductsMap.get(String(productId)) || 0) + quantitySold);
                    });
                }));
                // Bước 4: Sắp xếp danh sách sản phẩm theo tổng số lượng đã bán giảm dần
                const soldProductsArray = Array.from(soldProductsMap.entries());
                soldProductsArray.sort((a, b) => b[1] - a[1]);
                // Lấy 5 phần tử ban đầu (top 5 bán chạy)
                const topFiveProducts = soldProductsArray.slice(0, 5);
                // Lọc danh sách products và cập nhật sold của từng sản phẩm từ topFiveProducts
                if (products.value) {
                    products.value = products.value
                        .filter(product => topFiveProducts.some(([productId]) => productId === String(product.id)))
                        .map(product => {
                            const sold = topFiveProducts.find(([productId]) => productId === String(product.id))?.[1] || 0;
                            return { ...product, sold };
                        });
                    // Sắp xếp danh sách products theo sold giảm dần
                    products.value.sort((a, b) => b.sold - a.sold);
                }
                topProducts.value = products.value;
            } catch (error) {
                console.error('Lỗi khi lấy danh sách sản phẩm:', error);
            }
        }
    } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
    }

    // Line Chart
    if (chartCanvas.value) {
        const ctx = chartCanvas.value.getContext('2d');
        if (ctx) {
            const myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
                        "September", "October", "November", "December"
                    ],
                    datasets: [
                        {
                            label: 'Năm 2023',
                            data: [57000000, 60500000, 55500000, 70000000, 70006540, 60006540, 50006540, 70006540, 80006540, 50006540, 70006540, 65008000],
                            fill: false,
                            borderColor: 'rgb(168, 162, 158)',
                            tension: 0.1,
                            borderCapStyle: 'round',
                            cubicInterpolationMode: 'monotone',
                            borderDash: [5, 5],
                        },
                        {
                            label: 'Năm 2024',
                            data: [
                                61000000, // tháng 1
                                57643000,
                                75000000,
                                68000000,
                                15652000,
                                monthlyRevenues2024[5], // tháng 6
                                monthlyRevenues2024[6],
                                monthlyRevenues2024[7],
                                monthlyRevenues2024[8],
                                monthlyRevenues2024[9],
                                monthlyRevenues2024[10],
                                monthlyRevenues2024[11]],
                            fill: false,
                            borderColor: 'rgb(103, 232, 249)',
                            tension: 0.1,
                            borderCapStyle: 'round',
                            cubicInterpolationMode: 'monotone',
                        }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        }
                    }
                }
            });
        }
    }

    // Column Chart
    if (columnChartCanvas.value) {
        const ctx = columnChartCanvas.value.getContext('2d');
        if (ctx) {
            const columnChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Khách hàng', 'Nhân viên', 'Quản lý', 'Admin'],
                    datasets: [{
                        label: 'Số lượng',
                        data: [customerNumber.value, staffNumber.value, managerNumber.value, adminNumber.value],
                        backgroundColor: [
                            'rgba(113, 211, 55, 1)', // Màu cho khách hàng
                            'rgba(3, 195, 236, 1)', // Màu cho nhân viên
                            'rgba(105, 108, 255, 1)', // Màu cho quản lý
                            'rgba(113, 146, 163, 1)' // Màu cho admin
                        ],
                        borderColor: [
                            'rgba(113, 211, 55, 1)',
                            'rgba(3, 195, 236, 1)',
                            'rgba(105, 108, 255, 1)',
                            'rgba(113, 146, 163, 1)'
                        ],
                        borderWidth: 1,
                        barThickness: 30,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                display: false // Bỏ lưới kẻ dọc
                            }
                        },
                        x: {
                            grid: {
                                display: false // Bỏ lưới kẻ ngang
                            }
                        }
                    }
                }
            });
        }
    }

    //Doughnut Chart
    if (doughnutChartCanvas.value) {
        const ctx = doughnutChartCanvas.value.getContext('2d');
        if (ctx) {
            const doughnutChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Đã bị khoá', 'Khả dụng'],
                    datasets: [{
                        label: 'Số lượng',
                        data: [accountLocked.value, accountAvailable.value],
                        backgroundColor: [
                            'rgba(168, 162, 158, 1)',
                            'rgba(103, 232, 249, 1)',
                        ],
                        borderColor: [
                            'rgba(66, 62, 66, 1)',
                            'rgba(3, 195, 236, 1)',
                        ],
                        borderWidth: 1,
                        hoverOffset: 10,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                        }
                    },
                    animation: {
                        animateRotate: false,
                    },
                }
            });
            doughnutChartCanvas.value.addEventListener('mouseleave', function () {
                doughnutChart.options.animation!.animateScale = false;
                doughnutChart.update(); // Cập nhật biểu đồ để áp dụng thay đổi
            });
        }
    }
});
</script>

<style scoped>
.column-rounded {
    border-radius: 10px;
}

.big-scale {
    transition: transform 0.3s ease;
}

.big-scale:hover {
    transform: scale(1.1);
}

.custom-scrollbar::-webkit-scrollbar {
    width: 5px;
    height: 5px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
}
</style>
