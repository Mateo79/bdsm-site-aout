const STORAGE_KEY = "signalements";

export function getSignalements() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function signalerContenu({ type, contenuId, titre, raison }) {
  const signalement = {
    id: crypto.randomUUID(),
    type,
    contenuId,
    titre,
    raison,
    date: new Date().toISOString(),
    vu: false,
  };

  const signalements = [signalement, ...getSignalements()];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(signalements));

  return signalement;
}
