export const buttonCount = {
  state: {
    text: "Hello World",
    count: 0,
  },
  onInit(_state, el) {
    el.render()
  },
  onclick(state, _el) {
    state.count++
  },

  render(state, el) {
    el.innerHTML = `clicks: ${state.count}`
  },
}
