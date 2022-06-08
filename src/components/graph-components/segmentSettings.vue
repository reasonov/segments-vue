<template>
  <div :class="['segment__settings', 'segment__settings' + index]">
    <div class="settings__wrapper">

      <div class="settings__line">
        <p class="settings__name">Активность</p>

        <input
            class="settings__input"
            type="text"
            :disabled="isDisabled.minFrequency"
            @change="emitValue('minFrequency')"
            v-model="editMinFrequency"
        >
        <span class="settings__space">&mdash;</span>
        <input
            class="settings__input"
            type="text"
            :disabled="isDisabled.maxFrequency"
            @change="emitValue('maxFrequency')"
            v-model="editMaxFrequency"
        >

      </div>

      <div class="settings__line">
        <p class="settings__name">Давность</p>

        <input
            class="settings__input"
            type="text"
            :disabled="isDisabled.minRecency"
            @change="emitValue('minRecency')"
            v-model="editMinRecency"
        >
        <span class="settings__space">&mdash;</span>
        <input
            class="settings__input"
            type="text"
            :disabled="isDisabled.maxRecency"
            @change="emitValue('maxRecency')"
            v-model="editMaxRecency"
        >

      </div>

      <div class="settings__arrow settings__arrow1" @mousedown="activateArrow('maxFrequency')" v-if="index !== 3 && index !== 5 && index !== 9">
        <img class="arrow-image0" src="../../assets/arrow-btn.svg" alt="">
      </div>

      <div class="settings__arrow settings__arrow2" @mousedown="activateArrow('maxRecency')" v-if="index !== 7 && index !== 8 && index !== 9">
        <img class="arrow-image1" src="../../assets/arrow-btn.svg" alt="">
      </div>

      <div class="settings__arrow settings__arrow3" @mousedown="activateArrow('minFrequency')" v-if="index !== 1 && index !== 4 && index !== 6 && index !== 7">
        <img class="arrow-image2" src="../../assets/arrow-btn.svg" alt="">
      </div>

      <div class="settings__arrow settings__arrow4" @mousedown="activateArrow('minRecency')" v-if="index !== 1 && index !== 2 && index !== 3">
        <img class="arrow-image3" src="../../assets/arrow-btn.svg" alt="">
      </div>

    </div>

  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue';

