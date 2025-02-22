"use client";

import { useRouter } from "next/navigation";

const useSignUp = () => {

  const handleRegister = (
    event: React.FormEvent,
    values: {
      fullName: string;
      email: string;
      password: string;
      confirmPassword: string;
    },
    error: (error: string | null) => void,
    message: (message: string) => void,
    showSignUp: (show: boolean) => void
  ) => {
    event.preventDefault();
    error(null);
    message("");

    const { fullName, email, password, confirmPassword } = values;

    if (password !== confirmPassword) {
      error("Passwords do not match");
      return;
    }

    const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");

    if (users.some((user: { email: string }) => user.email === email)) {
      error("User already registered");
      return;
    }

    const newUser = { fullName, email, password };
    users.push(newUser);
    localStorage.setItem("registeredUsers", JSON.stringify(users));

    message("Registration successful! Please log in.");
    setTimeout(() => showSignUp(false), 2000);
  };
  type User = {
    email: string;
    password: string;
  };

  const handleLogin = async (
    e: React.FormEvent,
    formData: { email: string; password: string },
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<string | null>>,
    router: ReturnType<typeof useRouter>
  ) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const users: User[] = JSON.parse(
        localStorage.getItem("registeredUsers") || "[]"
      );

      const userExists = users.find(
        (user) =>
          user.email === formData.email && user.password === formData.password
      );

      if (!userExists) {
        setError("User not registered. Create new one");
        return;
      }

      localStorage.setItem("activeUser", JSON.stringify(userExists));

      router.push("/portal/about");
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { handleRegister, handleLogin };
};

export default useSignUp;
