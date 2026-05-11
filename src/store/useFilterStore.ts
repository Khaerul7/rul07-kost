import { create } from 'zustand'
import type { Filters, GenderFilter, PriceRangeFilter } from '../types/kost'

const INITIAL_VISIBLE = 8

interface FilterStore {
  filters: Filters
  visibleCount: number
  setGender: (g: GenderFilter) => void
  setPriceRange: (p: PriceRangeFilter) => void
  toggleAvailable: () => void
  resetFilters: () => void
  loadMore: () => void
  resetVisible: () => void
}

const defaultFilters: Filters = {
  gender: 'Semua',
  priceRange: 'Semua',
  onlyAvailable: false,
}

export const useFilterStore = create<FilterStore>(set => ({
  filters: defaultFilters,
  visibleCount: INITIAL_VISIBLE,

  setGender: g =>
    set(s => ({ filters: { ...s.filters, gender: g }, visibleCount: INITIAL_VISIBLE })),

  setPriceRange: p =>
    set(s => ({ filters: { ...s.filters, priceRange: p }, visibleCount: INITIAL_VISIBLE })),

  toggleAvailable: () =>
    set(s => ({
      filters: { ...s.filters, onlyAvailable: !s.filters.onlyAvailable },
      visibleCount: INITIAL_VISIBLE,
    })),

  resetFilters: () => set({ filters: defaultFilters, visibleCount: INITIAL_VISIBLE }),

  loadMore: () => set(s => ({ visibleCount: s.visibleCount + 4 })),

  resetVisible: () => set({ visibleCount: INITIAL_VISIBLE }),
}))
