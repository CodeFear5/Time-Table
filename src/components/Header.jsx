import React from "react";

const Header = () => {
  return (
    <header className="bg-blue-500 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-xl font-bold">
          <a href="/" className="hover:text-gray-200">MyApp</a>
        </div>
        <nav className="flex space-x-6">
          <a href="/" className="hover:text-gray-200">Home</a>
          <a href="/generate-table" className="hover:text-gray-200">GenerateTable</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
