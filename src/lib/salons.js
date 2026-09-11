const STORAGE_KEY = "salons";

const canal =
  typeof BroadcastChannel !== "undefined"
    ? new BroadcastChannel("chat-salons")
    : null;

const salonsParDefaut = [
  {
    id: "accueil",
    nom: "Accueil",
    description: "Pour discuter librement et faire connaissance.",
    parDefaut: true,
  },
  {
    id: "debutants",
    nom: "Débutants",
    description: "Pose tes questions sans jugement, on est là pour t'aider.",
    parDefaut: true,
  },
  {
    id: "soft",
    nom: "Soft",
    description: "Discussions autour des pratiques douces.",
    parDefaut: true,
  },
  {
    id: "hard",
    nom: "Hard",
    description: "Pour les pratiquant·e·s expérimenté·e·s.",
    parDefaut: true,
  },
  {
    id: "fetichisme",
    nom: "Fétichisme",
    description: "Cuir, latex, cordes, pieds... parle de ce qui te plaît.",
    parDefaut: true,
  },
  {
    id: "rencontres",
    nom: "Rencontres",
    description: "Pour échanger autour des annonces.",
    parDefaut: true,
  },
];

export function getSalons() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch {
    // on repart des salons par défaut si les données sont corrompues
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(salonsParDefaut));
  return salonsParDefaut;
}

export function salonExiste(nom) {
  const nomMinuscule = nom.trim().toLowerCase();
  return getSalons().some((s) => s.nom.toLowerCase() === nomMinuscule);
}

export function creerSalon(nom, description) {
  const salons = getSalons();

  const nouveauSalon = {
    id: crypto.randomUUID(),
    nom: nom.trim(),
    description: description.trim() || "Salon créé par la communauté.",
    parDefaut: false,
    date: new Date().toISOString(),
  };

  const prochainsSalons = [...salons, nouveauSalon];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prochainsSalons));

  if (canal) canal.postMessage(nouveauSalon);

  return nouveauSalon;
}

export function surNouveauSalon(callback) {
  if (!canal) return () => {};

  const gestionnaire = (event) => callback(event.data);
  canal.addEventListener("message", gestionnaire);

  return () => canal.removeEventListener("message", gestionnaire);
}
