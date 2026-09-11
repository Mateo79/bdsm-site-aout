import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveAnnonce } from "../lib/annonces";

const inputClass =
  "w-full rounded-xl border border-rose-100 bg-white/90 px-4 py-3 text-stone-900 shadow-sm outline-none transition focus:border-rose-300 focus:ring-2 focus:ring-rose-200";

const labelClass = "mb-2 block text-sm font-semibold text-stone-700";

const rolesBDSM = [
  "Dominant(e) / Domina",
  "Soumis(e)",
  "Switch",
  "Maître / Maîtresse",
  "Esclave",
];

const identitesAutres = [
  "Agenre",
  "Ambisexuel·le",
  "Androgyne",
  "Asexuel·le / Aromantique",
  "Bispirituel·le",
  "Bisexuel·le / Biromantique",
  "Cisgenre",
  "Drag King",
  "Drag Queen",
  "En questionnement",
  "Femme Trans",
  "Gay·e",
  "Gender Fluide",
  "Gender Queer",
  "Hétérosexuel·le",
  "Homme Trans",
  "Homosexuel·le",
  "Intersexué",
  "Lesbienne",
  "Non Binaire",
  "Non Genré·e",
  "Pansexuel·le",
  "Polyamoureux·se",
  "Queer",
  "Transgenre",
  "Transsexuel·le",
  "Travesti·e",
];

const tagsPratiques = [
  "kajira",
  "kajirus",
  "Top",
  "Bottom",
  "Sadique",
  "Masochiste",
  "Sadomasochiste",
  "Kinkster",
  "Fétichiste",
  "Swinger / Échangiste",
  "Hédoniste",
  "Exhibitionniste",
  "Voyeur",
  "Sensualiste",
  "Princesse",
  "Slut / Salope",
  "Doll / Poupée",
  "Sissy",
  "Rigger / Attacheur",
  "Rope Top",
  "Rope Bottom",
  "Rope Bunny",
  "Spanko",
  "Spanker / Fesseur",
  "Spankee / Fessée",
  "Furry",
  "Leather Man / Woman",
  "Bootblack",
  "Primal",
  "Primal Predator",
  "Primal Prey",
  "Cuckold",
  "Cuckquean",
  "Bull",
  "Ageplayer",
  "Daddy",
  "Mommy",
  "Big",
  "Little",
  "Brat",
  "Baby girl / Baby boy",
  "Pet",
  "Kitten",
  "Pup",
  "Poney",
  "En évolution",
  "Exploring",
  "Vanille",
  "Indécis",
];

