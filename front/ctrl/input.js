export const input = {
  state: {
    value: '',
    error: ''
  },
  onInput(state, _el, e) {
    state.value = e.target.value
    state.error = ''
  }
}
