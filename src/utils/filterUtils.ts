import type { Kost, FilterState } from '../types'

export function applyFilters(kosts: Kost[], filters: FilterState): Kost[] {
  return kosts.filter((kost) => {
    // Gender filter
    if (filters.gender !== 'all' && kost.gender !== filters.gender) return false

    // Price range filter
    const p = kost.price
    switch (filters.priceRange) {
      case '<500k':    if (p >= 500_000)                      return false; break
      case '500k-1jt': if (p < 500_000 || p > 1_000_000)     return false; break
      case '1jt-2jt':  if (p < 1_000_000 || p > 2_000_000)   return false; break
      case '>2jt':     if (p <= 2_000_000)                    return false; break
    }

    // Availability filter
    if (filters.isAvailableOnly && !kost.isAvailable) return false

    return true
  })
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID').format(price)
}

export function buildWaLink(kost: Kost): string {
  const msg = encodeURIComponent(
    `Halo, saya tertarik dengan *${kost.name}* seharga Rp ${formatPrice(kost.price)}/bulan. Apakah masih tersedia?`
  )
  return `https://wa.me/${kost.whatsappNumber}?text=${msg}`
}
