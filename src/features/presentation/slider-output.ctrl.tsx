import { createSignal, onMount } from "solid-js";
import { type BroadcastPayload } from "./slider-preview.view";
import { SliderOutputView } from "./slider-output.view";

export function SliderOutputCtrl(props: { token: string }) {
  const [payload, setPayload] = createSignal<BroadcastPayload | null>(null);
  onMount(() => {
    try {
      const saved = JSON.parse(globalThis.localStorage.getItem(`roadcast-broadcast:${props.token}`) ?? "null") as BroadcastPayload | null;
      if (saved && typeof saved.text === "string" && Array.isArray(saved.images)) setPayload(saved);
    } catch { setPayload(null); }
  });
  return <SliderOutputView payload={payload()} />;
}
