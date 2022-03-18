import { Link, NavLink } from "remix";
import { NHL } from "~/components/NHLLogos/NHL";

export const Header = () => (
  <header className="container mx-auto flex items-center justify-between px-4 py-8">
    <Link to="/">
      <NHL size={96} />
    </Link>
    <nav className="flex gap-6">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/standings">Standings</NavLink>
    </nav>
  </header>
);
