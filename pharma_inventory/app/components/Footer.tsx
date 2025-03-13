import Link from "next/link";
import Image from "next/image";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0B1547] text-white py-12 px-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Left Section: Logo and Mission */}
        <div className="mb-6 md:mb-0 md:w-1/2">
          <Image src="/logo.png" alt="Atombeat Logo" width={150} height={50} />
          <p className="mt-4 text-sm text-gray-300">
            Our mission is to democratize computational drug discovery tools and
            empower researchers and organizations worldwide.
          </p>
          {/* LinkedIn Icon */}
          <div className="mt-4">
            <Link href="https://www.linkedin.com" target="_blank">
              <FaLinkedin className="text-white text-2xl hover:text-gray-400" />
            </Link>
          </div>
        </div>

        {/* Right Section: Navigation Links */}
        <nav className="text-right">
          <ul className="space-y-4">
            <li>
              <Link href="/" className="text-white hover:text-gray-400">
                Home
              </Link>
            </li>
            <li>
              <Link href="/platform" className="text-white hover:text-gray-400">
                Platform
              </Link>
            </li>
            <li>
              <Link
                href="/solutions"
                className="text-white hover:text-gray-400"
              >
                Solutions
              </Link>
            </li>
            <li>
              <Link href="/company" className="text-white hover:text-gray-400">
                Company
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-white hover:text-gray-400">
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Bottom Section: Copyright & Links */}
      <div className="border-t border-gray-600 mt-8 pt-4 text-center text-gray-400 text-sm">
        <p>Copyright 2025© atombeat. All Rights Reserved</p>
        <div className="mt-2">
          <Link href="/privacy-policy" className="hover:text-white">
            Privacy Policy
          </Link>{" "}
          •{" "}
          <Link href="/terms" className="hover:text-white">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
