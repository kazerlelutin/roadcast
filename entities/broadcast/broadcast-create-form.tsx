import { useContext, useState } from 'react'
import { Button } from '../../ui/button/button'
import { useTranslate } from '../../hooks/translate.hook'
import { Flex } from '../../ui/flex/flex'
import { usePost } from '../../hooks/post.hook'
import { BroadcastRoutes, IBroadcast, useBroadcast } from './broadcast'
import { useRouter } from 'next/router'

export const BroadcastCreateForm: React.FC = () => {
  const [title, setTitle] = useState('')
  const { createBroadcast } = useBroadcast()
  const router = useRouter()
  const t = useTranslate({
    createBroadcast: {
      fr: 'Créer un fil rouge',
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
