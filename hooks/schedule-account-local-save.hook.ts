/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { usePost } from './post.hook'
import { ScheduleRoutes } from '@/entities'

export const useScheduleAccountLocalSave = () => {
  const { post } = usePost(ScheduleRoutes.saveHistory)

  useEffect(() => {
    post()
  }, [])

  return {
    post,
  }
}
