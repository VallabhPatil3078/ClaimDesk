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
    },
  ]);

  const deleteUser = (id) => setUsers(users.filter((user) => user.id !== id));
  const deleteLostItem = (id) =>
    setLostItems(lostItems.filter((item) => item.id !== id));
  const deleteFoundItem = (id) =>
    setFoundItems(foundItems.filter((item) => item.id !== id));

  const renderTable = (items, deleteFunc) => (
    <div className="overflow-x-auto rounded-lg shadow bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-3 text-left">Item</th>
            <th className="p-3 text-left">Location</th>
            <th className="p-3 text-left">Description</th>
            <th className="p-3 text-left">Photo</th>
            <th className="p-3 text-left">User</th>
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
          <div className="overflow-x-auto rounded-lg shadow bg-white">
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
          {renderTable(lostItems, deleteLostItem)}
        </div>
      );
    }

    if (selectedView === "found") {
      return (
        <div>
          <h2 className="text-xl font-semibold mb-4">Found Items</h2>
          {renderTable(foundItems, deleteFoundItem)}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside
          className={`bg-white shadow-lg p-4 fixed inset-y-0 left-0 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-200 ease-in-out w-64 md:static md:translate-x-0`}
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
                  View {view.charAt(0).toUpperCase() + view.slice(1)}{" "}
                  {view === "users" ? "Users" : "Items"}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Toggle button for mobile */}
        <button
          className="md:hidden fixed top-4 left-4 z-20 bg-blue-600 text-white px-3 py-2 rounded"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          Menu
        </button>

        {/* Main Content */}
        <main className="flex-grow p-6 overflow-x-auto md:ml-64">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default Admin;
