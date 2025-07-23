import React, { useState, useEffect } from "react";
import {
  getAllUsers,
  fetchItems,
  deleteUser as deleteUserAPI,
  deleteItemAPI,
  updateItemStatus,
} from "../src/api/api";
import { toast } from "react-toastify"; // ✅ Removed ToastContainer import
import "react-toastify/dist/ReactToastify.css";

function Admin() {
  const [selectedView, setSelectedView] = useState("users");
  const [users, setUsers] = useState([]);
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await getAllUsers(token);
        setUsers(usersRes.data);

        const itemsRes = await fetchItems();
        const allItems = itemsRes.data;
        setLostItems(allItems.filter((item) => item.status === "lost"));
        setFoundItems(allItems.filter((item) => item.status === "found"));
      } catch (error) {
        toast.error("Failed to fetch admin data");
      }
    };

    fetchData();
  }, [token]);

  const deleteUser = async (id) => {
    try {
      await deleteUserAPI(id, token);
      setUsers((prev) => prev.filter((user) => user._id !== id));
      toast.success("User deleted");
    } catch (err) {
      toast.error("Failed to delete user");
    }
  };

  const deleteItem = async (id, type) => {
    try {
      await deleteItemAPI(id, token);
      if (type === "lost") {
        setLostItems((prev) => prev.filter((item) => item._id !== id));
      } else {
        setFoundItems((prev) => prev.filter((item) => item._id !== id));
      }
      toast.success("Item deleted");
    } catch (err) {
      toast.error("Failed to delete item");
    }
  };

  const markAsReturned = async (id, isLost) => {
    try {
      const res = await updateItemStatus(id, token);
      const updateStatus = (items) =>
        items.map((item) =>
          item._id === id ? { ...item, status: res.data.status } : item
        );

      if (isLost) setLostItems(updateStatus);
      else setFoundItems(updateStatus);
      toast.success("Item marked as returned");
    } catch (err) {
      toast.error("Failed to update item status");
    }
  };

  const renderTable = (items, deleteFunc, isLost = false) => (
    <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-200">
      <table className="min-w-full text-sm sm:text-base">
        <thead className="bg-blue-100 text-gray-800">
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
            <tr key={item._id} className="border-b hover:bg-blue-50 transition">
              <td className="p-3 font-medium text-gray-700">{item.title}</td>
              <td className="p-3 text-gray-600">{item.location}</td>
              <td className="p-3 text-gray-500">{item.description}</td>
              <td className="p-3">
                <img
                  src={item.imageUrl || "https://via.placeholder.com/80x80?text=No+Image"}
                  alt={item.title || "Item"}
                  className="h-16 w-16 object-cover rounded-lg border"
                />
              </td>
              <td className="p-3 text-gray-700">{item.user?.name || "N/A"}</td>
              <td className="p-3">
                {item.status === "returned" ? (
                  <span className="text-green-600 font-semibold">Returned</span>
                ) : (
                  <button
                    onClick={() => markAsReturned(item._id, isLost)}
                    className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500 transition"
                  >
                    {item.status === "pending" ? "Pending" : item.status}
                  </button>
                )}
              </td>
              <td className="p-3">
                <button
                  onClick={() => deleteFunc(item._id, isLost ? "lost" : "found")}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
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
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">All Users</h2>
          <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-200">
            <table className="min-w-full text-sm sm:text-base">
              <thead className="bg-blue-100 text-gray-800">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b hover:bg-blue-50 transition">
                    <td className="p-3">{user.name}</td>
                    <td className="p-3 text-gray-600">{user.email}</td>
                    <td className="p-3">
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
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
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">Lost Items</h2>
          {renderTable(lostItems, deleteItem, true)}
        </div>
      );
    }

    if (selectedView === "found") {
      return (
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">Found Items</h2>
          {renderTable(foundItems, deleteItem, false)}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-b from-blue-50 via-white to-blue-50">
      {/* ✅ Removed <ToastContainer /> from here */}
      <aside className="hidden md:block w-64 bg-white shadow-lg p-5 border-r border-gray-200">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Admin Menu</h2>
        <ul className="space-y-4">
          {["users", "lost", "found"].map((view) => (
            <li key={view}>
              <button
                className={`w-full text-left px-4 py-2 rounded-lg font-medium ${
                  selectedView === view
                    ? "bg-blue-600 text-white shadow"
                    : "hover:bg-blue-50 text-gray-700"
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

      <main className="flex-grow p-6 mt-16 md:mt-0 overflow-x-auto">
        {renderContent()}
      </main>
    </div>
  );
}

export default Admin;
