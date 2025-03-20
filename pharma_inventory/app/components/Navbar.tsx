"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const router = useRouter();
  const handleClick = (href: string) => {
    setLoading(href); // Set loading state for the clicked link
    router.push(href);
  };

  return (
    <nav className="bg-gray-100 shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-indigo-600 flex gap-2">
          <Image
            src="/pharmacist2.png"
            alt="Logo"
            width={40}
            height={40}
            className="max-w-[100%] rounded-md"
          />
          <span className="hidden sm:inline-block"> Pharma Inventory </span>
        </h1>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6 *:cursor-pointer">
          {[
            { href: "/", label: "Home" },
            { href: "/dashboard", label: "Dashboard" },
            { href: "/login", label: "Login" },
            { href: "/register", label: "Sign Up", special: true },
          ].map(({ href, label, special }) => (
            <button
              type="button"
              key={href}
              onClick={() => handleClick(href)}
              className={`flex items-center gap-2 ${
                special
                  ? "bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                  : "text-gray-600 hover:text-indigo-600"
              }`}
            >
              {loading === href ? (
                <span className="w-4 h-4 border-2 border-gray-500 border-t-transparent animate-spin rounded-full" />
              ) : (
                label
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
