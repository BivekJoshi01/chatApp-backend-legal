import React from "react";
import { useNavigate } from "react-router";
import CompanyLogo from "../../../assets/Office/UniversalLogo.jpeg";

const NotFound404Page: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6 text-center">
      <div className="mb-6">
        <img
          src={CompanyLogo}
          alt="Company Logo"
          className="w-44 max-w-full h-auto mx-auto"
        />
      </div>
      <div className="mb-6">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <h2 className="text-2xl font-semibold mt-2 text-gray-800">
          Page Not Found
        </h2>
        <p className="mt-2 text-gray-600">
          Sorry, the page you're looking for doesn't exist or may have been moved.
        </p>
      </div>

      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition"
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default NotFound404Page;
