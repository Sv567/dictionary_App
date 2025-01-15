import React, { useState, useEffect } from "react";

const getInitialDB = () => {
  const savedDB = localStorage.getItem("personDB");
  return savedDB
    ? JSON.parse(savedDB)
    : [
        {
          aadhar: "312465798465",
          name: "Savita Patidar",
          age: "18",
          mobile: "1324659788",
          dob: "12/12/1205",
        },
      ];
};

export default function App() {
  const [db, setDb] = useState(getInitialDB());
  const [tab, setTab] = useState("A");
  const [personData, setPersonData] = useState(null);

  useEffect(() => {
    localStorage.setItem("personDB", JSON.stringify(db));
  }, [db]);

  const handleTabChange = (newTab) => {
    setTab(newTab);
    setPersonData(null);
  };

  const handleRetrieveInformation = (aadharNumber) => {
    const foundPerson = db.find((person) => person.aadhar === aadharNumber);
    setPersonData(foundPerson || null);
  };

  const handleAddPerson = (newPerson) => {
    setDb((prevDb) => [...prevDb, newPerson]);
  };

  return (
    <div className="min-h-screen bg-blue-100">
      <section className="bg-blue-600 py-10 text-center text-3xl sm:text-4xl lg:text-5xl text-white font-bold">
        Directory App
      </section>

      <div className="flex flex-wrap justify-center gap-4 sm:gap-8 my-6">
        <button
          className={`py-2 px-4 sm:py-3 sm:px-6 text-sm sm:text-lg bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-700 ${
            tab === "A" ? "ring-4 ring-blue-300" : ""
          }`}
          onClick={() => handleTabChange("A")}
        >
          Add New Person
        </button>
        <button
          className={`py-2 px-4 sm:py-3 sm:px-6 text-sm sm:text-lg bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-700 ${
            tab === "B" ? "ring-4 ring-blue-300" : ""
          }`}
          onClick={() => handleTabChange("B")}
        >
          Retrieve Information
        </button>
      </div>

      <div className="p-4 sm:p-6 md:p-8">
        {tab === "A" && (
          <>
            <TableforData data={db} />
            <AddPersonForm onAddPerson={handleAddPerson} />
          </>
        )}
        {tab === "B" && <RetrieveInformation onRetrieve={handleRetrieveInformation} />}
        {personData ? (
          <TableforData data={[personData]} />
        ) : personData === null && tab === "B" ? (
          <p className="text-center text-red-600">No Results Found</p>
        ) : null}
      </div>
    </div>
  );
}

function AddPersonForm({ onAddPerson }) {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    age: "",
    mobile: "",
    aadhar: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(formData).some((field) => !field)) {
      alert("All fields are required!");
      return;
    }
    onAddPerson(formData);
    alert("Person added successfully!");
    setFormData({ name: "", dob: "", age: "", mobile: "", aadhar: "" });
  };

  return (
    <div className="bg-white p-4 sm:p-6 shadow-md rounded-md">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {[
            { label: "Name", name: "name", type: "text" },
            { label: "Date of Birth", name: "dob", type: "date" },
            { label: "Age", name: "age", type: "number" },
            { label: "Mobile", name: "mobile", type: "text" },
            { label: "Aadhar ID", name: "aadhar", type: "text" },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label className="block text-blue-700 font-semibold mb-2">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                
              />
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
        >
          Add Person
        </button>
      </form>
    </div>
  );
}

function RetrieveInformation({ onRetrieve }) {
  const [aadharNumber, setAadharNumber] = useState("");

  return (
    <div className="bg-white p-4 sm:p-6 shadow-md rounded-md">
      <h2 className="text-lg sm:text-2xl font-bold text-blue-600 mb-4 text-center">
        Retrieve Information
      </h2>
      <div className="space-y-4">
        <input
          type="text"
          className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Aadhar Number"
          value={aadharNumber}
          onChange={(e) => setAadharNumber(e.target.value)}
        />
        <button
          onClick={() => onRetrieve(aadharNumber)}
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
        >
          Search
        </button>
      </div>
    </div>
  );
}

function TableforData({ data }) {
  return (
    <div className="bg-white p-4 sm:p-6 shadow-md rounded-md mt-6">
      <h2 className="text-lg sm:text-2xl font-bold text-blue-600 mb-4 text-center">
        Person Details
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-blue-300">
          <thead>
            <tr className="bg-blue-500 text-white">
              {["Name", "Date of Birth", "Age", "Mobile", "Aadhar ID"].map(
                (header) => (
                  <th key={header} className="border border-blue-300 py-2 px-4">
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((person, index) => (
              <tr key={index} className="hover:bg-blue-100">
                {["name", "dob", "age", "mobile", "aadhar"].map((field) => (
                  <td
                    key={field}
                    className="border border-blue-300 py-2 px-4 text-center"
                  >
                    {person[field]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
