import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatUrl(url: string) {
  return url.replace(/\s+/g, '-')
}

export function undoFormatUrl(url: string) {
  return url.replaceAll('-', ' ')
}
