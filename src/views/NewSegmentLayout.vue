<template>
  <div class="segments">
    <div class="segment__header header">
      <h3 class="segment__title">
        Сегментация клиентов и построение сетки удержания
      </h3>
      <h3 class="segment__title" v-if="false">
        Сегментация клиентов и построение сетки удержания будет доступна после
        синхронизации
      </h3>

      <ul class="header__list">
        <li class="header__item header__item0">
          <div class="item__wrapper">
            <p class="header__param">Всего клиентов</p>
            <p class="header__stat">100</p>
          </div>
          <div class="item__wrapper">
            <p class="header__param">Средний чек по базе</p>
            <p class="header__stat">1600 ₽</p>
          </div>
        </li>
        <li class="header__item header__item1">
          <div class="item__wrapper">
            <p class="header__param">Клиенты ни разу не совершавшие визит</p>
            <p class="header__stat">
              10 &mdash;
              5
            </p>
          </div>
        </li>
        <!-- <li class="header__item header__item2">
          <div class="item__wrapper">
            <p class="header__param">Клиенты без номера телефона</p>
            <p class="header__stat">48 &mdash; 0,48%</p>
          </div>
        </li> -->
      </ul>

      <div class="header__bottom bottom">
        <div class="settings__main">
          <p>Режим настройки сегментов</p>
          <!--          <toggle-component-->
          <!--            :defaultState="false"-->
          <!--            :banned="true"-->
          <!--            @click="$store.commit('visibleSupportPopup')"-->
          <!--          />-->
          <toggle-component
              :type="1"
              :defaultState="false"
              @click="settingToggle"
          />
        </div>

        <div class="" v-if="false">
          <button-transparent @click="this.$store.dispatch('crmModalVisible')"
          > Синхронизировать</button-transparent>
          <!-- <toggle-component
            :type="1"
            :defaultState="false"
            @click="settingToggle"
          /> -->
        </div>

        <button
            class="settings__axis"
            v-show="settingsState"
            @click="toggleModal"
        >
          Диапазоны
        </button>
      </div>
    </div>

    <segment-modal
        v-show="modalIsActive"
        :numberOfX="maxX"
        :numberOfY="maxY"
        @closeModal="toggleModal"
        @takeModalData="takeModalData"
    />

    <div class="segments__wrapper" ref="segmentWrapper">
      <new-graph-item
          :class="[
          { 'item--active': settingsState },
          { 'current-segment': activeSegment === index },
        ]"
          :index="index"
          :data="segmentsData[index - 1]"
          :settingsState="settingsState"
          :activeSegment="activeSegment"
          :maxX="maxX"
          :maxY="maxY"
          :currentZindex="currentZindex"
          v-for="index in 9"
          :key="index"
          @click="selectSegment(index)"
          @editData="editData"
          @moveValue="moveValue"
      />

      <div class="graph__item-minus" @click="selectSegment(10)">
        <div class="item__header">
          <p class="item__number">10</p>
          <img class="item__icon" src="../assets/img/smile9.png" alt="" />
        </div>
        <p class="item__name">Отток за все время</p>
        <p class="segment__stat">
          <span class="bold">123</span>
          &mdash;
          <span class="light">123</span>
        </p>

        <p class="segment__stat">
          <span class="light-1">Средний чек</span>
          &mdash;
          <span class="bold"
          >123 ₽</span
          >
        </p>
      </div>

      <div class="axis">
        <div class="axis__wrapper">
          <ul class="axis__y">
            <li class="axis__item axis__item--y" v-for="i in maxY" :key="i">
              {{ i }}
              <span v-if="i === maxY">+</span>
            </li>
          </ul>
          <ul class="axis__x">
            <li class="axis__item" v-for="i in 18" :key="i">
              {{ Math.ceil(maxX / 17 * (i - 1)) }}
            </li>
          </ul>
          <span class="axis__x--minus">{{ maxX + 1 }} +</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import buttonTransparent from "@/components/UI/ButtonTransparent";
