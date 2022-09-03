<template>
  <div>
    <button @click="show">模态框的显示与隐藏</button>
    <div v-show="isShowing">modal显示</div>
  </div>
</template>
<script>
import myMixin from './myMixin'
export default {
  name: 'MyModal',
  mixins: [myMixin],
  data() {
    return {
      // isShowing: false
    }
  },
  methods: {
    // show() {
    //   this.isShowing = !this.isShowing
    // }
  }
}
</script>

<style lang="scss" scoped></style>
