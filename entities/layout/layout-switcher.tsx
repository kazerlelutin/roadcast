import { Resume } from '../../components/resume/resume'
import { BroadcastThreeComp } from '../broadcast/broadcast-three'
import { Chat } from '../chat/chat'
import { ChatForm } from '../chat/chat-form'
import { MediaPreview } from '../media/media-preview'
import { NavigationMain } from '../navigation/navigation'
import { LayoutCaseNames } from './layout'

interface LayoutSwitcherProps {
  caseName: LayoutCaseNames
}

export const LayoutSwitcher: React.FC<LayoutSwitcherProps> = ({ caseName }) => {
  if (caseName === LayoutCaseNames.resume) return <Resume />
  if (caseName === LayoutCaseNames.medias) return <>Medias</>
  if (caseName === LayoutCaseNames.driver) return <NavigationMain />
  if (caseName === LayoutCaseNames.actions) return <>ACTIONS</>
  if (caseName === LayoutCaseNames.preview) return <MediaPreview />
  if (caseName === LayoutCaseNames.chat) return <Chat />
  if (caseName === LayoutCaseNames.chatForm) return <ChatForm />
  if (caseName === LayoutCaseNames.three) return <BroadcastThreeComp />

  return <></>
}
