<template>
  <div class="segments-wrapper--mobile">

    <div class="segments__header">
      <h3 class="segments__title">Сегментация клиентов и построение сетки удержания</h3>

      <ul class="header__list">
        <li class="header__item">
          <p class="header__param">Всего клиентов</p>
          <p class="header__stat">12 180</p>
        </li>
        <li class="header__item">
          <p class="header__param">Средний чек</p>
          <p class="header__stat">1 802 ₽</p>
        </li>
      </ul>

      <p class="segments__subtitle">Выберите сегмент для получения по нему рекомендаций.</p>

      <div class="settings__main" @click="settingToggle">
        <p>Настройки сегментов</p>
        <toggle-component @settingToggle="settingToggle" :isActive="settingsActive" />
      </div>

      <div class="segments__settings" v-if="settingsActive">
        <div class="settings__wrapper">
          <p class="settings__text">
            На время разработки qoob.store все тонкие настройки сервиса
            доступны в полной  браузерной версии на компьютере или ноутбуке.
          </p>

          <div class="settings__modal">
            <p class="settings__title">Настройка диапазона сегмента</p>

            <div class="settings__item">
              <p class="settings__name">Количество покупок</p>

              <div class="settings__input-wrapper">
                <span class="settings__input">1</span>

                &mdash;

                <span class="settings__input">5</span>
              </div>
            </div>

            <div class="settings__item">
              <p class="settings__name">Давность, дней</p>

              <div class="settings__input-wrapper">
                <span class="settings__input">0</span>

                &mdash;

                <span class="settings__input">149</span>
              </div>
            </div>

            <button class="settings__submit">Перейти к настройкам</button>

          </div>
        </div>
      </div>

    </div>

    <ul class="segments__list">

      <li
          :class="['segments__item', 'segments__item' + index]"
          @click="toggleMainModal(index + 1)"
          v-for="(item, index) in segmentsList"
          :key="index"
      >
        <div class="item__header">
          <div class="segments__avatar">
            <span class="index">0{{ index + 1 }}</span>
            <img :src="require('../assets/img/smile' + index + '.png')" alt="segment-emoji" class="segments__smile">
          </div>

          <div class="segments__stat">
            <p class="segments__name">{{ item.name }}</p>
            <p class="segments__number">{{ item.number }} &mdash; 38&nbsp;%</p>
          </div>
        </div>

        <div class="item__body">
          <div class="item__stat">
            <p class="stat__text">Покупок</p>
            <p class="stat__text">{{ item.cartStart }} &mdash; {{ item.cartEnd }}</p>
          </div>
          <div class="item__stat">
            <p class="stat__text">Давность</p>
            <p class="stat__text">{{ item.timeStart }} &mdash; {{ item.timeEnd }}</p>
          </div>
        </div>
      </li>

    </ul>

  </div>
</template>

<script>
import toggleComponent from "@/components/graph-components/toggle-component";
import {ref} from "vue";

export default {
  name: "SegmentsLayoutMobile",
  components: {
    toggleComponent
  },
  setup(props, {emit}) {
    // Симуляция данных из апи

    const segmentsList = [
      {
        name: 'Чемпионы',
        cartStart: 0,
        cartEnd: 8,
        timeStart: 0,
        timeEnd: 1,
        number: 4180
      },
      {
        name: 'Лояльные',
        cartStart: 0,
        cartEnd: 10,
        timeStart: 4,
        timeEnd: 5,
        number: 4180
      },
      {
        name: 'Растущие',
        cartStart: 0,
        cartEnd: 17,
        timeStart: 3,
        timeEnd: 5,
        number: 4180
      },
      {
        name: 'Новички',
        cartStart: 18,
        cartEnd: 32,
        timeStart: 2,
        timeEnd: 4,
        number: 4180
      },
      {
        name: 'В зоне риска',
        cartStart: 11,
        cartEnd: 16,
        timeStart: 1,
        timeEnd: 3,
        number: 4180
      },
      {
        name: 'Средние на грани',
        cartStart: 23,
        cartEnd: 43,
        timeStart: 0,
        timeEnd: 3,
        number: 4180
      },
      {
        name: 'Сомневающиеся',
        cartStart: 18,
        cartEnd: 41,
        timeStart: 0,
        timeEnd: 1,
        number: 4180
      },
      {
        name: 'Требующие внимания',
        cartStart: 21,
        cartEnd: 50,
        timeStart: 0,
        timeEnd: 2,
        number: 4180
      }
    ]

    const settingsActive = ref(false);

    function settingToggle() {
      settingsActive.value = !settingsActive.value;
    }

    function toggleMainModal(index) {
      emit('toggleMainModal', { index: index, state: true });
    }

    return { segmentsList, settingToggle, settingsActive, toggleMainModal }
  }
}
</script>

