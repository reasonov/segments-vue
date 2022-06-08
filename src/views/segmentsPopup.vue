<template>
  <transition name="bgAm">
    <div class="popup__background" v-if="mainModalState" @click="toggleMainModal(false)"></div>
  </transition>

  <transition name="popupAm">
    <div class="popup" v-if="mainModalState">

      <div class="main-wrapper">
        <a-side-component
          :windowWidth="windowWidth"
          :segmentPopup="segmentPopup"
          @toggleMainModal="toggleMainModal"
          @updateASide="updateASide"
          v-if="windowWidth > 550"
        />

        <section
          class="popup-segment"
          v-if="modalType === 0 || windowWidth > 1440"
        >
          <segment-header :aSideNumber="aSideNumber" v-if="windowWidth > 768" />

          <popup-header-mobile
            :windowWidth="windowWidth"
            :segmentPopup="segmentPopup"
            :modalType="modalType"
            :aSideNumber="aSideNumber"
            @changeModalType="toggleModal"
            @updateASide="updateASide"
          />

          <div class="stat">
            <h3 class="segment__title title">Статистика по сегменту</h3>

            <ul class="stat__list">
              <li class="stat__item">
                <p class="stat__text">Клиентов</p>
                <p class="stat__text text--bold">
                  {{ currentSegment.total_clients }}
                </p>
              </li>
              <li class="stat__item">
                <p class="stat__text">От общего числа</p>
                <p class="stat__text text--bold">
                  {{ currentSegment.total_clients_percent }}
                </p>
              </li>
            </ul>

            <div class="graph" v-if="false">
              <div class="popup-graph__item popup-graph__item0">
                <div class="graph__header">
                  <h4 class="graph__title">Переходов за период</h4>
                  <trend-up-icon />
                </div>
                <ul class="graph__list">
                  <li class="graph__section">
                    <p class="graph__text">Новички</p>
                    <p class="graph__text graph__text--bold">+ 6</p>
                  </li>
                </ul>
              </div>
              <div class="popup-graph__item popup-graph__item1">
                <div class="graph__header">
                  <h4 class="graph__title">Переходов за период</h4>
                  <trend-up-icon />
                </div>
                <ul class="graph__list">
                  <li class="graph__section">
                    <p class="graph__text">Средние, на грани</p>
                    <p class="graph__text graph__text--bold">+ 6</p>
                  </li>
                </ul>
              </div>
              <div class="popup-graph__item popup-graph__item2">
                <div class="graph__header">
                  <h4 class="graph__title">Ближайшие потери</h4>
                  <trend-down-icon />
                </div>

                <ul class="graph__list">
                  <li class="graph__section">
                    <p class="graph__text">В зоне риска</p>
                    <div class="graph-item__bold">
                      <p class="graph__time">5 дн</p>
                      <p class="graph__text text--bold">&nbsp;- 5</p>
                    </div>
                  </li>

                  <li class="graph__section">
                    <p class="graph__text">Новички</p>
                    <div class="graph-item__bold">
                      <p class="graph__time">16 ч</p>
                      <p class="graph__text text--bold">&nbsp;- 4</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="params">
            <h3 class="params__title title">Параметры сегмента</h3>

            <ul class="params__list">
              <li class="params__item">
                <p class="params__text">Давность, дней</p>
                <p class="params__text params__text--bold" v-if="currentSegment.max_recency">
                  {{ currentSegment.min_recency }} -
                  {{ currentSegment.max_recency }}
                </p>
                <p class="params__text params__text--bold" v-else>
                  {{ currentSegment.min_recency }}+
                </p>
              </li>
              <li class="params__item">
                <p class="params__text">Количество покупок</p>
                <p class="params__text params__text--bold">
                  <span
                    v-if="
                      currentSegment.min_frequency ===
                      currentSegment.max_frequency
                    "
                    >{{ currentSegment.max_frequency }}</span
                  >
                  <span v-else-if="currentSegment.max_frequency"
                    >{{ currentSegment.min_frequency }} -
                    {{ currentSegment.max_frequency }}</span
                  >
                  <span v-else>{{ currentSegment.min_frequency }}+</span>
                </p>
              </li>
              <li class="params__item">
                <p class="params__text">Средний чек</p>
                <p
                  class="params__text params__text--bold"
                  v-if="currentSegment.average_check"
                >
                  {{ currentSegment.average_check.toLocaleString() }} ₽
                </p>
              </li>
            </ul>
          </div>

          <div class="guidance " :class="{ _loader: loadingRfmRecommendation }">
            <h3 class="guidance__title title">Рекомендации по сегменту</h3>

            <div v-html="currentSegment.recommendation.content" v-if="currentSegment.recommendation">
              
            </div>
          </div>

          <segments-submit-block
            :isLicense="isLicense"
            @takeModalState="takeModalState"
            v-show="windowWidth <= 550"
          />
        </section>

        <section class="notif" v-show="modalType === 1 || windowWidth > 1440">
          <div class="notif__header">
            <h3 class="notif__title title">Клиенты сегмента</h3>

            <router-link
                :to="{name: 'notificationTypes'}"
              class="notif__add"
            >
              Типы уведомлений сегмента
            </router-link>

          </div>

          <popup-header-mobile
            :windowWidth="windowWidth"
            :segmentPopup="segmentPopup"
            :modalType="modalType"
            :aSideNumber="aSideNumber"
            @changeModalType="toggleModal"
            @updateASide="updateASide"
          />

          <ul class="clients-header">
            <li class="clients-header__item">
              <button class="clients-checkbox" @click="toggleClient">
                <span class="clients-checkbox--active" v-if="isAllActive"></span>
              </button>
            </li>
            <li class="clients-header__item">Номер</li>
            <li class="status">
              <button class="clients-header__item" @click="addFilter('status')">Статус</button>
            </li>
            <li class="item--mobile">
              <button class="clients-header__item clients-header__visit" @click="addFilter('visits')">Визиты</button>
            </li>
            <li class="item--mobile">
              <button class="clients-header__item" @click="addFilter('late')">Давность</button>
            </li>
            <li class="chanel">
              <button class="clients-header__item" @click="addFilter('chanel')">Канал</button>
            </li>
          </ul>

          <div class="clients__wrapper">
            <ul class="clients__list">
              <li class="clients__item" v-for="(item, index) in pageOfClients" :key="index">
                <button class="clients-checkbox" @click="item.state = !item.state">
                  <span class="clients-checkbox--active" v-show="item.state"></span>
                </button>
                <p class="clients__text item--mobile">{{ item.number }}</p>
                <p class="clients__text status">{{ item.status }}</p>
                <p class="clients__text clients__visit item--mobile">{{ item.visits }}</p>
                <p class="clients__text item--mobile">{{ item.late }}</p>
                <p class="clients__text chanel">{{ item.chanel }}</p>
              </li>
            </ul>

            <clients-pagination :numberOfClients="clientsList.length" :max="25" @changePage="changePage($event)" />

          </div>

          <segments-submit-block
              class="submit-block"
              :isLicense="isLicense"
              @takeModalState="takeModalState"
          />

        </section>
      </div>
    </div>
  </transition>
