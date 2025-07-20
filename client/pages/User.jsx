// client/pages/User.jsx
import React, { useState, useEffect } from "react";
import { getMyItems } from "../src/api/api";
import { deleteItemAPI } from "../src/api/api";

function User() {
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedView, setSelectedView] = useState("lost");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) return;

        const res = await getMyItems(token);
        const myItems = res.data;

        setLostItems(myItems.filter((item) => item.status === "lost"));
        setFoundItems(myItems.filter((item) => item.status === "found"));
      } catch (err) {
        console.error("Failed to fetch items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const deleteItem = async (id, type) => {
    const token = localStorage.getItem("authToken");

    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await deleteItemAPI(id, token); // ✅ API call to backend

      // ✅ Update local state after successful deletion
      if (type === "lost") {
        setLostItems((prev) => prev.filter((item) => item._id !== id));
      } else {
        setFoundItems((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.error("Failed to delete item:", err);
      alert("Failed to delete item.");
    }
  };

  const renderTable = (items, type) => (
    <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-200">
      <table className="min-w-full text-sm sm:text-base">
        <thead className="bg-blue-100 text-gray-800">
          <tr>
            <th className="p-3 text-left">Item</th>
            <th className="p-3 text-left">Location</th>
            <th className="p-3 text-left">Description</th>
            <th className="p-3 text-left">Photo</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center p-4 text-gray-500">
                No {type} items found.
              </td>
            </tr>
          ) : (
            items.map((item) => (
              <tr key={item._id} className="border-b hover:bg-blue-50 transition">
                <td className="p-3 font-medium text-gray-700">{item.title}</td>
                <td className="p-3 text-gray-600">{item.location}</td>
                <td className="p-3 text-gray-500">{item.description}</td>
                <td className="p-3">
                  <img
                    src={item.imageUrl || "https://via.placeholder.com/80x80?text=No+Image"}
                    alt="Item"
                    className="h-16 w-16 object-cover rounded-lg border"
                  />
                </td>
                <td className="p-3 capitalize text-gray-700">{item.status}</td>
                <td className="p-3 flex flex-wrap gap-2">
                  <button
                    onClick={() => alert(`Edit ${item.title}`)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteItem(item._id, type)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-b from-blue-50 via-white to-blue-50">
      {/* Sidebar for desktop */}
      <aside className="hidden md:block w-64 bg-white shadow-lg p-5 border-r border-gray-200">
        <h2 className="text-xl font-bold mb-6 text-gray-800">My Items Menu</h2>
        <ul className="space-y-4">
          {["lost", "found"].map((view) => (
            <li key={view}>
              <button
                className={`w-full text-left px-4 py-2 rounded-lg font-medium ${selectedView === view
                    ? "bg-blue-600 text-white shadow"
                    : "hover:bg-blue-50 text-gray-700"
                  }`}
                onClick={() => setSelectedView(view)}
              >
                {view.charAt(0).toUpperCase() + view.slice(1)} Items
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Sidebar for mobile */}
      <aside
        className={`md:hidden fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white shadow-lg p-5 border-r border-gray-200 z-20 transform transition-transform duration-200 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <h2 className="text-xl font-bold mb-6 text-gray-800">My Items Menu</h2>
        <ul className="space-y-4">
          {["lost", "found"].map((view) => (
            <li key={view}>
              <button
                className={`w-full text-left px-4 py-2 rounded-lg font-medium ${selectedView === view
                    ? "bg-blue-600 text-white shadow"
                    : "hover:bg-blue-50 text-gray-700"
                  }`}
                onClick={() => {
                  setSelectedView(view);
                  setSidebarOpen(false);
                }}
              >
                {view.charAt(0).toUpperCase() + view.slice(1)} Items
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Toggle button for mobile */}
      <button
        className="md:hidden fixed top-20 left-4 z-30 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        Menu
      </button>

      {/* Main Content */}
      <main className="flex-grow p-6 mt-16 md:mt-0 overflow-x-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
          {selectedView === "lost" ? "Lost Items" : "Found Items"}
        </h1>
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : selectedView === "lost" ? (
          renderTable(lostItems, "lost")
        ) : (
          renderTable(foundItems, "found")
        )}
      </main>
    </div>
  );
}

export default User;