import toggleComponent from "@/components/popup-components/toggle-component";
import segmentModal from "@/components/graph-components/segment-modal";
import newGraphItem from "@/components/graph-components/newGraphItem";
import { ref, reactive, computed, watch } from "vue";
import { useStore } from "vuex";

export default {
  name: "NewSegmentLayout",
  components: {
    toggleComponent,
    segmentModal,
    newGraphItem,
    buttonTransparent
  },
  props: {
    rfmInfo: {
      type: Object,
    }
  },
  setup(props, { emit }) {
    const store = useStore();

    // #1 -----------------------------------

    // #2 Максимальные значения диапазонов

    const maxX = ref(160);
    const maxY = ref(5);

    function takeModalData(data) {
      maxX.value = data.endX;
      maxY.value = data.endY
    }

    // При изменении диапазонов делать перерасчет данных сегментов соответственно новому диапазону

    watch(maxX, (newVal, oldVal) => {
      const factor = newVal / oldVal;

      segmentsData.forEach((item) => {
        if(factor > 1) {
          item.maxRecency = Math.round(item.maxRecency * factor) + factor - 1;
          item.minRecency = Math.round(item.minRecency * factor);
        } else {
          item.maxRecency = Math.round((item.maxRecency - 1) * factor) - factor;
          if(item.minRecency === 0) {
            item.minRecency = Math.round(item.minRecency * factor);
          } else {
            item.minRecency = Math.round(item.minRecency * factor) - factor;
          }
        }
      })
    })

    watch(maxY, (newVal, oldVal) => {
      const factor = newVal / oldVal;

      segmentsData.forEach((item) => {
        item.maxFrequency = Math.round(item.maxFrequency * factor);
        item.minFrequency = Math.round((item.minFrequency - 1) * factor) + 1;
      })
    })

    // #2 ------------------------------------

    // #3 Класс который собирает сегменты из апи в новый массив для хранения/редактирования

    class Segment {
      constructor(minFrequency, maxFrequency, minRecency, maxRecency) {
        if (maxFrequency === "max") {
          this.maxFrequency = maxY.value;
        } else {
          this.maxFrequency = maxFrequency;
        }

        if (maxRecency === "max") {
          this.maxRecency = maxX.value;
        } else {
          this.maxRecency = maxRecency;
        }

        this.minFrequency = minFrequency;
        this.minRecency = minRecency;
      }
    }

    // #3 ---------------------------------------------------------------------------------

    // #4 Пустой массив, в котором будут храниться данные о сегментов из апи

    const segmentsData = reactive([]);

    // #4 ------------------------------------------------------------------

    // #5 Занесение данных из апи в новый массив

    props.rfmInfo.forEach((item) => {
      segmentsData.push(
          new Segment(
              item.minFrequency,
              item.maxFrequency,
              item.minRecency,
              item.maxRecency
          )
      );
    });
    console.log(segmentsData)

    // #5 ---------------------------------------

    // Дальше идет логика редактирования сегментов и тд.

    function addLimits() {
      segmentsData[0].limitMaxRecency = segmentsData[3].maxRecency - 10;
      segmentsData[0].limitMaxFrequency = segmentsData[1].maxFrequency - 1;

      segmentsData[1].limitMaxRecency = segmentsData[3].maxRecency - 10;
      segmentsData[1].limitMaxFrequency = segmentsData[2].maxFrequency - 1;
      segmentsData[1].limitMinFrequency = segmentsData[0].minFrequency + 1;

      segmentsData[2].limitMaxRecency = segmentsData[4].maxRecency - 10;
      segmentsData[2].limitMinFrequency = segmentsData[1].minFrequency + 1;

      segmentsData[3].limitMaxRecency = segmentsData[5].maxRecency - 10;
      segmentsData[3].limitMinRecency = segmentsData[0].minRecency + 10;
      segmentsData[3].limitMaxFrequency = segmentsData[4].maxFrequency - 1;

      segmentsData[4].limitMaxRecency = segmentsData[8].maxRecency - 10;
      segmentsData[4].limitMinRecency = segmentsData[0].minRecency + 10;
      segmentsData[4].limitMinFrequency = segmentsData[3].minFrequency + 1;

      segmentsData[5].limitMinRecency = segmentsData[3].minRecency + 10;
      segmentsData[5].limitMaxRecency = segmentsData[6].maxRecency - 10;
      segmentsData[5].limitMaxFrequency = segmentsData[7].maxFrequency - 1;

      segmentsData[6].limitMinRecency = segmentsData[3].minRecency + 10;
      segmentsData[6].limitMaxFrequency = segmentsData[7].maxFrequency - 1;

      segmentsData[7].limitMinRecency = segmentsData[3].minRecency + 10;
      segmentsData[7].limitMaxFrequency = segmentsData[8].maxFrequency - 1;
      segmentsData[7].limitMinFrequency = segmentsData[5].minFrequency + 1;

      segmentsData[8].limitMinRecency = segmentsData[4].minRecency + 10;
      segmentsData[8].limitMinFrequency = segmentsData[5].minFrequency + 1;
    }
    addLimits();

    const settingsState = ref(false);

    const activeSegment = ref(0);

    function settingToggle() {
      if (settingsState.value) {
        settingsState.value = false;
      } else {
        settingsState.value = true;
        if(activeSegment.value === 0) {
          activeSegment.value = 1;
        }
      }
    }

    function selectSegment(index) {
      if (settingsState.value) {
        activeSegment.value = index;
        addLimits();
      } else {
        emit("toggleMainModal", { state: true, index: index });
      }
    }

    const modalIsActive = ref(false);

    function toggleModal() {
      modalIsActive.value = !modalIsActive.value;
    }

    const segmentWrapper = ref(null);

    function editData(value) {
      segmentsData[value.index - 1][value.data.name] = Number(value.data.val);

      if(Number(value.data.val) !== 0) {
        moveNeighbor(value.index - 1, value.data.name);
      }
    }

    function moveValue(value) {

      if(value.data.name === "minFrequency" || value.data.name === "maxFrequency") {
        segmentsData[value.index - 1][value.data.name] += Number(value.data.val);
      } else if(value.data.name === 'minRecency' || value.data.name === 'maxRecency') {
        segmentsData[value.index - 1][value.data.name] += Number(value.data.val) / (segmentWrapper.value.clientWidth / maxX.value);
      }

      if(Number(value.data.val) !== 0) {
        moveNeighbor(value.index - 1, value.data.name);
      }

    }

    function moveNeighbor(index, action) {
      console.log(index, action)
      if(index === 0) {
        if(action === 'maxRecency' && segmentsData[3].maxFrequency <= segmentsData[index].maxFrequency) {
          segmentsData[3].minRecency = segmentsData[index].maxRecency;
        } else if(action === 'maxFrequency' && segmentsData[1].maxRecency <= segmentsData[index].maxRecency) {
          segmentsData[1].minFrequency += 1;
        }
      } else if(index === 1) {
        if(action === 'maxFrequency' && segmentsData[2].maxRecency <= segmentsData[index].maxRecency) {
          segmentsData[2].minFrequency += 1;
        } else if(action === 'minFrequency' && segmentsData[0].maxRecency <= segmentsData[index].maxRecency) {
          segmentsData[0].maxFrequency -= 1;
        }
      } else if(index === 2) {
        if(action === 'maxRecency' && segmentsData[4].minFrequency >= segmentsData[index].minFrequency) {
          segmentsData[4].minRecency = segmentsData[index].maxRecency;
        } else if(action === 'minFrequency' && segmentsData[1].maxRecency <= segmentsData[index].maxRecency) {
          segmentsData[1].maxFrequency -= 1;
        }
      } else if(index === 3) {
        if(action === 'minRecency') {
          if(segmentsData[index].maxFrequency >= segmentsData[0].maxFrequency) {
            segmentsData[0].maxRecency = segmentsData[index].minRecency;
          }
          if(segmentsData[index].maxFrequency >= segmentsData[1].maxFrequency) {
            segmentsData[1].maxRecency = segmentsData[index].minRecency;
          }
        } else if(action === 'maxFrequency' && segmentsData[index].minRecency <= segmentsData[4].minRecency && segmentsData[index].maxRecency >= segmentsData[4].maxRecency) {
          segmentsData[4].minFrequency += 1;
        } else if(action === 'maxRecency') {
          if(segmentsData[index].maxFrequency >= segmentsData[7].maxFrequency) {
            segmentsData[7].minRecency = segmentsData[index].maxRecency;
          }
          if(segmentsData[index].maxFrequency >= segmentsData[5].maxFrequency) {
            segmentsData[5].minRecency = segmentsData[index].maxRecency;
          }
        }
      } else if(index === 4) {
        if(action === 'minRecency') {
          if(segmentsData[index].minFrequency <= segmentsData[2].minFrequency) {
            segmentsData[2].maxRecency = segmentsData[index].minRecency;
          }
          if(segmentsData[index].minFrequency <= segmentsData[1].minFrequency) {
            segmentsData[1].maxRecency = segmentsData[index].minRecency;
          }
        } else if(action === 'maxRecency') {
          if(segmentsData[index].minFrequency <= segmentsData[8].minFrequency) {
            segmentsData[8].minRecency = segmentsData[index].maxRecency;
          }
          if(segmentsData[index].minFrequency <= segmentsData[7].minFrequency) {
            segmentsData[7].minRecency = segmentsData[index].maxRecency;            // Заменить, когда изменится порядок сегментов
          }
        } else if(action === 'minFrequency' && segmentsData[index].minRecency <= segmentsData[3].minRecency && segmentsData[index].maxRecency >= segmentsData[3].maxRecency) {
          segmentsData[3].maxFrequency -= 1;
        }
      } else if(index === 5) {
        if(action === 'maxRecency' && segmentsData[index].maxFrequency >= segmentsData[6].maxFrequency) {
          segmentsData[6].maxRecency = segmentsData[index].minRecency;
        } else if(action === 'maxFrequency' && segmentsData[6].maxFrequency >= segmentsData[index].maxFrequency && segmentsData[index].minRecency <= segmentsData[7].minRecency) {
          segmentsData[7].minFrequency += 1;
        }
      } else if(index === 6) {
        if(action === 'minRecency' && segmentsData[index].maxFrequency >= segmentsData[7].maxFrequency) {
          segmentsData[5].maxRecency = segmentsData[index].minRecency;
        } else if(action === 'maxFrequency' && segmentsData[5].minRecency <= segmentsData[7].minRecency && segmentsData[5].maxFrequency >= segmentsData[index].maxFrequency) {
          segmentsData[7].minFrequency += 1;
        }
      } else if(index === 7) {
        if(action === 'maxFrequency' && segmentsData[index].minRecency <= segmentsData[8].minFrequency) {
          segmentsData[8].minFrequency += 1;
        } else if(action === 'minFrequency') {
          segmentsData[6].maxFrequency -= 1;
          if(segmentsData[index].minRecency <= segmentsData[5].minRecency) {
            segmentsData[5].maxFrequency -= 1;
          }
        }
      } else if(index === 8) {
        if(action === 'minRecency' && segmentsData[index].minFrequency <= segmentsData[4].minFrequency) {
          segmentsData[4].maxRecency = segmentsData[index].minRecency;
        } else if(action === 'minFrequency' && segmentsData[index].minRecency <= segmentsData[5].minRecency) {
          segmentsData[5].maxFrequency -= 1;
        }
      }
    }

    watch(activeSegment, () => {
      currentZindex.value += 1;
    })

    const currentZindex = ref(1);

    return {
      settingToggle,
      modalIsActive,
      toggleModal,
      segmentsData,
      settingsState,
      activeSegment,
      selectSegment,
      editData,
      moveValue,
      maxX,
      maxY,
      takeModalData,
      currentZindex,
      segmentWrapper
    };
  },
};
</script>

