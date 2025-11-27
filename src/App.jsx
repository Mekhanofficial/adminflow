import React, { useState } from "react";
import Products from "./components/products/Products";
import AdminPanel from "./components/admin/AdminPanel";
import { registerUser, loginUser, checkAuthStatus, logoutUser } from "./services/authServices";

export default function App() {
  const [user, setUser] = useState(checkAuthStatus());
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [password, setPassword] = useState("");
  const [reg, setReg] = useState(false);

  const handleLogin = () => {
    const u = loginUser(email, password);
    if (!u) return alert("Invalid credentials");

    if (u.role === "admin") {
      setUser(u);
      return;
    }
    setUser(u);
    setPassword("");
  };

  const handleRegister = () => {
    const success = registerUser({ fname, email, password, role: "user" });
    if (success) {
      alert("Registration successful! Please login.");
      setReg(false);
    } else alert("Email already exists.");
  };

  const handleLogout = () => {
    logoutUser();
    setUser(null);
  };

  if (user && user.role === "admin") {
    return <AdminPanel />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {!user ? (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-4">{reg ? "Register" : "Login"}</h2>
          {reg && <input className="p-2 border mb-3 w-full" placeholder="First Name" value={fname} onChange={e => setFname(e.target.value)} />}
          <input className="p-2 border mb-3 w-full" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input className="p-2 border mb-4 w-full" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />

          {!reg ? (
            <button onClick={handleLogin} className="w-full bg-indigo-600 text-white p-2 rounded">Login</button>
          ) : (
            <button onClick={handleRegister} className="w-full bg-green-600 text-white p-2 rounded">Register</button>
          )}
          <p className="mt-4 text-sm">
            {reg ? "Already have an account?" : "Don't have an account?"}
            <button onClick={() => setReg(!reg)} className="ml-2 text-indigo-600">{reg ? "Login" : "Register"}</button>
          </p>
        </div>
      ) : (
        <div>
          <p className="mb-4">Welcome back, {user.fname}</p>
          <Products />
          <button onClick={handleLogout} className="mt-4 bg-red-600 text-white p-2 rounded">Logout</button>
        </div>
      )}
    </div>
  );
}