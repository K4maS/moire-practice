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
        <svg  width="19" height="24">
          <use xlink:href="#icon-cart"></use>
        </svg>
        <span class="header__count" v-if="$store.state.loadingProcess"
        aria-label="Количество товаров">
        <div class="header__count-spinner">
          <!-- <?xml version="1.0" encoding="iso-8859-1"?> -->
          <svg fill="white" height="7px" width="7px" version="1.1" id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 367.136 367.136" xml:space="preserve">
            <!-- eslint-disable-next-line -->
            <path d="M367.136,149.7V36.335l-39.14,38.953c-13.024-17.561-29.148-32.731-47.732-44.706 c-29.33-18.898-63.352-28.888-98.391-28.888C81.588,1.694,0,83.282,0,183.568s81.588,181.874,181.874,181.874 c34.777,0,68.584-9.851,97.768-28.488c28.394-18.133,51.175-43.703,65.881-73.944l-26.979-13.119 c-25.66,52.77-78.029,85.551-136.669,85.551C98.13,335.442,30,267.312,30,183.568S98.13,31.694,181.874,31.694 c49.847,0,96.439,24.9,124.571,65.042L253.226,149.7H367.136z" />
          </svg>
          </div>
        </span>
        <span class="header__count" v-else-if="$store.state.loadingError"
        aria-label="Количество товаров">
          Er!
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

  },
  methods: {

  },
};
</script>
<style>
  .header__count-spinner {
    width: unset;
    fill: white;
    animation: rotation 1.3s linear infinite;
  }

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
