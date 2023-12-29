export const button = {
  onInit(_state, el) {
    el.render()
  },
  onclick(_state, el) {
    const toggle = el.classList.contains("border-green-700")
    if (toggle) {
      el.classList.remove("border-green-700")
      el.classList.add("border-red-700")
    } else {
      el.classList.remove("border-red-700")
      el.classList.add("border-green-700")
    }
  },

  render(_state, _el) {},
}
