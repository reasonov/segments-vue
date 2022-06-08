<template>
  <div class="popup-segment__header">
    <span class="item-number segment__number">
      <span v-show="aSideNumber <= 10">0</span>
      {{ aSideNumber - 1 }}
    </span>
    <h2 class="header__title">{{ nameList[aSideNumber - 2] }}</h2>

    <close-button class="modal-close" :closeType="2" @click="closeModal" />
  </div>
</template>

<script>
import closeButton from "@/components/close-button";

export default {
  name: "segment-header",
  components: {
    closeButton
  },
  props: {
    aSideNumber: {
      type: Number,
      required: true
    }
  },
  setup(props, {emit}) {
    const nameList = [
        'Новички',
        'Растущие',
        'Чемпионы',
        'Сомневающиеся',
        'Лояльные',
        'Требуют внимания',
        'Спящие',
        'Средние на грани',
        'В зоне риска',
        'Отток'
    ]

    function closeModal() {
      emit('toggleMainModal', false)
    }

    return { nameList, closeModal }

  }
}
</script>

<style scoped>

.modal-close {
  display: none;
}

.popup-segment__header {
  position: relative;

  display: flex;
  align-items: center;

  height: 60px;
}

.popup-segment__header::after {
  content: '';
  position: absolute;
  left: 0px;
  bottom: 0px;

  width: 100%;
  height: 1px;
  border-radius: 12px;

  background-color: #EFF0F0;
}

.item-number {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 35px;
  height: 35px;

  border: 2.4px solid #1E2022;
  border-radius: 12px;

  font-size: 16px;
  line-height: 17px;
  font-weight: 500;
  color: #1E2022;
}

.segment__number {
  margin-right: 20px;
}

.header__title {
  font-size: 26px;
  font-weight: 600;
}

@media (max-width: 768px) {
  padding: 0 20px;
}

@media (max-width: 550px) {
  .popup-segment__header {
    height: 60px;
  }

  .header__title {
    font-size: 16px;
  }

  .segment__number {
    width: 24px;
    height: 24px;

    border-radius: 8px;

    font-size: 12px;
    font-weight: 500;
  }

  .modal-close {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 20;
    
    display: block;

    width: 60px;
    height: 60px;

    background-color: #000;
  }
}
</style>