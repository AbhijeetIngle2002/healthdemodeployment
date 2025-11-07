import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import DashboardPage from './pages/DashboardPage'
import PatientRegistrationPage from './pages/PatientRegistrationPage'
import AppointmentBookingPage from './pages/AppointmentBookingPage'
import MedicalRecordPage from './pages/MedicalRecordPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="patients/new" element={<PatientRegistrationPage />} />
          <Route path="appointments/new" element={<AppointmentBookingPage />} />
          <Route path="medical-records/new" element={<MedicalRecordPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
