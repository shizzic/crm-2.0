export default {
  mounted(el: any, binding: any) {
    el.clickOutsideEvent = function (event: Event) {
      if (!(el == event.target || el.contains(event.target))) {
        binding.value()
      }
    }
    document.body.addEventListener('click', el.clickOutsideEvent)
    return
  },
  beforeUnmount(el: any) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  }
}
