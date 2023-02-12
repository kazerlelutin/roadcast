import { FC } from 'react'
import { Button } from '../../ui/button/button'
import styles from './chat-styles/chat-form.module.css'
import { useContext, useState } from 'react'
import { useTranslate } from '../../hooks/translate.hook'
import tmi from 'tmi.js'
import { ChatContext } from './chat'
import { ChannelContext } from '../channel/channel'

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
  const { value, handleSubmit, setValue, text } = useChatForm()

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
