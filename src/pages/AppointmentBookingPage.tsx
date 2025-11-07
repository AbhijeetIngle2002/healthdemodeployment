import AppointmentBookingForm from '../components/Forms/AppointmentBookingForm'

export default function AppointmentBookingPage() {
  return (
    <div className="animate-fade-in">
      <h1 className="mb-8 text-2xl font-semibold text-gray-900">
        Schedule Appointment
      </h1>
      <div className="card">
        <AppointmentBookingForm />
      </div>
    </div>
  )
}