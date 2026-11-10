"use client";

import { useState } from "react";

import SignupModal from "@/components/signupModal";

export default function Home() {
  const [signupOpen, setSignupOpen] = useState(false);

  return (
    <main>
      <button
        onClick={() => setSignupOpen(true)}
        className="rounded-xl bg-orange-500 px-6 py-3 text-white"
      >
        Sign Up
      </button>

      <SignupModal
        open={signupOpen}
        onClose={() => setSignupOpen(false)}
      />
    </main>
  );
}