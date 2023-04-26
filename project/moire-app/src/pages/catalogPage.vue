<template>
  <main class="content container">
    <div class="content__top">

      <div class="content__row">
        <h1 class="content__title">
          Каталог
        </h1>
        <span class="content__info">
          152 товара
        </span>
      </div>
    </div>

    <div class="content__catalog">
      <aside class="filter">
        <form class="filter__form form" action="#" method="get">
          <fieldset class="form__block">
            <legend class="form__legend">Цена</legend>
            <label for="min-price" class="form__label form__label--price">
              <input class="form__input" type="text" name="min-price" value="0">
              <span class="form__value">От</span>
            </label>
            <label for="max-price" class="form__label form__label--price">
              <input class="form__input" type="text" name="max-price" value="12345">
              <span class="form__value">До</span>
            </label>
          </fieldset>

          <fieldset class="form__block">
            <legend class="form__legend">Категория</legend>
            <label for="category" class="form__label form__label--select">
              <select class="form__select" type="text" name="category">
                <option value="value1">Все категории</option>
                <option value="value2">Футболки</option>
                <option value="value3">Бюстгалтеры</option>
                <option value="value4">Носки</option>
              </select>
            </label>
          </fieldset>

          <fieldset class="form__block">
            <legend class="form__legend">Материал</legend>
            <ul class="check-list">
              <li class="check-list__item">
                <label for="material" class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox"
                  name="material" value="лен">
                  <span class="check-list__desc">
                    лен
                    <span>(3)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label for="material" class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox"
                  name="material" value="хлопок">
                  <span class="check-list__desc">
                    хлопок
                    <span>(46)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label for="material" class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox"
                  name="material" value="шерсть">
                  <span class="check-list__desc">
                    шерсть
                    <span>(20)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label for="material" class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox"
                   name="material" value="шелк">
                  <span class="check-list__desc">
                    шелк
                    <span>(30)</span>
                  </span>
                </label>
              </li>
            </ul>
          </fieldset>

          <fieldset class="form__block">
            <legend class="form__legend">Коллекция</legend>
            <ul class="check-list">
              <li class="check-list__item">
                <label for="collection" class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox"
                  name="collection" value="лето" checked="">
                  <span class="check-list__desc">
                    лето
                    <span>(2)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label for="collection" class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox"
                  name="collection" value="зима">
                  <span class="check-list__desc">
                    зима
                    <span>(53)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label for="collection" class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox"
                   name="collection" value="весна">
                  <span class="check-list__desc">
                    весна
                    <span>(24)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label for="collection" class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox"
                  name="collection" value="осень">
                  <span class="check-list__desc">
                    осень
                    <span>(30)</span>
                  </span>
                </label>
              </li>
            </ul>
          </fieldset>

          <button class="filter__submit button button--primery" type="submit">
            Применить
          </button>
          <button class="filter__reset button button--second" type="button">
            Сбросить
          </button>
        </form>
      </aside>

      <section class="catalog">
        <ul class="catalog__list">
          <!-- Список товаров -->
          <li class="catalog__item" v-for="item in getProductsData" :key="item.id">
            <a class="catalog__pic" href="#">
              <!-- :src="item.colors[0].gallery[0].file.url"
              :srcset="item.colors[0].gallery[0].file.url" -->
              <img

              alt="Название товара">
            </a>

            <h3 class="catalog__title">
              <a href="#">
                {{ item.title }}
              </a>
            </h3>

            <span class="catalog__price">
             {{item.price}} ₽
            </span>

            <ul class="colors colors--black">
              <li class="colors__item">
                <label for="color-1" class="colors__label">
                  <input class="colors__radio sr-only" type="radio" name="color-1"
                   value="#73B6EA" checked="">
                  <span class="colors__value" style="background-color: #73B6EA;">
                  </span>
                </label>
              </li>
              <li class="colors__item">
                <label for="color-1" class="colors__label">
                  <input class="colors__radio sr-only" type="radio" name="color-1"
                   value="#8BE000">
                  <span class="colors__value" style="background-color: #8BE000;">
                  </span>
                </label>
              </li>
              <li class="colors__item">
                <label for="color-1" class="colors__label">
                  <input class="colors__radio sr-only" type="radio" name="color-1"
                   value="#222">
                  <span class="colors__value" style="background-color: #222;">
                  </span>
                </label>
              </li>
            </ul>
          </li>
        </ul>

        <ul class="catalog__pagination pagination">
          <li class="pagination__item">
            <a class="pagination__link pagination__link--arrow pagination__link--disabled"
              aria-label="Предыдущая страница">
              <svg width="8" height="14" fill="currentColor">
                <use xlink:href="#icon-arrow-left"></use>
              </svg>
            </a>
          </li>
          <li class="pagination__item">
            <a class="pagination__link pagination__link--current">
              1
            </a>
          </li>
          <li class="pagination__item">
            <a class="pagination__link" href="#">
              2
            </a>
          </li>
          <li class="pagination__item">
            <a class="pagination__link" href="#">
              3
            </a>
          </li>
          <li class="pagination__item">
            <a class="pagination__link" href="#">
              4
            </a>
          </li>
          <li class="pagination__item">
            <a class="pagination__link" href="#">
              ...
            </a>
          </li>
          <li class="pagination__item">
            <a class="pagination__link" href="#">
              10
            </a>
          </li>
          <li class="pagination__item">
            <a class="pagination__link pagination__link--arrow" href="#"
             aria-label="Следующая страница">
              <svg width="8" height="14" fill="currentColor">
                <use xlink:href="#icon-arrow-right"></use>
              </svg>
            </a>
          </li>
        </ul>
      </section>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      catalogData: [],
    };
  },
  computed: {
    ...mapGetters(['getProductsData']),
  },
  methods: {

  },
  // watch: {
  //   },
  // },
  // created() {

  // },
};
</script>
