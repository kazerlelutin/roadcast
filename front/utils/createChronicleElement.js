import { kll } from '../main'

export async function createChronicleElement(chronicle) {
  const chronicleTemplate = await kll.processTemplate('chronicle')
  const container = document.createElement('div')

  container.setAttribute('data-position', chronicle.position)

  container.innerHTML = chronicleTemplate.outerHTML

  const chronicleEl = container.firstChild

  // === ids ===
  const titleId = `title_${chronicle.id}`
  const sourceId = `source_${chronicle.id}`
  const addButtonId = `add_${chronicle.id}`
  const lockId = `lock_${chronicle.id}`

  // === chronicle ===

  chronicleEl.setAttribute('kll-id', chronicle.id)
  chronicleEl.setAttribute('kll-b', `${titleId}.value,${sourceId}.value`)

  // === title ===
  const titleEl = container.querySelector('[data-type=title]')
  titleEl.setAttribute('kll-id', titleId)
  titleEl.setAttribute('name', titleId)

  // === source ===
  const sourceEl = container.querySelector('[data-type=source]')
  sourceEl.setAttribute('kll-id', sourceId)
  sourceEl.setAttribute('name', sourceId)

  // === Add button ===
  const addButton = container.querySelector('[data-type=add]')
  addButton.setAttribute('kll-id', addButtonId)
  addButton.setAttribute('kll-s-position', chronicle.position + 1)

  // === Lock ===
  const lock = container.querySelector('[data-type=lock]')
  lock.setAttribute('kll-id', lockId)
  lock.setAttribute('kll-b', `broadcast.message`)
  lock.setAttribute('kll-s-chronicle_id', chronicle.id)

  // === Inject Values ===
  if (chronicle.title) titleEl.setAttribute('kll-s-value', chronicle.title)

  if (chronicle.source) sourceEl.setAttribute('kll-s-value', chronicle.source)
  kll.plugins.translate(chronicleEl)

  return chronicleEl
}
