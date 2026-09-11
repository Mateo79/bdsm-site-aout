import { supabase } from "./supabase";

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

export async function getMessages() {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("date", { ascending: false })
    .limit(200);

  if (error) {
    console.error("Erreur chargement messages :", error);
    return [];
  }

  return data.reverse();
}

export async function envoyerMessage(salonId, pseudo, texte) {
  const { data, error } = await supabase
    .from("messages")
    .insert([{ salon_id: salonId, pseudo, texte }])
    .select()
    .single();

  if (error) {
    console.error("Erreur envoi message :", error);
    return null;
  }

  return data;
}

export function surNouveauMessage(callback) {
  const channel = supabase
    .channel("ecoute-messages")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "messages" },
      (payload) => callback(payload.new)
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
