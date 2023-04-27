import { createStore } from 'vuex';
import API from '@/config';

export default createStore({
  state: {
    productsData: [],
    pages: 0,
    page: 0,
    loadingProcess: false,
    loadingError: false,
  },
  getters: {
    // Передача списка товаров
    getProductsData(state) {
      return state.productsData;
    },
    // Передача списка страниц
    getPages(state) {
      return state.pages;
    },
    // Передача текущей страницы
    getPage(state) {
      return state.page;
    },
    // Передача статуса загрузки
    getLoadingProcess(state) {
      return state.loadingProcess;
    },
    // Передача ошибки загрузки
    getLoadingError(state) {
      return state.loadingError;
    },
  },

  mutations: {

    // Изменение продуктов
    updateProductsData(state, productsData) {
      state.productsData = productsData;
    },
    // Изменение количества страниц списка продуктов
    updatePages(state, pages) {
      state.pages = pages;
    },
    // Изменение текущей страницы списка продуктов
    updatePage(state, page) {
      state.page = page;
    },

    // Изменение статуса загркузки
    updateLoadingProcess(state, loadingProcess) {
      state.loadingProcess = loadingProcess;
    },

    // Изменение ошибки загркзки
    updateLoadingError(state, loadingError) {
      state.loadingError = loadingError;
    },
  },
  actions: {
    // Загрузка продукта
    loadProducts(context, page = 1, limit = 12) {
      context.commit('updateLoadingProcess', true);
      context.commit('updateLoadingError', false);
      return fetch(`${API}/api/products?page=${page}&limit=${limit}`)
        .then(async (response) => {
          const data = await response.json();
          context.commit('updateProductsData', data.items);
          context.commit('updatePages', data.pagination.pages);
          context.commit('updatePage', data.pagination.page);
          console.log('response', data.items[0].colors[0].gallery);
        })
        .catch((error) => {
          console.log(error);
          context.commit('updateLoadingError', true);
        })
        .finally(() => {
          context.commit('updateLoadingProcess', false);
        });
    },
  },
  modules: {
  },
});
