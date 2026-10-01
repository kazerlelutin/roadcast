export function getTextInHtml(html: string): string {
  const element = document.createElement('div')
  element.innerHTML = html
  return element.textContent
}
