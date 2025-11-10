import React, { useState } from "react";
import axios from "axios";

function ContactForm({ setContacts, contacts }) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("Interested");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) return alert("Name and Email Required");
    try {
      const res = await axios.post(
        "https://contact-management-fullstack.onrender.com/contacts",
        { name, company, email, phone, status }
      );
      setContacts([res.data, ...contacts]);
      setName("");
      setCompany("");
      setEmail("");
      setPhone("");
      setStatus("Interested");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6" autoComplete="off">
      <input
        type="text"
        placeholder="Enter Name"
        className="bg-[#eff4ff] p-3 rounded w-full text-[#0c002b] outline-0 text-sm sm:text-base"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter Company"
        className="bg-[#eff4ff] p-3 rounded w-full text-[#0c002b] outline-0 text-sm sm:text-base"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <input
        type="email"
        placeholder="Enter Email"
        className="bg-[#eff4ff] p-3 rounded w-full text-[#0c002b] outline-0 text-sm sm:text-base"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="tel"
        placeholder="Enter Phone"
        className="bg-[#eff4ff] p-3 rounded w-full text-[#0c002b] outline-0 text-sm sm:text-base"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <select
        className="bg-[#eff4ff] p-3 rounded w-full text-[#0c002b] outline-0 cursor-pointer text-sm sm:text-base"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="Interested">Interested</option>
        <option value="Follow-Up">Follow-Up</option>
        <option value="Closed">Closed</option>
      </select>

      <button
        type="submit"
        className="text-white px-4 py-3 rounded hover:bg-[#001a52] bg-[#00277a] transition w-full mt-[10px] cursor-pointer text-sm sm:text-base"
      >
        Submit
      </button>
    </form>
  );
}

export default ContactForm;
