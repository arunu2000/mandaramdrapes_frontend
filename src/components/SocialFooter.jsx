import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const footerNavigation = [
  { name: "Facebook", href: "https://facebook.com", icon: FaFacebook },
  { name: "Instagram", href: "https://instagram.com", icon: FaInstagram },
  { name: "Twitter", href: "https://twitter.com", icon: FaTwitter },
  { name: "YouTube", href: "https://youtube.com", icon: FaYoutube },
];

const SocialFooter = () => {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        
        {/* Social Icons */}
        <div className="flex justify-center space-x-6 md:order-2">
          {footerNavigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="size-6" aria-hidden="true" />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="mt-8 text-center text-sm text-gray-600 md:order-1 md:mt-0 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Mandaram Drapes. All rights reserved.
        </p>

      </div>
    </footer>
  );
};

export default SocialFooter;
