import React, { useState } from "react";
import { FiTrash2 } from "react-icons/fi";

interface DeleteConfirmationModelProps {
    open: boolean;
    close?: () => void;
    onConfirm?: () => void;
}

const DeleteConfirmationModel: React.FC<DeleteConfirmationModelProps> = ({
    open,
    close,
    onConfirm,
}) => {
    const [isShaking, setIsShaking] = useState(false);

    if (!open) return null;

    const handleOutsideClick = () => {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
            onClick={handleOutsideClick}
        >
            <div
                className={`bg-white rounded-xl shadow-xl p-6 w-[90%] sm:w-[400px] transition-transform duration-300 ${isShaking ? "shake" : "scale-in"
                    }`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex flex-col items-center text-center space-y-4">
                    <FiTrash2 className="text-red-500 text-4xl bg-red-100 p-2 rounded-full" />

                    <h2 className="text-lg font-semibold">Are you sure you want to delete?</h2>
                    <p className="text-gray-600 text-sm">This action cannot be undone.</p>

                    <div className="flex gap-4 mt-4">
                        <button
                            onClick={close}
                            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                        >
                            No, Keep it
                        </button>
                        <button
                            onClick={onConfirm}
                            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                        >
                            Yes, Delete
                        </button>
                    </div>
                </div>
            </div>

            {/* Animations */}
            <style>
                {`
        @keyframes shake {
          0% { transform: translate(0); }
          20% { transform: translate(-4px, 4px); }
          40% { transform: translate(4px, -4px); }
          60% { transform: translate(-4px, 4px); }
          80% { transform: translate(4px, -4px); }
          100% { transform: translate(0); }
        }
        .shake {
          animation: shake 0.5s ease-in-out;
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .scale-in {
          animation: scaleIn 0.3s ease-out;
        }
      `}
            </style>
        </div>
    );
};

export default DeleteConfirmationModel;
