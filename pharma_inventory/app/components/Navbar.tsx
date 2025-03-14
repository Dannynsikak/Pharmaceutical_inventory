import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-100 shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-indigo-600">Pharma Inventory</h1>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-600 hover:text-indigo-600">
            Home
          </Link>
          <Link
            href="/dashboard"
            className="text-gray-600 hover:text-indigo-600"
          >
            Dashboard
          </Link>
          <Link href="/login" className="text-gray-600 hover:text-indigo-600">
            Login
          </Link>
          <Link
            href="/register"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
