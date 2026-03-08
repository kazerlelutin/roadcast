import type { RouteDef } from "@features/routes/routes.type";
import aboutCtrl from "./about.ctrl";
import { t } from "@features/translate/translate";
import { UI } from "@features/translate/translate.const";
import type { Translation } from "@features/translate/translate.types";

const route: RouteDef = ['/about', { path: '/about', title: t(UI.about as Translation), templateId: 'about-template', ctrl: aboutCtrl }]

export default route