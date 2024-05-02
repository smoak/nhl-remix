import nProgressStyles from "nprogress/nprogress.css";
import { cssBundleHref } from "@remix-run/css-bundle";
import {
  Links,
  LiveReload,
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
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: nProgressStyles },
  { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
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
        <LiveReload />
        <Analytics />
      </body>
    </html>
  );
};

export default App;
