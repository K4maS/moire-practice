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
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <div class="cart__data">
           <!-- eslint-disable-next-line -->
            <label class="form__label">
              <input class="form__input" type="text" name="name"
               placeholder="Введите ваше полное имя">
              <span class="form__value">ФИО</span>
            </label>

           <!-- eslint-disable-next-line -->
            <label class="form__label">
              <input class="form__input" type="text" name="address"
               placeholder="Введите ваш адрес">
              <span class="form__value">Адрес доставки</span>
            </label>

           <!-- eslint-disable-next-line -->
            <label class="form__label">
              <input class="form__input" type="tel" name="phone"
               placeholder="Введите ваш телефон">
              <span class="form__value">Телефон</span>
              <span class="form__error">Неверный формат телефона</span>
            </label>

           <!-- eslint-disable-next-line -->
            <label class="form__label">
              <input class="form__input" type="email" name="email"
               placeholder="Введи ваш Email">
              <span class="form__value">Email</span>
            </label>

           <!-- eslint-disable-next-line -->
            <label class="form__label">
              <textarea class="form__input form__input--area" name="comments"
               placeholder="Ваши пожелания"></textarea>
              <span class="form__value">Комментарий к заказу</span>
            </label>
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
               <!-- eslint-disable-next-line -->
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio"
                   name="delivery" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
               <!-- eslint-disable-next-line -->
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio"
                   name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>290 ₽</b>
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
                   name="pay" value="card" checked="">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
               <!-- eslint-disable-next-line -->
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio"
                   name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="product in getCartProducts" :key="product.id">
              <h3>{{product.product.title}}</h3>
              <b> {{formattedPrice(product.price * product.quantity)}}  ₽</b>
              <span>Артикул: {{ product.product.id }}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>бесплатно</b></p>
            <p>Итого: <b>{{ getCartProducts.length }}</b> товара на сумму
              <b>{{formattedPrice(getCartTotalPrice)}} ₽</b></p>
          </div>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
        <div class="cart__error form__error-block">
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
import { mapGetters } from 'vuex';
import numberFormat from '@/helpers/numberFormat';

export default {
  computed: {
    ...mapGetters(['getCartProducts', 'getCartTotalPrice']),
  },
  methods: {
    // Форматирование цены
    formattedPrice(price) {
      return numberFormat(price);
    },
    // Оформление заказа
    ordering() {
    },
  },

};
</script>
