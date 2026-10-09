import { useState } from 'react';
import axios from 'axios';

function UploadReport() {
  const [patientId, setPatientId] = useState('');
  const [testDate, setTestDate] = useState('');
  const [reportType, setReportType] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('Please choose a file.');
      return;
    }

    const formData = new FormData();
    formData.append('patient_id', patientId);
    formData.append('test_date', testDate);
    formData.append('report_type', reportType);
    formData.append('file', file);

    try {
      const response = await axios.post(
        'http://localhost:8000/api/reports/blood-reports/upload-image/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      alert('Report uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error uploading report');
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold">Upload Blood Report</h2>

      <input
        className="border p-2 w-full"
        type="number"
        placeholder="Patient ID"
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
        required
      />

      <input
        className="border p-2 w-full"
        type="date"
        value={testDate}
        onChange={(e) => setTestDate(e.target.value)}
        required
      />

      <input
        className="border p-2 w-full"
        placeholder="Report Type"
        value={reportType}
        onChange={(e) => setReportType(e.target.value)}
        required
      />

      <input
        className="border p-2 w-full"
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        required
      />

      <button className="bg-green-600 text-white px-4 py-2 rounded">
        Upload
      </button>
    </form>
  );
}

export default UploadReport;
