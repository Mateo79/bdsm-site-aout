import { useState } from "react";
import { signalerContenu } from "../lib/signalements";

const raisons = [
  "Spam ou publicité",
  "Harcèlement ou insultes",
  "Contenu illégal",
  "Non-respect de la charte",
  "Autre",
];

export default function BoutonSignalement({ type, contenuId, titre, compact = false }) {
  const [ouvert, setOuvert] = useState(false);
  const [raison, setRaison] = useState("");
  const [envoye, setEnvoye] = useState(false);

  function envoyer(event) {
    event.preventDefault();

    if (!raison) {
      alert("Choisis une raison de signalement.");
      return;
    }

    signalerContenu({ type, contenuId, titre, raison });
    setEnvoye(true);
    setOuvert(false);
  }

  if (envoye) {
    return (
      <span className="text-xs font-semibold text-emerald-600">
        Merci, contenu signalé.
      </span>
    );
  }

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setOuvert((o) => !o)}
        className={`${
          compact ? "text-[11px]" : "text-xs"
        } font-semibold text-stone-400 transition hover:text-rose-600`}
      >
        ⚑ Signaler
      </button>

      {ouvert && (
        <form
          onSubmit={envoyer}
          className="absolute left-0 z-30 mt-2 w-60 rounded-2xl border border-stone-200 bg-white p-3 shadow-xl"
        >
          <p className="mb-2 text-xs font-semibold text-stone-700">
            Pourquoi signales-tu ce contenu ?
          </p>

          <select
            value={raison}
            onChange={(event) => setRaison(event.target.value)}
            className="w-full rounded-lg border border-stone-200 bg-white px-2 py-2 text-sm outline-none focus:border-rose-300"
          >
            <option value="">Choisir une raison...</option>
            {raisons.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>

          <div className="mt-2 flex gap-2">
            <button
              type="submit"
              className="flex-1 rounded-lg bg-rose-500 px-2 py-1.5 text-xs font-semibold text-white transition hover:bg-rose-600"
            >
              Signaler
            </button>
            <button
              type="button"
              onClick={() => setOuvert(false)}
              className="flex-1 rounded-lg border border-stone-200 px-2 py-1.5 text-xs font-semibold text-stone-600 transition hover:bg-stone-100"
            >
              Annuler
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