</template>

<script>
import { ref, reactive, watchEffect, computed, watch } from "vue";
import { useStore } from "vuex";
import segmentHeader from "../components/popup-components/segment-header";
import trendUpIcon from "../components/popup-components/icon/trend-up-icon";
import trendDownIcon from "../components/popup-components/icon/trend-down-icon";
import segmentsSubmitBlock from "@/components/popup-components/segmentsSubmitBlock";
import popupHeaderMobile from "@/components/popup-components/popupHeaderMobile";
import ASideComponent from "@/components/popup-components/aSideComponent";
import ClientsPagination from "@/components/popup-components/ClientsPagination";

export default {
  name: "App",
  components: {
    segmentHeader: segmentHeader,
    trendUpIcon: trendUpIcon,
    trendDownIcon: trendDownIcon,
    segmentsSubmitBlock,
    popupHeaderMobile,
    ASideComponent,
    ClientsPagination
  },
  props: {
    segmentPopup: {
      type: Number,
      default: 2,
    },
    mainModalState: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const store = useStore();

    const currentFilter = reactive({
      type: 'status',
      value: 'Ожидание'
    })

    function addFilter(type) {

      if(type === 'status') {
        currentFilter.type = 'status';
        if(currentFilter.value === 'Ожидание') {
          currentFilter.value = 'Прошел'
        } else {
          currentFilter.value = 'Ожидание'
        }

        clientsList.sort((item) => {
          if(item[currentFilter.type] === currentFilter.value) {
            return -1
          }
          return 1
        })

      } else if(type === 'visits') {
        currentFilter.type = 'visits';
        if(currentFilter.value === 'max') {
          currentFilter.value = 'min';
          clientsList.sort((a, b) => {
            if(a['visits'] > b['visits']) {
              return -1
            }
            return 1
          })
        } else {
          currentFilter.value = 'max';
          clientsList.sort((a, b) => {
            if(a['visits'] < b['visits']) {
              return -1
            }
            return 1
          })
        }
      } else if(type === 'late') {
        currentFilter.type = 'late';
        if(currentFilter.value === 'max') {
          currentFilter.value = 'min';
          clientsList.sort((a, b) => {
            if(a['late'] > b['late']) {
              return -1
            }
            return 1
          })
        } else {
          currentFilter.value = 'max';
          clientsList.sort((a, b) => {
            if(a['late'] < b['late']) {
              return -1
            }
            return 1
          })
        }
      } else if(type === 'chanel') {
        currentFilter.type = 'chanel';
        if(currentFilter.value === 'WA') {
          currentFilter.value = 'PUSH';
        } else if(currentFilter.value === 'PUSH') {
          currentFilter.value = 'SMS';
        } else {
          currentFilter.value = 'WA';
        }
      }

      clientsList.sort((item) => {
        if(item[currentFilter.type] === currentFilter.value) {
          return -1
        }
        return 1
      })

    }

    const clientsPage = ref(1);

    function changePage(data) {
      clientsPage.value = data;
    }

    const clientsList = reactive([
      {
        number: '+ 7 988 245 69 08',
        status: 'Ожидание',
        visits: 1,
        late: -3,
        chanel: 'SMS',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Прошел',
        visits: 1,
        late: -3,
        chanel: 'PUSH',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Прошел',
        visits: 2,
        late: -4,
        chanel: 'SMS',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Ожидание',
        visits: 1,
        late: -3,
        chanel: 'WA',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Прошел',
        visits: 5,
        late: -5,
        chanel: 'PUSH',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Ожидание',
        visits: 1,
        late: -2,
        chanel: 'PUSH',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Прошел',
        visits: 3,
        late: -2,
        chanel: 'WA',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Прошел',
        visits: 1,
        late: -1,
        chanel: 'PUSH',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Прошел',
        visits: 3,
        late: -3,
        chanel: 'WA',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Ожидание',
        visits: 1,
        late: -6,
        chanel: 'PUSH',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Прошел',
        visits: 2,
        late: -4,
        chanel: 'SMS',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Прошел',
        visits: 1,
        late: -2,
        chanel: 'PUSH',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Ожидание',
        visits: 1,
        late: -1,
        chanel: 'PUSH',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Прошел',
        visits: 4,
        late: -2,
        chanel: 'PUSH',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Прошел',
        visits: 4,
        late: -3,
        chanel: 'WA',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Ожидание',
        visits: 3,
        late: -4,
        chanel: 'PUSH',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Прошел',
        visits: 4,
        late: -4,
        chanel: 'SMS',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Ожидание',
        visits: 5,
        late: -4,
        chanel: 'PUSH',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Прошел',
        visits: 2,
        late: -5,
        chanel: 'SMS',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Ожидание',
        visits: 1,
        late: -3,
        chanel: 'WA',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Прошел',
        visits: 1,
        late: -5,
        chanel: 'WA',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Ожидание',
        visits: 2,
        late: -2,
        chanel: 'SMS',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Прошел',
        visits: 1,
        late: -1,
        chanel: 'WA',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Прошел',
        visits: 3,
        late: -1,
        chanel: 'PUSH',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Ожидание',
        visits: 13,
        late: -3,
        chanel: 'WA',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Прошел',
        visits: 4,
        late: -3,
        chanel: 'SMS',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Ожидание',
        visits: 4,
        late: -3,
        chanel: 'PUSH',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Прошел',
        visits: 3,
        late: -3,
        chanel: 'WA',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Прошел',
        visits: 2,
        late: -3,
        chanel: 'PUSH',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Ожидание',
        visits: 2,
        late: -3,
        chanel: 'WA',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Прошел',
        visits: 5,
        late: -3,
        chanel: 'PUSH',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Ожидание',
        visits: 5,
        late: -3,
        chanel: 'WA',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Прошел',
        visits: 6,
        late: -3,
        chanel: 'WA',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Ожидание',
        visits: 6,
        late: -3,
        chanel: 'SMS',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Прошел',
        visits: 1,
        late: -3,
        chanel: 'PUSH',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Прошел',
        visits: 7,
        late: -3,
        chanel: 'WA',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Ожидание',
        visits: 2,
        late: -3,
        chanel: 'WA',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Ожидание',
        visits: 1,
        late: -3,
        chanel: 'SMS',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Прошел',
        visits: 1,
        late: -3,
        chanel: 'WA',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Прошел',
        visits: 1,
        late: -3,
        chanel: 'SMS',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Ожидание',
        visits: 1,
        late: -3,
        chanel: 'SMS',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Прошел',
        visits: 1,
        late: -3,
        chanel: 'WA',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Прошел',
        visits: 1,
        late: -3,
        chanel: 'WA',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Ожидание',
        visits: 1,
        late: -3,
        chanel: 'SMS',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Прошел',
        visits: 1,
        late: -3,
        chanel: 'WA',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Ожидание',
        visits: 1,
        late: -3,
        chanel: 'SMS',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Прошел',
        visits: 1,
        late: -3,
        chanel: 'WA',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Ожидание',
        visits: 1,
        late: -3,
        chanel: 'SMS',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Прошел',
        visits: 1,
        late: -3,
        chanel: 'WA',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Ожидание',
        visits: 1,
        late: -3,
        chanel: 'SMS',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Прошел',
        visits: 1,
        late: -3,
        chanel: 'WA',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Ожидание',
        visits: 1,
        late: -3,
        chanel: 'WA',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Ожидание',
        visits: 1,
        late: -3,
        chanel: 'SMS',
        state: true
      },
      {
        number: '+ 7 988 245 69 08',
        status: 'Прошел',
        visits: 1,
        late: -3,
        chanel: 'SMS',
        state: true
      }
    ])

    const pageOfClients = computed(() => {
      const arr = [];
      for (let i = (clientsPage.value - 1) * 25; i < clientsPage.value * 25; i++) {
        if(clientsList[i]) {
          arr.push(clientsList[i]);
        } else {
          return arr
        }
      }
      return arr
    })

    function toggleClient() {
      if(isAllActive.value) {
        clientsList.forEach((item) => {
          item.state = false;
        })
      } else {
        clientsList.forEach((item) => {
          item.state = true;
        })
      }
    }

    const isAllActive = computed(() => {
      let state = true

      clientsList.forEach((item) => {
        if(!item.state) {
          state = false
        }
      })

      if(state) {
        return true
      }
      return false
    })

    function toggleMainModal(state) {
      emit("toggleMainModal", state);
    }

    // Есть ли лицензия
    let isLicense = ref(false);

    const loadingRfmRecommendation = computed(() => {
      return store.state.rfm.loadingRfmRecommendation;
    });

    let currentSegment = reactive({});

    const itemList = reactive([]);

    const newModalState = ref(false);

    const notifEditorState = ref(false);

    const submitModalState = ref(false);

    const editorIndex = ref(0);

    function takeModalState(data) {
      if (data.modal === "newNotification") {
        newModalState.value = data.state;
        if (data.list) {
          data.list.forEach((item, index, arr) => {
            if (itemList.length >= arr.length) {
              if (item.state != itemList[index].state) {
                itemList[index].state = item.state;
              }
            } else {
              itemList.push(data.list[index]);
            }
          });
          updateActiveList();
        }
      } else if (data.modal === "submitSettings") {
        submitModalState.value = data.state;
      } else {
        if (data.index) {
          editorIndex.value = data.index;
        }

        if (data.type === "submit") {
          itemList[editorIndex.value].text = data.updateName;
        }

        notifEditorState.value = data.state;
      }
    }

    const activeList = reactive([]);

    function updateActiveList() {
      for (let i = 0; i <= itemList.length; i++) {
        activeList.pop();
      }
      itemList.forEach((item) => {
        if (item.state) {
          activeList.push(item);
        }
      });
    }

    function deleteItem(index) {
      itemList[index].state = false;
      updateActiveList();
    }

    const modalType = ref(0);

    function toggleModal(index) {
      modalType.value = index;
    }

    const windowWidth = ref(0);

    function updateWindow() {
      windowWidth.value = document.documentElement.clientWidth;
    }
    updateWindow();

    window.addEventListener("resize", updateWindow);

    const aSideNumber = ref(2);

    function updateASide(index) {
      aSideNumber.value = index;
    }

    watchEffect(() => {
      if (props.segmentPopup) {
        aSideNumber.value = props.segmentPopup;
      }
    });

    watch(aSideNumber, (value) => {
      store.dispatch("getRfmRecommendation", value - 1);
    });

    return {
      itemList,
      notifEditorState,
      newModalState,
      takeModalState,
      deleteItem,
      submitModalState,
      editorIndex,
      activeList,
      isLicense,
      modalType,
      toggleModal,
      windowWidth,
      toggleMainModal,
      aSideNumber,
      updateASide,
      currentSegment,
      loadingRfmRecommendation,
      clientsList,
      toggleClient,
      isAllActive,
      clientsPage,
      changePage,
      pageOfClients,
      addFilter
    };
  },
};
</script>

