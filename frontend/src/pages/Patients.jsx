import { useEffect, useState } from 'react';
import axios from 'axios';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/api/patients')
      .then(response => {
        setPatients(response.data);  // ✅ assuming backend returns full patient data
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching patients:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">List of Patients</h2>

      {loading ? (
        <p>Loading patients...</p>
      ) : patients.length === 0 ? (
        <p>No patients found.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300 rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2 border">ID</th>
              <th className="text-left px-4 py-2 border">Name</th>
              <th className="text-left px-4 py-2 border">Gender</th>
              <th className="text-left px-4 py-2 border">Address</th>
              <th className="text-left px-4 py-2 border">contact_info</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id} className="border-t">
                <td className="px-4 py-2 border">{patient.id}</td>
                <td className="px-4 py-2 border">{patient.name}</td>
                <td className="px-4 py-2 border">{patient.gender}</td>
                <td className="px-4 py-2 border">{patient.address}</td>
                <td className="px-4 py-2 border">{patient.contact_info}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Patients;
