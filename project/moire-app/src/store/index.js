import { createStore } from 'vuex';
import API from '@/config';

export default createStore({
  state: {
    productsData: [],
    loadingProcess: false,
    loadingError: false,
  },
  getters: {
    // Передача списка товаров
    getProductsData(state) {
      return state.productsData;
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

    // Изменение продукта
    updateProductsData(state, productsData) {
      state.productsData = productsData;
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
    loadProducts(context) {
      context.commit('updateLoadingProcess', true);
      context.commit('updateLoadingError', false);
      return fetch(`${API}/api/products`)
        .then(async (response) => {
          const data = await response.json();
          context.commit('updateProductsData', data.items);
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
