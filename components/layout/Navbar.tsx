import Image from "next/image";

export default function Navbar() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <Image
            src="/images/ttu_logo.png"
            alt="TTU Logo"
            width={50}
            height={50}
          />

          <div>
            <h1 className="font-bold text-[#0F2D52]">
              TTU Industrial Attachment System
            </h1>

            <p className="text-sm text-gray-500">
              Takoradi Technical University
            </p>
          </div>
        </div>

        <button className="rounded-lg bg-[#0F2D52] px-5 py-2 text-white transition hover:opacity-90">
          Login
        </button>
      </div>
    </header>
  );
}