export default function AnnonceForm() {
  const navigate = useNavigate();
  const [publication, setPublication] = useState(false);

  const [form, setForm] = useState({
    titre: "",
    categorie: "Rencontre",
    type: "Je recherche",
    description: "",
    departement: "",
    age: "",
    email: "",
    instagram: "",
    snapchat: "",
    facebook: "",
    majeur: false,
    role: "",
    genre: "",
    genreDetail: "",
    tags: [],
  });

  const categories = ["Rencontre", "Texte", "Conseil"];
  const types = ["Je recherche", "Je propose"];

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    if (type === "select-multiple") {
      const options = event.target.options;
      const selectedValues = [];

      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          selectedValues.push(options[i].value);
        }
      }

      setForm((prev) => ({
        ...prev,
        [name]: selectedValues,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.majeur) {
      alert("Tu dois confirmer que tu as 18 ans ou plus.");
      return;
    }

    if (!form.age || Number(form.age) < 18) {
      alert("L'âge indiqué doit être de 18 ans ou plus.");
      return;
    }

    const email = form.email.trim();
    const instagram = form.instagram.trim();
    const snapchat = form.snapchat.trim();
    const facebook = form.facebook.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email && !emailRegex.test(email)) {
      alert("L'adresse email n'est pas valide.");
      return;
    }

    if (!email && !instagram && !snapchat && !facebook) {
      alert(
        "Ajoute au moins un moyen de contact : email, Instagram, Snapchat ou Facebook."
      );
      return;
    }

    const genreFinal =
      form.genre === "Autre" && form.genreDetail
        ? form.genreDetail
        : form.genre;

    setPublication(true);

    const nouvelle = await saveAnnonce({
      ...form,
      email,
      instagram,
      snapchat,
      facebook,
      genre: genreFinal,
      age: Number(form.age),
    });

    setPublication(false);

    if (nouvelle) {
      navigate("/annonces");
    } else {
      alert("La publication a échoué. Réessaie dans un instant.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      {/* SECTION IDENTITÉ */}
      <div className="rounded-2xl border border-violet-100 bg-violet-50/50 p-5">
        <h3 className="mb-4 font-serif text-lg font-semibold text-violet-800">
          Qui crée cette annonce ?
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="genre" className={labelClass}>
              Identité de genre
            </label>
            <select
              id="genre"
              name="genre"
              required
              value={form.genre}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Choisir...</option>
              <option value="Homme">Homme</option>
              <option value="Femme">Femme</option>
              <option value="Autre">Autre / Non-binaire</option>
            </select>
          </div>

          {form.genre === "Autre" && (
            <div>
              <label htmlFor="genreDetail" className={labelClass}>
                Précision (optionnel)
              </label>
              <select
                id="genreDetail"
                name="genreDetail"
                value={form.genreDetail}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Choisir une identité...</option>
                {identitesAutres.map((identite) => (
                  <option key={identite} value={identite}>
                    {identite}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* SECTION RÔLE BDSM */}
      <div className="rounded-2xl border border-rose-100 bg-rose-50/50 p-5">
        <h3 className="mb-4 font-serif text-lg font-semibold text-rose-800">
          Rôle principal
        </h3>

        <div>
          <label htmlFor="role" className={labelClass}>
            Ton rôle dans la communauté
          </label>
          <select
            id="role"
            name="role"
            value={form.role}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Choisir un rôle...</option>
            {rolesBDSM.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* SECTION ANNONCE */}
      <div>
        <label htmlFor="titre" className={labelClass}>
          Titre de l'annonce
        </label>
        <input
          id="titre"
          name="titre"
          type="text"
          required
          maxLength={90}
          value={form.titre}
          onChange={handleChange}
          className={inputClass}
          placeholder="Ex : Recherche partenaire pour découverte en douceur"
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="categorie" className={labelClass}>
            Catégorie
          </label>
          <select
            id="categorie"
            name="categorie"
            value={form.categorie}
            onChange={handleChange}
            className={inputClass}
          >
            {categories.map((categorie) => (
              <option key={categorie} value={categorie}>
                {categorie}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="type" className={labelClass}>
            Type de recherche
          </label>
          <select
            id="type"
            name="type"
            value={form.type}
            onChange={handleChange}
            className={inputClass}
          >
            {types.map((typeItem) => (
              <option key={typeItem} value={typeItem}>
                {typeItem}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="description" className={labelClass}>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          minLength={20}
          rows={7}
          value={form.description}
          onChange={handleChange}
          className={inputClass}
          placeholder="Décris ce que tu recherches, tes limites, le cadre, etc."
        />
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div>
          <label htmlFor="departement" className={labelClass}>
            Département
          </label>
          <input
            id="departement"
            name="departement"
            type="text"
            value={form.departement}
            onChange={handleChange}
            className={inputClass}
            placeholder="Ex : 29"
          />
        </div>

        <div>
          <label htmlFor="age" className={labelClass}>
            Âge
          </label>
          <input
            id="age"
            name="age"
            type="number"
            min="18"
            max="99"
            required
            value={form.age}
            onChange={handleChange}
            className={inputClass}
            placeholder="18"
          />
        </div>
      </div>

      {/* SECTION CONTACTS */}
      <div className="rounded-2xl border border-teal-100 bg-teal-50/50 p-5">
        <h3 className="mb-2 font-serif text-lg font-semibold text-teal-800">
          Moyens de contact
        </h3>

        <p className="mb-4 text-sm text-stone-600">
          Au moins un moyen de contact est obligatoire. Tu peux choisir email,
          Instagram, Snapchat ou Facebook.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="email" className={labelClass}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className={inputClass}
              placeholder="tonemail@example.fr"
            />
          </div>

          <div>
            <label htmlFor="instagram" className={labelClass}>
              Instagram
            </label>
            <input
              id="instagram"
              name="instagram"
              type="text"
              value={form.instagram}
              onChange={handleChange}
              className={inputClass}
              placeholder="@toncompte ou lien"
            />
          </div>

          <div>
            <label htmlFor="snapchat" className={labelClass}>
              Snapchat
            </label>
            <input
              id="snapchat"
              name="snapchat"
              type="text"
              value={form.snapchat}
              onChange={handleChange}
              className={inputClass}
              placeholder="tonpseudo ou lien"
            />
          </div>

          <div>
            <label htmlFor="facebook" className={labelClass}>
              Facebook
            </label>
            <input
              id="facebook"
              name="facebook"
              type="text"
              value={form.facebook}
              onChange={handleChange}
              className={inputClass}
              placeholder="tonprofil ou lien"
            />
          </div>
        </div>
      </div>

      {/* SECTION TAGS */}
      <div className="rounded-2xl border border-amber-100 bg-amber-50/50 p-5">
        <h3 className="mb-2 font-serif text-lg font-semibold text-amber-800">
          Tags et pratiques (optionnel)
        </h3>

        <p className="mb-3 text-xs text-stone-500">
          Maintiens la touche Ctrl (ou Cmd sur Mac) pour sélectionner plusieurs
          tags.
        </p>

        <select
          name="tags"
          multiple
          value={form.tags}
          onChange={handleChange}
          className={`${inputClass} h-48`}
        >
          {tagsPratiques.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <label className="flex items-start gap-3 rounded-2xl border border-amber-200/80 bg-gradient-to-r from-amber-50 to-rose-50 p-4 text-sm text-stone-700 shadow-sm">
        <input
          type="checkbox"
          name="majeur"
          checked={form.majeur}
          onChange={handleChange}
          className="mt-1 h-4 w-4 rounded border-stone-300 accent-rose-500"
        />
        Je confirme avoir 18 ans ou plus et accepter que cette annonce soit
        publiée.
      </label>

      <button
        type="submit"
        disabled={publication}
        className="rounded-xl bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 px-5 py-3 font-semibold text-white shadow-md transition hover:opacity-95 disabled:opacity-50"
      >
        {publication ? "Publication en cours..." : "Publier l'annonce"}
      </button>

      <p className="rounded-xl border border-stone-200/80 bg-white/70 p-4 text-sm text-stone-500">
        Ton annonce sera visible par tous les visiteurs du site.
      </p>
    </form>
  );
}
