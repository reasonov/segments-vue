<template>
  <div>
    <div class="segment-modal">
      <h3 class="modal__title">Настройка диапазона</h3>

      <div class="modal__item">
        <p class="modal__name">Количество покупок</p>

        <div class="data__block">
          <input
              class="modal__data modal__data1"
              type="text"
              placeholder="1"
              disabled
          >
          &mdash;
          <input
              class="modal__data modal__data2"
              v-model="modalData.endY"
              type="text"
              placeholder="5"
          >
        </div>

      </div>

      <div class="modal__item modal__item1">
        <p class="modal__name">Давность, дней</p>

        <div class="data__block">
          <input
              class="modal__data modal__data1"
              type="text"
              placeholder="0"
              disabled
          >
          &mdash;
          <input
              class="modal__data modal__data2"
              v-model="modalData.endX"
              type="text"
              placeholder="160"
          >
        </div>

      </div>

      <div class="minus">
        <p class="minus__title">Все, кто вышел за рамки активных сегментов</p>

        <div class="minus__info">
          <p class="minus__name">Отток</p>
          <div class="minus__stat">
            <p class="minus__input minus__input1">{{ numberOfX.endX + 1 }}</p>
            &mdash;
            <p class="minus__input minus__input2">
              <img class="infinity-icon" src="../../assets/infinity.png" alt="">
            </p>
          </div>
        </div>
      </div>

      <div class="modal__buttons">
        <button-grey :width="112" :height="48" @click="closeModal">Закрыть</button-grey>
        <button-orange :width="219" :height="48" @click="saveModalData">Сохранить изменения</button-orange>
      </div>

    </div>

    <div class="modal__background" @click="closeModal"></div>
  </div>
</template>

<script>
import buttonGrey from "@/components/UI/ButtonGrey";
import buttonOrange from "@/components/UI/ButtonOrange";
import { reactive } from "vue";

export default {
  name: "segment-modal",
  components: {
    buttonGrey,
    buttonOrange
  },
  props: {
    numberOfX: {
      type: Number,
      required: true
    },
    numberOfY: {
      type: Number,
      required: true
    }
  },
  setup(props, { emit }) {

    const modalData = reactive({
      endX: props.numberOfX,
      endY: props.numberOfY
    })

    function saveModalData() {
      modalData.endX = Number(modalData.endX)
      modalData.endY = Number(modalData.endY)
      emit('takeModalData', modalData)

      closeModal();
    }

    function closeModal() {
      emit('closeModal');
    }

    return { modalData, closeModal, saveModalData }
  }
}
</script>

<style scoped>
  .segment-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 10;

    width: 547px;
    padding: 60px;

    transform: translateX(-50%) translateY(-50%);
    box-shadow: 0px 24px 120px -30px rgba(0, 0, 0, 0.15);
    border-radius: 30px;
    box-sizing: border-box;

    background-color: #fff;
  }

  .modal__title {
    margin-bottom: 38px;

    font-size: 26px;
    font-weight: 600;
    color: #1E2022;
  }

  .modal__item {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 20px;
  }

  .modal__item1 {
    padding-bottom: 35px;
    border-bottom: 1px solid #000;
  }

  .modal__name {
    font-size: 16px;
    font-weight: 500;
    color: #1E2022;
  }

  .data__block {
    display: flex;
    align-items: center;
  }

  .modal__data {
    display: block;
    width: 30px;
    height: 24px;
    padding: 8px 15px;

    border-radius: 12px;
    box-sizing: content-box;

    font-size: 16px;
    text-align: center;

    background-color: #F7F9FC;
  }

  .modal__data::placeholder {
    color: #000;
  }

  .modal__data1 {
    margin-right: 10px;
  }

  .modal__data2 {
    margin-left: 10px;
  }

  .modal__buttons {
    display: flex;
    justify-content: space-between;

    width: 350px;
    margin-top: 40px;
    margin-left: auto;
  }

  .modal__close {
    width: 112px;
    height: 48px;

    border-radius: 12px;

    font-size: 16px;
    color: #1E2022;

    background: #F7F9FC;
  }

  .modal__save {
    width: 219px;
    height: 48px;

    border-radius: 12px;

    font-size: 16px;
    color: #000;

    background: #FFC549;
  }

  .minus {
    margin-top: 10px;
  }

  .minus__title {
    font-size: 16px;
  }

  .minus__info {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-top: 20px;
  }

  .minus__name {
    font-size: 16px;
    font-weight: 500;
    color: #1e2022;
  }

  .minus__stat {
    display: flex;
    align-items: center;
  }

  .minus__input {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 60px;
    height: 40px;

    border-radius: 12px;

    font-size: 16px;

    background-color: #DEDEDE;
  }

  .minus__input1 {
    margin-right: 10px;
  }

  .minus__input2 {
    margin-left: 10px;
  }

  .infinity-icon {
    height: 21px;
  }

  .modal__background {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;

    width: 100%;
    height: 100%;
    cursor: pointer;

    background-color: rgba(0, 0, 0, 0.2);
  }
</style>