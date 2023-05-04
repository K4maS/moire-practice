<template>
  <form class="cart__form form" action="#" method="POST">
    <div class="cart__field">
      <p class="cart__message">
        Благодарим за&nbsp;выбор нашего магазина.
        На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа.
        Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа
        для уточнения деталей доставки.
      </p>

      <ul class="dictionary">
        <li class="dictionary__item">
          <span class="dictionary__key">
            Получатель
          </span>
          <span class="dictionary__value">
            {{ order.name }}
          </span>
        </li>
        <li class="dictionary__item">
          <span class="dictionary__key">
            Адрес доставки
          </span>
          <span class="dictionary__value">
            {{ order.address }}
          </span>
        </li>
        <li class="dictionary__item">
          <span class="dictionary__key">
            Телефон
          </span>
          <span class="dictionary__value">
            {{ order.phone }}
          </span>
        </li>
        <li class="dictionary__item">
          <span class="dictionary__key">
            Email
          </span>
          <span class="dictionary__value">
            {{ order.email }}
          </span>
        </li>
        <li class="dictionary__item">
          <span class="dictionary__key">
            Способ оплаты
          </span>
          <span class="dictionary__value">
            {{ order.paymentType }}
          </span>
        </li>
      </ul>
    </div>

    <div class="cart__block">
      <ul class="cart__orders">
        <li class="cart__order" v-for="item in order.basket.items" :key="item.id">
          <h3>{{ item.product.title }}</h3>
          <b>{{ formattedPrice(item.price) }} ₽</b>
          <span>Артикул: {{ item.product.id }}</span>
        </li>
      </ul>

      <div class="cart__total">
        <p>Доставка:
          <b v-if="order.deliveryType.price == 0"> бесплатно</b>
          <b v-else>{{ formattedPrice(order.deliveryType.price) }} ₽</b>
        </p>
        <p>Итого: <b>{{ order.basket.items.length }}</b> товара на сумму
          <b>{{ order.totalPrice }} ₽</b>
        </p>
      </div>
    </div>
  </form>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';

export default {
  props: ['order'],
  methods: {
    // Форматирование цены
    formattedPrice(price) {
      return numberFormat(price);
    },
  },
};
</script>
