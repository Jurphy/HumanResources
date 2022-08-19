<template>
  <div id="app">
    <!-- <router-view /> -->
    <MyPagination :total="30" :current-page="currentPage" @changeCurrentPage="changeCurrentPage" />
  </div>
</template>

<script>
import MyPagination from '@/components/MyComponent/pagination/index.vue'
export default {
  components: {
    MyPagination
  },
  data() {
    return {
      currentPage: 1
    }
  },
  methods: {
    changeCurrentPage(val) {
      this.currentPage = val
    }
  }
}
</script>
