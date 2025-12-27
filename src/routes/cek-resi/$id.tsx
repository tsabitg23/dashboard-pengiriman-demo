import { Link, createFileRoute } from '@tanstack/react-router'
import {
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  Clock,
  Contact,
  FileText,
  MapPin,
  Package,
  Truck,
  User
} from 'lucide-react'
import { getShipmentByResi } from '@/lib/data'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"

// --- Data Dummy untuk Timeline (History) ---
const dummyHistory = [
  {
    date: "2025-11-12",
    time: "14:30",
    status: "DELIVERED",
    description: "Paket diterima oleh [BUDI - YBS]",
    location: "CIKARANG",
    active: true
  },
  {
    date: "2025-11-12",
    time: "08:15",
    status: "WITH DELIVERY COURIER",
    description: "Paket sedang dibawa kurir untuk diantar ke tujuan",
    location: "Cikarang",
    active: false
  },
  {
    date: "2025-11-11",
    time: "23:45",
    status: "RECEIVED AT INBOUND STATION",
    description: "Paket telah tiba di gudang transit [Bekasi]",
    location: "Bekasi",
    active: false
  },
  {
    date: "2025-11-10",
    time: "19:20",
    status: "DEPARTED FROM SORTING HUB",
    description: "Paket berangkat dari gudang sortir utama",
    location: "Jakarta",
    active: false
  },
  {
    date: "2025-11-10",
    time: "10:00",
    status: "SHIPMENT RECEIVED BY JNE COUNTER OFFICER",
    description: "Paket diterima oleh agen JNE [Jakarta Pusat]",
    location: "Jakarta",
    active: false
  }
]

export const Route = createFileRoute('/cek-resi/$id')({
  loader: async ({ params }) => {
    const shipment = await getShipmentByResi(params.id)
    if (!shipment) {
      throw new Error('Resi tidak ditemukan')
    }
    return { shipment }
  },
  component: CekResiDetailComponent,
})

