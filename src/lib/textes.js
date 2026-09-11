import { supabase } from "./supabase";

export async function getTextes() {
  const { data, error } = await supabase
    .from("textes")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    console.error("Erreur chargement textes :", error);
    return [];
  }

  return data;
}

export async function saveTexte(texte) {
  const { data, error } = await supabase
    .from("textes")
    .insert([
      {
        titre: texte.titre,
        pseudo: texte.pseudo,
        contenu: texte.contenu,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Erreur publication texte :", error);
    return null;
  }

  return data;
}

export async function getTexteById(id) {
  const { data, error } = await supabase
    .from("textes")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;

  return data;
}
