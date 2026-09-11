const regles = [
  {
    titre: "Respect absolu",
    texte: "Aucune insulte, aucun harcèlement, aucune pression. Toute personne mérite considération.",
  },
  {
    titre: "Consentement",
    texte: "On ne pose pas de questions intrusives et on n'insiste jamais. Un « non » est définitif.",
  },
  {
    titre: "Zéro jugement",
    texte: "Toutes les orientations, identités, pratiques et niveaux d'expérience sont bienvenus.",
  },
  {
    titre: "Confidentialité",
    texte: "Ce qui se dit dans les salons reste dans les salons. Pas de captures, pas de partage.",
  },
  {
    titre: "Bienveillance",
    texte: "Les débutant·e·s sont accueilli·e·s avec pédagogie. On conseille, on n'ordonne pas.",
  },
  {
    titre: "Adultes uniquement",
    texte: "Le site est réservé aux personnes majeures. Aucun contenu impliquant des mineurs ne sera toléré.",
  },
];

export default function Charte({ onAccept }) {
  return (
    <div className="mx-auto max-w-2xl rounded-3xl border border-emerald-100 bg-white/85 p-8 shadow-soft backdrop-blur">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
        Charte de bienveillance
      </p>

      <h1 className="mt-3 font-serif text-3xl text-stone-900">
        Avant d'entrer dans le chat
      </h1>

      <p className="mt-3 text-stone-600">
        Pour que cet espace reste chaleureux et sûr, lis et accepte ces quelques
        règles.
      </p>

      <div className="mt-6 grid gap-4">
        {regles.map((regle) => (
          <div
            key={regle.titre}
            className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4"
          >
            <h2 className="font-semibold text-emerald-700">{regle.titre}</h2>
            <p className="mt-1 text-sm text-stone-600">{regle.texte}</p>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onAccept}
        className="mt-6 w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-3 font-semibold text-white shadow-md transition hover:opacity-95"
      >
        J'ai lu et j'accepte la charte
      </button>
    </div>
  );
}
