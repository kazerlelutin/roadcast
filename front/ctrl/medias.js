import { getState } from '../utils/getState'

export const medias = {
  state: {
    chronicle_id: null
  },
  onInit(state, el, e) {
    const { chronicle } = getState(state.chronicle_id)

    console.log('ici on init les medias', chronicle)
  },
  render(state, el, listen) {
    console.log('ici on génère les medias')
  }
}
