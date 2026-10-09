import { useState } from "react";
import { getPatient } from "../api/api";

export default function GetPatient() {
  const [id, setId] = useState("");
  const [data, setData] = useState(null);

  const handleSearch = async () => {
    const res = await getPatient(id);
    setData(res);
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <input type="number" placeholder="Patient ID" className="input" onChange={(e) => setId(e.target.value)} />
      <button onClick={handleSearch} className="btn">Search</button>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
