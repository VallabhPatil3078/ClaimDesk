// User.jsx
import React, { useState, useEffect } from "react";
import { getMyItems } from "../src/api/api";
import ItemCard from "../components/ItemCard";

function User() {
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) return;

        const res = await getMyItems(token);
        const myItems = res.data;

        const lost = myItems.filter((item) => item.status === 'lost');
        const found = myItems.filter((item) => item.status === 'found');

        setLostItems(lost);
        setFoundItems(found);
      } catch (err) {
        console.error('Failed to fetch items:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const renderItems = (items, label) => {
    if (items.length === 0) {
      return <p className="text-gray-600 mb-8">No {label} items found.</p>;
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {items.map((item) => (
          <ItemCard key={item._id} item={item} />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-blue-50 pt-20 pb-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-gray-800">My Items</h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Lost Items</h2>
          {renderItems(lostItems, 'lost')}

          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Found Items</h2>
          {renderItems(foundItems, 'found')}
        </>
      )}
    </div>
  );
}

export default User;
