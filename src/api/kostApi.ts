import type { Kost } from '../types/kost'

const MOCKAPI_URL = import.meta.env.VITE_MOCKAPI_URL as string

export async function fetchKosts(): Promise<Kost[]> {
  const res = await fetch(MOCKAPI_URL)
  if (!res.ok) throw new Error('Gagal fetch dari MockAPI')
  const data = await res.json()
  
  return data.map((k: Kost) => ({
    ...k,
    facilities: Array.isArray(k.facilities)
      ? k.facilities
      : typeof k.facilities === 'string'
        ? (k.facilities as string).replace(/['\[\]]/g, '').split(',').map((f: string) => f.trim()).filter(Boolean)
        : []
  }))
}