import axios from 'axios'
import type { Kost } from '../types'
import { mockKosts } from '../data/mockData'

// ─── CONFIG ───────────────────────────────────────────────────────────────────
// Replace with your MockAPI endpoint, e.g.:
// https://YOUR_ID.mockapi.io/api/v1/kosts
const MOCKAPI_URL = import.meta.env.VITE_MOCKAPI_URL ?? ''

// ─── FETCH ALL ────────────────────────────────────────────────────────────────
export async function fetchKosts(): Promise<Kost[]> {
  if (!MOCKAPI_URL) {
    // No endpoint configured → use local mock data
    return new Promise((resolve) =>
      setTimeout(() => resolve(mockKosts), 600)
    )
  }
  const { data } = await axios.get<Kost[]>(MOCKAPI_URL)
  return data
}

// ─── ADD ONE ──────────────────────────────────────────────────────────────────
export async function addKost(payload: Omit<Kost, 'id'>): Promise<Kost> {
  if (!MOCKAPI_URL) {
    // Simulate add locally
    const newKost: Kost = { ...payload, id: String(Date.now()) }
    mockKosts.unshift(newKost)
    return new Promise((resolve) => setTimeout(() => resolve(newKost), 400))
  }
  const { data } = await axios.post<Kost>(MOCKAPI_URL, payload)
  return data
}
