<template>
  <div>
    <button @click="show">提示框的显示与隐藏</button>
    <div v-show="isShowing">tooltip显示</div>
  </div>
</template>
<script>
import myMixin from './myMixin'
export default {
  name: 'MyTooltip',
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
