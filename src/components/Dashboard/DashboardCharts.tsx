import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

const appointmentData = [
  { month: 'Jan', appointments: 65 },
  { month: 'Feb', appointments: 78 },
  { month: 'Mar', appointments: 85 },
  { month: 'Apr', appointments: 91 },
  { month: 'May', appointments: 76 },
  { month: 'Jun', appointments: 82 },
]

const departmentData = [
  { name: 'General', value: 400 },
  { name: 'Cardiology', value: 300 },
  { name: 'Pediatrics', value: 200 },
  { name: 'Orthopedics', value: 150 },
]

const COLORS = ['#0EA5E9', '#8B5CF6', '#10B981', '#F59E0B']

// Safe label function — accepts Recharts' actual props
const renderCustomPieLabel = (props: Record<string, any>) => {
  const { name, percent } = props
  // Only show label if percent is available and meaningful (>=5%)
  if (typeof percent !== 'number' || percent < 0.05) return ''
  return `${name} ${Math.round(percent * 100)}%`
}

export default function DashboardCharts() {
  return (
    <div className="space-y-6">
      {/* Appointments Area Chart */}
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={appointmentData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="appointments"
              stroke="#0EA5E9"
              fill="#0EA5E9"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Department Distribution Pie Chart */}
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={departmentData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              label={renderCustomPieLabel}
            >
              {departmentData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}