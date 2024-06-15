"use client"

import { alerts } from '@/lib/dami-api'
import { today, yesterday } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import Folder from './Folder'
import { stringify } from 'querystring'
import { Notification } from '@/lib/types'

type Props = {}

export default function AlertsPage({}: Props) {

  const [alertState, setAlertState] = useState<Notification[]>([])

  useEffect(()=>{
    setAlertState(alerts)
  }, [])

  const todayFolder = alertState.filter((alert)=> alert.date.toDateString() === today.toDateString())
  const yesterdayFolder = alertState.filter((alert)=> alert.date.toDateString() === yesterday.toDateString())
  const olderFolder = alertState.filter((alert) => alert.date.toDateString() !== today.toDateString() && alert.date.toDateString() !== yesterday.toDateString())

  const setRead = (alertID: string) => {
    const updatedAlerts = alerts.map(alert => {
      if(alert.id === alertID){
        alert.status = 'Read'
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