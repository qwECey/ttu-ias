export default function HeroSection() {
  return (
    <section className="hero-background relative flex min-h-[85vh] items-center justify-center">
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 max-w-4xl px-6 text-center text-white">
        <h1 className="text-5xl font-extrabold md:text-7xl">
          TTU Industrial Attachment System
        </h1>

        <p className="mt-6 text-lg md:text-xl">
          Digitizing internship, attachment and semester-out management
          for students, companies and university administrators.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <button className="rounded-lg bg-white px-6 py-3 font-semibold text-[#0F2D52] hover:bg-gray-100">
            Login
          </button>

          <button className="rounded-lg border border-white px-6 py-3 font-semibold text-white hover:bg-white hover:text-[#0F2D52]">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}