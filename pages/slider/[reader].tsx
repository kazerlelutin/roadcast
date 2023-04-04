import { SocketProvider } from '../../components/socket'
import dynamic from 'next/dynamic'
import { Slider } from '../../pages_related/slider/slider'

const Editor = dynamic(
  () => import('../../pages_related/editor/editor').then((comp) => comp.Editor),
  {
    ssr: false,
  }
)

export default function SliderPage() {
  return (
    <SocketProvider>
      <Slider />
    </SocketProvider>
  )
}
