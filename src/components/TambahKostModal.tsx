import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Upload, Plus } from 'lucide-react'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const FACILITY_OPTIONS = ['WiFi', 'AC', 'KM Dalam', 'Parkir', 'TV', 'Gym', 'Laundry', 'Dapur']

export default function TambahKostModal({ isOpen, onClose }: Props) {
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)

  const toggleFac = (f: string) =>
    setSelectedFacilities(prev =>
      prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]
    )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => { setSubmitted(false); onClose() }, 1800)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto pointer-events-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <div>
                  <h2 className="font-display text-[18px] text-navy font-bold">Tambah Kost</h2>
                  <p className="text-[12px] text-gray-400 mt-0.5">Daftarkan kost Anda sekarang</p>
                </div>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <X size={18} className="text-gray-500" />
                </button>
              </div>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-14 px-6 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-3"
                  >
                    <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <p className="font-bold text-gray-800 text-[15px]">Kost berhasil didaftarkan!</p>
                  <p className="text-[12px] text-gray-400 mt-1">Tim kami akan menghubungi Anda segera.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-5 space-y-4">
                  {/* Nama Kost */}
                  <div>
                    <label className="block text-[12px] font-semibold text-gray-600 mb-1.5">Nama Kost <span className="text-red-400">*</span></label>
                    <input
                      required
                      type="text"
                      placeholder="cth. Kost Maju Jaya"
                      className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-[13px] text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy transition-all"
                    />
                  </div>

                  {/* Lokasi */}
                  <div>
                    <label className="block text-[12px] font-semibold text-gray-600 mb-1.5">Lokasi <span className="text-red-400">*</span></label>
                    <input
                      required
                      type="text"
                      placeholder="cth. Sudirman, Jakarta Pusat"
                      className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-[13px] text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy transition-all"
                    />
                  </div>

                  {/* Gender & Harga */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[12px] font-semibold text-gray-600 mb-1.5">Jenis Kost <span className="text-red-400">*</span></label>
                      <select required className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-[13px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy transition-all bg-white">
                        <option value="">Pilih...</option>
                        <option>Putra</option>
                        <option>Putri</option>
                        <option>Campur</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[12px] font-semibold text-gray-600 mb-1.5">Harga/Bulan (Rp) <span className="text-red-400">*</span></label>
                      <input
                        required
                        type="number"
                        placeholder="cth. 850000"
                        className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-[13px] text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy transition-all"
                      />
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <label className="block text-[12px] font-semibold text-gray-600 mb-1.5">No. WhatsApp <span className="text-red-400">*</span></label>
                    <input
                      required
                      type="text"
                      placeholder="cth. 628123456789"
                      className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-[13px] text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy transition-all"
                    />
                  </div>

                  {/* Fasilitas */}
                  <div>
                    <label className="block text-[12px] font-semibold text-gray-600 mb-2">Fasilitas</label>
                    <div className="flex flex-wrap gap-2">
                      {FACILITY_OPTIONS.map(f => (
                        <button
                          key={f}
                          type="button"
                          onClick={() => toggleFac(f)}
                          className={`text-[11px] font-semibold px-3 py-1.5 rounded-full border transition-all ${
                            selectedFacilities.includes(f)
                              ? 'bg-navy border-navy text-gold'
                              : 'bg-white border-gray-200 text-gray-600 hover:border-navy hover:text-navy'
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Upload Foto */}
                  <div>
                    <label className="block text-[12px] font-semibold text-gray-600 mb-1.5">Foto Kost</label>
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-navy transition-colors cursor-pointer">
                      <Upload size={22} className="text-gray-300 mx-auto mb-2" />
                      <p className="text-[12px] text-gray-400">Klik atau drag foto ke sini</p>
                      <p className="text-[10px] text-gray-300 mt-0.5">PNG, JPG maks. 5MB</p>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-navy text-gold font-bold text-[13px] py-3 rounded-xl hover:bg-navy-600 transition-all"
                  >
                    <Plus size={15} />
                    Daftarkan Kost
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
