import MedicalRecordForm from '../components/Forms/MedicalRecordForm'

export default function MedicalRecordPage() {
  return (
    <div className="animate-fade-in">
      <h1 className="mb-8 text-2xl font-semibold text-gray-900">
        Add Medical Record
      </h1>
      <div className="card">
        <MedicalRecordForm />
      </div>
    </div>
  )
}