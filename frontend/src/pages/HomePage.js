import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


// const people = [
//   {
//     name: "John Doe",
//     title: "Front-end Developer",
//     department: "Engineering",
//     email: "john@devui.com",
//     role: "Developer",
//     image:
//       "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80",
//   },
//   {
//     name: "Jane Doe",
//     title: "Back-end Developer",
//     department: "Engineering",
//     email: "jane@devui.com",
//     role: "CTO",
//     image:
//       "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
//   },
// ];

const HomePage = ({role}) => {
  const [empData, setEmpData] = useState({ data: [] });;
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Selected employee for editing
  const [editForm, setEditForm] = useState({});
  const [filterStatus, setFilterStatus] = useState(""); // Editable form data
// Filter for status


const getAllData = async (status = "") => {
  try {
      const queryParam = status ? `?status=${status}` : "";
      const getPeople = await fetch(
          `http://localhost:4000/api/v1/getallUsers${queryParam}`,
          {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
              },
          }
      );

      const res = await getPeople.json();
      setEmpData(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setEditForm({
      name: employee.name,
      email: employee.email,
      title: employee.title,
      department: employee.department,
      role: employee.role,
    });
  };

  // Handle Update Submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/getallUsers/${selectedEmployee._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editForm),
        }
      );

      const result = await response.json();

      if (response.status === 200) {
        // Update the local state with new data
        setEmpData((prev) => ({
          ...prev,
          data: prev.data.map((emp) =>
            emp._id === selectedEmployee._id ? result.data : emp
          ),
        }));

        setSelectedEmployee(null); // Close the edit form
      } else {
        console.log("Update failed:", result.message);
      }
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  


  useEffect(() => {
    getAllData(filterStatus);
  },[filterStatus]);
  console.log(empData);

  // console.log(empData);

  return (
    <>
      <section className="container px-4 mx-auto py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">
              JOB APPLICATION
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
              This is a list of all "JOBS". You can add new jobs, fetch
              the existing ones and edit the application
            </p>
          </div>
          {role === "admin" && (
            <Link to={"/addemployee"}>
              <div>
                <button className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-sm font-semibold leading-7 text-white hover:bg-indigo-500">
                  Add JOB
                </button>
              </div>
            </Link>
          )}
        </div>

         {/* Status Filter */}
         <div className="mt-4">
                <select
                    className="p-2 border rounded"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="">All</option>
                    <option value="applied">Applied</option>
                    <option value="rejected">Rejected</option>
                    <option value="pending">Pending</option>
                </select>
            </div>

       
        

        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <span>JOB</span>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        TITLE
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        ROLE
                      </th>
                      <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                                            STATUS
                                        </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {empData.data.map((person) => (
                      <tr key={person.name}>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={person.image}
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {person.name}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-300">
                                {person.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-12 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {person.title}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-300">
                            {person.department}
                          </div>
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          {person.role}
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                                {person.status}
                                            </td>

                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEdit(person)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        {selectedEmployee && (
          <div className="mt-6 p-4 border rounded bg-gray-100">
            <h3 className="text-lg font-semibold">Edit Employee</h3>
            <form onSubmit={handleUpdate}>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  placeholder="Name"
                  className="p-2 border rounded"
                />
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
                  placeholder="Email"
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) =>
                    setEditForm({ ...editForm, title: e.target.value })
                  }
                  placeholder="Title"
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  value={editForm.department}
                  onChange={(e) =>
                    setEditForm({ ...editForm, department: e.target.value })
                  }
                  placeholder="Department"
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  value={editForm.role}
                  onChange={(e) =>
                    setEditForm({ ...editForm, role: e.target.value })
                  }
                  placeholder="Role"
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  value={editForm.status}
                  onChange={(e) =>
                    setEditForm({ ...editForm, status: e.target.value })
                  }
                  placeholder="status"
                  className="p-2 border rounded"
                />
              </div>
              <div className="mt-4 flex space-x-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedEmployee(null)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </section>
    </>
  );
};

export default HomePage;
