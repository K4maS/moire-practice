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

      <h1 class="content__title" v-if="!loadingProcess">
        <span v-if="order.error">
          {{order.error.message}}
        </span>
        <span v-else>
          Заказ оформлен <span>№ {{ order.id }}</span>
        </span>
      </h1>
    </div>
    <section class="cart" v-if="loadingProcess">
      <SpinnerBlock></SpinnerBlock>
    </section>
    <section class="cart" v-else-if="loadingError">
      <RefreshBlock @click="refresh()">
      </RefreshBlock>
    </section>
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
import SpinnerBlock from '@/components/spinnerBlock.vue';
import RefreshBlock from '@/components/refreshBlock.vue';

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
    SpinnerBlock,
    RefreshBlock,
  },
  methods: {
    // Получить данные о заказе по id
    orderingData() {
      this.loadingProcess = true;
      const orderId = this.$route.params.id;
      console.log(orderId);
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
    // Обновление данных
    refresh() {
      this.orderingData();
    },
  },
  created() {
    this.orderingData();
  },
};
</script>
