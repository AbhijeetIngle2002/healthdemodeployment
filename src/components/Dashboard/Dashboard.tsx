import {
  UsersIcon,
  CalendarIcon,
  ClipboardDocumentListIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline'
import StatCard from '../UI/StatCard'
import Button from '../UI/Button'
import RecentAppointments from './RecentAppointments'
import DashboardCharts from './DashboardCharts'
import { useNavigate } from "react-router-dom"

const stats = [
  {
    title: 'Total Patients',
    value: '2,543',
    icon: UsersIcon,
    trend: { value: 12, isUpward: true },
  },
  {
    title: "Today's Appointments",
    value: '24',
    icon: CalendarIcon,
    trend: { value: 8, isUpward: true },
  },
  {
    title: 'Pending Reports',
    value: '13',
    icon: ClipboardDocumentListIcon,
    trend: { value: 2, isUpward: false },
  },
  {
    title: 'Monthly Revenue',
    value: '$48,352',
    icon: BanknotesIcon,
    trend: { value: 15, isUpward: true },
  },
]

export default function Dashboard() {
  const navigate = useNavigate(); // ✅ moved inside component

  return (
    <div className="animate-fade-in">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <div className="flex space-x-4">
          <Button onClick={() => navigate("/patients/new")}>
            Add New Patient
          </Button>
          <Button variant="secondary" onClick={() => navigate("/appointments/new")}>
            Schedule Appointment
          </Button>
        </div>
      </div>

      <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card">
          <h2 className="mb-4 text-lg font-medium text-gray-900">
            Recent Appointments
          </h2>
          <RecentAppointments />
        </div>
        <div className="card">
          <h2 className="mb-4 text-lg font-medium text-gray-900">Analytics</h2>
          <DashboardCharts />
        </div>
      </div>
    </div>
  )
}
