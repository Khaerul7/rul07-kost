import { useState } from 'react'
import Navbar from './components/Navbar'
import FilterBar from './components/FilterBar'
import KostGrid from './components/KostGrid'
import TambahKostModal from './components/TambahKostModal'

export default function App() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onTambahKost={() => setModalOpen(true)} />
      <FilterBar />
      <KostGrid />
      <TambahKostModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}