<style src="../assets/fonts/stylesheet.css"></style>

<style scoped>

.clients__wrapper {
  padding-bottom: 60px;
}

.submit-block {
  width: calc(100% - 120px);
  margin: 0 60px;
}

.toggle-component {
  margin-left: 10px;
}

.clients-header {
  display: grid;
  grid-template-columns: 0.8fr 3fr 2.3fr 1.8fr 2.2fr 0.8fr;
  grid-column-gap: 10px;

  padding: 0 60px!important;
  margin-bottom: 15px;
}

.clients__item {
  display: grid;
  grid-template-columns: 0.8fr 3fr 2.3fr 1.8fr 2.2fr 0.8fr;
  grid-column-gap: 10px;

  padding: 15px 60px;

  border-bottom: 1px solid #EFF0F0;
}

.clients__text {
  font-size: 14px;
  line-height: 18px;
}

.clients-checkbox {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 23px;
  height: 23px;

  border: 1.5px solid #BDBDBD;
  border-radius: 6px;
}

.clients-checkbox--active {
  width: 14px;
  height: 14px;

  border-radius: 3px;

  background-color: #FFC549;
}

.clients-header__item {
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
}

.clients-header__visit {
  position: relative;
}

.clients-header__visit::before {
  content: '';
  position: absolute;
  top: 5px;
  left: -15px;

  width: 8px;
  height: 12px;

  background-image: url("../assets/arrow-top.svg");
}

