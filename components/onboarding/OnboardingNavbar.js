import Image from "next/image";

export default function OnboardingNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center px-8 py-4 bg-white border-b border-gray-100">
      <div className="flex items-center gap-2">
        <Image
          src="/Diag Logo.png"
          alt="DIAG logo"
          width={28}
          height={28}
        />
        <span className="text-sm font-bold tracking-widest text-gray-800 uppercase">
          DIAG
        </span>
      </div>
    </nav>
  );
}