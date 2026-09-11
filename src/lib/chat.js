const STORAGE_KEY = "chat_messages";
const MAX_MESSAGES = 200;

const canal =
  typeof BroadcastChannel !== "undefined"
    ? new BroadcastChannel("chat-anonyme")
    : null;

const adjectifs = [
  "Ombre",
  "Velours",
  "Saphir",
  "Ambre",
  "Nuit",
  "Soie",
  "Brume",
  "Écarlate",
  "Sauvage",
  "Tendre",
];

const animaux = [
  "Féline",
  "Panthère",
  "Colombe",
  "Louve",
  "Renard",
  "Biche",
  "Lynx",
  "Sirène",
  "Hibou",
  "Dragon",
];

export function genererPseudo() {
  const adj = adjectifs[Math.floor(Math.random() * adjectifs.length)];
  const ani = animaux[Math.floor(Math.random() * animaux.length)];
  const nombre = Math.floor(Math.random() * 900) + 100;
  return `${adj} ${ani} ${nombre}`;
}

export function getPseudo() {
  let pseudo = sessionStorage.getItem("chat_pseudo");

  if (!pseudo) {
    pseudo = genererPseudo();
    sessionStorage.setItem("chat_pseudo", pseudo);
  }

  return pseudo;
}

export function changerPseudo() {
  const pseudo = genererPseudo();
  sessionStorage.setItem("chat_pseudo", pseudo);
  return pseudo;
}

export function getMessages() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function envoyerMessage(salon, pseudo, texte) {
  const message = {
    id: crypto.randomUUID(),
    salon,
    pseudo,
    texte,
    date: new Date().toISOString(),
  };

  const messages = [...getMessages(), message].slice(-MAX_MESSAGES);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));

  if (canal) canal.postMessage(message);

  return message;
}

export function surNouveauMessage(callback) {
  if (!canal) return () => {};

  const gestionnaire = (event) => callback(event.data);
  canal.addEventListener("message", gestionnaire);

  return () => canal.removeEventListener("message", gestionnaire);
}
