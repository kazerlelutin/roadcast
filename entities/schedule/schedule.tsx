/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useState } from 'react'
import { usePost, useFetch } from '@/hooks'
import { TEntity } from '@/types'
import { useRouter } from 'next/router'
import {
  Editor,
  Guest,
  Schedule,
  ScheduleAccount,
  UserScheduleHistory,
} from '@prisma/client'
import { TriggerTypes, useSocketTrigger } from '@/components'
import { IGuest } from '../guest'
import { IBroadcast } from '../broadcast'

// INTERFACES ----------------------------------------------------------------
interface ScheduleProviderProps {
  children: React.ReactNode
  schedule: ISchedule
}

interface ScheduleShowButtonProviderProps {
  children: React.ReactNode
}

interface SchedulesProviderProps {
  children: React.ReactNode
  schedules: ISchedule[]
}

interface ScheduleAccountProviderProps {
  children: React.ReactNode
  scheduleAccount: IScheduleAccount
}

export enum ScheduleStatus {
  project = 'project',
  delayed = 'delayed',
  progress = 'progress',
  done = 'done',
}

export interface ISchedule extends Schedule {
  guests: Guest[]
  editors: Editor[]
  UserScheduleHistory: UserScheduleHistory[]
}

export interface IScheduleAccount extends ScheduleAccount {
  schedules: ISchedule[]
}

// CONTEXT ------------------------------------------------------------------

export const ScheduleAccountCtx = createContext<TEntity<IScheduleAccount>>([
  {} as IScheduleAccount,
  () => {},
])

export const ScheduleRefreshButtonContext =
  createContext<TEntity<boolean>>(null)

export const SchedulesCtx = createContext<TEntity<ISchedule[]>>([[], () => {}])

export const ScheduleCtx = createContext<TEntity<ISchedule>>([
  {} as ISchedule,
  () => {},
])

// ROUTES -------------------------------------------------------------------

export enum ScheduleRoutes {
  findMany = 'schedule/all',
  findManyAccount = 'schedule/schedule_accounts',
  findManyGuest = 'schedule/guests',
  findOne = 'schedule/findone',
  create = 'schedule/create',
  delete = 'schedule/delete',
  createAccount = 'schedule/create_account',
  create_with_history = 'schedule/create_with_history',
  createBroadcast = 'schedule/create_broadcast',
  createGuest = 'schedule/create_guest',
  updateSubject = 'schedule/update_subject',
  updateInfo = 'schedule/update_info',
  updateStart = 'schedule/update_start',
  updateStatus = 'schedule/update_status',
  updateGuests = 'schedule/update_guests',
  saveHistory = 'schedule/save_history',
  chronicle_history = 'schedule/schedule_history',
}

// PROVIDER -----------------------------------------------------------------

export function ScheduleAccountProvider({
  children,
  scheduleAccount,
}: ScheduleAccountProviderProps) {
  const ctx = useState<IScheduleAccount>(scheduleAccount)

  return (
    <ScheduleAccountCtx.Provider value={ctx}>
      {children}
    </ScheduleAccountCtx.Provider>
  )
}

export function SchedulesProvider({
  children,
  schedules,
}: SchedulesProviderProps) {
  const ctx = useState<ISchedule[]>(schedules)
  const { showScheduleButton } = useShowScheduleButton()

  useSocketTrigger(TriggerTypes.SCHEDULE_ACCOUNT, showScheduleButton)

  return <SchedulesCtx.Provider value={ctx}>{children}</SchedulesCtx.Provider>
}

export function ScheduleProvider({
  children,
  schedule,
}: ScheduleProviderProps) {
  const ctx = useState<ISchedule>(schedule)
  return <ScheduleCtx.Provider value={ctx}>{children}</ScheduleCtx.Provider>
}

export function ScheduleRefreshButtonProvider({
  children,
}: ScheduleShowButtonProviderProps) {
  const value = useState<boolean>(false)
  return (
    <ScheduleRefreshButtonContext.Provider value={value}>
      {children}
    </ScheduleRefreshButtonContext.Provider>
  )
}

// HOOKS ---------------------------------------------------------------------

export function useGetScheduleHistory() {
  const { data, loading } = useFetch<UserScheduleHistory[]>(
    ScheduleRoutes.chronicle_history
  )

  return {
    scheduleHistory: data,
    loading,
  }
}

