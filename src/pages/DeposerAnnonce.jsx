import AnnonceForm from "../components/AnnonceForm";

export default function DeposerAnnonce() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-soft backdrop-blur">
        <div className="rounded-2xl bg-gradient-to-r from-rose-50 via-amber-50 to-violet-50 p-6">
          <h1 className="font-serif text-3xl text-stone-900">
            Déposer une annonce
          </h1>

          <p className="mt-3 text-stone-600">
            Remplis les informations ci-dessous pour publier ton annonce.
          </p>
        </div>

        <div className="mt-8">
          <AnnonceForm />
        </div>
      </div>
    </div>
  );
}
