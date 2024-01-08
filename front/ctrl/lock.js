const LS_KEY = "rc___lock";

export function getLsLock() {
  return localStorage.getItem(LS_KEY) || "unlock";
}

function toogle(status, el) {
  const elToKeep = el.querySelector(`[data-type="${status}"]`);
  const elToHide = el.querySelector(
    `[data-type="${status === "lock" ? "unlock" : "lock"}"]`
  );

  elToHide.classList.add("hidden");
  elToKeep.classList.remove("hidden");

  if (status === "lock") {
    document.documentElement.classList.remove("unlock");
    document.documentElement.classList.add("lock");
  } else {
    document.documentElement.classList.remove("lock");
    document.documentElement.classList.add("unlock");
  }

  localStorage.setItem(LS_KEY, status);
}

export const lock = {
  state: {
    lock: undefined,
  },
  onInit(state, el) {
    const ls = getLsLock();
    state.lock = ls === "lock";
    toogle(ls, el);
  },
  onClick(state, el) {
    const status = el.getAttribute("data-type");
    toogle(status === "lock" ? "unlock" : "lock", el.parentElement);
    state.lock = !state.lock;
  },
  render(){}
};
