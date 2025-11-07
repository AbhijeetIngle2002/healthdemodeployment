import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../UI/Button'
import { CheckCircleIcon, ExclamationCircleIcon, UserIcon, PhoneIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline'

interface PatientFormData {
  fullName: string
  dateOfBirth: string
  gender: string
  bloodGroup: string
  phone: string
  email: string
  address: string
  emergencyContactName: string
  emergencyContactRelation: string
  emergencyContactPhone: string
  existingConditions: string[]
  allergies: string
  currentMedications: string
  insurance?: {
    provider: string
    policyNumber: string
  }
}

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
const conditions = [
  'Diabetes',
  'Hypertension',
  'Asthma',
  'Heart Disease',
  'Arthritis',
  'Cancer',
  'Other',
]

export default function PatientRegistrationForm() {
  const [step, setStep] = useState(1)
  const [showInsurance, setShowInsurance] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PatientFormData>()

  const onSubmit = async (data: PatientFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log(data)
      setShowSuccess(true)
    } catch (error) {
      // Handle error
    }
  }

  const getStepIcon = (stepNumber: number) => {
    switch (stepNumber) {
      case 1: return <UserIcon className="h-5 w-5 text-sky-600" />
      case 2: return <PhoneIcon className="h-5 w-5 text-emerald-600" />
      case 3: return <ClipboardDocumentListIcon className="h-5 w-5 text-purple-600" />
      default: return null
    }
  }

  return (
    <>
      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="relative w-full max-w-md transform rounded-xl bg-white p-6 text-center shadow-xl transition-all">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircleIcon className="h-10 w-10 text-emerald-600" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">Registration Successful!</h3>
            <p className="mt-2 text-sm text-gray-500">
              The patient has been successfully registered.
            </p>
            <Button
              className="mt-6"
              onClick={() => setShowSuccess(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="relative mx-auto max-w-4xl animate-fade-in space-y-8">
        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex justify-between relative">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex flex-col items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                    step >= num
                      ? 'border-sky-500 bg-sky-500 text-white'
                      : 'border-gray-300 bg-white text-gray-400'
                  } transition-colors duration-300`}
                >
                  {step > num ? (
                    <CheckCircleIcon className="h-5 w-5 text-white" />
                  ) : (
                    num
                  )}
                </div>
                <span className="mt-2 text-sm font-medium text-gray-700">
                  Step {num}/3
                </span>
                {num < 3 && (
                  <div
                    className={`absolute top-5 left-10 right-[-48px] h-1 ${
                      step > num ? 'bg-sky-500' : 'bg-gray-200'
                    } transition-colors duration-300`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          {step === 1 && (
            <StepCard icon={getStepIcon(1)} title="Personal Information" description="Please provide the patient's personal details.">
              <FormGrid>
                <InputField label="Full Name" id="fullName" error={errors.fullName} register={register('fullName', { required: 'Name is required' })} />
                <InputField label="Date of Birth" id="dateOfBirth" type="date" error={errors.dateOfBirth} register={register('dateOfBirth', { required: 'Date of birth is required' })} />
                <SelectField label="Gender" id="gender" error={errors.gender} register={register('gender', { required: 'Gender is required' })}>
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </SelectField>
                <SelectField label="Blood Group" id="bloodGroup" error={errors.bloodGroup} register={register('bloodGroup', { required: 'Blood group is required' })}>
                  <option value="">Select blood group</option>
                  {bloodGroups.map((group) => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </SelectField>
                <InputField label="Phone Number" id="phone" type="tel" error={errors.phone} register={register('phone', {
                  required: 'Phone number is required',
                  pattern: { value: /^\+?[\d\s-]+$/, message: 'Invalid phone number' },
                })} />
                <InputField label="Email" id="email" type="email" error={errors.email} register={register('email', {
                  required: 'Email is required',
                  pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' },
                })} />
                <TextareaField label="Address" id="address" rows={3} error={errors.address} register={register('address', { required: 'Address is required' })} />
              </FormGrid>
            </StepCard>
          )}

          {step === 2 && (
            <StepCard icon={getStepIcon(2)} title="Emergency Contact" description="Please provide emergency contact details.">
              <FormGrid>
                <InputField label="Contact Name" id="emergencyContactName" error={errors.emergencyContactName} register={register('emergencyContactName', { required: 'Emergency contact name is required' })} />
                <InputField label="Relationship" id="emergencyContactRelation" error={errors.emergencyContactRelation} register={register('emergencyContactRelation', { required: 'Relationship is required' })} />
                <InputField label="Phone Number" id="emergencyContactPhone" type="tel" error={errors.emergencyContactPhone} register={register('emergencyContactPhone', {
                  required: 'Emergency contact phone is required',
                  pattern: { value: /^\+?[\d\s-]+$/, message: 'Invalid phone number' },
                })} />
              </FormGrid>
            </StepCard>
          )}

          {step === 3 && (
            <StepCard icon={getStepIcon(3)} title="Medical History" description="Please provide relevant medical history information.">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Existing Conditions</label>
                  <div className="mt-2 space-y-2">
                    {conditions.map((condition) => (
                      <label key={condition} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          value={condition}
                          {...register('existingConditions')}
                          className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                        />
                        <span className="text-sm text-gray-700">{condition}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <TextareaField label="Allergies" id="allergies" rows={3} placeholder="List any known allergies..." register={register('allergies')} />
                <TextareaField label="Current Medications" id="currentMedications" rows={3} placeholder="List current medications..." register={register('currentMedications')} />

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={showInsurance}
                      onChange={(e) => setShowInsurance(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Add Insurance Information</span>
                  </label>
                  {showInsurance && (
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <InputField label="Insurance Provider" id="insuranceProvider" register={register('insurance.provider')} />
                      <InputField label="Policy Number" id="policyNumber" register={register('insurance.policyNumber')} />
                    </div>
                  )}
                </div>
              </div>
            </StepCard>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-10 flex justify-between">
          {step > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep((prev) => prev - 1)}
              className="px-6 py-2"
            >
              ← Previous
            </Button>
          )}
          <div className="ml-auto">
            {step < 3 ? (
              <Button
                type="button"
                onClick={() => setStep((prev) => prev + 1)}
                className="px-6 py-2"
              >
                Next →
              </Button>
            ) : (
              <Button
                type="submit"
                isLoading={isSubmitting}
                className="px-6 py-2"
              >
                Submit Registration
              </Button>
            )}
          </div>
        </div>
      </form>
    </>
  )
}

// --- Reusable Components ---
function StepCard({ icon, title, description, children }: { icon: React.ReactNode; title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-gray-200 transition-all duration-300">
      <div className="bg-gradient-to-r from-sky-50 to-emerald-50 p-5">
        <div className="flex items-center space-x-3">
          {icon}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  )
}

function FormGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
}

function InputField({ label, id, type = 'text', error, placeholder, register, ...props }: any) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          {...register}
          {...props}
          className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 shadow-sm transition-all duration-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-none"
        />
        {error && (
          <div className="mt-1 flex items-center text-sm text-red-600">
            <ExclamationCircleIcon className="mr-1 h-4 w-4" />
            {error.message}
          </div>
        )}
      </div>
    </div>
  )
}

function SelectField({ label, id, error, register, children }: any) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <select
          id={id}
          {...register}
          className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 shadow-sm transition-all duration-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-none"
        >
          {children}
        </select>
        {error && (
          <div className="mt-1 flex items-center text-sm text-red-600">
            <ExclamationCircleIcon className="mr-1 h-4 w-4" />
            {error.message}
          </div>
        )}
      </div>
    </div>
  )
}

function TextareaField({ label, id, rows = 3, error, placeholder, register }: any) {
  return (
    <div className="sm:col-span-2 lg:col-span-3">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <textarea
          id={id}
          rows={rows}
          placeholder={placeholder}
          {...register}
          className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 shadow-sm transition-all duration-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-none"
        />
        {error && (
          <div className="mt-1 flex items-center text-sm text-red-600">
            <ExclamationCircleIcon className="mr-1 h-4 w-4" />
            {error.message}
          </div>
        )}
      </div>
    </div>
  )
}