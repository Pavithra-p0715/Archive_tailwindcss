import React, { useState } from "react";
import { SignUpProps } from "./interface";

const Signup: React.FC<SignUpProps> = ({
  formData,
  setFormData,
  setError,
  setMessage,
  handleRegister,
  setShowSignUp,
}) => {
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    handleRegister(e, formData, setError, setMessage, setShowSignUp);
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md bg-[#2A2A3B] p-8 rounded-lg shadow-lg">

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-[#33334D] text-white rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-500"
        />
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-[#33334D] text-white rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold text-lg transition"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      <p className="text-center text-gray-400 mt-4">
        Already have an account?{" "}
        <button
          className="text-purple-400 hover:underline"
          onClick={() => setShowSignUp(false)}
        >
          Login
        </button>
      </p>
    </div>
  );
};

export default Signup;
