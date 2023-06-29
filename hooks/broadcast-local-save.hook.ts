/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { BroadcastRoutes } from '../entities/broadcast/broadcast'
import { usePost } from './post.hook'

export const useBroadcastLocalSave = () => {
  const { post } = usePost(BroadcastRoutes.saveHistory)

  useEffect(() => {
    post()
  }, [])

  return {
    post,
  }
}
