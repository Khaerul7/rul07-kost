import { ChevronDown, X } from 'lucide-react'
import { useFilterStore } from '../store/useFilterStore'
import type { GenderFilter, PriceRangeFilter } from '../types/kost'

const GENDER_OPTIONS: GenderFilter[]      = ['Semua', 'Putra', 'Putri', 'Campur']
const PRICE_OPTIONS:  PriceRangeFilter[]  = ['Semua', '<500k', '500k-1jt', '1jt-2jt', '>2jt']

const PRICE_LABELS: Record<PriceRangeFilter, string> = {
  'Semua':    'Harga',
  '<500k':    '< 500k',
  '500k-1jt': '500k – 1jt',
  '1jt-2jt':  '1jt – 2jt',
  '>2jt':     '> 2jt',
}

const GENDER_LABELS: Record<GenderFilter, string> = {
  'Semua':  'Gender',
  'Putra':  'Putra',
  'Putri':  'Putri',
  'Campur': 'Campur',
}

export default function FilterBar() {
  const { filters, setGender, setPriceRange, toggleAvailable, resetFilters } = useFilterStore()

  const hasActiveFilter =
    filters.gender !== 'Semua' ||
    filters.priceRange !== 'Semua' ||
    filters.onlyAvailable

  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="max-w-screen-xl mx-auto px-6 h-[52px] flex items-center gap-0">
        {/* Label */}
        <span className="text-[13px] text-gray-400 font-medium mr-4 shrink-0">Filter By:</span>

        {/* Tersedia Toggle */}
        <button
          onClick={toggleAvailable}
          className="flex items-center gap-2 mr-4 group"
        >
          <span
            className={`w-4 h-4 rounded-full border-[1.5px] flex items-center justify-center transition-all ${
              filters.onlyAvailable
                ? 'border-navy bg-navy'
                : 'border-gray-300 bg-white group-hover:border-navy'
            }`}
          >
            {filters.onlyAvailable && (
              <span className="w-2 h-2 rounded-full bg-white" />
            )}
          </span>
          <span className={`text-[13px] font-semibold transition-colors ${filters.onlyAvailable ? 'text-navy' : 'text-gray-700'}`}>
            Tersedia
          </span>
        </button>

        <div className="w-px h-6 bg-gray-200 mx-1" />

        {/* Gender Dropdown */}
        <div className="relative group">
          <button className="flex items-center gap-1.5 px-3 py-2 text-[13px] font-semibold text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
            {GENDER_LABELS[filters.gender]}
            <ChevronDown size={14} className="text-gray-400" />
          </button>
          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg py-1 min-w-[130px] z-50 hidden group-hover:block">
            {GENDER_OPTIONS.map(g => (
              <button
                key={g}
                onClick={() => setGender(g)}
                className={`w-full text-left px-4 py-2 text-[13px] font-medium transition-colors hover:bg-gray-50 ${
                  filters.gender === g ? 'text-navy font-bold' : 'text-gray-700'
                }`}
              >
                {g === 'Semua' ? 'Semua Gender' : g}
              </button>
            ))}
          </div>
        </div>

        <div className="w-px h-6 bg-gray-200 mx-1" />

        {/* Price Dropdown */}
        <div className="relative group">
          <button className="flex items-center gap-1.5 px-3 py-2 text-[13px] font-semibold text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
            {PRICE_LABELS[filters.priceRange]}
            <ChevronDown size={14} className="text-gray-400" />
          </button>
          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg py-1 min-w-[150px] z-50 hidden group-hover:block">
            {PRICE_OPTIONS.map(p => (
              <button
                key={p}
                onClick={() => setPriceRange(p)}
                className={`w-full text-left px-4 py-2 text-[13px] font-medium transition-colors hover:bg-gray-50 ${
                  filters.priceRange === p ? 'text-navy font-bold' : 'text-gray-700'
                }`}
              >
                {p === 'Semua' ? 'Semua Harga' : PRICE_LABELS[p]}
              </button>
            ))}
          </div>
        </div>

        <div className="w-px h-6 bg-gray-200 mx-1" />

        {/* Fasilitas Dropdown (placeholder UI) */}
        <div className="relative group">
          <button className="flex items-center gap-1.5 px-3 py-2 text-[13px] font-semibold text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
            Fasilitas
            <ChevronDown size={14} className="text-gray-400" />
          </button>
          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg py-1 min-w-[160px] z-50 hidden group-hover:block">
            {['WiFi', 'AC', 'KM Dalam', 'Parkir', 'Laundry', 'Dapur', 'TV', 'Gym'].map(f => (
              <button
                key={f}
                className="w-full text-left px-4 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Clear All */}
        {hasActiveFilter && (
          <button
            onClick={resetFilters}
            className="ml-auto flex items-center gap-1.5 text-[12px] font-semibold text-gray-400 border border-gray-300 rounded-md px-3 py-1.5 hover:border-navy hover:text-navy transition-all"
          >
            <X size={12} />
            CLEAR ALL
          </button>
        )}
        {!hasActiveFilter && (
          <button
            onClick={resetFilters}
            className="ml-auto text-[12px] font-semibold text-gray-300 border border-gray-200 rounded-md px-3 py-1.5"
          >
            CLEAR ALL
          </button>
        )}
      </div>
    </div>
  )
}
