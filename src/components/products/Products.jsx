import React, { useState, useEffect } from "react";
import SearchFilter from "./SearchFilter";
import ProductCard from "./ProductCard";
import { getProducts } from "../../services/authServices";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.category && p.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Product Gallery</h1>
      <SearchFilter searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? 
          filteredProducts.map(p => <ProductCard key={p.id} product={p} />) : 
          <p className="text-gray-500">No Products Found</p>
        }
      </div>
    </div>
  );
}