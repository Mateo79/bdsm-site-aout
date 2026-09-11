import { useState } from "react";

export default function AgeGate() {
  const [verified, setVerified] = useState(() => {
    return localStorage.getItem("age_verified") === "true";
  });

  if (verified) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-stone-900/80 via-rose-950/60 to-amber-950/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-white/40 bg-white/95 p-8 shadow-soft">
        <div className="rounded-2xl bg-gradient-to-r from-rose-50 via-amber-50 to-violet-50 p-5">
          <h2 className="font-serif text-3xl text-stone-900">
            Contenu réservé aux adultes
          </h2>
        </div>

        <p className="mt-5 text-stone-600">
          Ce site parle de rencontres, de BDSM et de fétichisme entre adultes
          consentants. Tu dois avoir 18 ans ou plus pour continuer.
        </p>

        <button
          type="button"
          onClick={() => {
            localStorage.setItem("age_verified", "true");
            setVerified(true);
          }}
          className="mt-6 w-full rounded-xl bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 px-4 py-3 font-semibold text-white shadow-md transition hover:opacity-95"
        >
          J'ai 18 ans ou plus
        </button>

        <a
          href="https://www.google.com"
          className="mt-4 block text-center text-sm text-stone-500 hover:text-stone-700"
        >
          Je suis mineur
        </a>
      </div>
    </div>
  );
}
