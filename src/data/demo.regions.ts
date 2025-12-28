import { regions } from "./regions";

export const KOTA = regions.flatMap((region) => region.kota).map((city) => ({
    value: city,
    label: city,
}))