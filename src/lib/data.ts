import { z } from "zod"

// Definisikan skema untuk validasi data pengiriman
export const shipmentSchema = z.object({
    id: z.string(),
    resi: z.string(),
    barang: z.string(),
    tanggalKirim: z.string(),
    namaPTCV: z.string(),
    alamatPelanggan: z.string(),
    alamatPTCV: z.string(),
    alamatTujuan: z.string(),
    pic: z.string(),
    berat: z.number(),
})

export type Shipment = z.infer<typeof shipmentSchema>

// Data dummy
export const dummyData: Array<Shipment> = [
    {
        id: "P-001",
        resi: "JNE-1234567",
        barang: "Spare Part Excavator",
        tanggalKirim: "2025-11-10",
        namaPTCV: "PT. Maju Jaya",
        alamatPelanggan: "Jl. Melati No. 12, Jakarta",
        alamatPTCV: "Jl. Industri No. 88, Bekasi",
        alamatTujuan: "Gudang A1, Cikarang",
        pic: "Budi",
        berat: 12
    },
    {
        id: "P-002",
        resi: "SICEPAT-98765",
        barang: "Dokumen Penting",
        tanggalKirim: "2025-11-11",
        namaPTCV: "CV. Abadi Sentosa",
        alamatPelanggan: "Jl. Kenanga No. 5, Bandung",
        alamatPTCV: "Jl. Raya Timur No. 44, Bandung",
        alamatTujuan: "Kantor Pusat Surabaya",
        pic: "Andi",
        berat: 2
    },
    {
        id: "P-003",
        resi: "ANTERAJA-55511",
        barang: "Komponen Mesin",
        tanggalKirim: "2025-11-09",
        namaPTCV: "PT. Bina Pertiwi",
        alamatPelanggan: "Jl. Mawar No. 77, Tangerang",
        alamatPTCV: "Jl. Pabrik Baja No. 21, Karawang",
        alamatTujuan: "Workshop Utama Semarang",
        pic: "Slamet",
        berat: 5
    },
]

export const getShipmentById = async (id: string): Promise<Shipment | undefined> => {
  // Simulasi delay network
  await new Promise((r) => setTimeout(r, 100))
  return dummyData.find((shipment) => shipment.id === id)
}

export const ptCvList = [
    "PT. Maju Jaya",
    "CV. Abadi Sentosa",
    "PT. Bina Pertiwi",
] as const // 'as const' membuatnya read-only (good practice)