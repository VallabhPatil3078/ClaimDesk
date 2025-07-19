// User.jsx
import React, { useState, useEffect } from "react";
import { getMyItems } from "../src/api/api";

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

        const lost = myItems.filter((item) => item.status === "lost");
        const found = myItems.filter((item) => item.status === "found");

        setLostItems(lost);
        setFoundItems(found);
      } catch (err) {
        console.error("Failed to fetch items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const deleteItem = (id, type) => {
    if (type === "lost") {
      setLostItems(lostItems.filter((item) => item._id !== id));
    } else {
      setFoundItems(foundItems.filter((item) => item._id !== id));
    }
  };

  const renderTable = (items, type) => (
    <div className="overflow-x-auto rounded-lg shadow bg-white mt-6">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 text-gray-700">
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
              <tr key={item._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{item.title}</td>
                <td className="p-3">{item.location}</td>
                <td className="p-3">{item.description}</td>
                <td className="p-3">
                  <img
                    src={item.image || "https://via.placeholder.com/80x80?text=No+Image"}
                    alt="Item"
                    className="h-16 w-16 object-cover rounded-md border"
                  />
                </td>
                <td className="p-3 capitalize">{item.status}</td>
                <td className="p-3 flex flex-wrap gap-2">
                  <button
                    onClick={() => alert(`Edit ${item.title}`)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteItem(item._id, type)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
    <div className="min-h-screen flex flex-col md:flex-row bg-blue-50">
      {/* Sidebar for desktop */}
      <aside className="hidden md:block w-64 bg-white shadow-lg p-4">
        <h2 className="text-lg font-bold mb-6">My Items Menu</h2>
        <ul className="space-y-4">
          <li>
            <button
              className={`w-full text-left px-4 py-2 rounded ${
                selectedView === "lost"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => setSelectedView("lost")}
            >
              Lost Items
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left px-4 py-2 rounded ${
                selectedView === "found"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => setSelectedView("found")}
            >
              Found Items
            </button>
          </li>
        </ul>
      </aside>

      {/* Sidebar for mobile */}
      <aside
        className={`md:hidden fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white shadow-lg p-4 z-20 transform transition-transform duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="text-lg font-bold mb-6">My Items Menu</h2>
        <ul className="space-y-4">
          <li>
            <button
              className={`w-full text-left px-4 py-2 rounded ${
                selectedView === "lost"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => {
                setSelectedView("lost");
                setSidebarOpen(false);
              }}
            >
              Lost Items
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left px-4 py-2 rounded ${
                selectedView === "found"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => {
                setSelectedView("found");
                setSidebarOpen(false);
              }}
            >
              Found Items
            </button>
          </li>
        </ul>
      </aside>

      {/* Mobile menu toggle button */}
      <button
        className="md:hidden fixed top-20 left-4 z-30 bg-blue-600 text-white px-3 py-2 rounded"
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
          <p className="text-center">Loading...</p>
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