<style scoped>

.segments-wrapper--mobile {
  position: relative;
  padding: 0!important;
}

.segments__header {
  max-width: 537px;
  padding: 40px 30px;
  margin: 0 auto;
}

.segments__title {
  font-size: 20px;
  line-height: 26px;
  text-align: left;
}

.header__list {
  margin-top: 20px;
  margin-bottom: 25px;
}

.header__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header__param {
  font-size: 14px;
}

.header__stat {
  font-size: 16px;
  font-weight: 500;
}

.segments__subtitle {
  font-size: 14px;
  line-height: 24px;
}

.settings__main {
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 40px;
  padding: 0 25px;
  margin-top: 25px;

  border-radius: 12px;
  box-sizing: border-box;
  cursor: pointer;

  font-size: 14px;

  background-color: #F7F9FC;
}

.segments__settings {
  position: absolute;
  top: 290px;
  left: 0;

  width: 100%;

  background-color: #fff;
}

.settings__wrapper {
  max-width: 537px;
  padding: 0 30px;
  padding-bottom: 20px;
  margin: 0 auto;
}

.settings__text {
  font-size: 20px;
  line-height: 26px;
}

.settings__modal {
  padding: 30px 45px;
  margin-top: 20px;

  box-shadow: 0px 17px 40px rgba(19, 49, 97, 0.07), 0px 6.20528px 21.901px rgba(19, 49, 97, 0.0482987), 0px 3.01255px 10.6325px rgba(19, 49, 97, 0.0389404), 0px 1.47681px 5.21226px rgba(19, 49, 97, 0.0310596), 0px 0.583932px 2.06094px rgba(19, 49, 97, 0.0217013);
  border-radius: 30px;

  background: #FFFFFF;
}

.settings__title {
  margin-bottom: 30px;

  font-size: 16px;
  font-weight: 500;
  text-align: center;
}

.settings__item {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 15px;
}

.settings__name {
  max-width: 83px;

  font-size: 14px;
}

.settings__input-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 153px;
}

.settings__input {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 60px;
  height: 40px;


  border-radius: 12px;

  font-size: 16px;

  background-color: #F7F9FC;
}

.settings__submit {
  width: 100%;
  height: 48px;
  margin-top: 40px;

  border-radius: 12px;

  font-size: 16px;

  background: #FFC549;
}

.segments__list {
  margin-top: 25px;
  padding: 0 30px;
}

.segments__item {
  width: 100%;
  padding: 30px;
  margin-bottom: 10px;

  box-sizing: border-box;
  cursor: pointer;

  background-color: #9AF5D5;
}

.item__header {
  display: flex;
  justify-content: space-between;

  margin-bottom: 30px;
}

.segments__avatar {
  display: flex;
  align-items: center;
}

.index {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 28px;
  height: 28px;

  border-radius: 10px;
  border: 2px solid #000;

  font-size: 13px;
  font-weight: 500;
}

.segments__smile {
  width: 26px;
  height: 26px;
  margin-left: 10px;
}

.segments__name {
  font-size: 15px;
  font-weight: 500;
  text-align: right;
}

.segments__number {
  font-size: 15px;
}

.item__stat {
  display: flex;
  justify-content: space-between;

  font-size: 14px;
}

.segments__item0 {
  background-color: #9AF5D5;
}

.segments__item1 {
  background-color: #9CF6E2;
}

.segments__item2 {
  background-color: #A2F7EC;
}

.segments__item3 {
  background-color: #9CF6E2;
}

.segments__item4 {
  background-color: #B4F7FC;
}

.segments__item5 {
  background-color: #C0F7FF;
}

.segments__item6 {
  background-color: #CDF7FF;
}

.segments__item7 {
  background-color: #E4F7FF;
}

@media (max-width: 1024px) {
  .segments__list {
    padding: 0;
  }
}

@media (max-width: 550px) {
  .segments__header {
    padding: 40px 15px;
  }

  .segments__settings {
    top: 315px;
  }

  .settings__wrapper {
    padding: 0 15px;
    padding-bottom: 20px;
  }
}

</style>