import tmi from 'tmi.js'
import {
  FC,
  useEffect,
  useRef,
  useContext,
  useState,
  ReactNode,
  createContext,
} from 'react'
import { SessionContext } from '../session/session'
import { ChannelContext } from '../channel/channel'
import styles from './chat-styles/chat.module.css'
import { ChatMessage } from './chat-message'
import { useTranslate } from '../../hooks/translate.hook'
import { NoMessage } from '../../ui/no-message/no-message'

// INTERFACES_______________________________________________________________
export interface ChatMsg {
  tags?: tmi.ChatUserstate
  message: string
  username: string
  color: string
}

export interface ChatResults {
  messages: ChatMsg[]
}

interface ChatProviderProps {
  children: ReactNode
}

// CONTEXT_______________________________________________________________

export const ChatContext = createContext(null)

// PROVIDER_______________________________________________________________

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const session = useContext(SessionContext)
  const [channel] = useContext(ChannelContext)
  const [chat, setChat] = useState<undefined | tmi.Client>(undefined)

  useEffect(() => {
    if (!session || !channel) return
    const client = new tmi.Client({
      options: { debug: false },
      identity: {
        username: session.login,
        password: `oauth:${session.token_profile}`,
      },
      channels: [channel],
    })

    setChat(client)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channel])

  useEffect(() => {
    connectToChat()
    return () => {
      if (chat) chat.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chat])

  const connectToChat = async () => {
    if (chat) await chat.connect()
  }

  return <ChatContext.Provider value={chat}>{children}</ChatContext.Provider>
}

// HOOKS_______________________________________________________________

export const useChat = (): ChatResults => {
  const [messages, setMessages] = useState<ChatMsg[]>([])
  const client = useContext<tmi.Client>(ChatContext)

  useEffect(() => {
    if (client) {
      client.on('message', (_channel, tags, message) => {
        let newMsg = message
        const emotes = tags.emotes ? Object.keys(tags.emotes) : []

        emotes.forEach((o) => {
          if (!tags?.emotes) return
          tags.emotes[o].forEach((position: string) => {
            const splitPosition = position.split('-')
            const emoteWord = message.slice(
              parseInt(splitPosition[0]),
              parseInt(splitPosition[1]) + 1
            )
            newMsg = newMsg.replace(emoteWord, ` ${o} `)
          })
        })

        const splitMsg = newMsg.split(' ')
        if (tags['display-name']?.match(/StreamElements|nightbots/i)) return

        setMessages((prevMessages) => {
          const newMessages = [...prevMessages]
          newMessages.push({
            username: tags['display-name'] || tags.username || '',
            color: tags.color || 'var(--dms-text)',
            message: splitMsg
              .map((word: string) => {
                if (word.match(/http|www/)) {
                  return '**link**'
                }

                const isEmote = emotes.find((o) => o === word)
                if (isEmote) {
                  return `<img class="emoticon" src="http://static-cdn.jtvnw.net/emoticons/v1/${isEmote}/3.0" />`
                }
                return word
              })
              .join(' '),
          })
          //for slice, reverse before and after.
          newMessages.reverse()
          newMessages.slice(0, 100)
          return newMessages.reverse()
        })
      })

      return () => {
        setMessages([])
      }
    }
  }, [client])

  return { messages }
}

// VIEW_______________________________________________________________

export const Chat: FC = () => {
  const session = useContext(SessionContext)
  const ref = useRef(null)
  const { messages } = useChat()
  const t = useTranslate({
    needLogged: {
      fr: 'Vous devez être connecté pour voir le chat Twitch',
      en: 'You need to be logged to see the Twitch chat',
    },
  })

  useEffect(() => {
    if (ref?.current) {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [ref, messages])

  if (!session.id) return <NoMessage message={t('needLogged')} />
  if (messages.length === 0) return <NoMessage message={t('noMessage')} />
  return (
    <div className={styles.messages} ref={ref}>
      {messages.map((msg) => (
        <ChatMessage {...msg} key={msg.message} />
      ))}
    </div>
  )
}
