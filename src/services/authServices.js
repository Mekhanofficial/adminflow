export const seedProducts = [
  { id: 1, name: "Wireless Headphones", price: 900, discPercent: 30, inStock: true, category: "Electronics", image: "/images/img2.jpg" },
  { id: 2, name: "Smart Watch", price: 12000, discPercent: 0, inStock: false, category: "Fashion", image: "/images/img1.jpg" },
  { id: 3, name: "Bluetooth Speaker", price: 5000, discPercent: 10, inStock: true, category: "Houses", image: "/images/img3.jpg" }
];

const USERS_KEY = "users";
const LOGGEDIN_KEY = "loggedInUser";
const PRODUCTS_KEY = "products";

// Default admin
function initAdmin() {
  const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  if (!users.find(u => u.role === "admin")) {
    users.push({
      fname: "Admin",
      email: "admin@example.com",
      password: "admin123",
      role: "admin"
    });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
  
  // Initialize products if not exists
  const products = JSON.parse(localStorage.getItem(PRODUCTS_KEY));
  if (!products) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(seedProducts));
  }
}
initAdmin();

export function registerUser({ fname, email, password, role = "user" }) {
  const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  if (users.find(u => u.email === email)) return false;
  users.push({ fname, email, password, role });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return true;
}

export function loginUser(email, password) {
  const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem(LOGGEDIN_KEY, JSON.stringify(user));
    return user;
  }
  return null;
}

export function checkAuthStatus() {
  return JSON.parse(localStorage.getItem(LOGGEDIN_KEY)) || null;
}

export function logoutUser() {
  localStorage.removeItem(LOGGEDIN_KEY);
}

export function getAdminInfo() {
  const user = JSON.parse(localStorage.getItem(LOGGEDIN_KEY));
  if (user && user.role === "admin") return user;
  return null;
}

export function logoutAdmin() {
  localStorage.removeItem(LOGGEDIN_KEY);
}

// Product functions
export function getProducts() {
  return JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || [];
}

export function addProduct(product) {
  const products = getProducts();
  const newProduct = {
    ...product,
    id: Date.now(),
    inStock: parseInt(product.inStock) || 0
  };
  products.push(newProduct);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  return newProduct;
}

export function updateProduct(id, updatedProduct) {
  const products = getProducts();
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products[index] = { ...updatedProduct, id };
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    return products[index];
  }
  return null;
}

export function deleteProduct(id) {
  const products = getProducts();
  const filtered = products.filter(p => p.id !== id);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(filtered));
  return true;
}