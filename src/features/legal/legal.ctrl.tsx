import { type LegalPageKind, LegalView } from "./legal.view";
import { SeoMeta } from "../seo/seo-meta.ctrl";

export function LegalCtrl(props: { kind: LegalPageKind }) {
  const openConsent = () => globalThis.dispatchEvent(new globalThis.Event("roadcast:open-consent"));
  return <><SeoMeta page={props.kind} /><LegalView kind={props.kind} onOpenConsent={openConsent} /></>;
}
