import { useState } from 'react';
import axios from 'axios';

function AddPatient() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [contactInfo, setContactInfo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent default form submission

    try {
      const response = await axios.post('http://localhost:8000/api/patients', {
        name,
        age: parseInt(age),
        gender,
        address,
        contact_info: contactInfo, // match your backend column name
      });

      alert('Patient added successfully!');
      // Clear fields after submission
      setName('');
      setAge('');
      setGender('');
      setAddress('');
      setContactInfo('');
    } catch (error) {
      console.error('Failed to add patient:', error);
      alert('Error adding patient');
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold">Add New Patient</h2>

      <input
        className="border p-2 w-full"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        className="border p-2 w-full"
        placeholder="Age"
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        required
      />

      <input
        className="border p-2 w-full"
        placeholder="Gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        required
      />

      <input
        className="border p-2 w-full"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />

      <input
        className="border p-2 w-full"
        placeholder="Contact Info"
        value={contactInfo}
        onChange={(e) => setContactInfo(e.target.value)}
        required
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Add
      </button>
    </form>
  );
}

export default AddPatient;