button {
  padding: 0;
  margin: 0;
  border: none;
  background: none;
  cursor: pointer;
  color: #000;
}

button:focus {
  color: #000;
}

button:hover {
  color: #000;
}

button:active {
  color: #000;
}

ul {
  padding: 0 !important;
}

.popup {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 5;

  width: 83%;
}

.popup__background {
  position: fixed;
  top: 0;
  left: -30%;
  z-index: 5;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.2);
}

.main-wrapper {
  position: relative;

  display: flex;

  width: 100%;
  max-width: 1600px;
  margin-left: auto;
}

.popup-segment {
  position: relative;
  z-index: 3;

  max-width: 743px;
  min-width: 525px;
  width: 50%;
  min-height: 100vh;
  max-height: 100vh;
  padding: 80px 60px;

  box-sizing: border-box;
  overflow-y: scroll;
  -ms-overflow-style: none;

  background-color: #fff;
}

.popup-segment::-webkit-scrollbar {
  width: 0;
}
.popup-segment::-webkit-scrollbar {
  width: 0;
}

.stat {
  padding-top: 30px;
}

.title {
  font-size: 20px;
  font-weight: 600;
  color: #1e2022;
}

.stat__list {
  margin-top: 20px;
}

.stat__item {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 15px;

  font-size: 16px;
}

