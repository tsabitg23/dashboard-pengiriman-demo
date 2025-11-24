"use client"

import { MoreHorizontal } from "lucide-react"
import { Link } from '@tanstack/react-router'
import type { ColumnDef } from "@tanstack/react-table"
import type { Shipment } from "@/lib/data.ts"
import { Button } from "@/components/ui/button.tsx" // Sesuaikan path import
import { Checkbox } from "@/components/ui/checkbox.tsx" // Sesuaikan path import
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx" // Sesuaikan path import



export const pengirimanColumns: Array<ColumnDef<Shipment>> = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "Code",
  },
  {
    accessorKey: "resi",
    header: "Resi",
  },
  {
    accessorKey: "barang",
    header: "Barang",
  },
  {
    accessorKey: "tanggalKirim",
    header: "Tgl. Pengambilan",
  },
  {
    accessorKey: "alamatPelanggan",
    header: "Alamat Pelanggan",
  },
  {
    accessorKey: "namaPTCV",
    header: "Nama PT/CV",
  },
  {
    accessorKey: "alamatPTCV",
    header: "Alamat PT/CV",
  },
  {
    accessorKey: "alamatTujuan",
    header: "Alamat Tujuan",
  },
  {
    accessorKey: "pic",
    header: "PIC",
  },
  {
    accessorKey: "berat",
    header: "Berat (KG)",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const shipment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Buka menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(shipment.resi)}
            >
              Salin No. Resi
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                to="/dashboard/pengiriman/$id"
                params={{ id: shipment.id }}
                className="cursor-pointer"
              >
                Lihat Detail
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Edit Pengiriman</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">Hapus</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]