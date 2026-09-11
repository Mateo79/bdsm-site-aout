import { useState } from "react";
import Fetichisme from "./Fetichisme";

const bases = [
  {
    titre: "Consentement",
    texte:
      "Toute pratique doit être discutée et consentie par toutes les personnes impliquées, avant, pendant et après.",
  },
  {
    titre: "Safe word",
    texte:
      "Un mot de sécurité (par exemple « rouge », « jaune », « vert ») permet d'arrêter ou de ralentir le jeu à tout moment.",
  },
  {
    titre: "SSC / RACK",
    texte:
      "Sain, Sûr, Consensuel / Risk-Aware Consensual Kink : deux philosophies pour pratiquer en connaissant ses limites et ses risques.",
  },
  {
    titre: "Progressivité",
    texte:
      "On commence doucement, on communique beaucoup, et on augmente l'intensité seulement quand la confiance est installée.",
  },
];

const themes = [
  {
    nom: "Vanille",
    badge: "Vanille",
    badgeClass: "border-emerald-200 bg-emerald-50 text-emerald-700",
    texte:
      "Pratiques en dehors de l'univers BDSM : tendresse, sensualité et relations classiques. Un point de départ doux pour découvrir ses envies.",
  },
  {
    nom: "Soft",
    badge: "Soft",
    badgeClass: "border-amber-200 bg-amber-50 text-amber-700",
    texte:
      "Découverte du BDSM en douceur : bandeau sur les yeux, attaches légères, jeux sensoriels, fessées légères. Idéal pour explorer le rapport de pouvoir sans intensité.",
  },
  {
    nom: "Hard",
    badge: "Hard",
    badgeClass: "border-rose-200 bg-rose-50 text-rose-700",
    texte:
      "Pratiques plus intenses pour personnes expérimentées : impact play soutenu, bondage strict, jeux de domination avancés. Exige confiance, communication et safe word solide.",
  },
  {
    nom: "Bondage / Shibari",
    badge: "Soft à Hard",
    badgeClass: "border-orange-200 bg-orange-50 text-orange-700",
    texte:
      "L'art d'attacher son partenaire. Le shibari, bondage japonais à base de cordes, mêle esthétique, sensations et connexion profonde.",
  },
  {
    nom: "Impact play",
    badge: "Soft à Hard",
    badgeClass: "border-orange-200 bg-orange-50 text-orange-700",
    texte:
      "L'art de frapper de manière consentie : fessées à la main, paddles, floggers. Du plus doux au plus intense selon les envies.",
  },
  {
    nom: "Domination / Soumission",
    badge: "Variable",
    badgeClass: "border-violet-200 bg-violet-50 text-violet-700",
    texte:
      "Échange de pouvoir consenti dans une relation D/s. Reposant sur la confiance, les règles négociées et le respect mutuel.",
  },
  {
    nom: "Fétichisme",
    badge: "Variable",
    badgeClass: "border-violet-200 bg-violet-50 text-violet-700",
    texte:
      "Attirance pour des matières, objets ou parties du corps : cuir, latex, pieds, uniformes... Chacun son univers.",
  },
  {
    nom: "Petplay",
    badge: "Soft",
    badgeClass: "border-amber-200 bg-amber-50 text-amber-700",
    texte:
      "Jeu de rôle animal : pup, kitten, poney. Un univers ludique et bienveillant pour lâcher prise.",
  },
  {
    nom: "Jeux sensoriels",
    badge: "Soft",
    badgeClass: "border-amber-200 bg-amber-50 text-amber-700",
    texte:
      "Explorer les sensations : glace, cire tiède, plumes, privation sensorielle. Éveiller le corps sans passer par la douleur.",
  },
  {
    nom: "CNC",
    badge: "Hard",
    badgeClass: "border-rose-200 bg-rose-50 text-rose-700",
    texte:
      "Consensual Non-Consent : jeu de rôle de « non-consentement » négocié entre adultes avertis. Réservé aux personnes expérimentées avec une confiance totale.",
  },
];

