import { useState, useEffect, useMemo } from 'react'
import type { Kost } from '../types/kost'
import type { Filters } from '../types/kost'
import { fetchKosts } from '../api/kostApi'

const PRICE_MAP: Record<string, [number, number]> = {
  '<500k':    [0,        499999],
  '500k-1jt': [500000,   999999],
  '1jt-2jt':  [1000000, 1999999],
  '>2jt':     [2000000,  Infinity],
}

export function useKosts(filters: Filters) {
  const [allKosts, setAllKosts] = useState<Kost[]>([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetchKosts()
      .then(data => { setAllKosts(data); setLoading(false) })
      .catch(() => { setError('Gagal memuat data.'); setLoading(false) })
  }, [])

  const filtered = useMemo(() => {
    return allKosts.filter(k => {
      if (filters.gender !== 'Semua' && k.gender !== filters.gender) return false
      if (filters.onlyAvailable && !k.isAvailable) return false
      if (filters.priceRange !== 'Semua') {
        const [min, max] = PRICE_MAP[filters.priceRange]
        if (k.price < min || k.price > max) return false
      }
      return true
    })
  }, [allKosts, filters])

  return { filtered, loading, error }
}
