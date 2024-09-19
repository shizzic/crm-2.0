export default {
  mounted(el: any, binding: any) {
    let clickedOnElementAtLeastOnce = false

    el.clickOutsideEvent = function (event: Event) {
      const isTarget = el == event.target || el.contains(event.target)
      if (!isTarget && !clickedOnElementAtLeastOnce) binding.value()
      clickedOnElementAtLeastOnce = false
    }.bind(clickedOnElementAtLeastOnce)

    document.body.addEventListener('click', el.clickOutsideEvent)
    document.body.addEventListener(
      'mouseup',
      function (event: Event) {
        const isTarget = el == event.target || el.contains(event.target)
        if (isTarget && !clickedOnElementAtLeastOnce) clickedOnElementAtLeastOnce = true
      }.bind(clickedOnElementAtLeastOnce),
      false
    )
    document.body.addEventListener(
      'mousedown',
      function (event: Event) {
        const isTarget = el == event.target || el.contains(event.target)
        if (isTarget && !clickedOnElementAtLeastOnce) clickedOnElementAtLeastOnce = true
      }.bind(clickedOnElementAtLeastOnce),
      false
    )
    return
  },
  beforeUnmount(el: any) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  }
}
