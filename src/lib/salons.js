import { supabase } from "./supabase";

function mapperSalon(ligne) {
  return {
    id: ligne.id,
    nom: ligne.nom,
    description: ligne.description,
    parDefaut: ligne.par_defaut,
    date: ligne.date,
  };
}

export async function getSalons() {
  const { data, error } = await supabase
    .from("salons")
    .select("*")
    .order("date", { ascending: true });

  if (error) {
    console.error("Erreur chargement salons :", error);
    return [];
  }

  return data.map(mapperSalon);
}

export async function salonExiste(nom) {
  const salons = await getSalons();
  const nomMinuscule = nom.trim().toLowerCase();
  return salons.some((s) => s.nom.toLowerCase() === nomMinuscule);
}

export async function creerSalon(nom, description) {
  const { data, error } = await supabase
    .from("salons")
    .insert([
      {
        id: crypto.randomUUID(),
        nom: nom.trim(),
        description: description.trim() || "Salon créé par la communauté.",
        par_defaut: false,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Erreur création salon :", error);
    return null;
  }

  return mapperSalon(data);
}

export function surNouveauSalon(callback) {
  const channel = supabase
    .channel("ecoute-salons")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "salons" },
      (payload) => callback(payload.new)
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
