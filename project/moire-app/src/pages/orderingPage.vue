<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'catalog' }">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'cart' }">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <div class="content__row">
        <h1 class="content__title">
          Оформление заказа
        </h1>
      </div>
    </div>
    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="ordering()">
        <div class="cart__field">
          <div class="cart__data">
           <!-- eslint-disable-next-line -->
            <label class="form__label">
              <input @blur="poolValidation('name')" class="form__input" type="text" name="name"
               placeholder="Введите ваше полное имя" v-model="name">
              <span class="form__value">ФИО</span>
              <span class="form__error" v-if="nameError">Некорректное имя</span>
            </label>

           <!-- eslint-disable-next-line -->
            <label class="form__label">
              <input @blur="poolValidation('address')" class="form__input"
               type="text" name="address"
               placeholder="Введите ваш адрес" v-model="address">
              <span class="form__value">Адрес доставки</span>
              <span class="form__error" v-if="addressError">Некорректный адрес</span>
            </label>

           <!-- eslint-disable-next-line -->
            <label class="form__label">
              <input @blur="poolValidation('phone')"
               class="form__input phone" type="tel" name="phone"
               placeholder="Введите ваш телефон" id="phone" v-model="phone">
              <span class="form__value">Телефон</span>
              <span class="form__error" v-if="phoneError">Неверный формат телефона</span>
            </label>

           <!-- eslint-disable-next-line -->
            <label class="form__label">
              <input @blur="poolValidation('email')" class="form__input" type="email" name="email"
               placeholder="Введи ваш Email" v-model="email">
              <span class="form__value">Email</span>
              <span class="form__error" v-if="emailError">Неверный формат почты</span>
            </label>

           <!-- eslint-disable-next-line -->
            <label class="form__label">
              <textarea class="form__input form__input--area" name="comments"
               placeholder="Ваши пожелания" v-model="comment"></textarea>
              <span class="form__value">Комментарий к заказу</span>
            </label>
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item" v-for="item in deliveriesList" :key="item.id">
               <!-- eslint-disable-next-line -->
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio"
                  v-model="deliveryTypeId"
                   name="delivery" :value="item.id" :checked="deliveriesList[0].id == item.id">
                  <span class="options__value" v-if="item.price == 0">
                    {{ item.title }} <b>бесплатно</b>
                  </span>
                  <span class="options__value" v-else>
                    {{ item.title }} <b>{{ item.price }} ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
               <!-- eslint-disable-next-line -->
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio"
                   name="pay" v-model="paymentTypeId" :value="1" checked="">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
               <!-- eslint-disable-next-line -->
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio"
                   name="pay" v-model="paymentTypeId"  :value="2">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>
        <!-- Блок оформления -->
        <div class="cart__block" v-if="getLoadingProcess">
          <spinnerBlock></spinnerBlock>
        </div>
        <div class="cart__block" v-else-if="getLoadingError">
          <refreshBlock @click="refresh()"></refreshBlock>
        </div>
        <div class="cart__block" v-else>
          <ul class="cart__orders">
            <li class="cart__order" v-for="product in getCartProducts" :key="product.id">
              <h3>{{product.product.title}}</h3>
              <b> {{formattedPrice(product.price * product.quantity)}}  ₽</b>
              <span>Артикул: {{ product.product.id }}</span>
            </li>
          </ul>
          <div class="cart__total" v-if="deliveriesList[deliveryTypeId-1]">
            <p >Доставка:
              <b v-if="!deliveriesList[deliveryTypeId-1].price == 0">
                бесплатно
              </b>
              <b v-else>
                {{ deliveriesList[deliveryTypeId-1].price }} ₽
              </b>
            </p>
            <p>Итого:
              <b>{{ getCartProducts.length }}</b> товара на сумму
              <b>{{formattedPrice(Number(getCartTotalPrice)
              + Number(deliveriesList[deliveryTypeId-1].price))}} ₽
              </b>
            </p>
          </div>

          <button class="cart__button button button--primery" type="submit"
           :disabled="loadingProcess || !name || !address || !phone || !email
           || nameError || addressError || phoneError || emailError " >
            Оформить заказ
          </button>
        </div>
        <div class="cart__error form__error-block" v-if="loadingError">
          <h4>Заявка не отправлена!</h4>
          <p>
            Похоже произошла ошибка. Попробуйте отправить снова или перезагрузите страницу.
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import numberFormat from '@/helpers/numberFormat';
import API from '@/config';
import v8n from 'v8n';
import Inputmask from 'inputmask';
import spinnerBlock from '@/components/spinnerBlock.vue';
import refreshBlock from '@/components/refreshBlock.vue';

