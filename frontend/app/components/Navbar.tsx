'use client'

import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Dialog } from "@headlessui/react"; // Import Dialog from headlessui
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"; 


const navigation = [
  { name: "Home", href: "#" },
  { name: "About", href: "#" },
  { name: "Services", href: "#" },
  { name: "Contact", href: "#" },
];

const Navbar = () => {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("name"); // pastikan sudah diset saat login
    if (user) {
      setName(user);
    }
  }, []);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // State to toggle the mobile menu

  return (
    <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
      <div className="flex lg:flex-1">
        <a href="#" className="-m-1.5 p-1.5">
          <span className="sr-only">Your Company</span>
          <img
            alt="Company Logo"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="h-8 w-auto"
          />
        </a>
      </div>

      {/* Mobile menu button */}
      <div className="flex lg:hidden">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)} // Open mobile menu
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
        >
          <span className="sr-only">Open main menu</span>
          <Bars3Icon aria-hidden="true" className="w-6 h-6" />
        </button>
      </div>

      {/* Desktop menu */}
      <div className="hidden lg:flex lg:gap-x-12">
        {navigation.map((item) => (
          <a key={item.name} href={item.href} className="text-sm font-semibold text-gray-900">
            {item.name}
          </a>
        ))}
      </div>

      {/* Desktop login */}
      <div className="hidden lg:flex lg:flex-1 lg:justify-end">
      {name ? (
        <div className="text-sm font-semibold text-gray-900">
          Hello, {name}
          <button
            onClick={() => {
              localStorage.removeItem("name");
              window.location.reload(); // reload page to reflect logout
            }}
            className="ml-4 text-blue-600 hover:underline"
          >
            Logout
          </button>
        </div>
      ) : (
        <a href="/login" className="text-sm font-semibold text-gray-900">
          Log in <span aria-hidden="true">&rarr;</span>
        </a>
      )}
    </div>
      {/* Mobile Menu (Dialog component) */}
      <Dialog open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt="Company Logo"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)} // Close mobile menu
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="w-6 h-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <a
                  href="/login"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </nav>
  );
};

export default Navbar;
