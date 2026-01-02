import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white py-4 shadow text-center">
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-wide">
        Task Manager
      </h1>
      <p className="text-sm sm:text-base text-blue-100 mt-1">
        Manage your daily tasks efficiently
      </p>
    </header>
  );
};

export default Header;
