import PatientRegistrationForm from '../components/Forms/PatientRegistrationForm'

export default function PatientRegistrationPage() {
  return (
    <div className="animate-fade-in">
      <h1 className="mb-8 text-2xl font-semibold text-gray-900">
        Patient Registration
      </h1>
      <div className="card">
        <PatientRegistrationForm />
      </div>
    </div>
  )
}