const pratiquesSoft = [
  {
    nom: "Bandeau sur les yeux",
    resume: "Priver la vue pour décupler les autres sens et renforcer la confiance.",
    detail:
      "Le bandeau est souvent la première pratique explorée, car il ne demande aucun matériel spécifique : un foulard suffit. En privant la vue, il amplifie le toucher, l'ouïe et l'anticipation, ce qui rend chaque caresse ou chaque son plus intense. C'est aussi un excellent exercice de confiance : la personne bandée accepte de se laisser guider. Pense à toujours pouvoir retirer le bandeau rapidement, à annoncer ce qui va se passer, et à vérifier régulièrement que tout va bien, surtout au début.",
  },
  {
    nom: "Bondage léger",
    resume: "Attaches douces avec foulards, cravates ou menottes en tissu, sans contrainte intense.",
    detail:
      "Commence avec des matières douces et larges : foulards, cravates, liens en tissu ou menottes rembourrées. L'objectif n'est pas l'immobilisation totale mais la sensation d'être contenu·e et guidé·e. Vérifie que la circulation reste bonne (on doit pouvoir glisser un doigt sous le lien), évite les articulations fragiles, et garde toujours de quoi défaire ou couper rapidement. Ne laisse jamais une personne attachée seule, même quelques minutes.",
  },
  {
    nom: "Plume et caresses",
    resume: "Explorer le corps avec des textures légères pour éveiller les sensations.",
    detail:
      "Alterne les textures (plume, soie, doigts, souffle) et les rythmes pour éveiller les terminaisons nerveuses sans chercher un résultat précis. Associé au bandeau, cet exercice devient un jeu de devinette sensoriel très puissant. L'idée est d'explorer la carte du corps de ton ou ta partenaire, de repérer les zones sensibles, et de construire l'excitation par l'anticipation plutôt que par l'intensité.",
  },
  {
    nom: "Fessées légères",
    resume: "Impact play très doux à la main, pour découvrir les sensations sans douleur intense.",
    detail:
      "On parle ici de fessées à la main, progressives et toujours sur les zones charnues (fesses, haut des cuisses). Commence par chauffer la peau avec des caresses, puis augmente doucement l'intensité en demandant régulièrement ce que ressent ton ou ta partenaire. Évite absolument le bas du dos, la colonne et les reins. Beaucoup apprécient un retour au calme avec des caresses après la séance : c'est ce qu'on appelle l'aftercare.",
  },
  {
    nom: "Massage sensuel",
    resume: "Huiles, gestes lents et attention pleine pour créer une connexion profonde.",
    detail:
      "Installe une ambiance calme : lumière tamisée, température agréable, musique douce si vous aimez. Utilise une huile adaptée et prends ton temps : le massage sensuel n'a pas de but précis, il sert à créer une connexion et à mettre le corps en confiance. Alterne pressions lentes et caresses légères, et écoute les réactions. C'est une excellente porte d'entrée vers d'autres pratiques soft.",
  },
  {
    nom: "Jeux de température",
    resume: "Glaçons ou souffles chauds pour jouer avec les contrastes sur la peau.",
    detail:
      "Le contraste chaud et froid réveille la peau et l'attention. Passe un glaçon rapidement sur la peau, ou souffle chaud juste après : les sensations se démultiplient. Précautions : ne laisse jamais la glace immobile au même endroit (risque de brûlure par le froid), évite les zones trop sensibles, et combine souvent avec le bandeau pour amplifier l'effet de surprise.",
  },
  {
    nom: "Cire tiède",
    resume: "Bougies de massage à basse température pour des sensations chaudes sans brûlure.",
    detail:
      "Utilise uniquement des bougies de massage à basse température (généralement à base de soja), jamais de bougies décoratives classiques. Teste toujours la cire sur ton propre avant-bras avant, et verse de haut (30 à 40 cm) pour que la cire refroidisse légèrement en chemin. Commence sur des zones charnues comme le dos ou les fesses, et évite les zones sensibles.",
  },
  {
    nom: "Jeu de rôle léger",
    resume: "Incarner un personnage pour sortir du quotidien, sans scénario complexe.",
    detail:
      "Choisissez un scénario simple qui fait envie aux deux personnes : l'inconnu·e au bar, la personne autoritaire qui aide à déménager... Définissez avant le début : qui joue qui, ce qui est autorisé, et le safe word. Le jeu de rôle permet d'explorer des rapports de pouvoir ou des fantasmes en gardant une distance rassurante : ce n'est pas toi, c'est le personnage. Prévois un petit moment après la séance pour redevenir vous-mêmes.",
  },
  {
    nom: "Domination verbale douce",
    resume: "Ordres simples et bienveillants pour installer un rapport de pouvoir sans intensité.",
    detail:
      "Donner des ordres simples (approche-toi, attends ma permission, regarde-moi) installe un rapport de pouvoir immédiat sans aucun matériel. La clé : un ton posé, des consignes claires, et toujours du respect. Évite les insultes ou humiliations tant que ce n'est pas explicitement négocié. Vérifie régulièrement que la personne se sent bien dans le jeu, et valorise-la : la domination bienveillante renforce la confiance.",
  },
  {
    nom: "Teasing",
    resume: "Retarder ou varier les plaisirs pour faire monter l'attente et l'excitation.",
    detail:
      "Le teasing consiste à varier, ralentir ou retarder les stimulations pour faire monter l'attente. Cela peut être des caresses qui s'arrêtent juste avant un seuil, des changements de rythme, ou des zones du corps volontairement délaissées. C'est un jeu de patience qui amplifie beaucoup les sensations. Important : fixe une limite de temps ou un signal, pour que la frustration reste un jeu plaisant et ne devienne pas inconfortable.",
  },
];

