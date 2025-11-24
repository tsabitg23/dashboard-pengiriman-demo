import React from "react"
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { ChevronLeft } from "lucide-react"
import type { z } from "zod"

// --- Impor Komponen UI ---
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// --- Impor Skema & Data ---
import { ptCvList, shipmentSchema } from "@/lib/data"

type ShipmentFormValues = z.infer<typeof shipmentSchema>

export const Route = createFileRoute('/dashboard/pengiriman/create')({
  component: CreateShipmentPage,
})

function CreateShipmentPage() {
  const navigate = useNavigate()

  const form = useForm<ShipmentFormValues>({
    resolver: zodResolver(shipmentSchema),
    defaultValues: {
      id: "",
      resi: "",
      barang: "",
      tanggalKirim: "",
      namaPTCV: "PT. Maju Jaya",
      alamatPelanggan: "",
      alamatPTCV: "",
      alamatTujuan: "",
      pic: "",
      berat: 0,
    },
  })

  function onSubmit(data: ShipmentFormValues) {
    const dataBaru = {
      ...data,
      id: `P-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`
    }

    console.log("Form sukses disubmit:", dataBaru)

    toast.success("Sukses!", {
      description: "Data pengiriman baru telah berhasil disimpan.",
    })

    // Redirect kembali ke halaman list setelah sukses
    navigate({ to: '/dashboard/pengiriman' })
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-2xl">
      <div className="mb-6">
        <Button variant="outline" asChild>
          <Link to="/dashboard/pengiriman">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Batal
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Buat Pengiriman Baru</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="resi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>No. Resi</FormLabel>
                      <FormControl>
                        <Input placeholder="JNE-XXXXX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="barang"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Barang</FormLabel>
                      <FormControl>
                        <Input placeholder="Contoh: Sparepart" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="namaPTCV"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama PT/CV</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih PT/CV" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {ptCvList.map((namaPT) => (
                            <SelectItem key={namaPT} value={namaPT}>
                              {namaPT}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tanggalKirim"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tgl. Kirim</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Alamat Fields */}
              <FormField
                control={form.control}
                name="alamatPelanggan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alamat Pelanggan</FormLabel>
                    <FormControl>
                      <Input placeholder="Alamat lengkap pelanggan..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="alamatTujuan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alamat Tujuan</FormLabel>
                    <FormControl>
                      <Input placeholder="Alamat gudang tujuan..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Row 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="pic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PIC</FormLabel>
                      <FormControl>
                        <Input placeholder="Nama Penanggung Jawab" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="berat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Berat (KG)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={e => field.onChange(e.target.valueAsNumber || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end pt-4">
                <Button type="submit" size="lg">Simpan Data</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}