.text--bold {
  font-weight: 500;
}

.graph {
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  margin-bottom: 50px;
}

.popup-graph__item {
  width: 50%;
  padding: 22px 24px;
}

.popup-graph__item0 {
  border-radius: 12px 12px 0px 0;
  background: rgba(156, 246, 226, 0.5);
  width: 100%;
}

.popup-graph__item1 {
  border-radius: 0px 0px 0px 12px;
  background: #cdf7ff;
}

.popup-graph__item2 {
  border-radius: 0px 0px 12px 0px;
  background: #ffead7;
}

.graph__header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 30px;
}

.graph__title {
  font-size: 16px;
  font-weight: 500;
}

.graph__section {
  display: flex;
  justify-content: space-between;
  align-items: center;

  /* margin-bottom: 10px; */
}

.graph__text {
  font-size: 14px;
}

.graph__text--bold {
  font-size: 15px;
}

.graph-item__bold {
  display: flex;
}

.graph__time {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 41px;
  height: 16px;
  border-radius: 23px;

  font-size: 10px;
  color: #1e2022;

  background-color: rgba(255, 255, 255, 0.6);
}

.params {
  margin-bottom: 50px;
}

.params__list {
  margin-top: 20px;
}

.params__item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.params__text {
  font-size: 16px;
}

