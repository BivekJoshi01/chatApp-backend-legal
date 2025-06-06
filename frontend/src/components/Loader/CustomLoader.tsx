import React from "react";
import EarthIcon from "../../assets/Office/textures/8k_earth_daymap.jpg";

const CustomLoader: React.FC = () => {
  return (
    <>
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 2s linear infinite;
        }
        .round-image {
          border-radius: 50%;
          object-fit: cover;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        }
        .loader-backdrop {
          position: fixed;
          inset: 0;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          background-color: transparent; /* no color */
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>

      <div className="loader-backdrop">
        <img
          src={EarthIcon}
          alt="Loading Earth"
          className="w-24 h-24 animate-spin-slow round-image"
        />
      </div>
    </>
  );
};

export default CustomLoader;
