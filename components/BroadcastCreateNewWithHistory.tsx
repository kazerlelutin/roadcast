import { useRouter } from 'next/router'

import { Button, Modal } from '@/ui'
import { useTranslate } from '@/hooks'
import { useBroadcast } from '@/stores'

export function BroadcastCreateNewWithHistory() {
  const { createBroadcastWithHistory } = useBroadcast()
  const router = useRouter()

  const t = useTranslate({
    createWithHistory: {
      fr: 'Créer un conducteur avec historique',
      en: 'Create a new broadcast with history',
    },
  })

  async function handleCreateBroadcastWithHistory() {
    const newBroadcast = await createBroadcastWithHistory()
    router.push({
      query: {
        editor: newBroadcast.editor,
      },
    })
  }

  return (
    <Modal
      title={t('createWithHistory')}
      button={t('createWithHistory')}
      content={(closeModal) => (
        <div className="flex flex-col gap-1 text-rc-text">
          <div className="flex flex-col justify-center gap-1">{t('createWithHistoryDesc')}</div>
          <div className="flex justify-end gap-2">
            <Button
              variant="normal"
              type="button"
              onClick={() => {
                handleCreateBroadcastWithHistory()
                closeModal()
              }}
            >
              {t('createWithHistory')}
            </Button>
            <Button onClick={closeModal} type="button">
              {t('cancel')}
            </Button>
          </div>
        </div>
      )}
    />
  )
}
