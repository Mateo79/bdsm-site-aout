import { supabase } from "./supabase";

export async function getAnnonces() {
  const { data, error } = await supabase
    .from("annonces")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    console.error("Erreur chargement annonces :", error);
    return [];
  }

  return data;
}

export async function saveAnnonce(annonce) {
  const { data, error } = await supabase
    .from("annonces")
    .insert([
      {
        titre: annonce.titre,
        categorie: annonce.categorie,
        type: annonce.type,
        description: annonce.description,
        departement: annonce.departement || null,
        age: annonce.age,
        email: annonce.email || null,
        instagram: annonce.instagram || null,
        snapchat: annonce.snapchat || null,
        facebook: annonce.facebook || null,
        role: annonce.role || null,
        genre: annonce.genre || null,
        tags: annonce.tags || [],
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Erreur publication annonce :", error);
    return null;
  }

  return data;
}

export async function getAnnonceById(id) {
  const { data, error } = await supabase
    .from("annonces")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;

  return data;
}
