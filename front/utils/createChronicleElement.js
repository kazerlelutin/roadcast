import { kll } from '../main'
import { setElements, setKllAttributes } from './setElement'

export async function createChronicleElement(chronicle) {
  const chronicleTemplate = await kll.processTemplate('chronicle')
  const container = document.createElement('div')

  container.setAttribute('data-position', chronicle.position)

  container.innerHTML = chronicleTemplate.outerHTML

  const chronicleEl = container.firstChild

  // === ids ===
  const titleId = `title_${chronicle.id}`
  const sourceId = `source_${chronicle.id}`

  setKllAttributes(chronicleEl, {
    id: chronicle.id,
    b: `${titleId}.value,${sourceId}.value`
  })

  chronicleEl.setAttribute('id', chronicle.id)

  setElements(chronicleEl, [
    [
      'title',
      undefined,
      {
        'kll-id': titleId,
        'kll-s-value': chronicle.title ? chronicle.title : undefined
      }
    ],
    [
      'source',
      undefined,
      {
        'kll-id': sourceId,
        'kll-s-value': chronicle.source ? chronicle.srouce : undefined
      }
    ],
    [
      'add',
      undefined,
      {
        'kll-id': `add_${chronicle.id}`,

        'kll-s-position': chronicle.position + 1
      }
    ],
    [
      'lock',
      undefined,
      {
        'kll-id': `lock_${chronicle.id}`,
        'kll-b': `broadcast.message`,
        'kll-s-chronicle_id': chronicle.id
      }
    ],
    [
      'delete',
      undefined,
      {
        'kll-id': `remove_${chronicle.id}`,
        'kll-s-chronicle_id': chronicle.id,
        'kll-m': 'confirmDialog'
      }
    ],
    [
      'medias',
      undefined,
      {
        'kll-id': `medias_${chronicle.id}`,
        'kll-s-chronicle_id': chronicle.id
      }
    ]
  ])
  // === Inject Values ===

  kll.plugins.translate(chronicleEl)

  return chronicleEl
}