.params__text--bold {
  font-size: 15px;
  font-weight: 500;
}

.guidance__title {
  margin-bottom: 20px;
}
.guidance 
.guidance__text,
.guidance p {
  font-size: 16px;
  line-height: 30px;
}

.guidance__text1 {
  margin-bottom: 30px;
}

.notif {
  position: relative;

  display: grid;
  grid-template-rows: auto 25px auto 1fr auto;
  min-height: 100vh;

  width: 100%;
  max-width: 857px;
  min-width: 670px;
  max-height: 100vh;
  padding-top: 90px;

  box-sizing: border-box;
  overflow-y: scroll;
  -ms-overflow-style: none;

  background-color: #f7f9fc;
}

.notif::-webkit-scrollbar {
  width: 0;
}
.notif::-webkit-scrollbar {
  width: 0;
}

.notif__header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 60px;
  margin-bottom: 40px;
}

.notif__add {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 251px;
  height: 40px;
  border-radius: 12px;
  transition: 0.1s all ease;

  font-size: 14px;
  color: #1e2022;

  background-color: #fff;
}

.notif__add:hover {
  color: #6d6d6d;
  background-color: #ddd;
}

.notif__add:active {
  color: #a1a2a2;
  background-color: #f0f3f8;
}

.add-icon {
  margin-left: 10px;
}

.notif__params {
  display: flex;
  justify-content: space-between;

  font-size: 14px;
  color: #a1a2a2;
}

.params__left {
  display: flex;
}

.params__right {
  display: flex;
}

.params__text1 {
  margin-left: 40px;
}

.params__text2 {
  margin-left: 28px;
}

.params__text3 {
  margin-right: 56px;
}

.params__text4 {
  margin-right: 15px;
}

.notif__list {
  padding-bottom: 60px !important;
  margin-top: 15px;
}

.drop__list li {
  display: flex;
  align-items: center;

  height: 45px;
  padding: 0 20px;
}

.drop__list li:hover {
  color: #6d6d6d;
  background-color: #f7f9fc;
}

.drop__list li:active {
  color: #a1a2a2;
  background-color: #f0f3f8;
}

@media (max-width: 1600px) {

  .main-wrapper {
    width: 95%;
  }

  .notif {
    min-width: 600px;
    padding-top: 90px;
  }

  .title {
    font-size: 18px;
  }

  .clients-header {
    padding: 0 40px!important;
  }

  .notif__header {
    padding: 0 40px;
  }

  .clients__item {
    padding: 15px 40px;
  }

  .submit-block {
    width: calc(100% - 80px);
    margin: 0 40px;
  }
}

.swipeAm-enter-active,
.swipeAm-leave-active {
  transition: all 0.3s ease;
}

.swipeAm-enter-from {
  transform: translateX(-50px);
  opacity: 0;
}

