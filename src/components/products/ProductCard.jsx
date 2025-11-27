import React from "react";
import StockIndicator from "./StockIndicator";

export default function ProductCard({ product }) {
  const { name, price, category, image, discPercent, inStock } = product;
  const discountedPrice = (price - (discPercent/100)*price).toFixed(2);

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="h-48 overflow-hidden rounded mb-2">
        <img src={image} alt={name} className="w-full h-full object-cover"/>
      </div>
      <h3 className="font-semibold">{name}</h3>
      <p className="text-sm text-gray-500">{category}</p>
      <p className="mt-1">
        {discPercent>0 ? <><span className="line-through text-red-600 mr-2">${price}</span>${discountedPrice}</> : <>${price}</>}
      </p>
      <StockIndicator isAvailable={inStock} />
    </div>
  );
}
