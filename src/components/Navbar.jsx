import { Link, NavLink } from 'react-router-dom'

const baseLinkClass = "rounded-xl px-4 py-2 text-sm font-semibold transition"
const inactiveClass = "text-stone-600 hover:bg-rose-100/80 hover:text-rose-800"
const activeClass = "bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 text-white shadow-md"

export default function Navbar() {
  return (
    <header className="border-b border-white/50 bg-white/70 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-4">
        <Link
          to="/"
          className="bg-gradient-to-r from-rose-600 via-orange-500 to-amber-600 bg-clip-text font-serif text-2xl font-bold text-transparent"
        >
          Nexus Kink
        </Link>

        <nav className="flex flex-wrap items-center gap-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${baseLinkClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            Accueil
          </NavLink>

          <NavLink
            to="/annonces"
            className={({ isActive }) =>
              `${baseLinkClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            Annonces
          </NavLink>

          <NavLink
            to="/chat"
            className={({ isActive }) =>
              `${baseLinkClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            Chat
          </NavLink>

          <NavLink
            to="/deposer-une-annonce"
            className={({ isActive }) =>
              `${baseLinkClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            Déposer une annonce
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
