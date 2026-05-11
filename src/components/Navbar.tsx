import { Home, Plus, LogIn } from 'lucide-react'

interface NavbarProps {
  onTambahKost: () => void
}

export default function Navbar({ onTambahKost }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-screen-xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-navy flex items-center justify-center">
            <Home size={15} className="text-gold" />
          </div>
          <span className="font-display text-[20px] leading-none">
            <span className="text-navy">RUL07</span>
            <span className="text-gold-dark">KOST</span>
          </span>
        </a>

        {/* Nav links */}
        <div className="flex items-center gap-5">
          <a href="#" className="text-[13px] font-medium text-gray-500 hover:text-navy transition-colors hidden sm:block">
            Beranda
          </a>
          <a href="#" className="text-[13px] font-medium text-gray-500 hover:text-navy transition-colors hidden sm:block">
            Tentang
          </a>

          {/* Tambah Kost */}
          <button
            onClick={onTambahKost}
            className="flex items-center gap-1.5 text-[12px] font-bold text-navy border-[1.5px] border-navy rounded-full px-4 py-1.5 hover:bg-navy hover:text-gold transition-all duration-200"
          >
            <Plus size={13} strokeWidth={2.5} />
            Tambah Kost
          </button>

          {/* Masuk */}
          <button className="flex items-center gap-1.5 text-[12px] font-bold text-gold bg-navy rounded-full px-4 py-1.5 hover:bg-navy-600 transition-colors">
            <LogIn size={13} strokeWidth={2.5} />
            Masuk
          </button>
        </div>
      </div>
    </nav>
  )
}
