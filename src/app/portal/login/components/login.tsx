"use client";

import {  useState } from "react";
import { useRouter } from "next/navigation";
import useSignUp from "../LoginService/useSinup";
import Signup from "./singup";

export default function LoginPage() {
const [formData, setFormData] = useState({
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [showSignUp, setShowSignUp] = useState(false);

  const router = useRouter();
  const { handleLogin, handleRegister } = useSignUp();

  const handleLoginWrapper = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(e, formData, setLoading, setError, router);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex h-screen w-full bg-[#1E1E2E] text-white">
      <div className="hidden lg:flex w-1/2 bg-gradient-to-r from-purple-600 to-indigo-700 justify-center items-center p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            Capturing Moments, Creating Memories
          </h1>
          <p className="text-gray-300">Join us and start your journey today.</p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex justify-center items-center p-8">
        <div className="w-full max-w-md bg-[#2A2A3B] p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center">
            {showSignUp ? "Signup" : "Login to Your Account"}
          </h2>
          {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
          {message && (
            <p className="text-green-500 mt-2 text-center">{message}</p>
          )}

          {showSignUp ? (
            <Signup
              formData={formData}
              setFormData={setFormData}
              error={error}
              setError={setError}
              message={message}
              setMessage={setMessage}
              handleRegister={handleRegister}
              setShowSignUp={setShowSignUp}
            />
          ) : (
            <form onSubmit={handleLoginWrapper} className="mt-6 space-y-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#33334D] text-white rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-500"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#33334D] text-white rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-500"
              />
              <div className="flex justify-between gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold text-lg transition"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
                <button
                  type="button"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold text-lg transition"
                  onClick={() => setShowSignUp(true)}
                >
                  Register
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
