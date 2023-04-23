import { FullScreenPopin } from '../../ui/fullscreen-popin/fullscreen-popin'

export const MediaPopin: React.FC = () => {
  return (
    <FullScreenPopin action={<p>button</p>} title={''}>
      <p>content</p>
    </FullScreenPopin>
  )
}
