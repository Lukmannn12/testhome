// src/components/Navbar.tsx
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-semibold">
          MyApp
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="text-white hover:text-orange-400 transition">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-white hover:text-orange-400 transition">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-white hover:text-orange-400 transition">
              Contact
            </Link>
          </li>
          <li>
            <Link href="/login" className="text-white hover:text-orange-400 transition">
              Login
            </Link>
          </li>
          <li>
            <Link href="/register" className="text-white hover:text-orange-400 transition">
              Register
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
