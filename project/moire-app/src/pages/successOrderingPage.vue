<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'catalog' }">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'cart' }">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>
      <h1 class="content__title" v-if="order.error">
        {{order.error.message}}
      </h1>
      <h1 class="content__title" v-if="!loadingProcess && !order.error">
        Заказ оформлен <span>№ {{ order.id }}</span>
      </h1>
    </div>
    <section class="cart" v-if="loadingProcess">Загрузка</section>
    <section class="cart" v-else-if="loadingError">Ошибка: </section>
    <section class="cart" v-else>
      <div v-if="order.error">Возможно в номере заказа имеется опечатка</div>
      <successOrdering v-else :order="order"></successOrdering>
    </section>
  </main>
</template>
<script>
import API from '@/config';
import numberFormat from '@/helpers/numberFormat';
import successOrdering from '@/components/successOrdering.vue';

export default {
  data() {
    return {
      order: null,
      loadingProcess: false,
      loadingError: false,
    };
  },
  components: {
    successOrdering,
  },
  methods: {
    // Получить данные о заказе по id
    orderingData() {
      this.loadingProcess = true;
      // this.loadingError = false;
      const locationSplitted = window.location.pathname.split('/');
      const orderId = locationSplitted[locationSplitted.length - 1];
      // const orderId = url.pathname();
      return fetch(`${API}/api/orders/${orderId}/?userAccessKey=${localStorage.getItem('userAccessKey')}`, {
        method: 'GET',
      })
        .then(async (response) => {
          const data = await response.json();
          this.order = data;
        })
        .catch((err) => {
          this.error = err;
          this.loadingError = true;
        })
        .finally(() => {
          this.loadingProcess = false;
        });
    },
    // Форматирование цены
    formattedPrice(price) {
      return numberFormat(price);
    },
  },
  created() {
    this.orderingData();
  },
};
</script>
