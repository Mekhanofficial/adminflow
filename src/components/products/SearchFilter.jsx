import React from "react";

export default function SearchFilter({ searchTerm, onSearchChange }) {
  return (
    <input
      type="text"
      placeholder="Search product or category..."
      value={searchTerm}
      onChange={e => onSearchChange(e.target.value)}
      className="w-full p-2 mb-6 border rounded"
    />
  );
}
