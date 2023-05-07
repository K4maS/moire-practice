<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">

          <router-link class="breadcrumbs__link" :to="{ name: 'catalog' }">
            Каталог
          </router-link>

        </li>
        <li class="breadcrumbs__item" v-if="getCartProducts">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <div class="content__row">
        <h1 class="content__title">
          Корзина
        </h1>
        <span class="content__info">
          {{ getCartProducts.length }} товара
        </span>
      </div>
    </div>

    <section class="cart loading" v-if="getLoadingProcess">
      <spinnerBlock>
      </spinnerBlock>
    </section>
    <section class="cart" v-if="getLoadingError">
      <refreshBlock @click="refresh()"></refreshBlock>
    </section>
    <section class="cart" v-else>
      <form class="cart__form form" action="#" method="POST"
      @submit.prevent="ordering()">
        <div class="cart__field">
          <ul class="cart__list">
            <cartItem class="cart__item product"
            :product="product" v-for="product in getCartProducts" :key="product.id">
            </cartItem>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ formattedPrice(getCartTotalPrice) }} ₽</span>
          </p>
          <button class="cart__button button button--primery"
           type="submit" v-if="getCartProducts.length">
            Оформить заказ
          </button>
        </div>
      </form>
    </section>
  </main>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import numberFormat from '@/helpers/numberFormat';
import cartItem from '@/components/cartItem.vue';
import spinnerBlock from '@/components/spinnerBlock.vue';
import refreshBlock from '@/components/refreshBlock.vue';

export default {
  computed: {
    ...mapGetters([
      'getCartProducts',
      'getCartTotalPrice',
      'getLoadingProcess',
      'getLoadingError',
    ]),
  },
  methods: {
    ...mapActions(['loadBasket']),
    // Форматирование цены
    formattedPrice(price) {
      return numberFormat(price);
    },
    // Оформление заказа
    ordering() {
      this.$router.push({ name: 'ordering' });
    },
    refresh() {
      this.loadBasket();
    },
  },
  components: {
    cartItem,
    spinnerBlock,
    refreshBlock,
  },

};
</script>

<style>
.container {
  position: relative;
}

.loading {
  position: absolute;
  left: 50%;
  top: 30px;
}
</style>
