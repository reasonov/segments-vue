<template>
  <div class="pagination">
    <p class="pagination__text">Показаны результаты с 1 по {{ max }} из {{ numberOfClients }}</p>
    <div class="pagination__main">
      <button class="pagination__button button--prev" @click="changePage('prev', -1)">Назад</button>
      <button
          :class="['pagination__button', {'pagination__button--active': currentPage === i}]"
          v-for="i in numberOfPages"
          :key="i"
          @click="changePage('number', i)"
      >
        {{ i }}
      </button>
      <button class="pagination__button">...</button>
      <button class="pagination__button button--next" @click="changePage('next', 1)">Вперед</button>
    </div>
  </div>
</template>

<script>
import {ref, computed} from "vue";

export default {
  name: "ClientsPagination",
  props: {
    numberOfClients: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    }
  },
  setup(props, {emit}) {

    const numberOfPages = computed(() => {
      if(props.numberOfClients / props.max < 1) {
        return 1
      }
      return Math.ceil(props.numberOfClients / props.max);
    })

    const currentPage = ref(1);

    function changePage(type, index) {
      if(type === 'number') {
        currentPage.value = index;
      } else {
        currentPage.value += index;
      }

      emit('changePage', currentPage.value);
    }

    return { currentPage, numberOfPages, changePage }

  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 70px;
  padding: 0 30px;

  background-color: #fff;
}

.pagination__text {
  font-size: 16px;
  font-weight: 500;
}

.pagination__main {
  display: flex;
}

.pagination__button {
  width: 34px;
  height: 37px;
  margin-right: 5px;

  border: 1px solid #D8D8D8;
  border-radius: 4px;

  font-size: 16px;
}

.button--prev {
  width: 100px;
}

.button--next {
  width: 100px;
  margin-right: 0;
}

.pagination__button--active {
  border: 1px solid #FBCD00;
}

@media (max-width: 1600px) {
  .pagination__text {
    font-size: 15px;
  }

  .pagination__button {
    font-size: 15px;
  }
}

@media (max-width: 1440px) {
  .pagination__text {
    font-size: 14px;
  }

  .pagination__button {
    font-size: 14px;
  }
}

@media (max-width: 1280px) {
  .pagination__text {
    font-size: 13px;
  }

  .pagination__button {
    font-size: 13px;
  }
}

@media (max-width: 1024px) {
  .pagination__text {
    font-size: 12px;
  }

  .pagination__button {
    font-size: 12px;
  }
}

@media (max-width: 768px) {

  .pagination {
    justify-content: center;
    padding: 0 15px;
  }

  .pagination__text {
    display: none;
  }
}
</style>