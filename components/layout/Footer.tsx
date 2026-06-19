export default function Footer() {
  return (
    <footer className="bg-[#0F2D52] py-12 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-xl font-bold">
              TTU Industrial Attachment System
            </h3>

            <p className="mt-3 text-sm text-gray-300">
              Digitizing internship, attachment and semester-out management
              for Takoradi Technical University.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">Quick Links</h4>

            <ul className="mt-3 space-y-2 text-sm text-gray-300">
              <li>Home</li>
              <li>Features</li>
              <li>How It Works</li>
              <li>Login</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Contact</h4>

            <p className="mt-3 text-sm text-gray-300">
              Takoradi Technical University
            </p>

            <p className="text-sm text-gray-300">
              Internship & Industrial Liaison Office
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-white/20 pt-6 text-center text-sm text-gray-300">
          © 2026 TTU Industrial Attachment System. All rights reserved.
        </div>
      </div>
    </footer>
  );
}