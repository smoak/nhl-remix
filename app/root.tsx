import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { MetaFunction, LinksFunction } from "@remix-run/node";
import { Analytics } from "@vercel/analytics/react";
import "~/tailwind.css";
import { useNProgress } from "./hooks/useNProgress";

export const meta: MetaFunction = () => {
  return [
    {
      title: "NHL App",
    },
  ];
};

export const links: LinksFunction = () => [
  { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
  {
    rel: "stylesheet",
    href: "https://unpkg.com/nprogress@0.2.0/nprogress.css",
  },
];

const App = () => {
  useNProgress();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <Analytics />
      </body>
    </html>
  );
};

export default App;