<style scoped>
/* .segments._blur .segment__header {
  filter: blur(3px)
}

.segments._blur .segments__wrapper {
  filter: blur(3px)
}

.segments._blur {
  position: relative;
} */

.segments__wrapper {
  position: relative;

  max-width: 1413px;
  width: calc(100% - 190px);
  height: 608px;
}

.axis {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: -1;

  width: 100%;
  height: 100%;
}

.axis__wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.axis__x {
  position: absolute;
  bottom: -40px;
  left: -35px;

  display: flex;
  justify-content: space-between;

  width: calc(100% + 25px);
}

.axis__y {
  position: absolute;
  bottom: 45px;
  left: -35px;

  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;

  height: calc(100% - 65px);
}

.axis__item {
  font-size: 12px;
  line-height: 24px;
  color: #a1a2a2;
}

.axis__item--y {
  margin-top: 10px;
}

.axis__x--minus {
  position: absolute;
  bottom: -40px;
  right: -40px;

  font-size: 12px;
  line-height: 24px;
  color: #a1a2a2;
}

.segments {
  position: relative;

  max-width: 1720px;
  min-height: 100vh;

  padding: 50px 60px 100px 60px;
  box-sizing: border-box;
}

.segment__header {
  padding-bottom: 40px;
}

.segment__title {
  margin-bottom: 30px;

  font-size: 20px;
  font-weight: 600;
  line-height: 26px;
}

