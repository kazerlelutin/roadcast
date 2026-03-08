import type { Ctrl } from '@features/routes/routes.type';
import { translateStore } from '../../translate/translate.store';
import { getLanguageFromLS } from '../../translate/translate.utils';
import { activeFooterLink } from '@/src/utils/active-footer-link';


const homeCtrl: Ctrl = {
  async init() {
    activeFooterLink('/');


    translateStore.setCurrentLanguage(getLanguageFromLS() || 'fr');

  },
  async cleanUp() {

  }
}

export default homeCtrl;
