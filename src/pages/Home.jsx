import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="grid gap-6">
      <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-10 shadow-soft backdrop-blur">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-rose-200/50 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-amber-200/50 blur-3xl"></div>
        <div className="absolute right-24 top-24 h-24 w-24 rounded-full bg-violet-200/50 blur-2xl"></div>

        <div className="relative">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-500">
            Espace bienveillant
          </p>

          <h1 className="mt-4 font-serif text-4xl text-stone-900">
            Dépose ton annonce ou découvre la communauté
          </h1>

          <p className="mt-4 max-w-2xl text-stone-600">
            Cette première version permet de déposer une annonce simple, de
            consulter les annonces publiées et, plus tard, d'ouvrir des espaces
            de discussion anonymes.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/deposer-une-annonce"
              className="rounded-xl bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 px-5 py-3 font-semibold text-white shadow-md transition hover:opacity-95"
            >
              Déposer une annonce
            </Link>

            <Link
              to="/annonces"
              className="rounded-xl border border-rose-200 bg-white/90 px-5 py-3 font-semibold text-stone-800 shadow-sm transition hover:bg-rose-50"
            >
              Voir les annonces
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Link
          to="/annonces"
          className="rounded-3xl border border-rose-100 bg-gradient-to-br from-white to-rose-50 p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="h-3 w-16 rounded-full bg-gradient-to-r from-rose-400 to-orange-400"></div>
          <h2 className="mt-4 font-serif text-xl">Rencontres</h2>
          <p className="mt-2 text-stone-600">
            Des annonces simples, sans profil public.
          </p>
        </Link>

        <Link
          to="/textes"
          className="rounded-3xl border border-violet-100 bg-gradient-to-br from-white to-violet-50 p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="h-3 w-16 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400"></div>
          <h2 className="mt-4 font-serif text-xl">Textes</h2>
          <p className="mt-2 text-stone-600">
            Lis les textes de la communauté ou écris le tien avec un éditeur complet.
          </p>
        </Link>

        <Link
          to="/conseils"
          className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-white to-emerald-50 p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="h-3 w-16 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400"></div>
          <h2 className="mt-4 font-serif text-xl">Conseils</h2>
          <p className="mt-2 text-stone-600">
            Découvre les thèmes : vanille, soft, hard, bondage, fétichisme et plus.
          </p>
        </Link>
      </div>
    </section>
  );
}
