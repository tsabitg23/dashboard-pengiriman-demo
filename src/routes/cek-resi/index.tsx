import React from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import type { z } from 'zod'
import { cekResiSchema } from '@/lib/data.ts'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Button } from '@/components/ui/button.tsx'


export const Route = createFileRoute('/cek-resi/')({
  component: RouteComponent,
})

type cekResiFormValues = z.infer<typeof cekResiSchema>
function RouteComponent() {
  const navigate = useNavigate()

  const form = useForm<cekResiFormValues>({
    resolver: zodResolver(cekResiSchema),
    defaultValues: {
      resi: "",
    },
  })
  function onSubmit(data: cekResiFormValues) {
    if (data.resi === "") {
      toast.error("Error!", {
        description: "Mohon isi no resi pada field resi.",
      })
      return
    }
    const dataBaru = {
      ...data,
      id: `P-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`
    }

    console.log("Form sukses disubmit:", dataBaru)

    toast.success("Sukses!", {
      description: "No resi telah terbaca.",
    })

    // Redirect ke halaman detail resi setelah sukses
    // navigate({ to: `/cek-resi/${data.resi}` })
    // @ts-ignore Navigasi hardcode untuk sementara
      navigate({ to: '/cek-resi/JNE-1234567' })
  }

  return (
    <div className="container mx-auto py-10 px-4 text-center items-center flex flex-col justify-center h-full">
      <h1 className="text-5xl font-bold mb-6">Cek Resi</h1>
      <h2 className="text-2xl mb-6">Masukkan nomor resi-mu.</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">

          {/* Row 1 */}
          <div className={"flex justify-center"}>
            <FormField
              control={form.control}
              name="resi"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="JNE-XXXXX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-center pt-4">
            <Button type="submit" size="lg">Cek Pengiriman</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
