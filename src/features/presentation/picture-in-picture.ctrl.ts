import type { BroadcastPayload } from "./slider-realtime.ctrl";

type PictureWindow = NonNullable<ReturnType<typeof globalThis.open>>;
type DocumentPictureInPictureApi = { requestWindow: (options: { width: number; height: number }) => Promise<PictureWindow>; };

export type SliderPictureInPicture = { update: (payload: BroadcastPayload | null) => void; isOpen: () => boolean; focus: () => void; };

function render(window: PictureWindow, payload: BroadcastPayload | null) {
  if (window.closed) return;
  const root = window.document.getElementById("slider-output");
  if (!root) return;
  root.replaceChildren();
  if (!payload) {
    const message = window.document.createElement("p");
    message.className = "empty";
    message.textContent = "Aucune diffusion en cours";
    root.append(message);
    return;
  }
  if (payload.text) {
    const text = window.document.createElement("p");
    text.textContent = payload.text;
    root.append(text);
  }
  payload.images.forEach((source) => {
    const image = window.document.createElement("img");
    image.src = source;
    image.alt = "Image diffusée";
    root.append(image);
  });
}

export async function openSliderPictureInPicture(payload: BroadcastPayload | null): Promise<SliderPictureInPicture | null> {
  const api = (globalThis as typeof globalThis & { documentPictureInPicture?: DocumentPictureInPictureApi }).documentPictureInPicture;
  if (!api) return null;
  const window = await api.requestWindow({ width: 640, height: 360 });
  const style = window.document.createElement("style");
  style.textContent = "*{box-sizing:border-box}html,body,#slider-output{width:100%;height:100%;margin:0}body{background:#000;color:#fff;font:16px system-ui,sans-serif}#slider-output{display:grid;place-items:center;gap:1rem;padding:1rem;text-align:center;overflow:hidden}#slider-output p{max-width:100%;margin:0;white-space:pre-wrap;font-size:clamp(1.1rem,3vw,2rem);line-height:1.35}#slider-output img{display:block;max-width:100%;max-height:100%;object-fit:contain}.empty{color:#aebbd3;font-size:1rem!important}";
  const root = window.document.createElement("main");
  root.id = "slider-output";
  root.setAttribute("aria-live", "polite");
  window.document.head.replaceChildren(style);
  window.document.body.replaceChildren(root);
  render(window, payload);
  return { update: (nextPayload) => render(window, nextPayload), isOpen: () => !window.closed, focus: () => window.focus() };
}
