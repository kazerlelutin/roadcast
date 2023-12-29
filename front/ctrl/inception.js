import { kll } from "../main"

export const inception = {
  onInit(_state, el) {
    el.render()
  },
  async render(state, el, listen) {
    if (listen) {
      const { name, key, value } = listen
      if (name === "inception_button" && key === "count") {
        const countEl = el.querySelector("[data-async-count]")
        countEl.innerHTML = value
        return
      }
    }

    const asyncEl = el.querySelector("[data-async]")
    setTimeout(() => {
      console.log(
        kll.plugins.createComponent("button-count", "buttonCount", "inception_button", {
          count: 10,
        })
      )
      asyncEl.replaceWith(
        kll.plugins.createComponent("button-count", "buttonCount", "inception_button", {
          count: 10,
        })
      )
      asyncEl.innerHTML = `clicks: ${state.count}`
    }, 1000)
  },
}
