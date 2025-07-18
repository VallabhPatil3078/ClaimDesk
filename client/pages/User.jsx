import React, { useState } from 'react';
import ItemCard from '../components/ItemCard';

function User() {
  const [lostItems, setLostItems] = useState([
    {
      id: 1,
      title: 'Black Wallet',
      description: 'Lost near cafeteria',
      date: '2025-07-13',
      image: '',
    },
    {
      id: 2,
      title: 'Silver Ring',
      description: 'Lost in the library near the second floor shelves',
      date: '2025-07-10',
      image: '',
    },
    {
      id: 3,
      title: 'Nike Backpack',
      description: 'Blue Nike backpack misplaced during sports practice',
      date: '2025-07-08',
      image: '',
    },
  ]);

  const [foundItems, setFoundItems] = useState([
    {
      id: 1,
      title: 'Blue Water Bottle',
      description: 'Found in parking lot',
      date: '2025-07-12',
      image: '',
    },
    {
      id: 2,
      title: 'Wireless Earbuds',
      description: 'Found in the college canteen',
      date: '2025-07-09',
      image: '',
    },
    {
      id: 3,
      title: 'Smartwatch',
      description: 'Found near the auditorium exit',
      date: '2025-07-07',
      image: '',
    },
  ]);

  const handleDelete = (id, type) => {
    if (type === 'lost') {
      setLostItems(lostItems.filter((item) => item.id !== id));
    } else {
      setFoundItems(foundItems.filter((item) => item.id !== id));
    }
  };

  const handleEdit = (id, type) => {
    const currentItems = type === 'lost' ? lostItems : foundItems;
    const setItems = type === 'lost' ? setLostItems : setFoundItems;
    const itemToEdit = currentItems.find((item) => item.id === id);

    if (!itemToEdit) return;

    const newTitle = prompt('Enter new item name:', itemToEdit.title);
    const newDescription = prompt('Enter new description:', itemToEdit.description);
    if (newTitle === null || newDescription === null) return;

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (event) => {
      const file = event.target.files[0];
      const newImage = file ? URL.createObjectURL(file) : itemToEdit.image;

      setItems(
        currentItems.map((item) =>
          item.id === id
            ? { ...item, title: newTitle, description: newDescription, image: newImage }
            : item
        )
      );
    };
    fileInput.click();
  };

  const renderItems = (items, type) =>
    items.length === 0 ? (
      <p className="text-gray-600 text-sm sm:text-base">No {type} items available.</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {items.map((item) => (
          <div key={item.id} className="space-y-2">
            <ItemCard item={item} type={type} />
            <div className="flex justify-between gap-2">
              <button
                onClick={() => handleEdit(item.id, type)}
                className="flex-1 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm sm:text-base"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id, type)}
                className="flex-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm sm:text-base"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    );

  return (
    <div className="min-h-screen bg-blue-50 pt-20 pb-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-gray-800">My Items</h1>

      <h2 className="text-xl sm:text-2xl font-semibold mb-4">Lost Items</h2>
      {renderItems(lostItems, 'lost')}

      <h2 className="text-xl sm:text-2xl font-semibold mb-4">Found Items</h2>
      {renderItems(foundItems, 'found')}
    </div>
  );
}

export default User;
