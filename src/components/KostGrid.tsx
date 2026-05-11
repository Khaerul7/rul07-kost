import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, SearchX, ChevronDown } from 'lucide-react'
import KostCard from './KostCard'
import { useFilterStore } from '../store/useFilterStore'
import { useKosts } from '../hooks/useKosts'

export default function KostGrid() {
  const { filters, visibleCount, loadMore } = useFilterStore()
  const { filtered, loading, error } = useKosts(filters)

  const visible = filtered.slice(0, visibleCount)
  const hasMore  = visibleCount < filtered.length

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-5">
      {/* Meta row */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-[13px] text-gray-400">
          {loading
            ? 'Memuat kost...'
            : <span>Menampilkan <strong className="text-navy">{visible.length}</strong> dari <strong className="text-navy">{filtered.length}</strong> kost ditemukan</span>
          }
        </p>
        <select className="text-[12px] bg-white border border-gray-200 text-gray-500 px-3 py-1.5 rounded-lg font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-navy/30">
          <option>Urutkan: Relevan</option>
          <option>Harga Termurah</option>
          <option>Rating Tertinggi</option>
        </select>
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
              <div className="h-[148px] bg-gray-100" />
              <div className="p-3.5 space-y-2.5">
                <div className="h-3.5 bg-gray-100 rounded w-3/4" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
                <div className="h-3 bg-gray-100 rounded w-full" />
                <div className="h-8 bg-gray-100 rounded mt-2" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <SearchX size={40} className="text-gray-300 mb-3" />
          <p className="text-gray-500 font-medium">{error}</p>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <SearchX size={44} className="text-gray-300 mb-3" />
          <p className="text-[16px] font-bold text-gray-700 mb-1">Kost tidak ditemukan</p>
          <p className="text-[13px] text-gray-400">Coba ubah atau hapus filter yang aktif.</p>
        </motion.div>
      )}

      {/* Grid */}
      {!loading && !error && filtered.length > 0 && (
        <>
          <AnimatePresence>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {visible.map((kost, i) => (
                <KostCard key={kost.id} kost={kost} index={i} />
              ))}
            </div>
          </AnimatePresence>

          {/* Load More */}
          {hasMore && (
            <div className="flex justify-center mt-8">
              <motion.button
                onClick={loadMore}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 text-[13px] font-bold text-navy border-[1.5px] border-navy rounded-full px-8 py-3 hover:bg-navy hover:text-gold transition-all duration-200"
              >
                <ChevronDown size={15} />
                Lihat Lebih Banyak (+4)
              </motion.button>
            </div>
          )}

          {/* No more */}
          {!hasMore && filtered.length > 4 && (
            <p className="text-center text-[12px] text-gray-300 mt-8">Semua kost sudah ditampilkan</p>
          )}
        </>
      )}
    </div>
  )
}
