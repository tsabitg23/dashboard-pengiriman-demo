import { Card, CardContent } from '@/components/ui/card'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

type ShipmentFeeResultProps = {
	origin: string
	destination: string
	weight: number
}

export default function ShipmentFeeResult({
	origin,
	destination,
	weight,
}: ShipmentFeeResultProps) {
	return (
		<div className="space-y-6">
			<Card>
				<CardContent className="py-6">
					<dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div className="flex gap-4">
							<dt className="w-20 shrink-0 font-semibold text-muted-foreground">
								Dari
							</dt>
							<dd className="font-medium">: {origin.toUpperCase()}</dd>
						</div>
						<div className="flex gap-4">
							<dt className="w-20 shrink-0 font-semibold text-muted-foreground">
								Tujuan
							</dt>
							<dd className="font-medium">: {destination.toUpperCase()}</dd>
						</div>
						<div className="flex gap-4">
							<dt className="w-20 shrink-0 font-semibold text-muted-foreground">
								Berat (Kg)
							</dt>
							<dd className="font-medium">: {weight}</dd>
						</div>
					</dl>
				</CardContent>
			</Card>

			<Card>
				<CardContent className="p-0">
					<Table className="min-w-180">
						<TableHeader>
							<TableRow className="bg-muted/50">
								<TableHead className="px-6">Nama Layanan</TableHead>
								<TableHead className="px-6">Jenis Kiriman</TableHead>
								<TableHead className="px-6">Tarif</TableHead>
								<TableHead className="px-6">ETD (Estimates Days)</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<TableRow>
								<TableCell className="px-6">REG</TableCell>
								<TableCell className="px-6">Document/Paket</TableCell>
								<TableCell className="px-6">IDR 230.000</TableCell>
								<TableCell className="px-6">1-2 D</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="px-6">YES</TableCell>
								<TableCell className="px-6">Document/Paket</TableCell>
								<TableCell className="px-6">IDR 500.000</TableCell>
								<TableCell className="px-6">1-1 D</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="px-6">JTR</TableCell>
								<TableCell className="px-6">Paket</TableCell>
								<TableCell className="px-6">IDR 65.000</TableCell>
								<TableCell className="px-6">4-5 D</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="px-6">JTR&lt;130</TableCell>
								<TableCell className="px-6">Paket</TableCell>
								<TableCell className="px-6">IDR 700.000</TableCell>
								<TableCell className="px-6">4-5 D</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="px-6">JTR&gt;130</TableCell>
								<TableCell className="px-6">Paket</TableCell>
								<TableCell className="px-6">IDR 1.000.000</TableCell>
								<TableCell className="px-6">4-5 D</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="px-6">JTR&gt;200</TableCell>
								<TableCell className="px-6">Paket</TableCell>
								<TableCell className="px-6">IDR 1.350.000</TableCell>
								<TableCell className="px-6">4-5 D</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	)
}