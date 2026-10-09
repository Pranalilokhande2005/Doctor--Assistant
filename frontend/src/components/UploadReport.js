import { useState } from "react";
import { uploadReport } from "../api/api";

export default function UploadReport() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await uploadReport(formData);
    alert(JSON.stringify(res));
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} className="btn">Upload</button>
    </div>
  );
}
