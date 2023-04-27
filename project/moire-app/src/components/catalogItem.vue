<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#">

      <img alt="Название товара" :src="checkImage(catalogItem)" :srcset="checkImage(catalogItem)">
    </a>

    <h3 class="catalog__title">
      <a href="#">
        {{ catalogItem.title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{ catalogItem.price }} ₽
    </span>
    <!-- Выбор цвета товара -->
    <ul class="colors colors--black">
      <li class="colors__item" v-for="color in catalogItem.colors" :key="color.color.id">
        <label :for="'colors-for-' + catalogItem.slug" class="colors__label">
          <input class="colors__radio sr-only" type="radio" :name="'colors-for-' + catalogItem.slug"
            :value="color.color.id"
            :checked="catalogItem.colors[checkedColor].color.id == color.color.id"
            @click.prevent="chooseColor(catalogItem.colors, color)"/>
          <span class="colors__value" :style="{ background: color.color.code }">
          </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  data() {
    return { checkedColor: 0 };
  },
  props: ['catalogItem'],
  methods: {
    // Проверка наличия и добалвнеие изображеня
    checkImage(catalogItem) {
      if (catalogItem.colors[this.checkedColor].gallery) {
        return catalogItem.colors[this.checkedColor].gallery[0].file.url;
      }
      return './img/placeholder-2.jpg';
    },
    // Выбор цветов товара
    chooseColor(colorsArr, color) {
      console.log('click');
      for (let i = -1; i < colorsArr.length; i + 1) {
        console.log('colorsArr[i].color.id', colorsArr[i].color.id, 'color.color.id', color.color.id);
        if (colorsArr[i].color.id === color.color.id) {
          this.checkedColor = i;
        }
      }
    },
  },
};
</script>
