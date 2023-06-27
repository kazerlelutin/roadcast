import { useState } from 'react'
import { Button, Flex } from '@/ui'
import { useTranslate } from '@/hooks'
import va from '@vercel/analytics'
import { useBroadcast } from '@/entities'

export const BroadcastCreateForm: React.FC = () => {
  const [title, setTitle] = useState('')
  const { createBroadcast } = useBroadcast()
  const t = useTranslate({
    createBroadcast: {
      fr: 'Créer un conducteur',
      en: 'Create a broadcast',
    },
    create: {
      fr: 'Créer',
      en: 'Create',
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        va.track('createBroadcast')
        createBroadcast(title)
      }}
    >
      <Flex center>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={t('createBroadcast')}
        />
        <Button type="submit">{t('create')}</Button>
      </Flex>
    </form>
  )
}
