import Navbar from "../components/Navbar";
import Link from "next/link";
import Image from "next/image";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row items-center justify-between min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-8 md:px-16 lg:px-20 py-12">
        {/* Left Content */}
        <div className="max-w-2xl text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-indigo-700 leading-tight">
            Democratize <br />
            <span className="text-gray-900">Pharmaceutical Inventory</span>
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Streamline stock management, optimize sales, and ensure accurate
            inventory control with ease.
          </p>
          {/* CTA Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              href="/dashboard"
              className="bg-indigo-600 text-white px-8 py-3 text-lg rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300"
            >
              Get Started
            </Link>
            <Link
              href="/contact"
              className="text-indigo-600 text-lg font-semibold hover:underline transition"
            >
              Learn more
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center md:justify-end mt-8 md:mt-0">
          <Image
            className="max-w-full rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
            src="/image.png"
            alt="Pharmaceutical visualization"
            width={600}
            height={400}
          />
        </div>
      </section>

      {/* Content Section */}
      <main>
        <HeroSection />
      </main>
      {/* Footer */}
      <Footer />
    </>
  );
}
