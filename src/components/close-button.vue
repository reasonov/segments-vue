<template>
  <button :class="[{'close--circle': closeType === 1}, {'close--square': closeType === 2}, {'close--mobile': closeType === 3}]">

    <div v-if="closeType === 1">
      <span class="close-line close-line1"></span>
      <span class="close-line close-line2"></span>
    </div>

    <div v-else-if="closeType === 3">
      <span class="close-line--mobile close-line1"></span>
      <span class="close-line--mobile close-line2"></span>
    </div>

    <img src="../assets/redo.svg" alt="" v-else>

  </button>
</template>

<script>

export default {
  name: "close-button",
  props: {
    closeType: {
      type: Number
    }
  }
}
</script>

<style scoped>
.close--circle {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  box-shadow: 0px 17px 40px rgba(19, 49, 97, 0.07), 0px 6.20528px 21.901px rgba(19, 49, 97, 0.0482987), 0px 3.01255px 10.6325px rgba(19, 49, 97, 0.0389404), 0px 1.47681px 5.21226px rgba(19, 49, 97, 0.0310596), 0px 0.583932px 2.06094px rgba(19, 49, 97, 0.0217013);
  background-color: #F7F9FC;
}

.close--square {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  border-radius: 12px 0 0 12px;
  box-shadow: -15px 0px 13px -16px rgba(114, 114, 114, 0.2) inset;
  background-color: #F7F9FC;
}

.close-line {
  display: block;
  width: 35px;
  height: 1px;
  border-radius: 5px;
  background-color: #000;
}

.close--mobile {
  position: absolute;
  z-index: 10;
}

.close-line--mobile {
  display: block;
  width: 35px;
  height: 1px;
  border-radius: 5px;
  background-color: #fff;
}

.close-line1 {
  transform: rotateZ(45deg);
}
.close-line2 {
  position: relative;
  top: -1px;
  transform: rotateZ(-45deg);
}
.close--mobile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 60px;
  height: 60px;

  background-color: #000;
}
</style>
