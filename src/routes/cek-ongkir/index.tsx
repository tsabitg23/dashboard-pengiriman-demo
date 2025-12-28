import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  ShipmentCheckPriceFormValues,
  shipmentCheckPriceSchema,
} from '@/data/types/shipmentCheckPrice'
import { KOTA } from '@/data/demo.regions'
import ShipmentFeeResult from '@/components/shipments/ShipmentFeeResult'
import { Loader2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { z } from 'zod'
import { Combobox } from '@/components/ui/combobox'

const cekOngkirSearchSchema = z.object({
  origin: z.string().optional(),
  destination: z.string().optional(),
  weight: z.coerce.number().optional(),
})


export const Route = createFileRoute('/cek-ongkir/')({
  component: RouteComponent,
   validateSearch: (search) => cekOngkirSearchSchema.parse(search),
})

function RouteComponent() {
  const navigate = Route.useNavigate()
  const search = Route.useSearch()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const hasResult = useMemo(() => {
    return Boolean(
      search.origin &&
        search.destination &&
        typeof search.weight === 'number' &&
        search.weight > 0,
    )
  }, [search.destination, search.origin, search.weight])

  const form = useForm<ShipmentCheckPriceFormValues>({
    resolver: zodResolver(shipmentCheckPriceSchema),
    defaultValues: {
      id: '',
      originCityId: search.origin ?? '',
      destinationCityId: search.destination ?? '',
      originCityName: '',
      destinationCityName: '',
      weight: search.weight ?? 0,
      price: 0,
    },
  })

  useEffect(() => {
    form.reset({
      ...form.getValues(),
      originCityId: search.origin ?? '',
      destinationCityId: search.destination ?? '',
      weight: search.weight ?? 0,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search.origin, search.destination, search.weight])

  async function onSubmit(data: ShipmentCheckPriceFormValues) {
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    await navigate({
      to: '/cek-ongkir',
      search: (prev) =>
        ({
          ...prev,
          origin: data.originCityId,
          destination: data.destinationCityId,
          weight: data.weight,
        }) as unknown as typeof prev,
      replace: true,
    })

    setIsSubmitting(false)
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Cek Ongkos Kirim</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="originCityId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kota Asal</FormLabel>
                    <FormControl>
                      <Combobox
                        items={KOTA}
                        initialSelectedValue={field.value}
                        onSelect={field.onChange}
                        defaultLabel="Pilih kota asal..."
                        searchPlaceholder="Cari kota asal..."
                        noItemPlaceholder="Kota asal tidak ditemukan."
                        isDisabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="destinationCityId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kota Tujuan</FormLabel>
                    <FormControl>
                      <Combobox
                        items={KOTA}
                        initialSelectedValue={field.value}
                        onSelect={field.onChange}
                        defaultLabel="Pilih kota tujuan..."
                        searchPlaceholder="Cari kota tujuan..."
                        noItemPlaceholder="Kota tujuan tidak ditemukan."
                        isDisabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-4">
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Berat (KG)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled={isSubmitting}
                          value={field.value === 0 ? '' : String(field.value)}
                          onChange={(e) => {
                            const value = e.target.value
                            field.onChange(value === '' ? 0 : Number(value))
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end pt-4">
                <Button type="submit" size="lg" disabled={isSubmitting}>
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Lihat Harga
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {hasResult && search.origin && search.destination && search.weight && (
        <ShipmentFeeResult
          origin={search.origin}
          destination={search.destination}
          weight={search.weight}
        />
      )}
    </div>
  )
}
