import { kll } from "../main";

export const lsKEY = "rc__theme";

function getLs() {
  return localStorage.getItem(lsKEY) || "dark";
}

function rupteurTheme(theme, el) {

  const elToKeep = el.querySelector(`[data-type="${theme}"]`);
  const elToHide = el.querySelector(
    `[data-type="${theme === "dark" ? "light" : "dark"}"]`
  );
  
  elToHide.classList.add("hidden");
  elToKeep.classList.remove("hidden");

  if(theme === "dark"){
    document.documentElement.classList.remove('light')
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
    document.documentElement.classList.add('light')
  }

    localStorage.setItem(lsKEY, theme);
}

export const rupteur = {
  onInit(_state, el) {
    const ls = getLs();
    rupteurTheme(ls, el);
  },
  onClick(_, el) {
    const theme = el.getAttribute("data-type");
    rupteurTheme(theme === "dark" ? "light" : "dark", el.parentElement);
  }

};
