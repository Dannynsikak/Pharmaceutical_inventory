"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react"; // Import spinner from lucide-react

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:8000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        // Save token to localStorage (or a state management solution)
        localStorage.setItem("userToken", data.access_token);
        router.push("/dashboard");
      } else {
        const data = await res.json();
        setError(data.detail || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-10 max-w-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <Button
            variant="outline"
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <div className="flex">
                {" "}
                <Loader2 className="w-5 h-5 animate-spin" /> Loading...{" "}
              </div>
            ) : (
              "Login"
            )}
          </Button>
        </form>
        <p className="mt-4 text-center">
          Don&apos;t have an account?{" "}
          <a href="/register" className="text-blue-600">
            Sign Up here
          </a>
        </p>
      </div>
    </>
  );
};

export default Login;
