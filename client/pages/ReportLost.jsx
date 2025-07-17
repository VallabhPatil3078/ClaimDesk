import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ReportLost() {
  const [formData, setFormData] = useState({
    itemName: "",
    location: "",
    description: "",
    photo: null,
  });

  const [photoPreview, setPhotoPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "photo") {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        photo: file,
      }));
      setPhotoPreview(file ? URL.createObjectURL(file) : null);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleReset = () => {
    setFormData({
      itemName: "",
      location: "",
      description: "",
      photo: null,
    });
    setPhotoPreview(null);
    document.getElementById("photo").value = null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Lost Item Data:", formData);
    alert("Lost item submitted successfully!");
    handleReset();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">

      <main className="flex-grow flex items-center justify-center pt-20 pb-16 px-4 sm:px-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-xl p-6 sm:p-8 w-full max-w-md space-y-5 sm:space-y-6"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-700">
            Report Lost Item
          </h2>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Item Name
            </label>
            <input
              type="text"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Lost Location
            </label>
            <input
              list="locationOptions"
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="Search or select location"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <datalist id="locationOptions">
              <option value="PICT College Campus" />
              <option value="PICT Canteen" />
              <option value="Library" />
              <option value="Main Entrance" />
              <option value="Computer Lab 1" />
              <option value="Computer Lab 2" />
              <option value="Auditorium" />
              <option value="Parking Area" />
            </datalist>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Upload Photo
            </label>
            <label
              htmlFor="photo"
              className="cursor-pointer inline-block bg-blue-50 text-blue-700 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-blue-100"
            >
              Upload Photo
            </label>
            <input
              type="file"
              name="photo"
              id="photo"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />

            {photoPreview && (
              <div className="mt-2">
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="h-24 w-24 object-cover rounded-md border"
                />
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              className="w-full sm:w-1/2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-1/2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
            >
              Reset
            </button>
          </div>
        </form>
      </main>

    </div>
  );
}

export default ReportLost;
