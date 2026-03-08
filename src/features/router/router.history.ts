export const updateDocumentTitle = (title: string): void => {
  document.title = title;
};

export const updateHistory = (path: string): void => {
  window.history.pushState({}, '', path);
}; 