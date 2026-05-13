import { motion } from 'framer-motion'
import { MapPin, Star, Wifi, AirVent, ShowerHead, ParkingSquare, Tv, Dumbbell, WashingMachine, UtensilsCrossed } from 'lucide-react'
import type { Kost } from '../types/kost'

const FACILITY_ICON: Record<string, React.ReactNode> = {
  WiFi:      <Wifi size={11} />,
  AC:        <AirVent size={11} />,
  'KM Dalam': <ShowerHead size={11} />,
  Parkir:    <ParkingSquare size={11} />,
  TV:        <Tv size={11} />,
  Gym:       <Dumbbell size={11} />,
  Laundry:   <WashingMachine size={11} />,
  Dapur:     <UtensilsCrossed size={11} />,
}

const GENDER_STYLE: Record<Kost['gender'], string> = {
  Putra:  'bg-blue-50 border-blue-300 text-blue-700',
  Putri:  'bg-pink-50 border-pink-300 text-pink-700',
  Campur: 'bg-purple-50 border-purple-300 text-purple-700',
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price)
}

function buildWaUrl(kost: Kost) {
  const msg = encodeURIComponent(
    `Halo, saya tertarik dengan *${kost.name}* seharga *${formatPrice(kost.price)}/bulan*. Apakah masih tersedia?`
  )
  return `https://wa.me/${kost.whatsappNumber}?text=${msg}`
}

interface Props {
  kost: Kost
  index: number
}

export default function KostCard({ kost, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className={`bg-white rounded-2xl overflow-hidden border transition-all duration-200 hover:shadow-card-hover ${
        kost.isAvailable
          ? 'border-gray-200 shadow-card hover:-translate-y-0.5'
          : 'border-gray-100 shadow-sm opacity-60'
      }`}
    >
      {/* Image */}
      <div className="relative h-[148px] overflow-hidden bg-gray-100">
        <img
          src={kost.image}
          alt={kost.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />

        {/* Availability badge */}
        {kost.isAvailable ? (
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-green-600 text-white text-[9px] font-bold px-2.5 py-1 rounded-full shadow-green-glow">
            <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse shadow-[0_0_6px_rgba(134,239,172,1)]" />
            Tersedia
          </div>
        ) : (
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-black/55 text-white/80 text-[9px] font-bold px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
            Penuh
          </div>
        )}

        {/* Gender tag */}
        <span className={`absolute top-2.5 right-2.5 text-[9px] font-semibold px-2 py-0.5 rounded-lg border ${GENDER_STYLE[kost.gender]}`}>
          {kost.gender}
        </span>
      </div>

      {/* Body */}
      <div className="p-3.5">
        {/* Name + Rating */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-[13px] font-bold text-gray-900 leading-tight line-clamp-1">{kost.name}</h3>
          <div className="flex items-center gap-1 shrink-0">
            <Star size={11} className="fill-amber-400 text-amber-400" />
            <span className="text-[10px] font-bold text-amber-500">{Number(kost.rating).toFixed(1)}</span>
            <span className="text-[9px] text-gray-400">({ Number(kost.totalReviews)})</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 mb-2.5">
          <MapPin size={10} className="text-gold-dark shrink-0" />
          <span className="text-[11px] text-gray-400 truncate">{kost.location}</span>
        </div>

        {/* Facilities */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {kost.facilities.slice(0, 4).map(f => (
            <span key={f} className="flex items-center gap-1 text-[10px] text-gray-600">
              <span className="text-navy">{FACILITY_ICON[f] ?? null}</span>
              {f}
            </span>
          ))}
          {kost.facilities.length > 4 && (
            <span className="text-[10px] text-gray-400">+{kost.facilities.length - 4}</span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2.5 border-t border-gray-100 gap-2">
          {/* WhatsApp */}
          <a
            href={kost.isAvailable ? buildWaUrl(kost) : undefined}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 min-w-0 ${!kost.isAvailable ? 'pointer-events-none' : ''}`}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${kost.isAvailable ? 'bg-green-500' : 'bg-gray-300'}`}>
              {/* WhatsApp SVG */}
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white">
                <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.17 1.6 5.99L0 24l6.18-1.62A11.95 11.95 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52zm-8.52 18.4a9.9 9.9 0 0 1-5.05-1.38l-.36-.22-3.73.98.99-3.62-.23-.37A9.94 9.94 0 0 1 2.1 12 9.9 9.9 0 0 1 12 2.1a9.9 9.9 0 0 1 9.9 9.9 9.9 9.9 0 0 1-9.9 9.88zm5.44-7.4c-.3-.15-1.77-.87-2.04-.97s-.47-.15-.67.15-.77.97-.94 1.17-.35.22-.65.07a8.15 8.15 0 0 1-2.4-1.48 9 9 0 0 1-1.66-2.07c-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5s.05-.37-.02-.52-.67-1.62-.92-2.22c-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37s-1.04 1.02-1.04 2.48 1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.09 4.49.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z"/>
              </svg>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[9px] text-gray-400 leading-tight">
                {kost.isAvailable ? 'Hubungi via WhatsApp' : 'Tidak Tersedia'}
              </span>
              <span className="text-[12px] font-bold text-gray-900 truncate">
                {formatPrice(kost.price)}<span className="text-[9px] font-normal text-gray-400">/bln</span>
              </span>
            </div>
          </a>

          {/* Detail Button */}
          <button
            disabled={!kost.isAvailable}
            className={`shrink-0 text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all ${
              kost.isAvailable
                ? 'bg-navy text-gold hover:bg-navy-600'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Lihat Detail
          </button>
        </div>
      </div>
    </motion.div>
  )
}
