import { useRef } from "react";

export default function EditeurRiche({ onChange }) {
  const editorRef = useRef(null);
  const savedRange = useRef(null);

  function saveSelection() {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      savedRange.current = selection.getRangeAt(0);
    }
  }

  function exec(commande, valeur = null) {
    const editor = editorRef.current;
    if (!editor) return;

    editor.focus();

    if (savedRange.current) {
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(savedRange.current);
    }

    document.execCommand(commande, false, valeur);
    saveSelection();

    if (onChange) onChange(editor.innerHTML);
  }

  const boutonClass =
    "rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm font-semibold text-stone-700 shadow-sm transition hover:bg-rose-50 hover:text-rose-700";

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 rounded-t-2xl border border-b-0 border-stone-200 bg-stone-50 p-3">
        <button type="button" className={boutonClass} onClick={() => exec("bold")} title="Gras">
          <span className="font-extrabold">G</span>
        </button>

        <button type="button" className={boutonClass} onClick={() => exec("italic")} title="Italique">
          <span className="italic">I</span>
        </button>

        <button type="button" className={boutonClass} onClick={() => exec("underline")} title="Souligné">
          <span className="underline">S</span>
        </button>

        <button type="button" className={boutonClass} onClick={() => exec("strikeThrough")} title="Barré">
          <span className="line-through">B</span>
        </button>

        <label
          className="flex cursor-pointer items-center gap-2 rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm font-semibold text-stone-700 shadow-sm transition hover:bg-rose-50"
          title="Couleur du texte"
        >
          <span className="bg-gradient-to-r from-rose-500 via-amber-500 to-violet-500 px-1 text-white">A</span>
          Couleur
          <input
            type="color"
            defaultValue="#e11d48"
            className="h-5 w-6 cursor-pointer border-0 bg-transparent p-0"
            onChange={(event) => exec("foreColor", event.target.value)}
          />
        </label>

        <label
          className="flex cursor-pointer items-center gap-2 rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm font-semibold text-stone-700 shadow-sm transition hover:bg-rose-50"
          title="Surligner le texte"
        >
          <span className="bg-yellow-200 px-1">Surlignage</span>
          <input
            type="color"
            defaultValue="#fde047"
            className="h-5 w-6 cursor-pointer border-0 bg-transparent p-0"
            onChange={(event) => exec("hiliteColor", event.target.value)}
          />
        </label>

        <button type="button" className={boutonClass} onClick={() => exec("insertUnorderedList")}>
          • Liste
        </button>

        <button type="button" className={boutonClass} onClick={() => exec("insertOrderedList")}>
          1. Liste
        </button>

        <button type="button" className={boutonClass} onClick={() => exec("removeFormat")}>
          Effacer le style
        </button>
      </div>

      <div
        ref={editorRef}
        contentEditable
        data-placeholder="Écris ton texte ici..."
        onInput={(event) => onChange(event.currentTarget.innerHTML)}
        onKeyUp={saveSelection}
        onMouseUp={saveSelection}
        className="min-h-[300px] rounded-b-2xl border border-stone-200 bg-white p-4 leading-relaxed text-stone-800 outline-none transition focus:border-rose-300 focus:ring-2 focus:ring-rose-200"
      />
    </div>
  );
}
