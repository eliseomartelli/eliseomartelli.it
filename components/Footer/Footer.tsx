import React from "react";

interface FooterLink {
  title: string;
  href: string;
}

interface FooterProps {
  links?: Array<FooterLink>;
  title: string;
  startYear: string;
}

export const Footer: React.FC<FooterProps> = ({ links, title, startYear }) => {
  return (
    <footer className="mt-4 py-4 px-4 w-screen bg-gray-100">
      <div className="max-w-6xl mx-auto flex sm:flex-row flex-col space-y-4 sm:space-y-0">
        <p className="flex-grow">
          © {startYear}-{new Date().getFullYear()} - {title}
        </p>
        <ul className="flex space-x-4">
          {links.map((link, i) => (
            <li key={i}>
              <a
                className="text-red-500 underline hover:text-red-800"
                href={link.href}
                target="_blank"
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};
