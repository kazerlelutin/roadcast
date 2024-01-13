import { v4 as uuid } from 'uuid'
import { kll } from '../main'

const LS_USERID_KEY = 'rc__userId'

export function getUserId() {
  const existId = localStorage.getItem(LS_USERID_KEY)
  if (existId) return existId
  const newId = uuid()
  localStorage.setItem(LS_USERID_KEY, newId)
  return newId
}

export function createHeaderXInfo() {
  const { params } = kll.parseRoute()
  const res = {
    ['x-user-id']: getUserId()
  }
  if (params.editor) res['x-editor-id'] = params.editor
  if (params.reader) res['x-reader-id'] = params.reader

  return {
    headers: res
  }
}
