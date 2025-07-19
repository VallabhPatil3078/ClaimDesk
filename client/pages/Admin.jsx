// Admin.jsx
import React, { useState } from "react";

function Admin() {
  const [selectedView, setSelectedView] = useState("users");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [users, setUsers] = useState([
    { id: 1, name: "Tejas Sawant", email: "tejas@example.com" },
    { id: 2, name: "Vallabh Patil", email: "vallabh@example.com" },
  ]);

  const [lostItems, setLostItems] = useState([
    {
      id: 101,
      itemName: "Black Wallet",
      location: "Library",
      description: "Lost my wallet near the bookshelf.",
      photo: "https://via.placeholder.com/80x80?text=Wallet",
      user: "Tejas Sawant",
      status: "pending",
    },
  ]);

  const [foundItems, setFoundItems] = useState([
    {
      id: 201,
      itemName: "Water Bottle",
      location: "Canteen",
      description: "Found red bottle on the table.",
      photo: "https://via.placeholder.com/80x80?text=Bottle",
      user: "Vallabh Patil",
      status: "pending",
    },
  ]);

  const deleteUser = (id) => setUsers(users.filter((user) => user.id !== id));
  const deleteLostItem = (id) => setLostItems(lostItems.filter((item) => item.id !== id));
  const deleteFoundItem = (id) => setFoundItems(foundItems.filter((item) => item.id !== id));

  const markAsReturned = (id, isLost) => {
    if (isLost) {
      setLostItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: "returned" } : item))
      );
    } else {
      setFoundItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: "returned" } : item))
      );
    }
  };

  const renderTable = (items, deleteFunc, isLost = false) => (
    <div className="overflow-auto rounded-lg shadow bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-3 text-left">Item</th>
            <th className="p-3 text-left">Location</th>
            <th className="p-3 text-left">Description</th>
            <th className="p-3 text-left">Photo</th>
            <th className="p-3 text-left">User</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{item.itemName}</td>
              <td className="p-3">{item.location}</td>
              <td className="p-3">{item.description}</td>
              <td className="p-3">
                <img
                  src={item.photo}
                  alt="Item"
                  className="h-16 w-16 object-cover rounded-md border"
                />
              </td>
              <td className="p-3">{item.user}</td>
              <td className="p-3">
                {item.status === "returned" ? (
                  <span className="text-green-600 font-semibold">Returned to Owner</span>
                ) : (
                  <button
                    onClick={() => markAsReturned(item.id, isLost)}
                    className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500"
                  >
                    Pending
                  </button>
                )}
              </td>
              <td className="p-3">
                <button
                  onClick={() => deleteFunc(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderContent = () => {
    if (selectedView === "users") {
      return (
        <div>
          <h2 className="text-xl font-semibold mb-4">All Users</h2>
          <div className="overflow-auto rounded-lg shadow bg-white">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (selectedView === "lost") {
      return (
        <div>
          <h2 className="text-xl font-semibold mb-4">Lost Items</h2>
          {renderTable(lostItems, deleteLostItem, true)}
        </div>
      );
    }

    if (selectedView === "found") {
      return (
        <div>
          <h2 className="text-xl font-semibold mb-4">Found Items</h2>
          {renderTable(foundItems, deleteFoundItem, false)}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex flex-grow">
        {/* Sidebar for large devices */}
        <aside className="hidden md:block w-64 bg-white shadow-lg p-4">
          <h2 className="text-lg font-bold mb-6">Admin Menu</h2>
          <ul className="space-y-4">
            {["users", "lost", "found"].map((view) => (
              <li key={view}>
                <button
                  className={`w-full text-left px-4 py-2 rounded ${
                    selectedView === view
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-200"
                  }`}
                  onClick={() => setSelectedView(view)}
                >
                  {view === "users"
                    ? "View Users"
                    : `View ${view.charAt(0).toUpperCase() + view.slice(1)} Items`}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Sidebar for mobile */}
        <aside
          className={`md:hidden fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white shadow-lg p-4 z-20 transform transition-transform duration-200 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <h2 className="text-lg font-bold mb-6">Admin Menu</h2>
          <ul className="space-y-4">
            {["users", "lost", "found"].map((view) => (
              <li key={view}>
                <button
                  className={`w-full text-left px-4 py-2 rounded ${
                    selectedView === view
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-200"
                  }`}
                  onClick={() => {
                    setSelectedView(view);
                    setSidebarOpen(false);
                  }}
                >
                  {view === "users"
                    ? "View Users"
                    : `View ${view.charAt(0).toUpperCase() + view.slice(1)} Items`}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden fixed top-20 left-4 z-30 bg-blue-600 text-white px-3 py-2 rounded"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          Menu
        </button>

        {/* Main content */}
        <main className="flex-grow p-6 overflow-auto">{renderContent()}</main>
      </div>
    </div>
  );
}

export default Admin;
