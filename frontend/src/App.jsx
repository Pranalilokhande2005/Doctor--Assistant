import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Patients from './pages/Patients'
import AddPatient from './pages/AddPatient'
import UploadReport from './pages/UploadReport'
import AskGemini from './pages/AskGemini'


function App() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/add-patient" element={<AddPatient />} />
            <Route path="/upload-report" element={<UploadReport />} />
            <Route path="/ask-gemini" element={<AskGemini />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
