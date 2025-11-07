interface StatCardProps {
  title: string
  value: string | number
  icon: React.ComponentType<{ className?: string }>
  trend?: {
    value: number
    isUpward: boolean
  }
}

export default function StatCard({ title, value, icon: Icon, trend }: StatCardProps) {
  return (
    <div className="card hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className="rounded-full bg-primary/10 p-3">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
      {trend && (
        <div className="mt-4">
          <div className="flex items-center">
            <span
              className={`text-sm font-medium ${
                trend.isUpward ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {trend.isUpward ? '+' : '-'}{trend.value}%
            </span>
            <span className="ml-2 text-sm text-gray-500">from last month</span>
          </div>
        </div>
      )}
    </div>
  )
}