import React, { useRef } from "react";
import { useVerifyEmailHook } from "../../../api/auth/auth-hook";
import LoadingButton from "../../../components/Button/LoadingButton";

const SignUpVerification = () => {
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const { mutate, isPending } = useVerifyEmailHook();

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
    <div style={{ width: "100%" }}>
      <h2 className="text-xl font-semibold text-center mb-6 text-white/90">
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
              className="w-12 h-12 text-center text-lg font-medium rounded-md border border-white/40 bg-white/20 placeholder-gray-300 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              ref={(el) => {
                inputsRef.current[i] = el!;
              }}
              onChange={(e) => handleChange(i, e)}
              onKeyDown={(e) => handleKeyDown(i, e)}
            />
          ))}
      </div>

      <LoadingButton isPending={isPending} btnName="Verify" btnLog="Verifying..." onClick={handleSubmit} />

    </div>
  );
};

export default SignUpVerification;
