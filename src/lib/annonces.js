const STORAGE_KEY = "annonces";

export function getAnnonces() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveAnnonce(annonce) {
  const annonces = getAnnonces();

  const nouvelleAnnonce = {
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
    ...annonce,
  };

  const prochainesAnnonces = [nouvelleAnnonce, ...annonces];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(prochainesAnnonces));

  return nouvelleAnnonce;
}

export function getAnnonceById(id) {
  const annonces = getAnnonces();
  return annonces.find((annonce) => annonce.id === id) || null;
}
