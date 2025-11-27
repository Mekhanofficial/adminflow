import React, { useEffect, useState } from "react";
import { getProducts, addProduct, updateProduct, deleteProduct } from "../../services/authServices";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [editing, setEditing] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", price: 0, discPercent: 0, inStock: 0, category: "", image: "" });

  useEffect(() => {
    const productsData = getProducts();
    setProducts(productsData);
    setFilteredProducts(productsData);
  }, []);

  // Get unique categories for filter dropdown
  const categories = ["all", ...new Set(products.map(p => p.category).filter(Boolean))];

  // Filter products based on search term and category
  useEffect(() => {
    let filtered = products;
    
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.category && p.category.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (selectedCategory !== "all") {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm(f => ({ ...f, [name]: type === "number" ? Number(value) : value }));
  };

  const handleAdd = () => {
    if (!form.name.trim()) {
      alert("Product name is required");
      return;
    }
    if (form.price <= 0) {
      alert("Price must be greater than 0");
      return;
    }
    addProduct(form);
    const updatedProducts = getProducts();
    setProducts(updatedProducts);
    setForm({ name: "", price: 0, discPercent: 0, inStock: 0, category: "", image: "" });
    setShowModal(false);
    setEditing(null);
  };

  const startEdit = (p) => {
    setEditing(p.id);
    setForm({ ...p });
    setShowModal(true);
  };

  const saveEdit = () => {
    if (!form.name.trim()) {
      alert("Product name is required");
      return;
    }
    if (form.price <= 0) {
      alert("Price must be greater than 0");
      return;
    }
    updateProduct(editing, form);
    const updatedProducts = getProducts();
    setProducts(updatedProducts);
    setEditing(null);
    setForm({ name: "", price: 0, discPercent: 0, inStock: 0, category: "", image: "" });
    setShowModal(false);
  };

  const cancelEdit = () => {
    setEditing(null);
    setForm({ name: "", price: 0, discPercent: 0, inStock: 0, category: "", image: "" });
    setShowModal(false);
  };

  const remove = (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    deleteProduct(id);
    const updatedProducts = getProducts();
    setProducts(updatedProducts);
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { text: "Out of Stock", color: "bg-red-100 text-red-800" };
    if (stock < 10) return { text: "Low Stock", color: "bg-yellow-100 text-yellow-800" };
    return { text: "In Stock", color: "bg-green-100 text-green-800" };
  };

  const openAddModal = () => {
    setEditing(null);
    setForm({ name: "", price: 0, discPercent: 0, inStock: 0, category: "", image: "" });
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header with Search and Filters */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">Manage Products</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          {/* Search Bar */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          
          {/* Category Filter */}
          <div className="w-full sm:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              <option value="all">All Categories</option>
              {categories.filter(cat => cat !== "all").map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          {/* Add Product Button */}
          <button
            onClick={openAddModal}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition whitespace-nowrap"
          >
            ➕ Add Product
          </button>
        </div>
      </div>

      {/* Products Count */}
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-gray-600">
          Showing {filteredProducts.length} of {products.length} products
          {selectedCategory !== "all" && ` in ${selectedCategory}`}
          {searchTerm && ` matching "${searchTerm}"`}
        </p>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white p-12 rounded-lg shadow text-center">
          <p className="text-gray-500 text-lg">
            {products.length === 0 
              ? "No products yet. Click 'Add Product' to get started." 
              : "No products match your search criteria."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(p => {
            const stockStatus = getStockStatus(p.inStock);
            return (
              <div key={p.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  {p.image ? (
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <span className="text-lg">No Image</span>
                    </div>
                  )}
                  {p.discPercent > 0 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      -{p.discPercent}%
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-3">
                  <h3 className="text-lg font-bold text-gray-900">{p.name}</h3>

                  {p.category && (
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Category:</span> {p.category}
                    </p>
                  )}

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">${p.price}</p>
                      {p.discPercent > 0 && (
                        <p className="text-sm text-gray-500">
                          Original: ${Math.round(p.price / (1 - p.discPercent / 100))}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-gray-700">Stock:</span>
                      <span className="text-lg font-bold text-gray-900">{p.inStock} units</span>
                    </div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${stockStatus.color}`}>
                      {stockStatus.text}
                    </span>
                  </div>

                  <div className="flex gap-2 pt-4 border-t">
                    <button
                      onClick={() => startEdit(p)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg font-semibold transition"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => remove(p.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal for Add/Edit Product */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editing ? "Edit Product" : "Add New Product"}
                </h2>
                <button
                  onClick={cancelEdit}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                  <input
                    name="name"
                    placeholder="Enter product name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($) *</label>
                  <input
                    name="price"
                    type="number"
                    placeholder="0.00"
                    value={form.price}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
                  <input
                    name="discPercent"
                    type="number"
                    placeholder="0"
                    value={form.discPercent}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity *</label>
                  <input
                    name="inStock"
                    type="number"
                    placeholder="0"
                    value={form.inStock}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input
                    name="category"
                    placeholder="e.g., Electronics"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input
                    name="image"
                    placeholder="https://example.com/image.jpg"
                    value={form.image}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                {!editing ? (
                  <button
                    onClick={handleAdd}
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition"
                  >
                    Add Product
                  </button>
                ) : (
                  <>
                    <button
                      onClick={saveEdit}
                      className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="px-6 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg font-semibold transition"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}