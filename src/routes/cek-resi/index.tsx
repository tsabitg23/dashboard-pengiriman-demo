import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/cek-resi/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/cek-resi/"!</div>
}
