import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow h-full">
      <ul className="p-4 space-y-4">
        <li><Link to="/" className="text-blue-600 font-medium">Dashboard</Link></li>
        <li><Link to="/patients" className="text-blue-600">Patients</Link></li>
        <li><Link to="/add-patient" className="text-blue-600">Add Patient</Link></li>
        <li><Link to="/upload-report" className="text-blue-600">Upload Report</Link></li>
        <li><Link to="/ask-gemini" className="text-blue-600">Ask Gemini</Link></li>
      </ul>
    </aside>
  )
}

export default Sidebar
