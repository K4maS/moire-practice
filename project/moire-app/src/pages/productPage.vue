<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">

            <router-link class="breadcrumbs__link" :to="{ name: 'catalog'}">
            Каталог
            </router-link>

        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'category',
           params: { id: product.category.id }}" v-if="product">
            {{ product.category.title }}
            </router-link>
        </li>
        <li class="breadcrumbs__item"  v-if="product">
          <a class="breadcrumbs__link">
            {{ product.title }}
            </a>
        </li>

      </ul>
    </div>
    <section class="item" v-if="loadingProcess">
      <spinnerBlock class="loading"></spinnerBlock>
    </section>
    <section class="item" v-else-if="loadingError">
      <refreshBlock class="loading" @click="refresh()">
      </refreshBlock>
    </section>
    <section class="item" v-else>
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src="checkImage(product)"
           :srcset="checkImage(product)"
            alt="Название товара">
        </div>
        <!-- <ul class="pics__list">
          <li class="pics__item">
            <a href="" class="pics__link pics__link--current">
              <img width="98" height="98"
              src="img/product-square-2.jpg"
               srcset="img/product-square-2@2x.jpg 2x"
                alt="Название товара">
            </a>
          </li>
          <li class="pics__item">
            <a href="" class="pics__link">
              <img width="98" height="98"
               src="img/product-square-3.jpg"
               srcset="img/product-square-3@2x.jpg 2x"
                alt="Название товара">
            </a>
          </li>
        </ul> -->
      </div>

      <div class="item__info">
        <span class="item__code">Артикул:  {{ product.id }}</span>
        <h2 class="item__title">
         {{ product.title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="addToCart()">
            <div class="item__row item__row--center">
              <div class="form__counter">
                <button type="button" aria-label="Убрать один товар"
                  @click="productCountChanging('-')">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>
                <!-- eslint-disable-next-line -->
                <input type="text" name="count" v-model.number="count" @blur="checkInput()">

                <button type="button" aria-label="Добавить один товар"
                 @click="productCountChanging('+')">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>

              <b class="item__price">
               {{ formattedPrice(product.price) }} ₽
              </b>
            </div>

            <div class="item__row">
              <fieldset class="form__block">
                <legend class="form__legend">Цвет</legend>
                <ul class="colors colors--black">
                  <li class="colors__item" v-for="color in product.colors" :key="color.color.id">
                  <!-- eslint-disable-next-line -->
                  <label   class="colors__label">
                  <input class="colors__radio sr-only" type="radio"
                  :id="'colors-for-' + color.color.id"
                  :name="'colors-for-' + product.slug"
                  :value="checkedColorPositionInList"
                  :checked="product.colors[checkedColorPositionInList].color == color.color"
                  @click="chooseColor(product.colors, color)"
                  />
                  <span class="colors__value" :style="{ background: color.color.code }">
                  </span>
                  </label>
                  </li>
                </ul>
              </fieldset>

              <fieldset class="form__block">
                <legend class="form__legend">Размер</legend>
                 <!-- eslint-disable-next-line -->
                <label class="form__label form__label--small form__label--select">
                  <select class="form__select" type="text" name="category"
                  v-model.number="checkedSizeId"
                  >
                    <option :value="size.id" v-for="size in product.sizes"
                    :checked="product.sizes[checkedSizeId] == size"
                    :key="size.id">
                     {{ size.title }}
                    </option>
                  </select>
                </label>
              </fieldset>
            </div>

            <button class="item__button button button--primery" type="submit"
            :disabled="loadingProcess">
            <span v-if="$store.state.loadingProcess">
              Добавляется
            </span>
            <span v-else-if="$store.state.loadingError">
              Не добавлено
            </span>
            <span v-else>
              В корзину
            </span>

            </button>
          </form>
        </div>
      </div>
      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link"  :class=" {'tabs__link--current' : infoBlock == 1}"
            @click.prevent="infoBlock = 1" href="#">
              Информация о товаре
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" :class=" {'tabs__link--current' : infoBlock == 2}"
            @click.prevent="infoBlock = 2" href="#" >
              Доставка и возврат
            </a>
          </li>
        </ul>
        <div class="item__content">
          <aboutItem v-if="infoBlock == 1" :product="product"></aboutItem>
          <aboutDelivery v-else-if="infoBlock == 2"></aboutDelivery>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import API from '@/config';
import { mapActions, mapMutations } from 'vuex';
import { toRaw } from 'vue';
import aboutItem from '@/components/aboutItem.vue';
import aboutDelivery from '@/components/aboutDelivery.vue';
import numberFormat from '@/helpers/numberFormat';
import spinnerBlock from '@/components/spinnerBlock.vue';
import refreshBlock from '@/components/refreshBlock.vue';

export default {
  data() {
    return {
      loadingProcess: false,
      loadingError: false,
      product: null,
      infoBlock: 1,
      // Данные для заказа
      checkedColorPositionInList: 0,
      count: 1,
      checkedSizeId: 0,
    };
  },
  methods: {
    ...mapActions(['addToBasket']),
    ...mapMutations(['updateUserAccessKey']),
    // Проверка наличия и добалвнеие изображеня
    checkImage(product) {
      console.log(product);
      if (product.colors[this.checkedColorPositionInList].gallery) {
        return product.colors[this.checkedColorPositionInList].gallery[0].file.url;
      }
      return '/img/placeholder-3.png';
    },
    // Загрузка продукта
    loadProduct() {
      this.loadingProcess = true;
      this.loadingError = false;
      return fetch(`${API}/api/products/${this.$route.params.id}`)
        .then(async (response) => {
          const data = await response.json();
          this.product = data;
          this.checkedSizeId = data.sizes[0].id;
        })
        .catch(() => {
          this.loadingError = true;
        })
        .finally(() => {
          this.loadingProcess = false;
        });
    },
    // При нажатии выбора цвета
    chooseColor(colorsArr, color) {
      const colorsArrRaw = toRaw(colorsArr);
      const colorRaw = toRaw(color);
      let i = 0;
      colorsArrRaw.forEach((element) => {
        if (element === colorRaw) {
          this.checkedColorPositionInList = i;
          console.log(i);
        }
        i += 1;
      });
      return this.checkedColorPositionInList;
    },

    // При нажатии на кнопки + и -
    productCountChanging(value) {
      if (value === '+') {
        this.count += 1;
      } else if (value === '-') {
        if (this.count > 1) {
          this.count -= 1;
        } else {
          this.count = 1;
        }
      }
    },
    // Провекра поля количества товаров
    checkInput() {
      if (this.count < 1 || !Number(this.count)) {
        this.count = 1;
      }
    },
    // Отпавка товаров в корзину
    addToCart() {
      console.log(
        this.product.id,
        this.product.colors[this.checkedColorPositionInList].color.id,
        this.checkedSizeId,
        this.count,
      );
      const userAccesKey = localStorage.getItem('userAccessKey');
      if (userAccesKey) {
        this.updateUserAccessKey(userAccesKey);
      }
      this.addToBasket({
        productId: this.product.id,
        colorId: this.product.colors[this.checkedColorPositionInList].color.id,
        sizeId: this.checkedSizeId,
        quantity: this.count,
      });
    },

    // Форматирование цены
    formattedPrice(price) {
      return numberFormat(price);
    },
    refresh() {
      this.loadProduct();
    },
  },

  computed: {
  },

  created() {
    this.loadProduct();
  },
  components: {
    aboutItem,
    aboutDelivery,
    spinnerBlock,
    refreshBlock,
  },
};
</script>

<style>
  .loading {
    grid-column: span 2;
  }
</style>
