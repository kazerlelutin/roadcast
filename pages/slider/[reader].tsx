import { SocketProvider } from '../../components/socket'
import { Slider } from '../../pages_related/slider/slider'

export default function SliderPage() {
  return (
    <SocketProvider>
      <Slider />
    </SocketProvider>
  )
}
