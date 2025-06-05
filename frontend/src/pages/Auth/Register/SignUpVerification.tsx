import React, { useRef } from "react";
import LogoSVG from "../../../assets/Office/GlobeImage.svg";
import { useVerifyEmailHook } from "../../../api/auth/auth-hook";

const SignUpVerification = () => {
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const { mutate } = useVerifyEmailHook();

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;

    inputsRef.current[index].value = value;

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !inputsRef.current[index].value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const otp = inputsRef.current.map((input) => input.value).join("");
    if (otp.length < 6) {
      alert("Please enter all 6 digits.");
      return;
    }

    mutate({ formData: { code: otp } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f4f9]">
      <div
        className="bg-[#d7e2f7] shadow-2xl rounded-xl w-full max-w-md px-8 py-10"
        style={{
          backgroundImage: `url(${LogoSVG})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center top 1rem",
          backgroundSize: "80px",
        }}
      >
        <h2 className="text-xl font-semibold text-center mb-6">
          Enter 6-digit Verification Code
        </h2>

        <div className="flex justify-between gap-2 mb-6">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <input
                key={i}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className="w-12 h-12 text-center text-lg font-medium rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
                ref={(el) => {
                  inputsRef.current[i] = el!;
                }}
                onChange={(e) => handleChange(i, e)}
                onKeyDown={(e) => handleKeyDown(i, e)}
              />
            ))}
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md transition"
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default SignUpVerification;
