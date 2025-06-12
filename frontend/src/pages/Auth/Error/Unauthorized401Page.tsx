import React from "react";
import CompanyLogo from "../../../assets/Office/UniversalLogo.jpeg";
import { useNavigate } from "react-router";

const Unauthorized401Page: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <div className="mb-6">
        <img
          src={CompanyLogo}
          alt="Company Logo"
          className="w-44 max-w-full h-auto mx-auto"
        />
      </div>

      <h1 className="text-6xl font-bold text-red-500">
        401
      </h1>
      <h2 className="text-2xl font-semibold mt-2 text-gray-800">
        Unauthorized User
      </h2>
      <p className="text-gray-600 text-lg mb-6">
        You do not have permission to access this page.
      </p>

      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition"
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default Unauthorized401Page;
