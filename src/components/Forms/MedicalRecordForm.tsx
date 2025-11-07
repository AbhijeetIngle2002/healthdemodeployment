import { useForm } from 'react-hook-form'
import { PaperClipIcon } from '@heroicons/react/24/outline'
import Button from '../UI/Button'

interface MedicalRecordFormData {
  patientId: string
  visitDate: string
  diagnosis: string
  medications: {
    name: string
    dosage: string
    frequency: string
  }[]
  labTests: string[]
  doctorNotes: string
  followUpDate?: string
  files: FileList
}

const labTestOptions = [
  'Complete Blood Count',
  'Blood Sugar',
  'Cholesterol Panel',
  'Thyroid Function',
  'Liver Function',
  'Kidney Function',
  'X-Ray',
  'MRI',
  'CT Scan',
  'Ultrasound',
]

export default function MedicalRecordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<MedicalRecordFormData>()

  const onSubmit = async (data: MedicalRecordFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log(data)
      // Show success message
    } catch (error) {
      // Show error message
    }
  }

  const files = watch('files')

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label
            htmlFor="patientId"
            className="block text-sm font-medium text-gray-700"
          >
            Patient
          </label>
          <div className="mt-1">
            <input
              type="text"
              {...register('patientId', { required: 'Patient is required' })}
              className="input-field"
              placeholder="Search for patient..."
            />
            {errors.patientId && (
              <p className="mt-1 text-sm text-red-600">
                {errors.patientId.message}
              </p>
            )}
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="visitDate"
            className="block text-sm font-medium text-gray-700"
          >
            Visit Date
          </label>
          <div className="mt-1">
            <input
              type="date"
              {...register('visitDate', { required: 'Visit date is required' })}
              className="input-field"
            />
            {errors.visitDate && (
              <p className="mt-1 text-sm text-red-600">
                {errors.visitDate.message}
              </p>
            )}
          </div>
        </div>

        <div className="sm:col-span-6">
          <label
            htmlFor="diagnosis"
            className="block text-sm font-medium text-gray-700"
          >
            Diagnosis
          </label>
          <div className="mt-1">
            <textarea
              {...register('diagnosis', { required: 'Diagnosis is required' })}
              rows={3}
              className="input-field"
            />
            {errors.diagnosis && (
              <p className="mt-1 text-sm text-red-600">
                {errors.diagnosis.message}
              </p>
            )}
          </div>
        </div>

        <div className="sm:col-span-6">
          <label className="block text-sm font-medium text-gray-700">
            Lab Tests Recommended
          </label>
          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
            {labTestOptions.map((test) => (
              <div key={test} className="flex items-center">
                <input
                  type="checkbox"
                  value={test}
                  {...register('labTests')}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label className="ml-2 text-sm text-gray-700">{test}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="sm:col-span-6">
          <label
            htmlFor="doctorNotes"
            className="block text-sm font-medium text-gray-700"
          >
            Doctor's Notes
          </label>
          <div className="mt-1">
            <textarea
              {...register('doctorNotes', {
                required: "Doctor's notes are required",
              })}
              rows={4}
              className="input-field"
            />
            {errors.doctorNotes && (
              <p className="mt-1 text-sm text-red-600">
                {errors.doctorNotes.message}
              </p>
            )}
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="followUpDate"
            className="block text-sm font-medium text-gray-700"
          >
            Follow-up Date
          </label>
          <div className="mt-1">
            <input type="date" {...register('followUpDate')} className="input-field" />
          </div>
        </div>

        <div className="sm:col-span-6">
          <label className="block text-sm font-medium text-gray-700">
            Upload Reports/Files
          </label>
          <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
            <div className="space-y-1 text-center">
              <PaperClipIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="files"
                  className="relative cursor-pointer rounded-md bg-white font-medium text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary/80"
                >
                  <span>Upload files</span>
                  <input
                    id="files"
                    type="file"
                    multiple
                    className="sr-only"
                    {...register('files')}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">
                PDF, PNG, JPG up to 10MB each
              </p>
            </div>
          </div>
          {files && files.length > 0 && (
            <div className="mt-2">
              <h4 className="text-sm font-medium text-gray-700">
                Selected files:
              </h4>
              <ul className="mt-1 space-y-1">
                {Array.from(files).map((file) => (
                  <li
                    key={file.name}
                    className="text-sm text-gray-500"
                  >
                    {file.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          Save Record
        </Button>
      </div>
    </form>
  )
}