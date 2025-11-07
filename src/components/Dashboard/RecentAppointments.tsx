import { format } from 'date-fns'
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'

const appointments = [
  {
    id: 1,
    patient: 'Sarah Wilson',
    date: new Date(),
    doctor: 'Dr. Michael Brown',
    status: 'scheduled',
  },
  {
    id: 2,
    patient: 'James Anderson',
    date: new Date(),
    doctor: 'Dr. Emily Carter',
    status: 'completed',
  },
  {
    id: 3,
    patient: 'Emma Thompson',
    date: new Date(),
    doctor: 'Dr. David Miller',
    status: 'cancelled',
  },
  {
    id: 4,
    patient: 'Oliver Davis',
    date: new Date(),
    doctor: 'Dr. Sarah Johnson',
    status: 'scheduled',
  },
  {
    id: 5,
    patient: 'Sophia Martin',
    date: new Date(),
    doctor: 'Dr. Robert Wilson',
    status: 'scheduled',
  },
]

export default function RecentAppointments() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-50 text-blue-700 ring-blue-600/20'
      case 'completed':
        return 'bg-green-50 text-green-700 ring-green-600/20'
      case 'cancelled':
        return 'bg-red-50 text-red-700 ring-red-600/20'
      default:
        return 'bg-gray-50 text-gray-700 ring-gray-600/20'
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
              Patient
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Date/Time
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Doctor
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Status
            </th>
            <th className="relative py-3.5 pl-3 pr-4 sm:pr-0">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                {appointment.patient}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {format(appointment.date, 'MMM d, yyyy h:mm a')}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {appointment.doctor}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm">
                <span
                  className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getStatusColor(
                    appointment.status
                  )}`}
                >
                  {appointment.status}
                </span>
              </td>
              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm sm:pr-0">
                <button className="text-gray-400 hover:text-gray-500">
                  <EllipsisHorizontalIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}