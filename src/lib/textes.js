const STORAGE_KEY = "textes";

export function getTextes() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveTexte(texte) {
  const textes = getTextes();

  const nouveauTexte = {
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
    ...texte,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify([nouveauTexte, ...textes]));

  return nouveauTexte;
}

export function getTexteById(id) {
  return getTextes().find((texte) => texte.id === id) || null;
}
