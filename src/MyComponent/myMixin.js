export default {
  data() {
    return {
      isShowing: false
    }
  },
  methods: {
    show() {
      this.isShowing = !this.isShowing
    }
  }
}
