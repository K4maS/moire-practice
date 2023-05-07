<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="checkImage(product)" width="120" height="120"
       :srcset="checkImage(product)" :alt="product.product.title">
    </div>
    <h3 class="product__title">
      {{ product.product.title }}
    </h3>
    <p class="product__info product__info--color">
      Цвет:
      <span>
        <i :style="{ background: product.color.color.code }"></i>
        {{ product.color.color.title }}
      </span>
      <span class="product__info product__info--color">
        Размер: {{ product.size.title }}
      </span>
    </p>

    <span class="product__code">
      Артикул: {{ product.product.id }}
    </span>

    <div class="product__counter form__counter">
      <button type="button" aria-label="Убрать один товар"
       @click="changeProduct(product.id, product.quantity - 1)">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>
      <!-- eslint-disable-next-line -->
      <input type="text" name="count" v-model="product.quantity"
       @blur="changeProduct(product.id, product.quantity)">
      <button type="button" aria-label="Добавить один товар"
       @click="changeProduct(product.id, product.quantity + 1)">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>

    <b class="product__price">
      {{ formattedPrice(product.price * product.quantity) }}
    </b>

    <button class="product__del button-del" type="button"
     aria-label="Удалить товар из корзины"
      @click="deleteProduct(product.id)">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>
<script>
import { mapActions } from 'vuex';
import numberFormat from '@/helpers/numberFormat';
import { toRaw } from 'vue';

export default {
  props: ['product'],
  computed: {
  },
  methods: {
    ...mapActions(['deleteFromBasket', 'changeProductInBasket']),
    // Форматирование цены
    formattedPrice(price) {
      return numberFormat(price);
    },
    // Удаление продукта из корзины
    deleteProduct(basketItemId) {
      this.deleteFromBasket(basketItemId);
    },
    // Изменение продукта в корзине, если число товаров меньше еде
    changeProduct(basketItemId, quantity) {
      if (quantity > 0) {
        this.changeProductInBasket({ basketItemId, quantity });
      } else {
        this.deleteFromBasket(basketItemId);
      }
    },
    // Проверка наличия и добалвнеие изображеня
    checkImage(product) {
      const productRaw = toRaw(product);
      if (productRaw.color.gallery) {
        return productRaw.color.gallery[0].file.url;
      }
      return '/img/placeholder-3.png';
    },
  },
};
</script>
<style>
.product__del {
  cursor: pointer;
}
</style>
