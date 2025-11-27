import React from "react";

export default function StockIndicator({ isAvailable }) {
  return <span style={{ color: isAvailable ? "green" : "red" }}>{isAvailable ? "In Stock" : "Out of Stock"}</span>;
}
