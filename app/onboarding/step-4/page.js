"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import OnboardingSidebar from "@/components/onboarding/OnboardingSidebar";
import OnboardingNavbar from "@/components/onboarding/OnboardingNavbar";
import { useOnboarding } from "@/context/OnboardingContext";

export default function OnboardingStepFourPage() {
  const router = useRouter();
  const { updateOnboardingData } = useOnboarding();
  const [workspaceName, setWorkspaceName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!workspaceName.trim()) {
      setError("Workspace name is required.");
      return;
    }

    setIsLoading(true);
    try {
      const userId = localStorage.getItem("diag_user_id");

      const response = await fetch("/api/user/workspace", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, workspaceName }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      updateOnboardingData({ workspaceName });
      router.push("/onboarding/step-5");
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
        <OnboardingSidebar currentStep={3} />
        <section className="flex w-full lg:w-2/3 items-start justify-center px-4 py-8 lg:px-20 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative w-full max-w-[760px] mt-0 lg:-mt-8 rounded-[28px] bg-white px-6 py-10 lg:px-28 lg:py-24 shadow-[0_10px_40px_rgba(0,0,0,0.04)]"
          >
            <button
              type="button"
              onClick={() => router.push("/onboarding/step-3")}
              className="absolute left-6 top-6 flex items-center gap-1 text-sm font-semibold text-gray-500 transition hover:text-[#4F46E5]"
            >
              <svg
                aria-hidden="true"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Tell us about you
            </button>

            <div className="absolute right-6 top-6 text-sm font-semibold text-gray-400">
              3/4
            </div>

            <div className="mb-8 pt-8">
              <h1 className="text-2xl font-bold text-gray-950">
                Create your workspace
              </h1>
              <p className="mt-3 text-sm leading-6 text-gray-500">
                Name your workspace and invite teammates (if you'd like). You
                can always add more later, we'll keep things flexible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="workspaceName"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  What's the name of your workspace?
                </label>
                <input
                  id="workspaceName"
                  type="text"
                  value={workspaceName}
                  onChange={(event) => {
                    setWorkspaceName(event.target.value);
                    setError("");
                  }}
                  placeholder="eg., Nexa team"
                  className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-950 outline-none transition focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20"
                />
                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-md bg-[#4F46E5] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#4338CA] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? "Saving..." : "Continue"}
              </button>
            </form>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
