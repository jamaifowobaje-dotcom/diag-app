"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import OnboardingNavbar from "@/components/onboarding/OnboardingNavbar";
import OnboardingSidebar from "@/components/onboarding/OnboardingSidebar";
import { useOnboarding } from "@/context/OnboardingContext";

const focusOptions = [
  {
    icon: "📝",
    title: "Manage projects or tasks",
    description: "Plan, track, and complete work efficiently",
  },
  {
    icon: "💬",
    title: "Collaborate with my team",
    description: "Share updates, files, and feedback all in one place",
  },
  {
    icon: "📈",
    title: "Track performance or KPIs",
    description: "Build dashboards to monitor growth and goals",
  },
  {
    icon: "🔧",
    title: "Design workflows or systems",
    description: "Create reusable templates and internal tools",
  },
  {
    icon: "👀",
    title: "Just exploring for now",
    description: "Show me around, I'll decide later",
  },
];

export default function OnboardingStepSixPage() {
  const router = useRouter();
  const { updateOnboardingData } = useOnboarding();
  const [selectedFocus, setSelectedFocus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    setIsLoading(true);
    try {
      const userId = localStorage.getItem("diag_user_id");

      const response = await fetch("/api/user/focus", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, focus: selectedFocus }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data.error || "Failed to save focus.");
      }

      updateOnboardingData({ focus: selectedFocus });
      router.push("/dashboard");
    } catch (error) {
      console.error("Something went wrong saving focus.");
      updateOnboardingData({ focus: selectedFocus });
      router.push("/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col">
      <OnboardingNavbar />
      <div className="flex flex-1 pt-16">
        <OnboardingSidebar currentStep={4} />
        <section className="flex w-full lg:w-2/3 items-start justify-center px-4 py-8 lg:px-20 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative w-full max-w-[760px] mt-0 lg:-mt-8 rounded-[28px] bg-white px-6 py-10 lg:px-28 lg:py-24 shadow-[0_10px_40px_rgba(0,0,0,0.04)]"
          >
            <button
              type="button"
              onClick={() => router.push("/onboarding/step-5")}
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
              Set up your workspace
            </button>

            <div className="absolute right-6 top-6 text-sm font-semibold text-gray-400">
              4/4
            </div>

            <div className="mb-8 pt-8">
              <h1 className="text-2xl font-bold text-gray-950">
                What do you want to achieve?
              </h1>
              <p className="mt-3 text-sm leading-6 text-gray-500">
                Choose a use case so we can recommend the right tools and
                templates to get you started faster. You can always change this
                later.
              </p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-3">
                {focusOptions.map((option, index) => {
                  const isSelected = selectedFocus === option.title;

                  return (
                    <button
                      key={option.title}
                      type="button"
                      onClick={() => setSelectedFocus(option.title)}
                      className={[
                        "rounded-md border p-3 text-left transition hover:border-[#4F46E5]/60",
                        index >= 3 ? "col-span-1" : "",
                        isSelected
                          ? "border-[#4F46E5] bg-indigo-50"
                          : "border-gray-200 bg-white",
                      ].join(" ")}
                    >
                      <span className="mb-3 block text-2xl">{option.icon}</span>
                      <span className="block text-sm font-semibold leading-5 text-gray-950">
                        {option.title}
                      </span>
                      <span className="mt-2 block text-xs leading-5 text-gray-500">
                        {option.description}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => router.push("/dashboard")}
                  className="text-sm font-semibold text-gray-500 transition hover:text-[#4F46E5]"
                >
                  Skip for later
                </button>

                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={!selectedFocus || isLoading}
                  className="rounded-md bg-[#4F46E5] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4338CA] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-70"
                >
                  {isLoading ? "Saving..." : "Continue"}
                </button>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
