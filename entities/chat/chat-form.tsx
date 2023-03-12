import { FC } from 'react'
import { Button } from '../../ui/button/button'
import styles from './chat-styles/chat-form.module.css'
import { useContext, useState } from 'react'
import { useTranslate } from '../../hooks/translate.hook'
import tmi from 'tmi.js'
import { ChatContext } from './chat'
import { ChannelContext } from '../channel/channel'
import { SessionContext } from '../session/session'
import { NoMessage } from '../../ui/no-message/no-message'

// INTERFACES_______________________________________________________________
export interface ChatFormResult {
  text: string
  value: string
  setValue: (e: string) => void
  handleSubmit: () => void
}

// HOOKS _______________________________________________________________
export const useChatForm = (): ChatFormResult => {
  const t = useTranslate(),
    [value, setValue] = useState<string>(''),
    chat = useContext<tmi.Client>(ChatContext),
    [channel] = useContext(ChannelContext)

  const handleSubmit = async () => {
    chat.say(channel, value)
    setValue('')
  }

  return {
    text: t('send'),
    handleSubmit,
    value,
    setValue,
  }
}

// COMPONENT_______________________________________________________________
export const ChatForm: FC = () => {
  const session = useContext(SessionContext)
  const { value, handleSubmit, setValue, text } = useChatForm()
  const t = useTranslate({
    needLogged: {
      fr: 'Vous devez être connecté pour envoyer un message sur le chat Twitch',
      en: 'You need to be logged in to chat',
    },
  })

  if (!session.id) return <NoMessage message={t('needLogged')} />

  return (
    <form
      className={styles.send}
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
    >
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <Button variant="normal" type="submit">
        {text}
      </Button>
    </form>
  )
}
