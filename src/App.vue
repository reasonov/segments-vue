<template>
  <div class="segments-wrapper m-0 p-0">
    <new-segment-layout :rfmInfo="rfmInfo" @toggleMainModal="toggleMainModal($event)" v-if="windowWidth > 1280" />

    <segments-layout-mobile v-else-if="windowWidth < 1280" @toggleMainModal="toggleMainModal($event)" />

    <segments-popup
        class="popup-wrapper"
        @toggleMainModal="toggleMainModal($event)"
        :segmentPopup="segmentPopup"
        :mainModalState="modalState"
    />
  </div>

</template>

<script>
import { ref, computed, onBeforeMount, onUnmounted } from "vue";
import {useStore} from "vuex";
import segmentsPopup from "./views/segmentsPopup";
import segmentsLayoutMobile from "@/views/SegmentsLayoutMobile";
import newSegmentLayout from "@/views/NewSegmentLayout";

export default {
  components: {
    segmentsPopup,
    segmentsLayoutMobile,
    newSegmentLayout
  },
  setup() {

    const store = useStore();

    function setWindowWidth() {
      store.commit('updateWindowWidth', document.documentElement.clientWidth);
    }

    window.addEventListener('resize', setWindowWidth);

    onBeforeMount(() => {
      setWindowWidth();
    })

    onUnmounted(() => {
      window.removeEventListener('resize', setWindowWidth);
    })


    const modalState = ref(false);
    const segmentPopup = ref(2);

    function toggleMainModal(data) {
      if (data.state) {
        modalState.value = data.state;
        segmentPopup.value = data.index + 1;
      } else {
        modalState.value = data;
      }
    }

    const windowWidth = computed(() => {
      return store.state.windowWidth;
    })

    const rfmInfo = computed(() => {
      return [
        {
          maxFrequency: 1,
          maxRecency: 40,
          minFrequency: 1,
          minRecency: 0
        },
        {
          maxFrequency: 3,
          maxRecency: 40,
          minFrequency: 2,
          minRecency: 0
        },
        {
          maxFrequency: "max",
          maxRecency: 40,
          minFrequency: 4,
          minRecency: 0
        },
        {
          maxFrequency: 3,
          maxRecency: 90,
          minFrequency: 1,
          minRecency: 41
        },
        {
          maxFrequency: "max",
          maxRecency: 100,
          minFrequency: 4,
          minRecency: 41
        },
        {
          maxFrequency: 1,
          maxRecency: 120,
          minFrequency: 1,
          minRecency: 91
        },
        {
          maxFrequency: 1,
          maxRecency: 160,
          minFrequency: 1,
          minRecency: 121
        },
        {
          maxFrequency: 3,
          maxRecency: 160,
          minFrequency: 2,
          minRecency: 91
        },
        {
          maxFrequency: "max",
          maxRecency: 160,
          minFrequency: 4,
          minRecency: 101
        }
      ]
    })

    return { modalState, toggleMainModal, segmentPopup, windowWidth, rfmInfo }

  },
};
</script>

<style scoped>

.segments-wrapper {
  padding-bottom: 60px!important;
  min-height: 100vh;
}

.popup-wrapper {
  position: fixed;
  right: 0;
  top: 0;
}

@media (max-width: 550px) {
  .popup-wrapper {
    overflow: hidden;
  }
}
</style>

<style src="./assets/css/main.css"></style>