export default function Conseils() {
  const [pratiqueOuverte, setPratiqueOuverte] = useState(null);
  const [afficherFetichisme, setAfficherFetichisme] = useState(false);

  function togglePratique(nom) {
    setPratiqueOuverte((actuelle) => (actuelle === nom ? null : nom));
  }

  return (
    <div className="grid gap-6">
      <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-soft backdrop-blur">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
          Guide bienveillant
        </p>
        <h1 className="mt-3 font-serif text-4xl text-stone-900">
          Découvre les thèmes du BDSM
        </h1>
        <p className="mt-4 max-w-2xl text-stone-600">
          Du vanille au hard, chaque pratique a ses codes, ses plaisirs et ses
          précautions. L'important : toujours pratiquer entre adultes
          consentants, informés et respectueux.
        </p>
      </div>

      <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-white to-emerald-50 p-6 shadow-soft">
        <h2 className="font-serif text-2xl text-stone-900">
          Les bases avant tout
        </h2>
        <div className="mt-4 grid items-start gap-4 md:grid-cols-2">
          {bases.map((base) => (
            <div key={base.titre} className="rounded-2xl border border-emerald-100 bg-white/80 p-5">
              <h3 className="font-semibold text-emerald-700">{base.titre}</h3>
              <p className="mt-2 text-sm text-stone-600">{base.texte}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {themes.map((theme) => (
          <div
            key={theme.nom}
            className="rounded-3xl border border-stone-200 bg-white/90 p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <h2 className="font-serif text-xl text-stone-900">{theme.nom}</h2>
            <p className="mt-3 text-sm text-stone-600">{theme.texte}</p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-amber-100 bg-gradient-to-br from-white to-amber-50 p-6 shadow-soft">
        <h2 className="font-serif text-2xl text-stone-900">
          Pratiques soft pour débuter
        </h2>
        <p className="mt-2 text-sm text-stone-600">
          Clique sur une pratique pour voir la description détaillée, et
          reclique pour la refermer.
        </p>

        <div className="mt-4 grid items-start gap-4 md:grid-cols-2">
          {pratiquesSoft.map((pratique) => {
            const ouverte = pratiqueOuverte === pratique.nom;

            return (
              <div
                key={pratique.nom}
                role="button"
                tabIndex={0}
                onClick={() => togglePratique(pratique.nom)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    togglePratique(pratique.nom);
                  }
                }}
                className={`cursor-pointer rounded-2xl border p-5 text-left transition ${
                  ouverte
                    ? "border-amber-300 bg-white shadow-md"
                    : "border-amber-100 bg-white/80 hover:border-amber-300 hover:shadow-md"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-amber-700">{pratique.nom}</h3>
                  <span className="text-lg font-bold text-amber-500">
                    {ouverte ? "−" : "+"}
                  </span>
                </div>

                <p className="mt-2 text-sm text-stone-600">{pratique.resume}</p>

                {ouverte && (
                  <p className="mt-3 border-t border-amber-100 pt-3 text-sm leading-relaxed text-stone-700">
                    {pratique.detail}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bouton d'ouverture de la section Fétichisme */}
      <div className="rounded-3xl border border-violet-100 bg-white/80 p-6 text-center shadow-soft">
        <button
          onClick={() => setAfficherFetichisme((v) => !v)}
          className="rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
        >
          {afficherFetichisme ? "Masquer la liste des fétichismes" : "Voir tous les fétichismes"}
        </button>
      </div>

      {afficherFetichisme && <Fetichisme />}
    </div>
  );
}
