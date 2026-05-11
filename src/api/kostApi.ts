import type { Kost } from '../types/kost'
import { mockKostData } from '../data/mockData'

const MOCKAPI_URL = import.meta.env.VITE_MOCKAPI_URL as string | undefined

export async function fetchKosts(): Promise<Kost[]> {
  if (MOCKAPI_URL) {
    try {
      const res = await fetch(`${MOCKAPI_URL}/kosts`)
      if (!res.ok) throw new Error('API error')
      return (await res.json()) as Kost[]
    } catch {
      console.warn('MockAPI gagal, pakai data lokal.')
    }
  }
  // Simulasi network delay
  await new Promise(r => setTimeout(r, 600))
  return mockKostData
}
