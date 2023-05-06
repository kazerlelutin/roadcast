/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useContext, useEffect } from 'react'
import {
  BroadcastContext,
  BroadcastRoutes,
} from '../entities/broadcast/broadcast'
import { usePost } from './post.hook'

export const useBroadcastLocalSave = () => {
  const [broadcast] = useContext(BroadcastContext)
  const { post } = usePost(BroadcastRoutes.saveHistory)

  useEffect(() => {
    post()
  }, [])

  return {
    post,
  }
}
