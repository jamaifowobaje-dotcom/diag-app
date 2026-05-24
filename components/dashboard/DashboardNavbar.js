"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/context/OnboardingContext";

export default function DashboardNavbar({
  userName = "User",
  onToggleSidebar,
  sidebarOpen,
  user,
}) {
  const [profileOpen, setProfileOpen] = useState(false);
  const router = useRouter();
  const { resetOnboardingData } = useOnboarding();

  const handleLogout = () => {
    localStorage.removeItem("diag_user_id");
    document.cookie = "diag_user_id=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    resetOnboardingData();
    router.push("/login");
  };
  const dropdownRef = useRef(null);
  const displayName = user?.name || userName;
  const displayEmail = user?.email || "—";
  const displayRole = user?.role || "—";
  const displayWorkspace = user?.workspaceName || "—";
  const displayTeamSize = user?.teamSize || "—";
  const displayInviteCount = user?.inviteEmails?.length ?? "—";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 z-20 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 transition-all duration-300 left-0 right-0`}
    >
      <div className="flex items-center gap-2 mr-6">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="mr-2 text-gray-500 transition hover:text-gray-900 lg:hidden"
          aria-label="Open sidebar"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <img src="/Diag Logo.png" alt="DIAG logo" width={28} height={28} />
        <span className="text-xl font-bold tracking-wide text-gray-950">
          DIAG
        </span>
      </div>

      <div className="hidden flex-1 justify-start ml-30 lg:flex">
        <div className="relative w-full max-w-md">
          <svg
            aria-hidden="true"
            className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
            />
          </svg>
          <input
            type="search"
            placeholder="Search anything..."
            className="w-full rounded-md bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-950 outline-none transition focus:ring-2 focus:ring-[#4F46E5]/20"
          />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <button
          type="button"
          className="relative text-gray-500 transition hover:text-gray-900"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5m6 0a3 3 0 0 1-6 0"
            />
          </svg>
          <span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            onClick={() => setProfileOpen((open) => !open)}
            className="flex items-center gap-3"
          >
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
                displayName,
              )}`}
              alt={displayName}
              className="h-10 w-10 rounded-full bg-gray-100 object-cover"
            />
            <span className="hidden text-sm font-semibold text-gray-800 lg:block">
              {displayName}
            </span>
            <svg
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m6 9 6 6 6-6"
              />
            </svg>
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-14 z-30 w-64 rounded-lg bg-white p-4 shadow-lg ring-1 ring-gray-200">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
                  displayName,
                )}`}
                alt={displayName}
                className="mx-auto h-16 w-16 rounded-full bg-gray-100 object-cover"
              />
              <div className="mt-3 text-center">
                <p className="font-bold text-gray-950">{displayName}</p>
                <p className="mt-1 text-sm text-gray-500">{displayEmail}</p>
                <p className="mt-1 text-sm text-gray-500">{displayRole}</p>
              </div>
              <div className="my-3 border-t border-gray-100" />
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Workspace
              </p>
              <p className="mt-1 text-sm font-medium text-gray-700">
                {displayWorkspace}
              </p>
              <div className="my-3 border-t border-gray-100" />
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Team Size
              </p>
              <p className="mt-1 text-sm font-medium text-gray-700">
                {displayTeamSize}
              </p>
              <div className="my-3 border-t border-gray-100" />
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Teammates Invited
              </p>
              <p className="mt-1 text-sm font-medium text-gray-700">
                {displayInviteCount}
              </p>
              <div className="my-3 border-t border-gray-100" />
              <button
                type="button"
                onClick={handleLogout}
                className="w-full rounded-md bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}