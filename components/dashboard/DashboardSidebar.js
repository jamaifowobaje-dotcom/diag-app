import Image from "next/image";

const navItems = [
  {
    label: "Dashboard",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"
        />
      </svg>
    ),
  },
  {
    label: "Report",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 17v-6m4 6V7m4 10v-4M5 21h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2z"
        />
      </svg>
    ),
  },
  {
    label: "Analytics",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3v18h18M7 15l4-4 3 3 5-7"
        />
      </svg>
    ),
  },
  {
    label: "Users",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2m12-10a4 4 0 1 0-8 0 4 4 0 0 0 8 0zm10 10v-2a4 4 0 0 0-3-3.87m-4-12a4 4 0 0 1 0 7.75"
        />
      </svg>
    ),
  },
  {
    label: "Integrations",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 12h8m-4-4v8M7 3h10a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm0 10h10a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2z"
        />
      </svg>
    ),
  },
  {
    label: "Settings",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.325 4.317a1.724 1.724 0 0 1 3.35 0 1.724 1.724 0 0 0 2.573 1.066 1.724 1.724 0 0 1 2.37 2.37 1.724 1.724 0 0 0 1.065 2.572 1.724 1.724 0 0 1 0 3.35 1.724 1.724 0 0 0-1.066 2.573 1.724 1.724 0 0 1-2.37 2.37 1.724 1.724 0 0 0-2.572 1.065 1.724 1.724 0 0 1-3.35 0 1.724 1.724 0 0 0-2.573-1.066 1.724 1.724 0 0 1-2.37-2.37 1.724 1.724 0 0 0-1.065-2.572 1.724 1.724 0 0 1 0-3.35 1.724 1.724 0 0 0 1.066-2.573 1.724 1.724 0 0 1 2.37-2.37 1.724 1.724 0 0 0 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
        />
      </svg>
    ),
  },
];

export default function DashboardSidebar({
  activePage = "Dashboard",
  isOpen = true,
  onToggle,
  onClose,
}) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-10 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-16 z-20 flex h-[calc(100vh-4rem)] w-64 flex-col border-r border-gray-200 bg-white transition-all duration-300 ${
          isOpen ? "translate-x-0 lg:w-64" : "-translate-x-full lg:w-16"
        } lg:translate-x-0`}
      >
        <div className="px-4 py-4">
          <button
            type="button"
            onClick={onToggle}
            className="flex h-10 w-full items-center gap-3 rounded-md pl-1 pr-4 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
          >
            <div className="relative h-6 w-6">
              {/* Top line */}
              <span
                className={`absolute left-0 top-1 w-6 h-0.5 bg-current transition-all duration-300 ${
                  isOpen ? "rotate-45 top-3" : ""
                }`}
              />

              {/* Middle line */}
              <span
                className={`absolute left-0 top-3 w-6 h-0.5 bg-current transition-all duration-300 ${
                  isOpen ? "opacity-0" : ""
                }`}
              />

              {/* Bottom line */}
              <span
                className={`absolute left-0 top-5 w-6 h-0.5 bg-current transition-all duration-300 ${
                  isOpen ? "-rotate-45 top-3" : ""
                }`}
              />
            </div>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto space-y-1 px-4 py-4">
          {navItems.map((item) => {
            const isActive = activePage === item.label;

            return (
              <a
                key={item.label}
                href="#"
                className={[
                  `flex items-center ${
                    isOpen ? "justify-start gap-3 px-4" : "justify-center px-0"
                  } border-r-2 py-3 text-sm font-medium transition`,
                  isActive
                    ? "border-[#4F46E5] text-[#4F46E5]"
                    : "border-transparent text-gray-500 hover:text-gray-900",
                ].join(" ")}
              >
                {item.icon}
                {isOpen && item.label}
              </a>
            );
          })}
        </nav>

        {isOpen && (
          <div className="p-4">
            <div className="rounded-lg bg-indigo-50 p-4">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#4F46E5]">
                <svg
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 0 0 1.946-.806 3.42 3.42 0 0 1 4.438 0 3.42 3.42 0 0 0 1.946.806 3.42 3.42 0 0 1 3.138 3.138 3.42 3.42 0 0 0 .806 1.946 3.42 3.42 0 0 1 0 4.438 3.42 3.42 0 0 0-.806 1.946 3.42 3.42 0 0 1-3.138 3.138 3.42 3.42 0 0 0-1.946.806 3.42 3.42 0 0 1-4.438 0 3.42 3.42 0 0 0-1.946-.806 3.42 3.42 0 0 1-3.138-3.138 3.42 3.42 0 0 0-.806-1.946 3.42 3.42 0 0 1 0-4.438 3.42 3.42 0 0 0 .806-1.946 3.42 3.42 0 0 1 3.138-3.138z"
                  />
                </svg>
              </div>

              <p className="text-sm font-bold text-gray-950">
                You're on a 7-day free trial
              </p>

              <p className="mt-2 text-xs leading-5 text-gray-600">
                Enjoy full access to all features, no limits, no commitments yet.
                Make the most of it before your trial ends.
              </p>

              <button
                type="button"
                className="mt-4 w-full rounded-md bg-[#4F46E5] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4338CA]"
              >
                Choose a Plan
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}