<template>

  <div>

    <segment-header :aSideNumber="aSideNumber" v-show="windowWidth <= 768" />

    <a-side-component
        :windowWidth="windowWidth"
        :segmentPopup="segmentPopup"
        @updateASide="updateASide"
        v-show="windowWidth <= 550"
    />

    <div class="modal__toggle-wrapper modal__toggle-wrapper1" v-show="windowWidth <= 1440">
      <button
          :class="['modal__toggle', {'modal__toggle--active': modalType === 0}]"
          @click="toggleModal(0)"
      >
        Общее о сегменте
      </button>

      <button
          :class="['modal__toggle', {'modal__toggle--active': modalType === 1}]"
          @click="toggleModal(1)"
      >
        Типы увидомлений
      </button>
    </div>
  </div>

</template>

<script>
import ASideComponent from "@/components/popup-components/aSideComponent";
import segmentHeader from "@/components/popup-components/segment-header";

export default {
  name: "popupHeaderMobile",
  components: {
    ASideComponent,
    segmentHeader
  },
  props: {
    windowWidth: {
      type: Number
    },
    segmentPopup: {
      type: Number,
      default: 2
    },
    modalType: {
      type: Number,
      default: 0
    },
    aSideNumber: {
      type: Number
    }
  },
  setup(props, {emit}) {

    function toggleModal(index) {
      emit('changeModalType', index);
    }

    function updateASide(index) {
      emit('updateASide', index);
    }

    return { toggleModal, updateASide }
  }
}
</script>

<style scoped>
  .modal__toggle-wrapper {
    display: none;
  }

  @media (max-width: 1440px) {
    .modal__toggle-wrapper {
      position: absolute;
      top: 165px;
      left: 50%;
      z-index: 10;

      display: flex;
      justify-content: space-between;

      width: 328px;
      height: 44px;
      padding: 5px;

      box-shadow: inset 0px 0.5px 1px rgba(0, 0, 0, 0.09);
      border-radius: 12px;
      box-sizing: border-box;
      transform: translateX(-50%);

      background: #F0F3F8;
    }

    .modal__toggle-wrapper1 {
      top: 35px;
    }

    .modal__toggle {
      width: 158px;
      height: 36px;

      border-radius: 9px;

      font-size: 14px;
    }

    .modal__toggle--active {
      box-shadow: 0px 1px 2px rgba(21, 21, 21, 0.2);
      background: #FFFFFF;
    }
  }

  @media (max-width: 768px) {
    .modal__toggle-wrapper {
      top: 150px;
    }
  }


</style>