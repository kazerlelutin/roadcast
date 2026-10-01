import styles from './schedule-styles/schedule-table-guests.module.css'
import { useSimpleFetch, useTranslate } from '@/hooks'
import { ScheduleRoutes, useSchedule } from './schedule'
import { useState } from 'react'
import { Button, Flex, EditMode, Col } from '@/ui'
import AsyncCreatableSelect from 'react-select/async-creatable'
import reactSelectStyle from '@/styles/reactSelectStyle'
import { Guest } from '@prisma/client'
import { IGuest } from '../guest'

export function ScheduleTableGuests() {
  const t = useTranslate()
  const { schedule, updateGuests } = useSchedule()
  const { getData } = useSimpleFetch()
  const [value, setValue] = useState<{ label: string; value: string }[]>(
    schedule.guests.map((guest) => ({
      value: guest.id,
      label: guest.name,
    }))
  )
  const guestCount = schedule.guests.length

  const loadOptions = async (inputValue?: string) => {
    const body = {
      search: inputValue || '',
      isSchedule: true,
    }
    const guests = await getData<Guest[]>(ScheduleRoutes.findManyGuest, body)

    const guestsSelect = guests
      .map((guest) => ({
        value: guest.id,
        label: guest.name,
      }))
      .filter((guest) => !schedule.guests.find((e) => e.id === guest.value))

    return guestsSelect
  }

  const createGuest = async (inputValue: string) => {
    const newGuest = await getData<IGuest>(ScheduleRoutes.createGuest, {
      name: inputValue,
      scheduleId: schedule.id,
    })
    setValue((prev) => [...prev, { value: newGuest.id, label: newGuest.name }])
    updateGuests([...schedule.guests, newGuest])
  }

  const updateEditor = async (options: { value: string; label: string }[]) => {
    const idsToDelete = value
      .filter((val) => !options.find((o) => o.value === val.value))
      .map((val) => val.value)
    const idsToAdd = options
      .filter((val) => !value.find((o) => o.value === val.value))
      .map((val) => val.value)

    const newGuests = await getData<IGuest[]>(ScheduleRoutes.updateGuests, {
      idsToDelete,
      idsToAdd,
      scheduleId: schedule.id,
    })
    setValue(
      newGuests.map((editor) => ({ value: editor.id, label: editor.name }))
    )
    updateGuests(newGuests)
  }

  const key = `${guestCount}-${schedule.id}`
  return (
    <EditMode
      readMode={
        <Col>
          {schedule.guests.length === 0
            ? t('noGuests')
            : schedule.guests.map((guest) => (
                <div key={guest.id}>{guest.name}</div>
              ))}
        </Col>
      }
    >
      {({ close }) => (
        <div className={styles.container}>
          <AsyncCreatableSelect
            isMulti
            instanceId={key}
            key={key}
            styles={reactSelectStyle}
            placeholder={t('SelectGuests')}
            cacheOptions
            defaultOptions
            noOptionsMessage={() => t('noGuests')}
            loadingMessage={() => t('loading')}
            formatCreateLabel={(inputValue) => `${t('create')} "${inputValue}"`}
            onCreateOption={createGuest}
            loadOptions={loadOptions}
            onChange={updateEditor}
            value={value}
          />

          <Flex center>
            <Button type="reset" onClick={close}>
              {t('close')}
            </Button>
          </Flex>
        </div>
      )}
    </EditMode>
  )
}
