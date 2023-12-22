'use client'

import * as React from 'react'

const ErrorMessage = {
  retrieve: 'Error retrieving data',
  set: 'Error setting data',
  delete: 'Error deleting data'
} as const

function logger(error: unknown, type: keyof typeof ErrorMessage) {
  console.error(ErrorMessage[type], error)
}

type Value = string

export function useLocalStorage(key: string) {
  const [storedValue, setStoredValue] = React.useState<Value>('')

  function setValue(value: any) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
      setStoredValue(value)
    } catch (error) {
      logger(error, 'set')
    }
  }

  function retrieveValue(value: any) {
    try {
      window.localStorage.getItem(key)
      setStoredValue(value)
    } catch (error) {
      logger(error, 'retrieve')
    }
  }

  const deleteValue = () => {
    try {
      window.localStorage.removeItem(key)
      setStoredValue('')
    } catch (error) {
      logger(error, 'delete')
    }
  }

  return { storedValue, setValue, deleteValue, retrieveValue } as const
}
