import { Link, NavLink } from "@remix-run/react";
import { NHL } from "~/components/NHLLogos/NHL";

export const Header = () => (
  <header className="container mx-auto flex items-center justify-between">
    <Link to="/" aria-label="Home">
      <NHL size={96} />
    </Link>
    <nav className="flex gap-6">
      <NavLink to="/">Home</NavLink>
    </nav>
  </header>
);
