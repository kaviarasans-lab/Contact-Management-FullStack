import React, { useState } from "react";
import ContactForm from "./components/ContactForm.jsx";
import ContactList from "./components/ContactList.jsx";

function App() {
  const [contacts, setContacts] = useState([]);

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-[70px]">
      {/* Left Column - Contact Form */}
      <div className="col-span-1 space-y-4">
        <h1 className="text-2xl sm:text-3xl md:text-[32px] font-bold mb-6 text-[#00277a] text-center md:text-left">
          Contact Management
        </h1>
        <ContactForm setContacts={setContacts} contacts={contacts} />
      </div>

      {/* Right Column - Contact List */}
      <div className="col-span-1 md:col-span-2">
        <ContactList setContacts={setContacts} contacts={contacts} />
      </div>
    </div>
  );
}

export default App;
