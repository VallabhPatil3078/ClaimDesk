import React, { useState } from "react";

function Admin() {
  const [selectedView, setSelectedView] = useState("users");

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
      status: "pending", // <-- Added
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
      status: "pending", // <-- Added
    },
  ]);

  const deleteUser = (id) => setUsers(users.filter((user) => user.id !== id));

  const markLostItemAsReturned = (id) => {
    setLostItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "returned" } : item
      )
    );
  };

  const markFoundItemAsReturned = (id) => {
    setFoundItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "returned" } : item
      )
    );
  };

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
          {renderItemsTable(lostItems, markLostItemAsReturned)}
        </div>
      );
    }

    if (selectedView === "found") {
      return (
        <div>
          <h2 className="text-xl font-semibold mb-4">Found Items</h2>
          {renderItemsTable(foundItems, markFoundItemAsReturned)}
        </div>
      );
    }

    return null;
  };

  const renderItemsTable = (items, markReturnedFunc) => (
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
                  <span className="text-green-600 font-semibold">
                    Returned to Owner
                  </span>
                ) : (
                  <button
                    onClick={() => markReturnedFunc(item.id)}
                    className="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400"
                  >
                    Pending
                  </button>
                )}
              </td>
              <td className="p-3">
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg p-4">
          <h2 className="text-lg font-bold mb-6">Admin Menu</h2>
          <ul className="space-y-4">
            <li>
              <button
                className={`w-full text-left px-4 py-2 rounded ${
                  selectedView === "users"
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => setSelectedView("users")}
              >
                View Users
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left px-4 py-2 rounded ${
                  selectedView === "lost"
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => setSelectedView("lost")}
              >
                View Lost Items
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
                View Found Items
              </button>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-grow p-6 overflow-auto">{renderContent()}</main>
      </div>
    </div>
  );
}

export default Admin;
