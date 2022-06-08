<template>
  <div class="submit-block">
    <div class="submit__top">
      <div class="submit__left">
        <h3 class="submit__title title">Рассылка уведомлений</h3>
        <p class="submit__number">
          Всего клиентов:
          <img class="sms--small" src="../../assets/sms-tracking_black.svg" alt="">
          <span class="text--bold">4&nbsp;180</span>
        </p>
      </div>

      <button
          class="submit__export submit-button"
          @click="takeModalState({modal: 'submitSettings', state: true})"
          :disabled="!isLicense"
      >
        Отправить
      </button>
    </div>

    <button class="buy-license" v-if="!isLicense">Приобретите лицензию</button>

  </div>
</template>

<script>

export default {
  name: "segmentsSubmitBlock",
  props: {
    isLicense: {
      type: Boolean
    }
  },
  setup(props, {emit}) {
    function takeModalState(data) {
      emit('takeModalState', data)
    }

    return { takeModalState }
  }
}
</script>

<style scoped>
.submit-block {
  width: 100%;
  padding: 40px;
  padding-bottom: 50px;
  margin: 0 auto;

  box-sizing: border-box;
  border-radius: 30px 30px 0 0;
  box-shadow: 0px 17px 40px rgba(19, 49, 97, 0.07), 0px 6.20528px 21.901px rgba(19, 49, 97, 0.0482987), 0px 3.01255px 10.6325px rgba(19, 49, 97, 0.0389404), 0px 1.47681px 5.21226px rgba(19, 49, 97, 0.0310596), 0px 0.583932px 2.06094px rgba(19, 49, 97, 0.0217013);

  background-color: #FFFFFF;
}

.submit__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.buy-license {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 40px;
  margin-top: 50px;

  border: 1.7px solid #FFC549;
  box-sizing: border-box;
  border-radius: 12px;

  font-size: 14px;
}

.buy-license:hover {
  border: none;
  background-color: #FED47A;
}

.buy-license:active {
  border: none;
  color: #A1A2A2;
  background-color: #F0F3F8;
}

.submit__number {
  display: flex;
  align-items: center;
  margin-top: 10px;

  font-size: 16px;
  color: #1E2022;
}

.sms--small {
  margin-left: 40px;
  margin-right: 5px;
}

.submit-button {
  width: 189px;
  height: 48px;
  border-radius: 12px;
  transition: .3s all ease;

  font-size: 16px;
}

.submit__export {
  background-color: #FFC549;
}

.submit__export:disabled {
  background-color: #F7F9FC!important;
}

.submit__export:hover {
  color: #1E2022;
  background-color: #FED47A;
}

.submit__export:active {
  border: none;
  color: #6D6D6D;
  background-color: #F7F9FC;
}

.submit-button {
  width: 150px;
  height: 40px;

  font-size: 14px;
}

.title {
  font-size: 20px;
  font-weight: 600;
  text-align: left;
  color: #1E2022;
}

@media(max-width: 1585px) {
  .submit__left {
    width: 235px;
  }
}

@media (max-width: 768px) {
  .submit-block {
    width: 100%!important;
    padding: 30px 30px 110px 30px;
    margin: 0!important;
  }

  .submit__top {
    flex-direction: column;
  }

  .submit__left {
    width: auto;
    margin-bottom: 30px;
  }

  .submit__export {
    width: 100%;
    font-size: 16px;
  }
}

</style>