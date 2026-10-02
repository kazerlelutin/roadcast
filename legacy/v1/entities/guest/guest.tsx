import { Guest } from '@prisma/client'

export interface IGuest extends Guest {
  id: string
}
