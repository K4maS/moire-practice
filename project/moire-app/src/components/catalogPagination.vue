<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow" href="#"
        :class="{ 'pagination__link--disabled': currentPage == 1 }" aria-label="Предыдущая страница"
        @click.prevent="pageChanging('prev')">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li class="pagination__item" v-for="page in pages" :key="page">
      <a class="pagination__link" :class="{ 'pagination__link--current': currentPage == page }"
      href="#"        @click.prevent="pageChanging(page)">
        {{ page }}
      </a>
    </li>

    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow" href="#" aria-label="Следующая страница"
        @click.prevent="pageChanging('next')"
         :class="{ 'pagination__link--disabled': currentPage == pages }">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>
<script>
export default {
  props: ['modelValue', 'pages'],
  data() {
  },
  methods: {
    pageChanging(page) {
      if (page === 'prev') {
        this.$emit('update:modelValue', this.currentPage - 1);
      } else if (page === 'next') {
        this.$emit('update:modelValue', this.currentPage + 1);
      } else {
        this.$emit('update:modelValue', page);
      }
    },
  },
  computed: {
    currentPage() {
      return this.modelValue;
    },
  },
};
</script>
