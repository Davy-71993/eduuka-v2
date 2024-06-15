"use server"

import { cookies } from "next/headers"
import { createClient } from "../supabase/server"
import { SupabaseClient } from "@supabase/supabase-js"

const SUPABASE = createClient(cookies())

/**
 * Fetch a single item from any table. Selecting specific fields
 * @param supabase Supabase server client
 * @param table The table we are fetching from
 * @param fields The fields that we need to retrive
 * @param column The column in the table that we should filter with
 * @param value The value that should correspond to the column value.
 * @returns Any type depending on the fetchedtable
 */
export const fetchOne = async( table:string, fields: string, column:string, value:string ) => {
    try {
        const { data, error } = await SUPABASE.from(table).select(fields).eq(column, value).single()
        if(error){
            console.log(`Error fetching a single item from ${table}: `, error.message)
            return null
        }
        return data
    } catch (error) {
        console.log(`Error fetching from ${table}: `, error)
    }
}

/**
 * Fetch many items from any table with one column filter. Selecting specific fields
 * @param supabase Supabase server client
 * @param table The table we are fetching from
 * @param fields The fields that we need to retrive
 * @param column The column in the table that we should filter with
 * @param value The value that should correspond to the column value.
 * @returns Any type depending on the fetchedtable
 */
export const fetchAllWithColumnFilter = async(table:string, fields: string, column:string, value:string ) => {
    try {
        const { data, error } = await SUPABASE.from(table).select(fields).eq(column, value)
        if(error){
            console.log(`Error fetching items from ${table}: `, error.message)
            return null
        }
        return data
    } catch (error) {
        console.log(`Error fetching from ${table}: `, error)
    }
}

/**
 * Fetch all items from any table. Selecting specific fields
 * @param supabase Supabase server client
 * @param table The table we are fetching from
 * @param fields The fields that we need to retrive
 * @returns Any type depending on the fetchedtable
 */
export const fetchAllWithoutFilters = async( table:string, fields: string) => {
    try {
        const { data, error } = await SUPABASE.from(table).select(fields)
        if(error){
            console.log(`Error fetching items from ${table}: `, error.message)
            return null
        }
        return data
    } catch (error) {
        console.log(`Error fetching from ${table}: `, error)
    }
}


export const fetchOneOnServer = async( supabase: SupabaseClient, table:string, fields: string, column:string, value:string ) => {
    try {
        const { data, error } = await supabase.from(table).select(fields).eq(column, value).single()
        if(error){
            console.log(`Error fetching a single item from ${table}: `, error.message)
            return null
        }
        return data
    } catch (error) {
        console.log(`Error fetching from ${table}: `, error)
    }
}
