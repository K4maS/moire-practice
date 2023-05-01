<template>
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{ name: 'product', params: { id: catalogItem.id } }">
      <img alt="Название товара" :src="checkImage(catalogItem)" :srcset="checkImage(catalogItem)">
    </router-link>

    <h3 class="catalog__title">
      <router-link :to="{ name: 'product', params: { id: catalogItem.id } }">
        {{ catalogItem.title }}
      </router-link>
    </h3>

    <span class="catalog__price">
      {{ formattedPrice(catalogItem.price) }} ₽
    </span>
    <!-- Выбор цвета товара -->
    <ul class="colors colors--black">
      <li class="colors__item" v-for="color in catalogItem.colors" :key="color.color.id">

         <!-- eslint-disable-next-line -->
        <label   class="colors__label">
          <input class="colors__radio sr-only" type="radio" :id="'colors-for-' + color.color.id"
          :name="'colors-for-' + catalogItem.slug"
          :value="checkedColor"
          :checked="catalogItem.colors[checkedColor].color == color.color"
          @click="chooseColor(catalogItem.colors, color)"
          />
          <span class="colors__value" :style="{ background: color.color.code }">
          </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import { toRaw } from 'vue';
import numberFormat from '@/helpers/numberFormat';

export default {
  data() {
    return { checkedColor: 0 };
    // prettyPrice:
  },
  props: ['catalogItem'],
  methods: {
    // Проверка наличия и добалвнеие изображеня
    checkImage(catalogItem) {
      if (catalogItem.colors[this.checkedColor].gallery) {
        return catalogItem.colors[this.checkedColor].gallery[0].file.url;
      }
      return '/img/placeholder-3.png';
    },
    // Выбор цветов товара
    chooseColor(colorsArr, color) {
      const colorsArrRaw = toRaw(colorsArr);
      const colorRaw = toRaw(color);
      let i = 0;
      colorsArrRaw.forEach((element) => {
        if (element === colorRaw) {
          this.checkedColor = i;
          console.log(i);
        }
        i += 1;
      });
      return this.checkedColor;
    },
    // Форматирование цены
    formattedPrice(price) {
      return numberFormat(price);
    },
  },

  computed: {

  },
};
</script>
