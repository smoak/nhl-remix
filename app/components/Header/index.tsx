import { Link, NavLink, useRouteLoaderData } from "@remix-run/react";
import { NHL } from "~/components/NHLLogos/NHL";
import { RootLoaderResponse } from "~/data/types";

const linkClass =
  "text-lg transition-opacity hover:opacity-70 border-b-2 border-transparent hover:border-slate-900";
const activeLinkClass =
  "text-lg transition-opacity hover:opacity-70 border-b-2 border-slate-900";

const PlayoffsLink = () => {
  const routeData = useRouteLoaderData<RootLoaderResponse>("root");

  if (!routeData?.hasPlayoffs) {
    return null;
  }

  return (
    <NavLink
      to="/playoffs"
      className={({ isActive }) => (isActive ? activeLinkClass : linkClass)}
    >
      Playoffs
    </NavLink>
  );
};

export const Header = () => {
  return (
    <header className="container mx-auto flex items-center justify-between">
      <Link to="/" aria-label="Home">
        <NHL size={96} />
      </Link>
      <nav className="flex gap-6">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? activeLinkClass : linkClass)}
        >
          Home
        </NavLink>
        <NavLink
          to="/standings"
          className={({ isActive }) => (isActive ? activeLinkClass : linkClass)}
        >
          Standings
        </NavLink>
        <PlayoffsLink />
      </nav>
    </header>
  );
};
