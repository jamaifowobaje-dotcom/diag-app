"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import OnboardingNavbar from "@/components/onboarding/OnboardingNavbar";
import OnboardingSidebar from "@/components/onboarding/OnboardingSidebar";
import { useOnboarding } from "@/context/OnboardingContext";

export default function OnboardingStepFivePage() {
  const router = useRouter();
  const { updateOnboardingData } = useOnboarding();
  const [currentEmail, setCurrentEmail] = useState("");
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addEmailTag = () => {
    const email = currentEmail.trim();
    if (!email) return;
    setTags((current) => [...current, email]);
    setCurrentEmail("");
  };

  const handleEmailKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addEmailTag();
    }
  };

  const removeEmailTag = (tagToRemove) => {
    setTags((current) => current.filter((tag) => tag !== tagToRemove));
  };

  const handleContinue = async () => {
    setIsLoading(true);
    try {
      const userId = localStorage.getItem("diag_user_id");

      const response = await fetch("/api/user/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, inviteEmails: tags }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data.error || "Failed to save invite emails.");
      }

      updateOnboardingData({ inviteEmails: tags });
      router.push("/onboarding/step-6");
    } catch (error) {
      console.error("Something went wrong saving invite emails.");
      updateOnboardingData({ inviteEmails: tags });
      router.push("/onboarding/step-6");
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
              onClick={() => router.push("/onboarding/step-4")}
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
              Back
            </button>

            <div className="absolute right-6 top-6 text-sm font-semibold text-gray-400">
              3/4
            </div>

            <div className="mb-8 pt-8">
              <h1 className="text-2xl font-bold text-gray-950">
                Invite teammates by email
              </h1>
              <p className="mt-3 text-sm leading-6 text-gray-500">
                Add their email addresses so they can join your workspace right
                away. You can skip this and invite them later.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="inviteEmails"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Enter Email Address?
                </label>
                <input
                  id="inviteEmails"
                  type="text"
                  value={currentEmail}
                  onChange={(event) => setCurrentEmail(event.target.value)}
                  onKeyDown={handleEmailKeyDown}
                  placeholder="eg., Adebanjo@gmail.com"
                  className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-950 outline-none transition focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20"
                />
                {tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeEmailTag(tag)}
                          className="text-indigo-500 transition hover:text-indigo-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="rounded-md border border-gray-200 bg-gray-50 px-4 py-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-800">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#4F46E5] text-xs font-bold text-white">
                    i
                  </span>
                  Quick Tips
                </div>
                <ol className="list-decimal space-y-2 pl-5 text-sm leading-5 text-gray-600">
                  <li>Separate multiple emails with commas</li>
                  <li>Press Enter or comma to add each teammate</li>
                  <li>
                    They won't receive an invite until you've completed your
                    setup
                  </li>
                  <li>You can skip this step and invite teammates later</li>
                </ol>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => router.push("/onboarding/step-6")}
                  className="text-sm font-semibold text-gray-500 transition hover:text-[#4F46E5]"
                >
                  Skip for later
                </button>

                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={isLoading}
                  className="rounded-md bg-[#4F46E5] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4338CA] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
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
