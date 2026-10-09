import { useState } from "react";
import { createPatient } from "../api/api";

export default function CreatePatient() {
  const [patient, setPatient] = useState({ name: "", age: "", gender: "", contact_info: "", address: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createPatient(patient);
    alert(JSON.stringify(res));
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
      <input type="text" placeholder="Name" className="input" onChange={(e) => setPatient({ ...patient, name: e.target.value })} />
      <input type="number" placeholder="Age" className="input" onChange={(e) => setPatient({ ...patient, age: e.target.value })} />
      <input type="text" placeholder="Gender" className="input" onChange={(e) => setPatient({ ...patient, gender: e.target.value })} />
      <input type="text" placeholder="Contact Info" className="input" onChange={(e) => setPatient({ ...patient, contact_info: e.target.value })} />
      <input type="text" placeholder="Address" className="input" onChange={(e) => setPatient({ ...patient, address: e.target.value })} />
      <button type="submit" className="btn">Create</button>
    </form>
  );
}