export default {
  data() {
    return {
      loadingProcess: false,
      loadingError: false,
      name: '',
      address: '',
      phone: '',
      email: '',
      nameError: false,
      addressError: false,
      phoneError: false,
      emailError: false,
      deliveryTypeId: 1,
      paymentTypeId: 1,
      comment: '',
      deliveriesList: [],
      orderId: 0,
    };
  },
  computed: {
    ...mapGetters([
      'getCartProducts',
      'getCartTotalPrice',
      'getLoadingProcess',
      'getLoadingError',
    ]),
  },
  methods: {
    ...mapActions(['loadBasket']),
    // Форматирование цены
    formattedPrice(price) {
      return numberFormat(price);
    },

    // Оформление заказа
    ordering() {
      this.loadingProcess = true;
      this.loadingError = false;
      return fetch(`${API}/api/orders?userAccessKey=${localStorage.getItem('userAccessKey')}`, {
        method: 'POST',
        body: JSON.stringify({
          name: this.name,
          address: this.address,
          phone: this.phone,
          email: this.email,
          deliveryTypeId: this.deliveryTypeId,
          paymentTypeId: this.paymentTypeId,
          comment: this.comment,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(async (response) => {
          const data = await response.json();
          this.orderId = data.id;
          this.loadBasket();
          this.$router.push({ name: 'order', params: { id: this.orderId } });
        })
        .catch(() => {
          this.loadingError = true;
        })
        .finally(() => {
          this.loadingProcess = false;
        });
    },
    // Получение списка доставок
    getDeliveriesList() {
      return fetch(`${API}/api/deliveries`)
        .then(async (response) => {
          const json = await response.json();
          this.deliveriesList = await json;
        });
    },
    // Валидация полей
    poolValidation(poolName) {
      if (poolName === 'name') {
        if (!v8n().minLength(3).test(this.name)) {
          this.nameError = true;
        } else { this.nameError = false; }
      } else if (poolName === 'address') {
        if (!v8n().minLength(3).test(this.address)) {
          this.addressError = true;
        } else { this.addressError = false; }
      } else if (poolName === 'email') {
        if (!v8n()
          .includes('@')
          .includes('.')
          .not.includes(' ')
          .test(this.email)) {
          this.emailError = true;
        } else { this.emailError = false; }
      } else if (poolName === 'phone') {
        if (!v8n().minLength(7).test(this.phone)) {
          this.phoneError = true;
        } else { this.phoneError = false; }
      }
    },
    // Перзагрузка данных
    refresh() {
      this.loadBasket();
    },
  },
  created() {
    this.getDeliveriesList();
  },
  mounted() {
  // Маска инпутов
    const phonePoolMasked = new Inputmask('+7(999)999-99-99');
    const phonePool = document.getElementById('phone');
    phonePoolMasked.mask(phonePool);
    // const phonePoolUnmasked = phonePool.inputmask.unmaskedvalue();
    // if (Number(phonePoolUnmasked) && phonePoolUnmasked.length === 10) {
    //   this.phoneError = false;
    // } else { this.phoneError = true; }
  },
  components: {
    spinnerBlock,
    refreshBlock,
  },
};
</script>
