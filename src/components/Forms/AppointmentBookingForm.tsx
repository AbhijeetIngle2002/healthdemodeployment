import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  CalendarIcon,
  UserIcon,
  BuildingOfficeIcon,
  DevicePhoneMobileIcon,
  ClockIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline'
import { format } from 'date-fns'
import Button from '../UI/Button'

interface AppointmentFormData {
  patientId: string
  department: string
  doctor: string
  date: string
  time: string
  type: 'in-person' | 'telemedicine'
  reason: string
}

const departments = [
  'General',
  'Cardiology',
  'Pediatrics',
  'Orthopedics',
  'Neurology',
  'Dermatology',
]

const doctors = {
  General: ['Dr. John Smith', 'Dr. Sarah Johnson'],
  Cardiology: ['Dr. Michael Brown', 'Dr. Emily Wilson'],
  Pediatrics: ['Dr. David Miller', 'Dr. Laura Thompson'],
  Orthopedics: ['Dr. James Anderson', 'Dr. Robert Clark'],
  Neurology: ['Dr. Patricia White', 'Dr. Richard Moore'],
  Dermatology: ['Dr. Lisa Davis', 'Dr. Thomas Wright'],
}

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
]

// Type definitions for helper components
interface InputWithIconProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  id: string
  icon: React.ComponentType<{ className?: string }>
  error?: { message?: string }
}

interface TextAreaWithIconProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  id: string
  icon: React.ComponentType<{ className?: string }>
  error?: { message?: string }
}

interface SelectWithIconProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  id: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
  error?: { message?: string }
  register: any
  onCustomChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  disabled?: boolean
}

export default function AppointmentBookingForm() {
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentFormData>()

  const selectedDate = watch('date')
  const today = format(new Date(), 'yyyy-MM-dd')

  const onSubmit = async () => {
    setShowConfirmation(true)
  }

  // Helper: Input with icon
  const InputWithIcon = ({ label, id, icon: Icon, error, ...rest }: InputWithIconProps) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          id={id}
          className="block w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
          {...rest}
        />
      </div>
      {error?.message && (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <span className="mr-1">⚠</span> {error.message}
        </p>
      )}
    </div>
  )

  // Helper: Textarea with icon
  const TextAreaWithIcon = ({ label, id, icon: Icon, error, ...rest }: TextAreaWithIconProps) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <div className="absolute top-3 left-3 pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <textarea
          id={id}
          className="block w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
          {...rest}
        />
      </div>
      {error?.message && (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <span className="mr-1">⚠</span> {error.message}
        </p>
      )}
    </div>
  )

  // Helper: Select with icon (now correctly handles register + custom onChange)
  const SelectWithIcon = ({
    label,
    id,
    icon: Icon,
    children,
    error,
    register,
    onCustomChange,
    disabled = false,
  }: SelectWithIconProps) => {
    const { onChange, ...restRegister } = register

    return (
      <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
          <select
            id={id}
            disabled={disabled}
            className={`block w-full pl-10 pr-8 py-2.5 rounded-lg border ${
              disabled ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-900'
            } border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 appearance-none transition-all`}
            onChange={(e) => {
              onChange(e) // react-hook-form
              if (onCustomChange) onCustomChange(e) // custom logic
            }}
            {...restRegister}
          >
            {children}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {error?.message && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <span className="mr-1">⚠</span> {error.message}
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg ring-1 ring-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-sky-50 to-emerald-50 px-6 py-5 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/80 rounded-lg">
              <CalendarIcon className="h-6 w-6 text-sky-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Schedule an Appointment</h2>
              <p className="text-sm text-gray-600">Fill in the details below to book your visit</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <InputWithIcon
              label="Patient"
              id="patientId"
              icon={UserIcon}
              type="text"
              placeholder="Search for patient..."
              {...register('patientId', { required: 'Patient is required' })}
              error={errors.patientId}
            />

            <SelectWithIcon
              label="Department"
              id="department"
              icon={BuildingOfficeIcon}
              error={errors.department}
              register={register('department', { required: 'Department is required' })}
              onCustomChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="">Select department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </SelectWithIcon>

            <SelectWithIcon
              label="Doctor"
              id="doctor"
              icon={UserIcon}
              error={errors.doctor}
              disabled={!selectedDepartment}
              register={register('doctor', { required: 'Doctor is required' })}
            >
              <option value="">Select doctor</option>
              {selectedDepartment &&
                doctors[selectedDepartment as keyof typeof doctors]?.map((doctor) => (
                  <option key={doctor} value={doctor}>
                    {doctor}
                  </option>
                ))}
            </SelectWithIcon>

            <SelectWithIcon
              label="Appointment Type"
              id="type"
              icon={DevicePhoneMobileIcon}
              error={errors.type}
              register={register('type', { required: 'Type is required' })}
            >
              <option value="">Select type</option>
              <option value="in-person">In-person</option>
              <option value="telemedicine">Telemedicine</option>
            </SelectWithIcon>

            <InputWithIcon
              label="Date"
              id="date"
              icon={CalendarIcon}
              type="date"
              min={today}
              {...register('date', { required: 'Date is required' })}
              error={errors.date}
            />

            <SelectWithIcon
              label="Time"
              id="time"
              icon={ClockIcon}
              error={errors.time}
              disabled={!selectedDate}
              register={register('time', { required: 'Time is required' })}
            >
              <option value="">Select time</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </SelectWithIcon>
          </div>

          <div>
            <TextAreaWithIcon
              label="Reason for Visit"
              id="reason"
              icon={DocumentTextIcon}
              rows={3}
              placeholder="Briefly describe your symptoms or reason for visit..."
              {...register('reason', { required: 'Reason is required' })}
              error={errors.reason}
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              isLoading={isSubmitting}
              className="px-6 py-2.5"
            >
              Schedule Appointment
            </Button>
          </div>
        </form>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="relative transform rounded-2xl bg-white px-6 py-8 text-center shadow-xl transition-all w-full max-w-md mx-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <CalendarIcon className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-900">Appointment Scheduled!</h3>
            <p className="mt-3 text-sm text-gray-600 px-4">
              Your appointment has been scheduled successfully. You will receive a confirmation email shortly.
            </p>
            <div className="mt-6">
              <Button
                type="button"
                className="w-full px-4 py-2.5"
                onClick={() => setShowConfirmation(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}