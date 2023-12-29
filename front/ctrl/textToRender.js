export const textToRender = {
  render(_state, el, trigger) {
    console.log("info from trigger:", trigger)
    const countEl = el.querySelector("[data-count]")
    const btnState = el.getState("my_button")
    countEl.innerHTML = btnState.count
  },
}
