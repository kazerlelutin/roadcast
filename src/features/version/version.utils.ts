import { VERSION } from "./version.const";

export function displayVersion() {
  const versionElement = document.getElementById('version');
  if (versionElement) {
    versionElement.textContent = VERSION;
  }
}