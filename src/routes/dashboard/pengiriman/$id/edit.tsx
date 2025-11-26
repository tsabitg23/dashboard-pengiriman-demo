import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { ChevronLeft, Save } from 'lucide-react'
import type { z } from 'zod'

// Helper & Components
import { getShipmentById, shipmentSchema } from '@/lib/data.ts'
import { Button } from '@/components/ui/button.tsx'
import { Input } from '@/components/ui/input.tsx'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.tsx'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx'
import { Separator } from '@/components/ui/separator.tsx'

type ShipmentFormValues = z.infer<typeof shipmentSchema>

export const Route = createFileRoute('/dashboard/pengiriman/$id/edit')({
  loader: async ({ params }) => {
    const shipment = await getShipmentById(params.id)
    if (!shipment) {
      throw new Error('Pengiriman tidak ditemukan')
    }
    return { shipment }
  },
  component: EditShipmentPage,
})

function EditShipmentPage() {
  const { shipment } = Route.useLoaderData()
  const navigate = useNavigate()

  const form = useForm<ShipmentFormValues>({
    resolver: zodResolver(shipmentSchema),
    defaultValues: {
      ...shipment,
      // Pastikan nilai undefined diubah menjadi string kosong agar input terkontrol
      tanggalDiterima: shipment.tanggalDiterima ?? '',
      tanggalInvoiceBalik: shipment.tanggalInvoiceBalik ?? '',
      tanggalAngkutExpedisiLain: shipment.tanggalAngkutExpedisiLain ?? '',
      noPolisiExpedisiLain: shipment.noPolisiExpedisiLain ?? '',
      driverExpedisiLain: shipment.driverExpedisiLain ?? '',
    },
  })

  function onSubmit(data: ShipmentFormValues) {
    console.log('Data Update Disubmit:', data)

    // Di sini nanti panggil API update

    toast.success('Berhasil!', {
      description: 'Status pengiriman berhasil diperbarui.',
    })

    navigate({ to: '/dashboard/pengiriman' })
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-3xl">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link to="/dashboard/pengiriman">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Update Status Pengiriman</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Bagian 1: Informasi Utama (Read Only / Disabled untuk konteks) */}
          <Card>
            <CardHeader>
              <CardTitle>Info Pengiriman</CardTitle>
              <CardDescription>
                Detail pengiriman dasar (ID: {shipment.id})
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground">No. Resi</span>
                <Input disabled value={shipment.resi} />
              </div>
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground">Barang</span>
                <Input disabled value={shipment.barang} />
              </div>
            </CardContent>
          </Card>

          {/* Bagian 2: Update Status & Tracking */}
          <Card className="border-blue-200 dark:border-blue-900 shadow-sm">
            <CardHeader className="bg-blue-50 dark:bg-blue-950/20 rounded-t-xl">
              <CardTitle className="text-blue-700 dark:text-blue-400">
                Update Tracking & Status
              </CardTitle>
              <CardDescription>
                Lengkapi informasi pergerakan barang di bawah ini.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              {/* Status Penerimaan */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="tanggalDiterima"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tgl. Barang Diterima (Customer)</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tanggalInvoiceBalik"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tgl. Invoice Balik (Kantor Pusat)</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              {/* Info Expedisi Lain (Vendor) */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold">
                  Operan ke Expedisi Lain
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="tanggalAngkutExpedisiLain"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tgl. Angkut</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="noPolisiExpedisiLain"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>No. Polisi Kendaraan</FormLabel>
                        <FormControl>
                          <Input placeholder="B 1234 XX" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="driverExpedisiLain"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Sopir</FormLabel>
                        <FormControl>
                          <Input placeholder="Nama driver..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              type="button"
              onClick={() => navigate({ to: '/dashboard/pengiriman' })}
            >
              Batal
            </Button>
            <Button type="submit" className="min-w-[150px]">
              <Save className="mr-2 h-4 w-4" />
              Simpan Update
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
