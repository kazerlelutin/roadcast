import { kll } from "../main";

export const translate = {
  onInit(_state, el) {
    el.render();
  },
  render(_state, el) {
    kll.plugins.translate(el);
  },
};
