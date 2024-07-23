"use client"

import { today, yesterday } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import Folder from './Folder'
import { Notification } from '@/lib/types'
import { createClient } from '@/lib/supabase/client'

type Props = {}

export default function AlertsPage({}: Props) {

  const [alertState, setAlertState] = useState<Notification[]>([])

  useEffect(()=>{
    (async()=>{
      const supabase = createClient()
      const { data, error } = await supabase.from('notifications').select('message, created_at, status, id')
      if(error){
        console.log(error.message)
        setAlertState([])
        return
      }
      setAlertState(data as Notification[])
    })()
  }, [])

  const todayFolder = alertState.filter((alert)=> new Date(alert.created_at).toDateString() === today.toDateString())
  const yesterdayFolder = alertState.filter((alert)=> new Date(alert.created_at).toDateString() === yesterday.toDateString())
  const olderFolder = alertState.filter((alert) => new Date(alert.created_at).toDateString() !== today.toDateString() && alert.created_at !== yesterday.toDateString())

  const setRead = (alertID: string) => {
    const updatedAlerts = alertState.map(alert => {
      if(alert.id === alertID){
        alert.status = 'read'
      }

      return alert
    })

    setAlertState([...updatedAlerts])
  }

  return (
    <div>
      {
        todayFolder.length > 0 && (
          <Folder folder={todayFolder} folderTitle='Today' handleClick={ setRead } />
        )
      }
      {
        yesterdayFolder.length > 0 && (
          <Folder folder={yesterdayFolder} folderTitle='Yesterday' handleClick={ setRead }  />
        )
      }
      {
        olderFolder.length > 0 && (
          <Folder folder={olderFolder} folderTitle='Older' handleClick={ setRead }  /> 
        )
      }
    </div>
  )
}