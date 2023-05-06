import { createStore } from 'vuex';
import API from '@/config';

export default createStore({
  state: {
    userAccessKey: null,
    cartProducts: [],
    productsData: [],
    pages: 0,
    page: 0,
    loadingProcess: false,
    loadingError: false,
    categoryId: 1,
  },
  getters: {
    // Передача id категории
    getCategoryId(state) {
      return state.categoryId;
    },
    // Передача ключа доступа
    getUserAccessKey(state) {
      return state.userAccessKey;
    },
    // Передача количества товаров в корзине
    getCartProducts(state) {
      return state.cartProducts;
    },
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
    // Получить сумму цен корзины
    getCartTotalPrice(state) {
      let totalPrice = 0;
      state.cartProducts.forEach((element) => {
        totalPrice += element.price * element.quantity;
      });
      return totalPrice;
    },
  },

  mutations: {
    // Изменение id категории
    updateСategoryId(state, categoryId) {
      state.categoryId = categoryId;
    },
    // Изменение ключа доступа
    updateUserAccessKey(state, userAccessKey) {
      state.userAccessKey = userAccessKey;
    },
    // Изменение количества товаров в корзине
    updateCartProducts(state, cartProducts) {
      state.cartProducts = cartProducts;
    },
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
    // Загрузка корзины
    loadBasket(context) {
      context.commit('updateLoadingProcess', true);
      context.commit('updateLoadingError', false);
      return fetch(`${API}/api/baskets?userAccessKey=${context.state.userAccessKey}`)
        .then(async (response) => {
          const data = await response.json();
          context.commit('updateCartProducts', data.items);
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', data.user.accessKey);
          }
        })
        .catch((error) => {
          console.log(error);
          context.commit('updateLoadingError', true);
        })
        .finally(() => {
          context.commit('updateLoadingProcess', false);
        });
    },
    // Добавление данных в корзину
    addToBasket(context, {
      productId,
      colorId,
      sizeId,
      quantity,
    }) {
      context.commit('updateLoadingProcess', true);
      context.commit('updateLoadingError', false);
      console.log(
        productId,
        colorId,
        sizeId,
        quantity,
      );
      return fetch(`${API}/api/baskets/products?userAccessKey=${context.state.userAccessKey}`, {
        method: 'POST',
        body: JSON.stringify({
          productId,
          colorId,
          sizeId,
          quantity,
        }),
        headers: {
          'Content-Type': 'application/json',
        },

      })
        .then(async (response) => {
          const data = await response.json();
          context.commit('updateCartProducts', data.items);
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', data.user.accessKey);
          }
        })
        .catch((error) => {
          console.log(error);
          context.commit('updateLoadingError', true);
        })
        .finally(() => {
          context.commit('updateLoadingProcess', false);
        });
    },
    // Изменение количества продуктов в корзие
    changeProductInBasket(context, { basketItemId, quantity }) {
      context.commit('updateLoadingProcess', true);
      context.commit('updateLoadingError', false);
      console.log(basketItemId);
      return fetch(`${API}/api/baskets/products?userAccessKey=${context.state.userAccessKey}`, {
        method: 'PUT',
        body: JSON.stringify({ basketItemId, quantity }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(async (response) => {
          const data = await response.json();
          context.commit('updateCartProducts', data.items);
        })
        .catch((error) => {
          console.log(error);
          context.commit('updateLoadingError', true);
        })
        .finally(() => {
          context.commit('updateLoadingProcess', false);
        });
    },
    // Удаление продукта из корзины
    deleteFromBasket(context, basketItemId) {
      context.commit('updateLoadingProcess', true);
      context.commit('updateLoadingError', false);
      console.log(basketItemId);
      return fetch(`${API}/api/baskets/products?userAccessKey=${context.state.userAccessKey}`, {
        method: 'DELETE',
        body: JSON.stringify({ basketItemId }),
        headers: {
          'Content-Type': 'application/json',
        },

      })
        .then(async (response) => {
          const data = await response.json();
          context.commit('updateCartProducts', data.items);
        })
        .catch((error) => {
          console.log(error);
          context.commit('updateLoadingError', true);
        })
        .finally(() => {
          context.commit('updateLoadingProcess', false);
        });
    },
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
