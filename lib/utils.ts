import axios from "axios"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import Cookies from 'js-cookie'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const toNumber = (str?: string) => Number.isNaN(parseInt(str??'')) ? 0  : parseInt(str??'')

export const numberOrUndefine = (str?: string) => Number.isNaN(parseInt(str??'')) ? undefined  : parseInt(str??'') 

export const getRandomCoordinate = (min:number, max: number) => (Math.random() * (max - min) + min).toFixed(6)

export const today = new Date();

export const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))

export const setDate = () => new Date(new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 10)))

export const prettyDistance = (dist_metters?: number) => {
  if(!dist_metters) return "Unknown distance away"
  if(dist_metters <= 800) return `${dist_metters.toFixed(2)} Meters away`
  return `${(dist_metters/1000).toFixed(2)} Kilometers away`
}