import { Shipment, shipmentSchema } from './shipment'
import { z } from 'zod'

export const shipmentCheckPriceSchema = shipmentSchema.extend({
  originCityName: z.string(),
  destinationCityName: z.string(),
})
export type ShipmentCheckPriceFormValues = z.infer<typeof shipmentCheckPriceSchema>
