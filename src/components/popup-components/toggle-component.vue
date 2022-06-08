<template>
  <div
      :class="['toggle',
      {'toggle--active': toggle},
      {'toggle-disabled': toggle.disabled},
      {'toggle2': type === 2},
      {'toggle-banned': banned}]"
      @click="justToggle"
  >
    <span :class="['toggle__eclipse', {'eclipse--active': toggle && type === 1}, {'eclipse2': type === 2}, {'eclipse2--active': toggle && type === 2}]"></span>
    
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";

export default {
  name: "toggle-component",
  props: {
    defaultState: {
      type: Boolean,
      default: true,
    },
    emitValue: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: Boolean
    },
    type: {
      type: Number,
      default: 1
    },
    banned: {
      type: Boolean,
      default: false,
    }
  },
  setup(props, { emit }) {
    const toggle = ref(true);
    const disabled = ref(false);

    watchEffect(() => {
      if (props.defaultState === false) {
        toggle.value = false;
      } else {
        toggle.value = true;
      }
    });

    if (props.banned) {
      toggle.value = false;
    }

    function off() {
      toggle.value = false;
    }
    function on() {
      toggle.value = true;
    }

    function disable() {
      disabled.value = true;
    }

    function justToggle() {
      if (!props.banned) {
        toggle.value = !toggle.value;
        if (props.emitValue) {
          emit("justToggle", toggle.value);
          emit("update:ModelValue", toggle.value);
        } else {
          emit("justToggle");
        }
      }
    }

    return { toggle, justToggle, off, on, disable };
  },
};
</script>

<style scoped>
.toggle {
  position: relative;
  width: 30px;
  height: 18px;
  cursor: pointer;
  border-radius: 51px;
  transition: 0.3s all ease;
  background-color: #edf2fb;
}

.toggle__eclipse {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  transition: 0.3s all ease;
  background-color: #ffffff;
}
.toggle--active {
  background-color: #ffc549;
}
.eclipse--active {
  left: 14px;
}

.toggle2 {
  width: 44px;
  height: 26px;
}

.eclipse2 {
  top: 4px;

  width: 18px;
  height: 18px;
}

.eclipse2--active {
  left: 22px;
}

.toggle-banned {
  background-color: #dd6068 !important;
}

@media (max-width: 1600px) and (min-width: 1024px) {
  .toggle2 {
    width: 30px;
    height: 18px;
  }

  .eclipse2 {
    top: 3px;
    left: 3px;

    width: 12px;
    height: 12px;
  }

  .eclipse2--active {
    left: 14px;
  }
}

@media (max-width: 1280px) {
  .toggle2 {
    width: 22px;
    height: 13px;
  }

  .eclipse2 {
    top: 2px;
    left: 3px;

    width: 9px;
    height: 9px;
  }

  .eclipse2--active {
    left: 10px;
  }
}

@media (max-width: 768px) {
  .toggle2 {
    width: 30px;
    height: 18px;
  }

  .eclipse2 {
    top: 3px;
    left: 3px;

    width: 12px;
    height: 12px;
  }

  .eclipse2--active {
    left: 14px;
  }
}
</style>