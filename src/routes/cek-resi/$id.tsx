import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/cek-resi/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/cek-resi/$id"!</div>
}
