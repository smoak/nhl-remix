import { Link, NavLink } from "remix";

export const Header = () => (
  <header className="container mx-auto flex items-center justify-between px-4 py-8">
    <Link to="/">
      <img
        src="//www-league.nhlstatic.com/images/logos/league-dark/133-flat.svg"
        alt="NHL Logo"
      />
    </Link>
    <nav className="flex gap-6">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/standings">Standings</NavLink>
    </nav>
  </header>
);
