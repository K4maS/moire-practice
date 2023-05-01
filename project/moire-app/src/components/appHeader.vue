<template>
  <header class="header container">
    <div class="header__wrapper">
      <span class="header__info">Каталог</span>

      <router-link class="header__logo" :to="{ name: 'catalog' }">
        <img src="/img/svg/logo-moire.svg" alt="Логотип интернет магазина Moire"
         width="116" height="34">
      </router-link>

      <a class="header__tel" href="tel:8 800 600 90 09">
        8 800 600 90 09
      </a>
      <router-link class="header__cart" :to="{ name: 'cart' }" aria-label="Корзина с товарами">
        <svg width="19" height="24">
          <use xlink:href="#icon-cart"></use>
        </svg>
        <span class="header__count" v-if="$store.state.loadingProcess"
        aria-label="Количество товаров">
          Load.
        </span>
        <span class="header__count" v-else-if="$store.state.loadingError"
        aria-label="Количество товаров">
          Err.
        </span>
        <span class="header__count" v-else-if="$store.state.cartProducts.length"
        aria-label="Количество товаров">
          {{ $store.state.cartProducts.length }}
        </span>
      </router-link>
    </div>
  </header>
</template>

<script>
// import { mapGetters } from 'vuex';

export default {

  computed: {
    // ...mapGetters('getLoadingProcess', 'getLoadingError'),
  },
  methods: {

  },
};
</script>
