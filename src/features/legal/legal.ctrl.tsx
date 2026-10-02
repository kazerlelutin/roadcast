import { type LegalPageKind, LegalView } from "./legal.view";

export function LegalCtrl(props: { kind: LegalPageKind }) {
  const openConsent = () => globalThis.dispatchEvent(new globalThis.Event("roadcast:open-consent"));
  return <LegalView kind={props.kind} onOpenConsent={openConsent} />;
}
