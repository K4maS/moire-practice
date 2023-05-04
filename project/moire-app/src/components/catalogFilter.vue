<template>
  <aside class="filter">
    <form class="filter__form form" action="#" method="get" @submit.prevent="submit()">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label for="min-price" class="form__label form__label--price">
          <input class="form__input" type="text" name="min-price" v-model.number="currentMinPrice">
          <span class="form__value">От</span>
        </label>
        <label for="max-price" class="form__label form__label--price">
          <input class="form__input" type="text" name="max-price" v-model.number="currentMaxPrice">
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label for="category" class="form__label form__label--select">
          <select class="form__select" name="category"
          v-model.number="currentCategoryId">
           <option :value="0"
             :key="0">
              Все категории
            </option>
            <option :value="category.id" v-for="category in productCategoriesList"
             :key="category.id">
              {{ category.title }}
            </option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Материал</legend>
        <ul class="check-list">
          <li class="check-list__item" v-for="material in materialsList" :key="material.id" >
            <!-- eslint-disable-next-line -->
            <label class="check-list__label">
              <input class="check-list__check sr-only" v-model="currentMaterialIds"
               type="checkbox" name="material" :value="material.id">
              <span class="check-list__desc">
                {{ material.title }}
                <span>({{material.productsCount}})</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Коллекция</legend>
        <ul class="check-list">
          <li class="check-list__item" v-for="season in seasonList" :key="season.id">
          <!-- eslint-disable-next-line -->
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox"
              v-model="currentSeasonIds"
              :name="season.id" :value="season.id">
              <span class="check-list__desc">
                {{ season.title }}
                <span>({{ season.productsCount }})</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button class="filter__submit button button--primery"
      type="submit">
        Применить
      </button>
      <button class="filter__reset button button--second"
      type="button" @click="clear()" v-if="currentCategoryId || currentMinPrice ||
       currentMaxPrice || currentMaterialIds.length ||currentSeasonIds.length">
        Сбросить
      </button>
    </form>
  </aside>
</template>
<script>
import API from '@/config';

export default {

  data() {
    return {
      currentCategoryId: 0,
      currentMaterialIds: [],
      currentSeasonIds: [],
      currentMinPrice: 0,
      currentMaxPrice: 0,
      // Списки
      seasonList: null,
      productCategoriesList: 0,
      materialsList: null,
    };
  },
  props: [
    'categoryId',
    'materialIds',
    'seasonIds',
    'minPrice',
    'maxPrice',
    // 'limit',
  ],
  methods: {
    submit() {
      this.$emit('update:categoryId', this.currentCategoryId);
      this.$emit('update:materialIds', this.currentMaterialIds);
      this.$emit('update:seasonIds', this.currentSeasonIds);
      this.$emit('update:minPrice', this.currentMinPrice);
      this.$emit('update:maxPrice', this.currentMaxPrice);
      // this.$emit('update:limit', 0);
    },
    clear() {
      this.$emit('update:categoryId', 0);
      this.$emit('update:materialIds', null);
      this.$emit('update:seasonIds', null);
      this.$emit('update:minPrice', 0);
      this.$emit('update:maxPrice', 0);
      // this.$emit('update:limit', 12);
      this.currentCategoryId = 0;
      this.currentMaterialIds = [];
      this.currentSeasonIds = [];
      this.currentMinPrice = 0;
      this.currentMaxPrice = 0;
    },
    // Получение списка сезонов
    getSeasonsList() {
      return fetch(`${API}/api/seasons`)
        .then(async (response) => {
          const json = await response.json();
          this.seasonList = await json.items;
        });
    },
    // Получение списка материалов
    getMaterialsList() {
      return fetch(`${API}/api/materials`)
        .then(async (response) => {
          const json = await response.json();
          this.materialsList = await json.items;
        });
    },
    // Получение списка категорий
    getProductCategoriesList() {
      return fetch(`${API}/api/productCategories`)
        .then(async (response) => {
          const json = await response.json();
          this.productCategoriesList = await json.items;
        });
    },
  },
  computed: {

  },

  created() {
    this.getSeasonsList();
    this.getMaterialsList();
    this.getProductCategoriesList();
  },
};
</script>
