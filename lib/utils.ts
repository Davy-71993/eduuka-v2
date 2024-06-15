import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const today = new Date();

export const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))

export const setDate = () => new Date(new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 10)))