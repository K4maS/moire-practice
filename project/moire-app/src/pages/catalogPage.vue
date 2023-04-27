<template>
  <main class="content container">
    <div class="content__top">

      <div class="content__row">
        <h1 class="content__title">
          Каталог
        </h1>
        <span v-if="productsTotal === 1" class="content__info">
          {{ productsTotal }} товар
        </span>
        <span v-else-if="productsTotal < 5" class="content__info">
          {{ productsTotal }} товара
        </span>
        <span v-else class="content__info">
          {{ productsTotal }} товаров
        </span>
      </div>
    </div>

    <div class="content__catalog">
      <catalogFilter v-model.max-price="maxPrice" v-model.min-price="minPrice"
       v-model.category-id="categoryId"
        v-model:matertial-ids="materialIds" v-model.season-ids="seasonIds">
      </catalogFilter>
      <section class="catalog">
        <ul class="catalog__list">
          <!-- Список товаров -->
          <catalogItem :catalog-item="item" v-for="item in products" :key="item.id" />
        </ul>
        <catalogPagination v-model="currentPage" :pages="pages">

        </catalogPagination>

      </section>
    </div>
  </main>
</template>

<script>
import catalogItem from '@/components/catalogItem.vue';
import catalogPagination from '@/components/catalogPagination.vue';
import catalogFilter from '@/components/catalogFilter.vue';
import API from '@/config';

export default {
  data() {
    return {
      products: [],
      loadingProcess: false,
      loadingError: false,
      pages: 0,
      productsTotal: 0,
      categoryId: 0,
      materialIds: [],
      seasonIds: [],
      colorIds: [],
      currentPage: 1,
      limit: 12,
      minPrice: 0,
      maxPrice: 0,
    };
  },
  computed: {

  },
  methods: {
    // Загрузка продукта
    loadProducts() {
      this.loadingProcess = true;
      this.loadingError = false;
      return fetch(`${API}/api/products?page=${
        this.currentPage}&limit=${this.limit}categoryId=${
        this.categoryId}&materialIds[]=${
        this.materialIds}&seasonIds[]=${
        this.seasonIds}&colorIds[]=${
        this.colorIds}&minPrice=${
        this.minPrice}&maxPrice=${this.maxPrice}`)
        .then(async (response) => {
          const data = await response.json();
          this.products = data.items;
          this.pages = data.pagination.pages;
          this.currentPage = data.pagination.page;
          this.productsTotal = data.pagination.total;
        })
        .catch(() => {
          this.loadingError = true;
        })
        .finally(() => {
          this.loadingProcess = false;
        });
    },
  },
  watch: {
    currentPage() {
      this.loadProducts();
    },
  },
  components: { catalogItem, catalogPagination, catalogFilter },
  created() {
    this.loadProducts();
  },
};
</script>
