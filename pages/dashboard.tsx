import dynamic from 'next/dynamic'

const Dashboard = dynamic(
  () =>
    import('../pages_related/dashboard/dashboard').then((mod) => mod.Dashboard),
  {
    ssr: false,
  }
)

export default function DashboardPage() {
  return <Dashboard />
}
