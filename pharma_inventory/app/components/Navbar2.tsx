import { useRouter } from "next/navigation";
import { useState } from "react";

const Navbar2 = () => {
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
        <h1 className="text-2xl font-bold text-indigo-600">Pharma Inventory</h1>
        <div className="space-x-3 hidden md:flex">
          {[
            { href: "/", label: "Home" },
            { href: "/purchase", label: "Record Purchase" },
            { href: "/record", label: "Record Sale" },
          ].map(({ href, label }) => (
            <button
              type="button"
              key={href}
              onClick={() => handleClick(href)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                loading === href
                  ? " text-gray-600 hover:bg-indigo-700"
                  : "text-gray-600 hover:text-indigo-600"
              }`}
            >
              {loading === href ? (
                <span className="w-4 h-4 border-2 border-gray-700 border-t-transparent animate-spin rounded-full" />
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

export default Navbar2;
