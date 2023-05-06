import { useState } from 'react'
import { Button } from '../../ui/button/button'
import { useTranslate } from '../../hooks/translate.hook'
import { Flex } from '../../ui/flex/flex'
import va from '@vercel/analytics'
import { useBroadcast } from './broadcast'

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
