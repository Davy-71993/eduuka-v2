"force dynamic"

import React from 'react'
import TrashTable from './Table'
import { trashItems } from '@/lib/dami-api'

type Props = {}

export default function TrashPage({}: Props) {
  /**
   * create a utility function that handles getting the trash items from the models
   * that are deletable.
   * e.g For the ads, 1. We query all the trashed ads for the authenticated user
   *                  2. For each record, we create a trash model.
   * The trash model: 
   *  { id: id of the record, 
   *    type: type of the record e.g ad, store, etc
   *    name: name of the record or derived from the record, 
   *    created_at: date the record was created, 
   *    trashed_at: date the record was trashed 
   *  }
   */
  return (
    <div className='p-5'>
        <TrashTable trashItems={ trashItems } />
    </div>
  )
}