"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import OnboardingSidebar from "@/components/onboarding/OnboardingSidebar";
import OnboardingNavbar from "@/components/onboarding/OnboardingNavbar";
import { useOnboarding } from "@/context/OnboardingContext";

const teamSizeOptions = [
  "Just me",
  "2–10 teammates",
  "11–50 teammates",
  "50+ teammates",
];

const initialErrors = {
  name: "",
  role: "",
};

export default function OnboardingStepThreePage() {
  const router = useRouter();
  const { updateOnboardingData } = useOnboarding();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [teamSize, setTeamSize] = useState("Just me");
  const [errors, setErrors] = useState(initialErrors);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const nextErrors = { ...initialErrors };

    if (!name.trim()) {
      nextErrors.name = "Name is required.";
    }

    if (!role.trim()) {
      nextErrors.role = "Role is required.";
    }

    setErrors(nextErrors);
    return !nextErrors.name && !nextErrors.role;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const userId = localStorage.getItem("diag_user_id");

      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, name, role, teamSize }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors((current) => ({
          ...current,
          name: data.error || "Something went wrong.",
        }));
        return;
      }

      updateOnboardingData({ name, role, teamSize });
      router.push("/onboarding/step-4");
    } catch (error) {
      setErrors((current) => ({ ...current, name: "Something went wrong. Please try again." }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col">
      <OnboardingNavbar />
      <div className="flex flex-1 pt-16">
        <OnboardingSidebar currentStep={2} />
        <section className="flex w-full lg:w-2/3 items-start justify-center px-4 py-8 lg:px-20 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative w-full max-w-[760px] mt-0 lg:-mt-8 rounded-[28px] bg-white px-6 py-10 lg:px-28 lg:py-24 shadow-[0_10px_40px_rgba(0,0,0,0.04)]"
          >
            <div className="absolute right-6 top-6 text-sm font-semibold text-gray-400">
              2/4
            </div>

            <div className="mb-8 pr-12">
              <h1 className="text-2xl font-bold text-gray-950">
                Who's joining us?
              </h1>
              <p className="mt-3 text-sm leading-6 text-gray-500">
                We'd love to know your name and role so we can tailor the
                experience to how you work best, whether you're solo or with a
                team.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  What should we call you?
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="eg., Orimadegun Promise"
                  className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-950 outline-none transition focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="role"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  What's your role?
                </label>
                <input
                  id="role"
                  type="text"
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                  placeholder="eg., Product designer"
                  className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-950 outline-none transition focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20"
                />
                {errors.role && (
                  <p className="mt-2 text-sm text-red-600">{errors.role}</p>
                )}
              </div>

              <fieldset>
                <legend className="mb-3 block text-sm font-medium text-gray-700">
                  Are you working solo or with a team?
                </legend>
                <div className="space-y-3">
                  {teamSizeOptions.map((option) => {
                    const isSelected = teamSize === option;

                    return (
                      <label
                        key={option}
                        className="flex cursor-pointer items-center gap-3 py-2"
                      >
                        <input
                          type="radio"
                          name="teamSize"
                          value={option}
                          checked={isSelected}
                          onChange={(event) => setTeamSize(event.target.value)}
                          className="sr-only"
                        />
                        <span
                          className={[
                            "flex h-5 w-5 items-center justify-center rounded-full border",
                            isSelected ? "border-[#4F46E5]" : "border-gray-300",
                          ].join(" ")}
                        >
                          {isSelected && (
                            <span className="h-3 w-3 rounded-full bg-[#4F46E5]" />
                          )}
                        </span>
                        <span className="text-sm font-medium text-gray-700">
                          {option}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

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
