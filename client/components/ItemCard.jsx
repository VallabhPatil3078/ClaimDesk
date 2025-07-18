import React from 'react';

function ItemCard({ item, type = 'found' }) {
  const dateLabel = type === 'found' ? 'Found on' : 'Lost on';
  const defaultImage = '../assets/HomeIcon.png';

  return (
    <div className="bg-[#f8fafc] rounded-xl shadow-md flex overflow-hidden h-40 border border-[#cbd5e1]">
      <div className="w-2/3 p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[#1e293b]">{item.title}</h2>
          <p className="text-[#475569] text-sm mt-1">{item.description}</p>
        </div>
        <p className="text-xs text-[#94a3b8]">{dateLabel} {item.date}</p>
      </div>

      <div className="w-1/3 h-full">
        <img
          src={item.imageUrl || defaultImage}
          alt={item.title}
          className="object-cover h-full w-full"
        />
      </div>
    </div>
  );
}

export default ItemCard;
