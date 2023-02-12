import { Resume } from '../../components/resume/resume'
import { Chat } from '../chat/chat'
import { ChatForm } from '../chat/chat-form'
import { LayoutCaseNames } from './layout'

interface LayoutSwitcherProps {
  caseName: LayoutCaseNames
}

export const LayoutSwitcher: React.FC<LayoutSwitcherProps> = ({ caseName }) => {
  if (caseName === LayoutCaseNames.resume) return <Resume />
  if (caseName === LayoutCaseNames.medias) return <>Medias</>
  if (caseName === LayoutCaseNames.driver) return <>DRIVER</>
  if (caseName === LayoutCaseNames.actions) return <>ACTIONS</>
  if (caseName === LayoutCaseNames.preview) return <>PREVIEW</>
  if (caseName === LayoutCaseNames.chat) return <Chat />
  if (caseName === LayoutCaseNames.chatForm) return <ChatForm />
  if (caseName === LayoutCaseNames.three) return <>THREE</>

  return <></>
}
