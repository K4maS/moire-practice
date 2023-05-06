import { createRouter, createWebHistory } from 'vue-router';
import catalogPage from '@/pages/catalogPage.vue';
import productPage from '@/pages/productPage.vue';
import productsCartPage from '@/pages/productsCartPage.vue';
import notFoundPage from '@/pages/notFoundPage.vue';
import orderingPage from '@/pages/orderingPage.vue';
import orderInfoPage from '@/pages/orderInfoPage.vue';

const routes = [
  {
    name: 'catalog',
    component: catalogPage,
    path: '/',
  },
  {
    name: 'category',
    component: catalogPage,
    path: '/category/:id',
  },
  {
    name: 'product',
    component: productPage,
    path: '/products/:id',
  },
  {
    name: 'cart',
    component: productsCartPage,
    path: '/cart',
  },
  {
    name: 'ordering',
    component: orderingPage,
    path: '/ordering',
  },
  {
    name: 'order',
    component: orderInfoPage,
    path: '/order/:id',
  },
  {
    name: 'name',
    component: notFoundPage,
    path: '/pathMatch(.*)*',
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
