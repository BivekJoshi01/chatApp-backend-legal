import React from "react";

type LoadingButtonProps = {
  isPending: boolean;
  btnName?: string;
  btnLog?: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

const LoadingButton: React.FC<LoadingButtonProps> = ({
  isPending,
  btnName = "Submit",
  btnLog = "Submitting...",
  type = "submit",
  onClick,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isPending}
      className="w-full bg-blue-600 hover:bg-blue-700 transition duration-200 text-white font-semibold py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 flex items-center justify-center gap-2"
    >
      {isPending && (
        <svg
          className="w-5 h-5 text-white animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
          ></path>
        </svg>
      )}
      {isPending ? btnLog : btnName}
    </button>
  );
};

export default LoadingButton;
