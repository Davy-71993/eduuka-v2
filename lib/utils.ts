import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const toNumber = (str?: string) => Number.isNaN(parseInt(str??'')) ? 0  : parseInt(str??'')

export const getRandomCoordinate = (min:number, max: number) => {
  return (Math.random() * (max - min) + min).toFixed(6);
}

export const today = new Date();

export const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))

export const setDate = () => new Date(new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 10)))