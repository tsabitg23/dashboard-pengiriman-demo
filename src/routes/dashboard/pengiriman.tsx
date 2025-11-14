import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import type { z } from 'zod'

// --- Impor Komponen & Data ---
// Pastikan path ini benar. '~/...' biasanya alias untuk 'app/...' atau 'src/...'
import type { shipmentSchema } from '@/lib/data.ts';
import { TabelPengiriman } from '@/components/tabel-pengiriman.tsx'
import { pengirimanColumns } from '@/components/pengiriman-columns.tsx'
import { dummyData } from '@/lib/data.ts' // Impor data & skema

// Helper async palsu untuk simulasi pengambilan data
const fetchShipments = async (): Promise<Array<z.infer<typeof shipmentSchema>>> => {
  // Di dunia nyata, ini adalah panggilan API atau DB
  // await new Promise(r => setTimeout(r, 500))
  return dummyData
}

// --- Definisi Rute (Route Definition) ---
export const Route = createFileRoute('/dashboard/pengiriman')({
  // 1. Loader: Mengambil data di sisi server (atau sebelum navigasi)
  loader: async () => {
    console.log("Fetching data untuk rute pengiriman...")
    const shipments = await fetchShipments()
    return { shipments } // Data ini akan diteruskan ke komponen
  },

  // 2. Component: UI yang akan di-render
  component: HalamanPengirimanComponent,
})

// --- Komponen React ---
function HalamanPengirimanComponent() {
  // 3. Ambil data yang sudah dimuat oleh 'loader'
  const { shipments } = useLoaderData({ from: Route.id })

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">List Pengiriman</h1>

      {/* Kirim data ke komponen tabel */}
      <TabelPengiriman columns={pengirimanColumns} data={shipments} />
    </div>
  )
}