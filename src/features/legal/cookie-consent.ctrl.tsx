import { createSignal, onCleanup, onMount } from "solid-js";
import { type AnalyticsConsent, CookieConsentView } from "./cookie-consent.view";

const consentKey = "roadcast.analytics-consent";
const analyticsSrc = "https://analytics.ben-to.fr/script.js";
const websiteId = "ff3da4fd-2bff-45ce-b3e3-47259eb12894";

function readConsent(): AnalyticsConsent {
  try {
    const value = globalThis.localStorage.getItem(consentKey);
    return value === "accepted" || value === "rejected" ? value : null;
  } catch {
    return null;
  }
}

function writeConsent(value: Exclude<AnalyticsConsent, null>) {
  try { globalThis.localStorage.setItem(consentKey, value); } catch { /* Private browsing can disable storage. */ }
}

function loadAnalytics() {
  if (typeof document === "undefined" || document.querySelector(`script[data-website-id="${websiteId}"]`)) return;
  const script = document.createElement("script");
  script.defer = true;
  script.src = analyticsSrc;
  script.dataset.websiteId = websiteId;
  document.head.append(script);
}

export function CookieConsentCtrl() {
  const [choice, setChoice] = createSignal<AnalyticsConsent>(null);
  const [open, setOpen] = createSignal(false);

  const save = (value: Exclude<AnalyticsConsent, null>) => {
    setChoice(value);
    writeConsent(value);
    if (value === "accepted") loadAnalytics();
    setOpen(false);
  };

  onMount(() => {
    const saved = readConsent();
    setChoice(saved);
    if (saved === "accepted") loadAnalytics();
    setOpen(!saved);
    const onOpen = () => setOpen(true);
    globalThis.addEventListener("roadcast:open-consent", onOpen);
    onCleanup(() => globalThis.removeEventListener("roadcast:open-consent", onOpen));
  });

  return <CookieConsentView open={open()} choice={choice()} onAccept={() => save("accepted")} onReject={() => save("rejected")} />;
}
