import { createSignal, onCleanup, onMount } from "solid-js";
import { connectSliderRealtime, type SliderRealtimeClient, type BroadcastPayload } from "./slider-realtime.ctrl";
import { SliderOutputView } from "./slider-output.view";

export function SliderOutputCtrl(props: { token: string }) {
  const [payload, setPayload] = createSignal<BroadcastPayload | null>(null);
  let realtime: SliderRealtimeClient | undefined;
  onMount(() => {
    realtime = connectSliderRealtime(props.token, setPayload);
  });
  onCleanup(() => realtime?.close());
  return <SliderOutputView payload={payload()} />;
}
