<template>
  <div
      :class="[
        'segment',
        'segment' + index,
        {'segment--settings': settingsState},
        {'item--nonactive': settingsState && index !== activeSegment},
        {'segment-small': height <= 30}
      ]"
      :style="segmentPosition"
  >
    <div class="segment__wrapper" :class="['segment__wrapper' + index]">
      <div class="segment__paddings" v-if="!settingsState">
        <div class="segment__header" :class="{'small-segment__header': height < 30}">
          <p class="segment__number">0{{ index }}</p>
          <img class="segment__icon" :src="require('../../assets/img/smile' + 1 + '.png')" alt="">

          <p class="segment__stat segment-small__stat" v-if="height <= 30">
            <span class="bold">12</span>
            &mdash;
            <span class="light">12</span>
          </p>
        </div>

        <div class="segment__content" v-if="height >= 30">
          <p class="segment__name">Чемпионы</p>
          <p class="segment__stat">
            <span class="bold">123</span>
            &mdash;
            <span class="light">10</span>
          </p>
          <p class="segment__stat">
            <span class="light-1">Средний чек</span>
            &mdash;
            <span class="bold">123 ₽</span>
          </p>
        </div>

        <div class="segment-small__content" v-if="height <= 30">
          <p class="segment__name no-wrap">
            <span>Чемпионы</span>
          </p>
          <p class="segment__name bold">123 ₽</p>
        </div>

        
      </div>


      <segment-settings
          :index="index"
          :segmentData="data"
          :maxY="maxY"
          :maxX="maxX"
          @editValue="editData"
          @moveValue="moveValue"
          v-else-if="activeSegment === index"
      />


    </div>

  </div>
</template>

<script>
import segmentSettings from "@/components/graph-components/segmentSettings";
import {ref, computed, watch} from "vue";

export default {
  name: "newGraphItem",
  components: {
    segmentSettings
  },
  props: {
    index: {
      type: Number
    },
    data: {
      type: Object,
      required: true
    },
    activeSegment: {
      type: Number,
      default: 0
    },
    settingsState: {
      type: Boolean,
      default: false
    },
    maxY: {
      type: Number
    },
    maxX: {
      type: Number
    },
    currentZindex: {
      type: Number,
      default: 1
    }
  },
  setup(props, {emit}) {
    // #1 Загрузка контента сегментов из другого файл

    // #1 --------------------------------------------

    // #2 Расчет ширины одного деления диапазона в процентах

    const yDivision = computed(() => {
      return 100 / props.maxY * 1.01;
    })

    const xDivision = computed(() => {
      return 100 / props.maxX;
    })

    // #2 --------------------------------------------------

    // #3 Рассчет параметров сешментов для отображения

    const width = computed(() => {
      return (props.data.maxRecency - props.data.minRecency + 1) * xDivision.value
    })
    // 'calc(' + width.value + '% - 8px)'

    const height = computed(() => {
      return (props.data.maxFrequency - props.data.minFrequency + 1) * yDivision.value;
    })

    // 'calc(' + width.value + '% - 8px)'

    const bottom = computed(() => {
      return 'calc(' + ((props.data.minFrequency - 1) * yDivision.value) + '% - 7px)';
    })

    const left = computed(() => {
      return 'calc(' + ((props.data.minRecency) * xDivision.value) + '% - 8px)'
    })

    // #3 --------------------------------------------

    // #4 Собрать все параметры сегментов для вывода в стайл

    const segmentPosition = computed(() => {
      return 'width: ' + 'calc(' + width.value + '% - 8px)' + '; height: ' + 'calc(' + height.value + '% - 8px)' + '; left: ' + left.value + '; bottom: ' + bottom.value + '; z-index:' + updateZindex.value;
    })

    // #4 --------------------------------------------------

    // #5 Отправка данных о редактировании сегмента в родительский компонент

    function editData(data) {
      emit('editData', { index: props.index, data: data });
    }

    function moveValue(data) {
      emit('moveValue', { index: props.index, data: data })
    }

    const updateZindex = ref(1);

    watch(() => props.activeSegment, () => {
      if(props.activeSegment === props.index) {
        updateZindex.value = props.currentZindex;
      }
    })

    // #5 ------------------------------------------------------------------

    return { segmentPosition, editData, moveValue, width, height }
  }
}
</script>

<style scoped>
.segment-small__content {
  display: flex;
  column-gap: 31px;
}
.segment-small__content .segment__name.no-wrap{
  position: relative;
  max-width: 30%;
}
.segment-small__content .segment__name.no-wrap span{
  width: 100%;
  overflow: hidden;
  display: inline-block;
}
.segment-small__content .segment__name.sm-length:after {
  content: '..';
  position: relative;
  right: 2px;
  bottom: 6px;
}

.segment-small__stat {
  margin-left: 10px;
}

.segment {
  position: absolute;

  width: 300px;
  height: 200px;

  border: 8px solid #fff;
  box-sizing: content-box;
}

.segment__wrapper {
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
}

.segment1 {
  border-radius: 0 0 0 22px;
  background-color: #9CF6E2;
}

.segment2 {
  background-color: #9CF6E2;
}

.segment3 {
  border-radius: 22px 0 0 0;
  background-color: #9AF5D5;
}

.segment4 {
  background-color: #CDF7FF;
}

.segment5 {
  background-color: #A2F7EC;
}

.segment6 {
  background-color: #E4F7FF;
}

.segment7 {
  border-radius: 0 0 22px 0;
  background-color: #EEF8FF;
}

.segment8 {
  background-color: #C0F7FF;
}

.segment9 {
  border-radius: 0 22px 0 0;
  background-color: #B4F7FC;
}

.segment--settings {
  background-color: #F7F9FC;
}

.item--nonactive {
  background-color: #EAF2FF;
}


.segment__paddings {
  width: 100%;
  height: 100%;
  padding: 25px;
}

.segment__header {
  display: flex;
  align-items: center;

  margin-bottom: 25px;
}

.segment__header.small-segment__header {
  margin-bottom: 15px;
}

.no-wrap {
  white-space: nowrap
}

.segment__number {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 28px;
  height: 28px;
  margin-right: 10px;

  border: 2px solid #1E2022;
  border-radius: 10px;

  font-size: 12px;
  font-weight: 500;
  line-height: 6px;
}

.segment__icon {
  width: 26px;
  height: 26px;
}

.segment__name {
  margin-bottom: 5px;

  font-size: 16px;
  line-height: 24px;
}

.segment__content {
  font-size: 20px;
  line-height: 26px;
}

.bold {
  font-weight: 600;
  font-size: 20px;
}

.light {
  font-weight: 300;
  font-size: 20px;
}
.light-1 {
  font-weight: 300;
  font-size: 16px;
}

@media (max-width: 1920px) {
  .segment__content {
    font-size: 16px;
  }

  .bold {
    font-size: 16px;
  }

  .light {
    font-size: 16px;
  }
}

@media (max-width: 1600px) {

  .segment__header {
    margin-bottom: 15px;
  }

  .segment__name {
    font-size: 14px;
  }

  .segment__content {
    font-size: 15px;
  }

  .bold {
    font-size: 15px;
  }

  .light {
    font-size: 15px;
  }
}

@media (max-width: 1440px) {

  .segment__paddings {
    padding: 20px;
  }

  .segment__header {
    margin-bottom: 10px;
  }

  .segment__name {
    font-size: 12px;
  }

  .segment__content {
    font-size: 14px;
  }

  .bold {
    font-size: 14px;
  }

  .light {
    font-size: 14px;
  }
}
</style>