const steps = [
  "Create Your Account",
  "Tell Us About You",
  "Set Up Your Workspace",
  "Choose Your Focus",
];

export default function OnboardingSidebar({ currentStep = 1 }) {
  return (
    <aside className="hidden lg:flex min-h-screen w-1/3 flex-col bg-transparent px-10 py-10">
      <div className="mb-12">
        <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-950">
          Let's get you set up in just 4 steps
        </h1>
        <p className="text-base leading-7 text-gray-500">
          We'll keep it short and simple, just what we need to personalize your
          experience.
        </p>
      </div>

      <ol className="relative space-y-8">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = currentStep === stepNumber;
          const isCompleted = stepNumber < currentStep;
          const isLastStep = stepNumber === steps.length;

          return (
            <li key={label} className="relative flex items-start gap-4">
              {!isLastStep && (
                <span className="absolute left-5 top-10 h-8 w-px bg-gray-200" />
              )}

              <span
                className={[
                  "z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-semibold",
                  isActive || isCompleted
                    ? "border-[#4F46E5] bg-[#4F46E5] text-white"
                    : "border-gray-300 bg-white text-gray-400",
                ].join(" ")}
              >
                {stepNumber}
              </span>

              <span
                className={[
                  "pt-2 text-base",
                  isActive || isCompleted
                    ? "font-bold text-[#4F46E5]"
                    : "font-medium text-gray-500",
                ].join(" ")}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
