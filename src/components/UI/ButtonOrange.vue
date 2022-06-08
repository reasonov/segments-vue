<template>
  <button class="button-orange">
    <slot></slot>
  </button>
</template>

<script>

export default {
  name: "ButtonOrange",
}
</script>

<style scoped>
  .button-orange {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 48px;
    padding: 0 25px;

    border-radius: 12px;
    box-sizing: border-box;
    transition: .2s all ease-in-out;

    font-size: 16px!important;

    background-color: #FFC549;
  }

  .button-orange:hover {
    color: #1E2022;
    background-color: #FED47A;
  }

  .button-orange:active {
    color: #6D6D6D;
    background-color: #F7F9FC;
  }

  .button-orange:disabled {
    color: #A1A2A2;
    background-color: #F0F3F8;
  }
</style>