export function useShowScheduleButton() {
  const ctx = useContext(ScheduleRefreshButtonContext)

  if (!ctx)
    throw new Error(
      'useShowScheduleButton fonctionne avec le contexte ChronicleRefreshButtonContext'
    )

  const [showRefreshScheduleButton, setDisplayButton] = ctx

  const showScheduleButton = () => {
    setDisplayButton(true)
  }

  const hideScheduleButton = () => {
    setDisplayButton(false)
  }

  return {
    showRefreshScheduleButton,
    showScheduleButton,
    hideScheduleButton,
  }
}

export function useSchedules() {
  const ctx = useContext(SchedulesCtx)
  const { post: create, loading: loadingCreate } = usePost<ISchedule>(
    ScheduleRoutes.create
  )

  const { post: postDelSchedule, loading: loadingDelSchedule } =
    usePost<IBroadcast>(ScheduleRoutes.createBroadcast)

  if (!ctx)
    throw new Error('useGetSchedule must be used within a ScheduleProvider')
  const [schedules, setSchedules] = ctx

  const createSchedule = async (subject: string) => {
    const newSchedule = await create({ subject })
    if (newSchedule) setSchedules([...schedules, newSchedule])
  }

  const deleteSchedule = (id: string) => {
    postDelSchedule({ id })
    setSchedules((prev) => prev.filter((schedule) => schedule.id !== id))
  }

  return {
    schedules,
    loadingCreate,
    loadingDelSchedule,
    deleteSchedule,
    createSchedule,
  }
}

export function useSchedule() {
  const { locale } = useRouter()
  const ctx = useContext(ScheduleCtx)
  const { post: postSubject, loading: loadingSubject } = usePost<ISchedule>(
    ScheduleRoutes.updateSubject
  )
  const { post: postInfo, loading: loadingInfo } = usePost<ISchedule>(
    ScheduleRoutes.updateInfo
  )
  const { post: postStart, loading: loadingStart } = usePost<ISchedule>(
    ScheduleRoutes.updateStart
  )

  const { post: postStatus, loading: loadingStatus } = usePost<ISchedule>(
    ScheduleRoutes.updateStatus
  )

  const { post: postBroadcast, loading: loadingBroadcast } =
    usePost<IBroadcast>(ScheduleRoutes.createBroadcast)

  if (!ctx)
    throw new Error('useGetSchedule must be used within a ScheduleProvider')
  const [schedule, _setSchedule] = ctx

  const updateSubject = (subject: string) => {
    _setSchedule((prev) => ({ ...prev, subject }))
    postSubject({ id: schedule.id, subject })
  }

  const updateInfo = (info: string) => {
    _setSchedule((prev) => ({ ...prev, info }))
    postInfo({ id: schedule.id, info })
  }

  const updateEditors = (editors: Editor[]) => {
    _setSchedule((prev) => ({ ...prev, editors }))
  }

  const updateGuests = (guests: IGuest[]) => {
    _setSchedule((prev) => ({ ...prev, guests }))
  }

  const updateStart = (start_at: Date) => {
    _setSchedule((prev) => ({ ...prev, start_at }))
    postStart({ id: schedule.id, start_at })
  }

  const updateStatus = (status: ScheduleStatus) => {
    _setSchedule((prev) => ({ ...prev, status }))
    postStatus({ id: schedule.id, status })
  }

  const goToBroadcast = async () => {
    const broadcast = await postBroadcast({ id: schedule.id })

    if (!broadcast?.editor) return
    window
      .open(
        `${window.location.origin}/${locale}/editor/${broadcast.editor}`,
        '_blank'
      )
      .focus()
  }

  return {
    schedule,
    loadingStart,
    loadingSubject,
    loadingInfo,
    loadingStatus,
    loadingBroadcast,
    updateSubject,
    updateInfo,
    updateEditors,
    updateStart,
    updateStatus,
    updateGuests,
    goToBroadcast,
  }
}

export function useScheduleAccount() {
  const ctx = useContext(ScheduleAccountCtx)
  const router = useRouter()

  if (!ctx)
    throw new Error('useGetSchedules must be used within a SchedulesProvider')
  const [scheduleAccount, _setScheduleAccount] = ctx
  const { post: create } = usePost<IScheduleAccount>(
    ScheduleRoutes.createAccount
  )

  const createScheduleAccount = async (title: string) => {
    const newSchedule = await create({ title })
    if (newSchedule) router.push('schedule/editor/' + newSchedule.editor)
  }

  return {
    scheduleAccount,
    createScheduleAccount,
  }
}
