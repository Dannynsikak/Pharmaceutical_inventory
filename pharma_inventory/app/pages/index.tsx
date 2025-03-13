import Navbar from "../components/Navbar";
import Link from "next/link";
import Image from "next/image";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <div className="space-y-4 md:space-y-0 md:flex  justify-between min-h-screen bg-white px-10">
        {/* Left Side Content */}
        <div className="max-w-lg  self-center">
          <h1 className="text-2xl md:text-5xl font-extrabold text-indigo-600 leading-tight">
            Democratize <br />
            <span className="text-black">Pharmaceutical Inventory</span>
          </h1>
          <p className="text-gray-700 mt-4">
            Streamline stock management, optimize sales, and ensure accurate
            inventory control with ease.
          </p>
          <div className="mt-6 space-x-4">
            <Link
              href="/dashboard"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
            >
              Get Started
            </Link>
            <Link
              href="/contact"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Right Side Image */}
        <div className="flex">
          <Image
            className="max-w-[100%] self-end"
            src="/image.png"
            alt="Pharmaceutical visualization"
            width={900}
            height={400}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
