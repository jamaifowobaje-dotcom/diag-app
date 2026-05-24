"use client";

import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "diag_onboarding";

// The default shape for all onboarding data collected across steps.
const defaultOnboardingData = {
  email: "",
  password: "",
  name: "",
  role: "",
  teamSize: "",
  workspaceName: "",
  inviteEmails: [],
  focus: "",
};

const OnboardingContext = createContext(undefined);

export function OnboardingProvider({ children }) {
  const [onboardingData, setOnboardingData] = useState(defaultOnboardingData);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);

      if (savedData) {
        setOnboardingData((currentData) => ({
          ...currentData,
          ...JSON.parse(savedData),
        }));
      }
    } catch (error) {
      console.error("Failed to load onboarding data.", error);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    try {
      const { password, ...safeData } = onboardingData;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(safeData));
    } catch (error) {
      console.error("Failed to save onboarding data.", error);
    }
  }, [onboardingData, hydrated]);

  // Merge partial updates so each step can update only the fields it owns.
  const updateOnboardingData = (updates) => {
    setOnboardingData((currentData) => ({
      ...currentData,
      ...updates,
    }));
  };

  // Return the onboarding flow to its initial empty state.
  const resetOnboardingData = () => {
    setOnboardingData(defaultOnboardingData);

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Failed to clear onboarding data.", error);
    }
  };

  return (
    <OnboardingContext.Provider
      value={{
        onboardingData,
        updateOnboardingData,
        resetOnboardingData,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);

  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }

  return context;
}