.swipeAm-leave-to {
  transform: translateX(50px);
  opacity: 0;
}

.popupAm-enter-active,
.popupAm-leave-active {
  transition: 0.5s all ease;
}

.popupAm-enter-from,
.popupAm-leave-to {
  right: -100%;
  opacity: 0;
}

.bgAm-enter-active,
.bgAm-leave-active {
  transition: 0.5s all ease;
}

.bgAm-enter-from,
.bgAm-leave-to {
  opacity: 0;
}
</style>

<style scoped>
@media (max-width: 1440px) {
  .main-wrapper {
    width: 90%;
    max-width: 745px;
  }

  .popup-segment {
    width: 100%;
    max-width: none;
  }
}

@media (max-width: 1280px) {
  .popup {
    width: 90%;
  }
}

@media (max-width: 768px) {

  .popup {
    width: 100%;
  }

  .main-wrapper {
    margin-left: 0;
  }

  .popup-segment {
    min-width: auto;
    padding: 80px 40px;
  }

  .graph {
    flex-direction: column;
  }

  .popup-graph__item {
    width: 100%;
  }

  .popup-graph__item1 {
    border-radius: 12px 12px 0 0;
  }

  .popup-graph__item2 {
    border-radius: 0 0 12px 12px;
  }

  .notif {
    min-width: auto;
  }

  .notif__params {
    display: none;
  }
}

@media (max-width: 700px) {
  .notif__list {
    margin-top: 55px;
  }

  .notif-item {
    height: auto;
    margin-bottom: 15px;

    box-shadow: 0px 17px 40px rgba(19, 49, 97, 0.07),
      0px 6.20528px 21.901px rgba(19, 49, 97, 0.0482987),
      0px 3.01255px 10.6325px rgba(19, 49, 97, 0.0389404),
      0px 1.47681px 5.21226px rgba(19, 49, 97, 0.0310596),
      0px 0.583932px 2.06094px rgba(19, 49, 97, 0.0217013);
    border-radius: 30px;

    background: #ffffff;
  }
}

@media (max-width: 768px) {
  .popup {
    padding: 0 !important;
  }

  .main-wrapper {
    width: 100%;
  }

  .popup-segment {
    overflow-x: hidden;

    padding: 0;
  }

  .stat {
    padding: 0 20px;
    padding-top: 165px;
  }

  .params {
    padding: 0 20px;
  }

  .guidance {
    padding: 0 20px;
    margin-bottom: 55px;
  }

  .notif {
    grid-template-rows: auto auto 1fr auto;
    padding: 0;
    overflow-x: hidden;
  }

  .notif__header {
    display: none;
  }

  .clients-header {
    padding-top: 145px!important;
  }
}
</style>

<style>
.guidance {
  min-height: 20%;
}
.guidance p {
  font-size: 16px;
  line-height: 30px;
}
.guidance ol li {
  list-style-type: numeric;
  margin-bottom: 10px;
}
.guidance ol {
  margin: 0;
  padding: 0;
}

.guidance p strong {
  font-size: 20px;
  font-weight: 600;
}
</style>

<style scoped>

@media (max-width: 768px) {

  .popup {
    width: 100%;
  }

  .popup-segment {
    min-width: auto;
    padding: 0 15px;
  }

  .graph {
    flex-direction: column;
  }

  .popup-graph__item {
    width: 100%;
  }

  .popup-graph__item1 {
    border-radius: 12px 12px 0 0;
  }

  .popup-graph__item2 {
    border-radius: 0 0 12px 12px;
  }

  .notif {
    min-width: auto;
  }

  .notif__params {
    display: none;
  }

  .clients-header {
    grid-template-columns: 0.6fr 4.2fr 1.6fr 2fr;
    grid-column-gap: 10px;

    padding: 0 20px!important;
    padding-top: 145px!important;
  }

  .clients__item {
    grid-template-columns: 0.6fr 4.2fr 1.6fr 2fr;
    grid-column-gap: 10px;

    padding: 15px 20px;
  }

  .item--mobile {
    text-align: center;
  }

  .status {
    display: none;
  }

  .chanel {
    display: none;
  }

  .clients-checkbox {
    width: 20px;
    height: 20px;
  }
}
</style>