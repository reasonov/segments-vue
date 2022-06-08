<template>
  <button class="button-transparent">
    <slot></slot>
  </button>
</template>

<script>

export default {
  name: "ButtonTransparent",
}
</script>

<style scoped>
.button-transparent {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 48px;
  padding: 0 25px;

  border: 1px solid #FFC549;
  border-radius: 12px;
  box-sizing: border-box;
  transition: .2s all ease-in-out;

  font-size: 16px!important;

  background-color: #fff;
}

.button-transparent:hover {
  border: 1px solid #FED47A;
  color: #1E2022;
  background-color: #FED47A;
}

.button-transparent:active {
  border: 1px solid #F7F9FC;
  color: #6D6D6D;
  background-color: #F7F9FC;
}

.button-transparent:disabled {
  border: 1px solid #FFC549!important;
  color: #A1A2A2;
  background-color: #F0F3F8!important;
}
</style>