.header__list {
  display: flex;
}

.header__item {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 20px 35px;
  margin-right: 10px;
}

.header__item0 {
  width: 505px;
  border-radius: 12px;
  background-color: #eef8ff;
}

.header__item1 {
  width: 390px;
  margin-right: 0;
  border-radius: 12px;

  background-color: rgba(246, 210, 156, 0.38);
}

.header__param {
  margin-bottom: 3px;

  font-size: 16px;
  line-height: 24px;
}

.header__stat {
  font-size: 20px;
  line-height: 26px;
  font-weight: 600;
}

.header__bottom {
  position: absolute;
  top: 15px;
  right: 60px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;

  height: 185px;
}

.settings p {
  margin-right: 10px;

  font-size: 14px;
  color: #1e2022;
}

.settings__main {
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 275px;
  height: 40px;
  padding-left: 24px;
  padding-right: 15px;
  margin-left: 12px;

  border-radius: 12px;
  box-sizing: border-box;
  cursor: pointer;

  background: #f7f9fc;
}

.settings__main p {
  font-size: 14px;
}

.settings__axis {
  width: 123px;
  height: 40px;
  border-radius: 12px;

  font-size: 14px;
  color: #1e2022;

  background-color: #f7f9fc;
}

.item--active {
  cursor: pointer;
}

