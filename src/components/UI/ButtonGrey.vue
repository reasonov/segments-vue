<template>
  <button class="button-grey">
    <slot></slot>
  </button>
</template>

<script>

export default {
  name: "ButtonGrey"
}
</script>

<style scoped>
  .button-grey {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 48px;
    padding: 0 25px;

    border-radius: 12px;
    box-sizing: border-box;
    transition: .2s all ease-in-out;

    font-size: 16px!important;
    color: #1E2022;

    background-color: #F7F9FC;
  }

  .button-grey:hover {
    background-color: #FED47A;
  }

  .button-grey:active {
    color: #A1A2A2;
    background-color: #F0F3F8;
  }
</style>