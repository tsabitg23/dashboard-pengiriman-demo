import { z } from 'zod'

export const shipmentSchema = z.object({
    id: z.string(),
    originCityId: z.string().min(1, { message: 'Kota asal wajib diisi.' }),
    destinationCityId: z
        .string()
        .min(1, { message: 'Kota tujuan wajib diisi.' }),
    weight: z.number().min(1, { message: 'Berat wajib diisi.' }),
    price: z.number(),
})

export type Shipment = z.infer<typeof shipmentSchema>
