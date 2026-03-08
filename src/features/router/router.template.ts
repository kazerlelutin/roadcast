export const getTemplate = (templateId: string): HTMLTemplateElement => {
  const template = document.getElementById(templateId) as HTMLTemplateElement;
  if (!template) throw new Error(`Template not found: ${templateId}`);
  return template;
};

export const cloneTemplate = (template: HTMLTemplateElement): DocumentFragment => {
  if (!template) throw new Error('Template not found');
  return template.content.cloneNode(true) as DocumentFragment;
};

export const getMainContent = (): HTMLElement => {
  const mainContent = document.querySelector('main');
  if (!mainContent) throw new Error('Element main not found');
  return mainContent as HTMLElement;
};

export const renderTemplate = (templateId: string): void => {
  const template = getTemplate(templateId);
  if (!template) throw new Error(`Template not found: ${templateId}`);

  const mainContent = getMainContent();
  if (!mainContent) throw new Error('Element main not found');

  mainContent.innerHTML = '';
  const content = template.content.cloneNode(true) as DocumentFragment;
  mainContent.appendChild(content.firstElementChild as Node);
};

