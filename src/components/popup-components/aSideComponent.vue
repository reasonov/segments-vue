<template>
  <div class="main__a-side">
    <ul class="a-side__list">
      <li
          :class="['a-side__item', 'a-side__item' + index, {'a-side--active': aSideNumber === index}]"
          @click="updateASide(index)"
          v-for="index in 11"
          :key="index"
      >
        <button class="a-side__button">
          <redo-icon v-if="index === 1" />
          <img class="a-side__image" :src="require('../../assets/img/smile' + (index - 2) + '.png')" alt="smile" v-else>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import redoIcon from "@/components/popup-components/icon/redo-icon";
import {ref, watchEffect} from "vue";

export default {
  name: "aSideComponent",
  components: {
    redoIcon
  },
  props: {
    windowWidth: {
      type: Number
    },
    segmentPopup: {
      type: Number,
      default: 2
    }
  },
  setup(props, { emit }) {
    const aSideNumber = ref(2);

    function updateASide(index) {
      if(index === 1) {
        emit('toggleMainModal', false);
      } else {
        aSideNumber.value = index;
        emit('updateASide', index);
      }
    }

    watchEffect(() => {
      aSideNumber.value = props.segmentPopup;
      emit('updateASide', props.segmentPopup);
    })

    return { updateASide, aSideNumber }
  }
}
</script>

<style scoped>

.item-number {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 35px;
  height: 35px;

  border: 1px solid #1E2022;
  border-radius: 14px;

  font-size: 16px;
  font-weight: 500;
  color: #1E2022;
}

.a-side__image {
  width: 28px;
  height: 28px;
}

.main__a-side {
  position: absolute;
  top: 80px;
  left: -60px;
}

.a-side__item {
  position: relative;
  left: 12px;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 60px;
  height: 48px;
  margin-bottom: 4px;

  border-radius: 12px 0 0 12px;
  transition: .2s all ease;
  box-shadow: -35px 0px 13px -16px rgb(114 114 114 / 20%) inset;
}

.a-side__item:hover {
  left: 0;
  height: 60px;
  box-shadow: none
}

.a-side__item1 {
  background-color: #F6F9FC;
}

.a-side__item2 {
  background-color: #FFFFFF;
}

.a-side__item3 {
  background-color: #9CF6E2;
}

.a-side__item4 {
  background-color: #A2F7EC;
}

.a-side__item5 {
  background-color: #AAF7F5;
}

.a-side__item6 {
  background-color: #B4F7FC;
}

.a-side__item7 {
  background-color: #C0F7FF;
}

.a-side__item8 {
  background-color: #CDF7FF;
}

.a-side__item9 {
  background-color: #E4F7FF;
}

.a-side__item10 {
  background-color: #EEF8FF;
}

.a-side__item11 {
  background-color: #C4C4C4;
}

.a-side__number {
  width: 28px;
  height: 28px;

  border-radius: 8px;
  border: 2px solid #000;

  font-size: 12px;
  font-weight: 600;
}

.a-side--active {
  left: 0;
  height: 60px;
  box-shadow: none
}

@media(max-width: 768px) {
  .main__a-side {
    top: 70px;
    left: 50%;
    z-index: 5;

    width: 100%;
    max-width: 505px;

    overflow: scroll;
    transform: translateX(-50%);
  }

  .a-side__list {
    display: flex;
    justify-content: space-between;

    width: 505px;
  }

  .a-side__item {
    bottom: -12px;
    left: 0;
    width: 48px;

    cursor: pointer;

    border-radius: 12px 12px 0 0;
  }

  .a-side__item1 {
    display: none;
  }

  .a-side--active {
    bottom: 0;
  }

  .a-side__item:hover {
    bottom: 0;
    height: 60px;
  }
}
</style>