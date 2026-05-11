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

export type GenderFilter   = 'all' | 'Putra' | 'Putri' | 'Campur'
export type PriceFilter    = 'all' | '<500k' | '500k-1jt' | '1jt-2jt' | '>2jt'

export interface FilterState {
  gender:          GenderFilter
  priceRange:      PriceFilter
  isAvailableOnly: boolean
}

export interface TambahKostForm {
  name:            string
  gender:          'Putra' | 'Putri' | 'Campur'
  price:           string
  location:        string
  facilities:      string[]
  whatsappNumber:  string
  image:           string
}