export default {
  name: "segmentSettings",
  props: {
    segmentData: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    maxX: {
      type: Number,
      default: 160
    },
    maxY: {
      type: Number,
      default: 5
    }
  },
  setup(props, {emit}) {

    const editMinRecency = ref(0);

    const editMaxRecency = ref(0);

    const editMinFrequency = ref(0);

    const editMaxFrequency = ref(0);

    function emitValue(trigger) {
      if(trigger === 'minRecency') {

        if(editMinRecency.value > props.segmentData.minRecency) {
          editMinRecency.value = props.segmentData.minRecency;
        }

        if(editMinRecency.value <= props.segmentData.limitMinRecency) {
          editMinRecency.value = props.segmentData.limitMinRecency;
        }
        emit('editValue', { name: 'minRecency', val: editMinRecency.value });

      } else if(trigger === 'maxRecency') {

        if(editMaxRecency.value < props.segmentData.maxRecency) {
          editMaxRecency.value = props.segmentData.maxRecency;
        }
        if(editMaxRecency.value >= props.segmentData.limitMaxRecency) {
          editMaxRecency.value = props.segmentData.limitMaxRecency;
        }
        emit('editValue', { name: 'maxRecency', val: editMaxRecency.value });

      } else if(trigger === 'minFrequency') {

        if(editMinFrequency.value > props.segmentData.minFrequency) {
          editMinFrequency.value = props.segmentData.minFrequency;
        }
        if(editMinFrequency.value <= props.segmentData.limitMinFrequency) {
          editMinFrequency.value = props.segmentData.limitMinFrequency;
        }
        emit('editValue', { name: 'minFrequency', val: editMinFrequency.value });

      } else if(trigger === 'maxFrequency') {

        if(editMaxFrequency.value < props.segmentData.maxFrequency) {
          editMaxFrequency.value = props.segmentData.maxFrequency;
        }
        if(editMaxFrequency.value >= props.segmentData.limitMaxFrequency) {
          editMaxFrequency.value = props.segmentData.limitMaxFrequency;
        }
        emit('editValue', { name: 'maxFrequency', val: editMaxFrequency.value });

      }
    }

    const isDisabled = computed(() => {
      const disabled = {
        minFrequency: false,
        maxFrequency: false,
        minRecency: false,
        maxRecency: false
      }
      if(props.segmentData.minFrequency === 1) {
        disabled.minFrequency = true;
      }
      if(props.segmentData.minRecency === 0) {
        disabled.minRecency = true;
      }
      if(props.segmentData.maxFrequency === props.maxY) {
        disabled.maxFrequency = true;
      }
      if(props.segmentData.maxRecency === props.maxX) {
        disabled.maxRecency = true;
      }
      return disabled
    })

    const currentSide = ref('');

    function activateArrow(side) {
      window.addEventListener('mousemove', arrowMove)
      currentSide.value = side;
    }

    let moveArray = [];
    let moveVal = 0;

    function arrowMove() {
      event.preventDefault();
      window.addEventListener('mouseup', deactivateArrow);

      if(currentSide.value === 'minFrequency' || currentSide.value === 'maxFrequency') {
        moveArray.push(-event.y);
      } else {
        moveArray.push(event.x);
      }

      let val = 0;

      if(moveArray.length >= 2) {
        val = moveArray[moveArray.length - 1] - moveArray[moveArray.length - 2];
        moveVal += val;
      }

      if(currentSide.value === 'minRecency' && val < 0) {

        if(props.segmentData.minRecency <= props.segmentData.limitMinRecency) {
          emit('moveValue', { name: currentSide.value, val: 0})
        } else {
          emit('moveValue', { name: currentSide.value, val: val})
        }

      } else if(currentSide.value === 'maxRecency' && val > 0) {

        if(props.segmentData.maxRecency >= props.segmentData.limitMaxRecency) {
          emit('moveValue', { name: currentSide.value, val: 0});
        } else {
          emit('moveValue', { name: currentSide.value, val: val});
        }

      } else if(currentSide.value === 'minFrequency' && moveVal < -125) {

        if(props.segmentData.minFrequency <= props.segmentData.limitMinFrequency) {
          emit('moveValue', { name: currentSide.value, val: 0})
        } else {
          emit('moveValue', { name: currentSide.value, val: -1})
        }
        moveVal = 0;

      } else if(currentSide.value === 'maxFrequency' && moveVal > 125) {

        if(props.segmentData.maxFrequency >= props.segmentData.limitMaxFrequency) {
          emit('moveValue', { name: currentSide.value, val: 0})
        } else {
          emit('moveValue', { name: currentSide.value, val: 1})
        }
        moveVal = 0

      }

      takeNewData();

    }

    function deactivateArrow() {
      window.removeEventListener('mousemove', arrowMove)
      window.removeEventListener('mouseup', deactivateArrow)

      moveArray = [];
    }

    function takeNewData() {
      editMinRecency.value = Math.round(props.segmentData.minRecency);
      editMaxRecency.value = Math.round(props.segmentData.maxRecency);
      editMinFrequency.value = Math.round(props.segmentData.minFrequency);
      editMaxFrequency.value = Math.round(props.segmentData.maxFrequency);
    }

    watch(props.segmentData, () => {
      takeNewData();
    }, { deep: true })

    onMounted(() => {
      takeNewData();
    })

    return {
      editMinRecency,
      editMaxRecency,
      editMinFrequency,
      editMaxFrequency,
      emitValue,
      activateArrow,
      isDisabled
    }

  }
}
</script>

<style scoped>
.segment__settings {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  border: 2px solid #FED47A;
}

.segment__settings1 {
  border-radius: 0 0 0 12px;
}

.segment__settings3 {
  border-radius: 12px 0 0 0;
}

.segment__settings7 {
  border-radius: 0 0 12px 0;
}

.segment__settings9 {
  border-radius: 0 12px 0 0;
}

.settings__line {
  display: flex;
  align-items: center;
}

.settings__line:not(:last-child) {
  margin-bottom: 10px;
}

.settings__name {
  min-width: 80px;
  margin-right: 10px;

  font-size: 14px;
}

.settings__input {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 55px;
  height: 34px;

  border-radius: 12px;

  font-size: 14px;
  text-align: center;

  background-color: #fff;
}

.settings__space {
  margin: 0 10px;
}

.settings__arrow {
  position: absolute;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 24px;
  height: 24px;

  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06), 0px 1px 1px rgba(0, 0, 0, 0.08);
  border-radius: 0 12px 12px 0;

  background-color: #fff;
}

.settings__arrow1 {
  top: 0;
  left: 50%;

  transform: translateX(-50%) rotateZ(90deg);
}

.settings__arrow2 {
  top: 50%;
  right: 0;

  transform: translateY(-50%) rotateZ(180deg);
}

.settings__arrow3 {
  bottom: 0;
  left: 50%;

  transform: translateX(-50%) rotateZ(270deg);
}

.settings__arrow4 {
  top: 50%;
  left: 0;

  transform: translateY(-50%);
}
</style>