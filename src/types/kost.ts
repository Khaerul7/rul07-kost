export interface Kost {
  id: string
  name: string
  gender: 'Putra' | 'Putri' | 'Campur'
  price: number
  isAvailable: boolean
  facilities: string[]
  rating: number
  totalReviews: number
  image: string
  location: string
  whatsappNumber: string // Format: 628xxx
}

export type GenderFilter     = 'Semua' | 'Putra' | 'Putri' | 'Campur'
export type PriceRangeFilter = 'Semua' | '<500k' | '500k-1jt' | '1jt-2jt' | '>2jt'

export interface Filters {
  gender:      GenderFilter
  priceRange:  PriceRangeFilter
  onlyAvailable: boolean
}