function CekResiDetailComponent() {
  const { shipment } = Route.useLoaderData()

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/cek-resi"> {/* Arahkan balik ke dashboard jika admin */}
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="font-semibold text-lg">Lacak Pengiriman</h1>
            <p className="text-xs text-muted-foreground hidden sm:block">Update terakhir: {dummyHistory[0].date} {dummyHistory[0].time}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6">

        {/* 1. KARTU STATUS UTAMA (Tetap dipertahankan) */}
        <Card className="border-l-4 border-l-blue-600 shadow-sm overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b pb-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle className="text-3xl font-bold text-blue-700 tracking-tight">
                  {shipment.resi}
                </CardTitle>
                <CardDescription className="mt-1 flex items-center gap-2">
                  <span className="font-medium text-slate-900 bg-slate-200 px-2 py-0.5 rounded text-xs">JNE REG</span>
                  <span>•</span>
                  <span>Tgl Kirim: {shipment.tanggalKirim}</span>
                </CardDescription>
              </div>
              <Badge variant="default" className="bg-green-600 hover:bg-green-700 uppercase px-4 py-1 text-sm tracking-wide">
                Delivered
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Pengirim */}
              <div className="flex-1 w-full space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> Pengirim
                </p>
                <div className="pl-4 border-l-2 border-slate-200">
                  <p className="font-semibold text-lg">{shipment.namaPTCV}</p>
                  <p className="text-sm text-slate-500 line-clamp-2">{shipment.alamatPTCV}</p>
                </div>
              </div>

              {/* Icon Panah */}
              <div className="hidden md:flex text-slate-300">
                <Truck className="h-8 w-8 opacity-50" />
              </div>

              {/* Penerima */}
              <div className="flex-1 w-full space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <User className="h-3 w-3" /> Penerima
                </p>
                <div className="pl-4 border-l-2 border-slate-200">
                  <p className="font-semibold text-lg">{shipment.pic}</p>
                  <p className="text-sm text-slate-500 line-clamp-2">{shipment.alamatTujuan}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. BAGIAN TABS (Design Baru) */}
        <Tabs defaultValue="history" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto p-1 bg-slate-100 rounded-xl">
            <TabsTrigger value="history" className="py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">
              <Clock className="h-4 w-4 mr-2" /> History
            </TabsTrigger>
            <TabsTrigger value="status" className="py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">
              <CalendarDays className="h-4 w-4 mr-2" /> Status Detail
            </TabsTrigger>
            <TabsTrigger value="vendor" className="py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">
              <Truck className="h-4 w-4 mr-2" /> Ekspedisi
            </TabsTrigger>
            <TabsTrigger value="info" className="py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">
              <FileText className="h-4 w-4 mr-2" /> Info Barang
            </TabsTrigger>
          </TabsList>

          {/* KONTEN TAB 1: HISTORY */}
          <TabsContent value="history" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Riwayat Perjalanan</CardTitle>
                <CardDescription>Jejak tracking paket secara real-time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative pl-6 border-l-2 border-slate-100 ml-3 space-y-8 py-2">
                  {dummyHistory.map((history, index) => (
                    <div key={index} className="relative group">
                      <span className={`absolute -left-[31px] top-1 h-6 w-6 rounded-full flex items-center justify-center border-4 border-white shadow-sm z-10 transition-colors ${
                        history.active ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                      }`}>
                        {history.active ? <CheckCircle2 className="h-3 w-3" /> : <div className="h-1.5 w-1.5 rounded-full bg-slate-400" />}
                      </span>
                      <div className="flex flex-col sm:flex-row sm:gap-6">
                        <div className="w-28 shrink-0 mb-1 sm:mb-0">
                          <div className="font-bold text-slate-800 text-sm">{history.date}</div>
                          <div className="text-xs text-slate-500 font-mono">{history.time}</div>
                        </div>
                        <div className="flex-1 bg-slate-50/50 p-3 rounded-lg border border-transparent hover:border-slate-100 transition-colors">
                          <p className={`font-bold text-sm ${history.active ? 'text-blue-700' : 'text-slate-700'}`}>
                            {history.status}
                          </p>
                          <p className="text-sm text-slate-600 mt-1">{history.description}</p>
                          {history.location && (
                            <p className="text-xs text-slate-400 mt-2 flex items-center gap-1 uppercase font-semibold">
                              <MapPin className="h-3 w-3" /> {history.location}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* KONTEN TAB 2: STATUS DETAIL */}
          <TabsContent value="status" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Detail Penerimaan & Admin</CardTitle>
                <CardDescription>Informasi administrasi pengiriman</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium w-[200px]">Tanggal Diterima (Customer)</TableCell>
                      <TableCell>{shipment.tanggalDiterima || "-"}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Tanggal Invoice Balik</TableCell>
                      <TableCell>{shipment.tanggalInvoiceBalik || "-"}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Status Pembayaran</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">LUNAS</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Keterangan Tambahan</TableCell>
                      <TableCell className="text-muted-foreground italic">
                        Barang diterima dalam kondisi baik.
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* KONTEN TAB 3: EKSPEDISI LANJUTAN */}
          <TabsContent value="vendor" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Info Ekspedisi Lanjutan</CardTitle>
                <CardDescription>Detail operan ke vendor logistik (jika ada)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="bg-slate-50 p-4 rounded-lg border">
                      <div className="flex items-center gap-3 mb-2">
                        <Truck className="h-5 w-5 text-blue-600" />
                        <h3 className="font-semibold text-sm">Kendaraan & Driver</h3>
                      </div>
                      <Separator className="my-2" />
                      <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
                        <span className="text-muted-foreground">Driver:</span>
                        <span className="font-medium">{shipment.driverExpedisiLain || "-"}</span>
                        <span className="text-muted-foreground">No. Polisi:</span>
                        <span className="font-medium uppercase bg-yellow-100 px-1 rounded w-fit text-yellow-800 border border-yellow-200">
                             {shipment.noPolisiExpedisiLain || "-"}
                           </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-slate-50 p-4 rounded-lg border">
                      <div className="flex items-center gap-3 mb-2">
                        <CalendarDays className="h-5 w-5 text-blue-600" />
                        <h3 className="font-semibold text-sm">Jadwal Angkut</h3>
                      </div>
                      <Separator className="my-2" />
                      <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
                        <span className="text-muted-foreground">Tgl Angkut:</span>
                        <span className="font-medium">{shipment.tanggalAngkutExpedisiLain || "-"}</span>
                        <span className="text-muted-foreground">Estimasi Tiba:</span>
                        <span className="font-medium">-</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* KONTEN TAB 4: INFO BARANG */}
          <TabsContent value="info" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Spesifikasi Barang</CardTitle>
                <CardDescription>Detail fisik paket yang dikirim</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="w-[50px]"><Package className="h-5 w-5 text-slate-400" /></TableCell>
                      <TableCell className="font-medium w-[200px]">Jenis Barang</TableCell>
                      <TableCell>{shipment.barang}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><div className="h-5 w-5 flex items-center justify-center font-bold text-xs border rounded text-slate-500">KG</div></TableCell>
                      <TableCell className="font-medium">Berat Total</TableCell>
                      <TableCell>{shipment.berat} Kg</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><FileText className="h-5 w-5 text-slate-400" /></TableCell>
                      <TableCell className="font-medium">No. Referensi (ID)</TableCell>
                      <TableCell className="font-mono text-slate-600">{shipment.id}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><Contact className="h-5 w-5 text-slate-400" /></TableCell>
                      <TableCell className="font-medium">PIC Customer</TableCell>
                      <TableCell>{shipment.pic}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  )
}