import { Link, createFileRoute } from '@tanstack/react-router'
import { ChevronLeft } from 'lucide-react'
import { getShipmentById } from '@/lib/data'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export const Route = createFileRoute('/dashboard/pengiriman/$id/')({
  // Loader untuk mengambil data berdasarkan ID dari URL
  loader: async ({ params }) => {
    const shipment = await getShipmentById(params.id)
    if (!shipment) {
      throw new Error('Pengiriman tidak ditemukan')
    }
    return { shipment }
  },
  component: ShipmentDetailComponent,
})

function ShipmentDetailComponent() {
  const { shipment } = Route.useLoaderData()

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <div className="mb-6">
        <Button variant="outline" asChild>
          <Link to="/dashboard/pengiriman">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Kembali ke List
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Detail Pengiriman: {shipment.id}</CardTitle>
          <CardDescription>No. Resi: {shipment.resi}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Informasi Barang */}
            <div className="space-y-1">
              <h3 className="font-semibold text-sm text-muted-foreground">Barang</h3>
              <p className="text-lg font-medium">{shipment.barang}</p>
            </div>

            <div className="space-y-1">
              <h3 className="font-semibold text-sm text-muted-foreground">Berat</h3>
              <p className="text-lg font-medium">{shipment.berat} KG</p>
            </div>

            <div className="space-y-1">
              <h3 className="font-semibold text-sm text-muted-foreground">Tanggal Pengiriman</h3>
              <p className="text-lg">{shipment.tanggalKirim}</p>
            </div>

            <div className="space-y-1">
              <h3 className="font-semibold text-sm text-muted-foreground">PIC</h3>
              <p className="text-lg">{shipment.pic}</p>
            </div>
          </div>

          <div className="border-t pt-4 mt-4">
            <h3 className="font-semibold mb-4">Informasi Tujuan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <h3 className="font-semibold text-sm text-muted-foreground">Nama PT/CV</h3>
                <p>{shipment.namaPTCV}</p>
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-sm text-muted-foreground">Alamat PT/CV</h3>
                <p>{shipment.alamatPTCV}</p>
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-sm text-muted-foreground">Alamat Pelanggan</h3>
                <p>{shipment.alamatPelanggan}</p>
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-sm text-muted-foreground">Alamat Tujuan Akhir</h3>
                <p>{shipment.alamatTujuan}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}