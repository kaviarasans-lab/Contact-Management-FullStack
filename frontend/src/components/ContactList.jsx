import axios from "axios";
import { useEffect, useState } from "react";

function ContactList({ contacts, setContacts }) {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const query = `?status=${filter}&search=${search}`;
        const fetchPromise = axios
          .get(`https://contact-management-fullstack.onrender.com/contacts${query}`)
          .then((res) => setContacts(res.data))
          .catch((err) => console.log(err));

        const delay = new Promise((resolve) => setTimeout(resolve, 1000));
        await Promise.all([fetchPromise, delay]);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, [filter, search, setContacts]);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`https://contact-management-fullstack.onrender.com/contacts/${id}`, { status });
      setContacts((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status } : c))
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure about deleting this contact?")) {
      try {
        await axios.delete(`https://contact-management-fullstack.onrender.com/contacts/${id}`);
        setContacts((prev) => prev.filter((c) => c._id !== id));
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      {/* Filter + Search Row */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-10">
        <select
          className="p-3 rounded bg-[#00277a] text-white cursor-pointer outline-0 w-full sm:w-auto"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Interested">Interested</option>
          <option value="Follow-Up">Follow-Up</option>
          <option value="Closed">Closed</option>
        </select>

        <input
          type="text"
          className="p-3 rounded w-full bg-[#eff4ff] outline-0"
          placeholder="Search contacts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="w-full h-[415px] flex flex-col items-center justify-center rounded-[5px] p-[20px] mt-10 gap-4">
          <img src="/loading.svg" alt="" width={60} height={60} />
          <p className="text-[#00277a] text-xl sm:text-2xl font-semibold">Loading...</p>
        </div>
      ) : (
        <div className="mt-10">
          {contacts.length === 0 ? (
            <div className="w-full h-[415px] flex flex-col items-center justify-center rounded-[5px] p-[20px] mt-10 gap-4 bg-[#eff4ff]">
              <img src="/user.png" alt="" width={60} height={60} />
              <p className="text-[#00277a] text-xl sm:text-2xl font-semibold text-center">
                No Contacts Found...
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
              {contacts.map((c) => (
                <div key={c._id}>
                  <div className="bg-[#eff4ff] shadow-md rounded p-4 flex flex-col justify-between hover:shadow-lg transition">
                    <div>
                      <div className="text-gray-500 text-sm flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-5">
                        <h3 className="font-bold text-xl sm:text-2xl text-[#00277a]">
                          {c.name}
                        </h3>
                        <p className="text-[#00277a] p-2 px-4 rounded bg-[#d3e6ff] font-medium text-center sm:text-left">
                          {c.company}
                        </p>
                      </div>

                      <div className="text-[15px] flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 my-3 border-2 border-[#00277a21] px-3 p-3 rounded">
                        <p>💌 {c.email}</p>
                        <p>☎️ {c.phone}</p>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mt-4">
                        <select
                          value={c.status}
                          className="p-2 rounded cursor-pointer outline-0 shadow"
                          onChange={(e) =>
                            handleStatusChange(c._id, e.target.value)
                          }
                        >
                          <option value="Interested">Interested</option>
                          <option value="Follow-Up">Follow-Up</option>
                          <option value="Closed">Closed</option>
                        </select>

                        <button
                          className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition cursor-pointer w-full sm:w-auto"
                          onClick={() => handleDelete(c._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ContactList;
