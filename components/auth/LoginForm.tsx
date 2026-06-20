"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const result = await signIn("credentials", {
        loginId,
        password,
        redirect: false,
      });

      if (result?.error) {
        alert("Invalid Login ID or Password");
        return;
      }

      const sessionResponse = await fetch(
  "/api/auth/session"
);

const session = await sessionResponse.json();

switch (session.user?.role) {
  case "ADMIN":
    router.push("/admin");
    break;

  case "STUDENT":
    router.push("/student");
    break;

  case "COMPANY":
    router.push("/company");
    break;

  case "SUPERVISOR":
    router.push("/supervisor");
    break;

  case "LIAISON":
    router.push("/liaison");
    break;

  default:
    router.push("/dashboard");
}

router.refresh();
    } catch {
      alert("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* LOGIN ID */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Login ID
        </label>

        <input
          type="text"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
          placeholder="BC/ICT/22/088"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
          required
        />
      </div>

      {/* PASSWORD */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Password
        </label>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-16 outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
            required
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-sm font-medium text-gray-600 hover:text-yellow-600"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      {/* FORGOT PASSWORD */}
      <div className="flex justify-end">
        <button
          type="button"
          className="cursor-pointer text-sm text-yellow-600 transition hover:text-yellow-700 hover:underline"
        >
          Forgot Password?
        </button>
      </div>

      {/* SIGN IN BUTTON */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full cursor-pointer rounded-lg bg-yellow-500 px-4 py-3 font-semibold text-white transition hover:bg-yellow-600 disabled:cursor-not-allowed disabled:bg-yellow-300"
      >
        {isLoading ? "Signing In..." : "Sign In →"}
      </button>
    </form>
  );
}