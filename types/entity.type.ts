import { Dispatch, SetStateAction } from 'react'

export type TEntity<T> = [T, Dispatch<SetStateAction<T>>]