.graph__item-minus {
  position: absolute;
  top: 0;
  right: -188px;

  width: 180px;
  height: 100%;
  padding: 35px 20px;
  border-radius: 9px;
  box-sizing: border-box;

  background-color: #c4c4c4;
}

.item__header {
  display: flex;
  align-items: center;

  margin-bottom: 25px;
}

.item__number {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 28px;
  height: 28px;
  margin-right: 10px;

  border: 2px solid #1e2022;
  border-radius: 10px;

  font-size: 12px;
  font-weight: 500;
  line-height: 6px;
}

.item__icon {
  width: 26px;
  height: 26px;
}

.item__name {
  margin-bottom: 5px;

  font-size: 16px;
  line-height: 24px;
}

.current-segment {
  z-index: 2;
}
.bold {
  font-weight: 600;
}

.light {
  font-weight: 300;
}

@media (max-width: 1920px) {
  .segment__content {
    font-size: 18px;
  }

  .bold {
    font-size: 18px;
  }

  .light-1 {
    font-size: 18px;
  }
}

@media (max-width: 1600px) {
  .segments__wrapper {
    width: calc(100% - 144px);
  }

  .graph__item-minus {
    right: -144px;
    width: 140px;
  }

  .item__name {
    font-size: 14px;
  }

  .light-1 {
    font-size: 16px;
  }
}

@media (max-width: 1440px) {
  .item__name {
    font-size: 12px;
  }

  .bold {
    font-size: 14px;
  }

  .light-1 {
    font-size: 14px;
  }
}
</style>
