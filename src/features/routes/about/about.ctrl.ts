import type { Ctrl } from '@features/routes/routes.type';
import { ABOUT_CONTAINER_ID, ABOUT_ITEM_TEMPLATE_ID, ABOUT_ITEMS_CONTAINER_ID, aboutContent, aboutTitle } from './about.const';
import { activeFooterLink } from '@/src/utils/active-footer-link';
import { t } from '@features/translate/translate';
import { translateStore } from '@features/translate/translate.store';
import { getLanguageFromLS } from '@features/translate/translate.utils';

const aboutCtrl: Ctrl = {
  init() {
    activeFooterLink('/about');

    const container = document.getElementById(ABOUT_CONTAINER_ID);
    if (!container) {
      throw new Error('Container not found');
    }

    const title = container.querySelector('h1');
    if (title) {
      title.textContent = t(aboutTitle);
    }

    const itemsContainer = container.querySelector("#" + ABOUT_ITEMS_CONTAINER_ID);
    if (!itemsContainer) {
      throw new Error('Items container not found');
    }

    const template = document.getElementById(ABOUT_ITEM_TEMPLATE_ID) as HTMLTemplateElement;
    if (!template) {
      throw new Error('Template not found');
    }

    const fragment = document.createDocumentFragment();

    for (const item of aboutContent) {

      const itemTemplate = template.content.cloneNode(true) as HTMLElement;
      if (!itemTemplate) {
        throw new Error('Item template not found');
      }
      const itemTitle = itemTemplate.querySelector('h2') as HTMLHeadingElement;
      if (itemTitle) {
        itemTitle.textContent = t(item.title);
      }
      const itemContent = itemTemplate.querySelector('p') as HTMLParagraphElement;
      if (itemContent) {
        itemContent.textContent = t(item.content);
      }
      const itemLink = itemTemplate.querySelector('a') as HTMLAnchorElement;
      if (itemLink) {

        if (item.link && item.linkText) {
          itemLink.href = item.link;
          itemLink.textContent = t(item.linkText);
        } else {
          itemLink.remove();
        }
      }

      fragment.appendChild(itemTemplate);
    }

    itemsContainer.appendChild(fragment);

    translateStore.setCurrentLanguage(getLanguageFromLS() || 'fr');

  }
}

export default aboutCtrl;