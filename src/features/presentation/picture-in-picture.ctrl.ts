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
  const content = window.document.createElement("section");
  content.className = `payload${payload.text ? " with-text" : ""}${payload.images.length ? " with-media" : ""}`;
  if (payload.text) {
    const text = window.document.createElement("p");
    text.className = "text";
    text.textContent = payload.text;
    content.append(text);
  }
  const media = window.document.createElement("div");
  media.className = "media";
  payload.images.forEach((source) => {
    const image = window.document.createElement("img");
    image.src = source;
    image.alt = "Image diffusée";
    media.append(image);
  });
  if (payload.images.length) content.append(media);
  root.append(content);
}

export async function openSliderPictureInPicture(payload: BroadcastPayload | null): Promise<SliderPictureInPicture | null> {
  const api = (globalThis as typeof globalThis & { documentPictureInPicture?: DocumentPictureInPictureApi }).documentPictureInPicture;
  if (!api) return null;
  const window = await api.requestWindow({ width: 640, height: 360 });
  const style = window.document.createElement("style");
  style.textContent = "*{box-sizing:border-box}html,body,#slider-output{width:100%;height:100%;margin:0;overflow:hidden}body{background:transparent;color:#fff;font:16px system-ui,sans-serif}#slider-output{display:grid;place-items:center;container-type:size;overflow:hidden}.payload{width:100%;height:100%;min-width:0;min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:clamp(.35rem,2cqi,1.5rem);overflow:hidden;padding:clamp(.5rem,4cqi,3rem);text-align:center}.text{flex:0 1 auto;max-width:100%;max-height:100%;margin:0;overflow:hidden;font-size:clamp(.75rem,7cqi,5rem);line-height:1.2;white-space:pre-wrap}.media{min-width:0;min-height:0;display:grid;grid-auto-flow:column;grid-auto-columns:minmax(0,1fr);align-items:center;width:100%;height:100%;overflow:hidden}.media img{display:block;width:100%;height:100%;min-width:0;min-height:0;object-fit:contain}.with-text.with-media .text{max-height:42%}.with-text.with-media .media{flex:1 1 0}.empty{color:#aebbd3;font-size:1rem!important}";
  const root = window.document.createElement("main");
  root.id = "slider-output";
  root.setAttribute("aria-live", "polite");
  window.document.head.replaceChildren(style);
  window.document.body.replaceChildren(root);
  render(window, payload);
  return { update: (nextPayload) => render(window, nextPayload), isOpen: () => !window.closed, focus: () => window.focus() };
}
