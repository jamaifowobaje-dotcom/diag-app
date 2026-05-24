"use client";

import { OnboardingProvider } from "@/context/OnboardingContext";

export default function Providers({ children }) {
  return <OnboardingProvider>{children}</OnboardingProvider>;
}