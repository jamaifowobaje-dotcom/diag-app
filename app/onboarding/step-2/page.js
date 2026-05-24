"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import OnboardingSidebar from "@/components/onboarding/OnboardingSidebar";
import OnboardingNavbar from "@/components/onboarding/OnboardingNavbar";

const otpLength = 6;

export default function OnboardingStepTwoPage() {
  const router = useRouter();
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(Array(otpLength).fill(""));
  const [timer, setTimer] = useState(10);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (timer === 0) {
      return;
    }

    const countdown = setTimeout(() => {
      setTimer((currentTimer) => currentTimer - 1);
    }, 1000);

    return () => clearTimeout(countdown);
  }, [timer]);

  const handleOtpChange = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);

    setOtp((currentOtp) => {
      const nextOtp = [...currentOtp];
      nextOtp[index] = digit;
      return nextOtp;
    });
    setError("");

    if (digit && index < otpLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pastedText = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, otpLength);
    if (!pastedText) return;

    setOtp((currentOtp) => {
      const nextOtp = [...currentOtp];
      pastedText.split("").forEach((digit, index) => {
        nextOtp[index] = digit;
      });
      return nextOtp;
    });

    const nextIndex = Math.min(pastedText.length, otpLength - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleResendCode = () => {
    setTimer(10);
    setError("");
  };

  const handleVerify = async () => {
    if (otp.some((digit) => !digit)) {
      setError("Enter the full six digit verification code.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp: otp.join("") }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Verification failed. Please try again.");
        return;
      }

      router.push("/onboarding/step-3");
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col">
      <OnboardingNavbar />
      <div className="flex flex-1 pt-16">
        <OnboardingSidebar currentStep={1} />
        <section className="flex w-full lg:w-2/3 items-start justify-center px-4 py-8 lg:px-20 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative w-full max-w-[760px] mt-0 lg:-mt-8 rounded-[28px] bg-white px-6 py-10 lg:px-28 lg:py-24 shadow-[0_10px_40px_rgba(0,0,0,0.04)]"
          >
            <button
              type="button"
              onClick={() => router.push("/onboarding/step-1")}
              className="absolute left-6 top-6 flex items-center gap-1 text-sm font-semibold text-gray-500 transition hover:text-[#4F46E5]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
              Back
            </button>

            <div className="absolute right-6 top-6 text-sm font-semibold text-gray-400">
              1/4
            </div>

            <div className="mb-8 pt-8 text-center">
              <h1 className="text-2xl font-bold text-gray-950">
                Verify Email Address
              </h1>
              <p className="mt-3 text-sm leading-6 text-gray-500">
                A six digit verification code has been sent to your email
                address, enter it here to verify your account
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex justify-center gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(element) => {
                      inputRefs.current[index] = element;
                    }}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    value={digit}
                    onChange={(event) =>
                      handleOtpChange(index, event.target.value)
                    }
                    onKeyDown={(event) => handleKeyDown(index, event)}
                    onPaste={handlePaste}
                    maxLength={1}
                    aria-label={`Verification digit ${index + 1}`}
                    className="h-12 w-12 rounded-md border border-gray-300 bg-white text-center text-lg font-semibold text-gray-950 outline-none transition focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20"
                  />
                ))}
              </div>

              {error && (
                <p className="text-center text-sm text-red-600">{error}</p>
              )}

              <p className="text-center text-sm text-gray-500">
                Didn't get Code?{" "}
                {timer > 0 ? (
                  <span className="font-semibold text-[#4F46E5]">
                    Resend code in {timer}s
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendCode}
                    className="font-semibold text-[#4F46E5]"
                  >
                    Resend code
                  </button>
                )}
              </p>

              <button
                type="button"
                onClick={handleVerify}
                disabled={isLoading}
                className="w-full rounded-md bg-[#4F46E5] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#4338CA] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? "Verifying..." : "Verify"}
              </button>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
