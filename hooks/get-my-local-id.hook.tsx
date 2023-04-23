import useLocalState from './local-state.hook'
import { v4 as uuidv4 } from 'uuid'

export const useGetMyLocalId = (): string => {
  const [myLocalId] = useLocalState<{ myLocalId: string }>(
    {
      myLocalId: uuidv4(),
    },
    'roadcast-my-local-id'
  )

  return myLocalId.myLocalId
}
