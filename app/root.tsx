import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import type { MetaFunction, LinksFunction } from "remix";
import { ReactElement } from "react";
import styles from "./styles/app.css";
import Layout from "./components/layouts/Layout";
import antStyles from "antd/dist/antd.css";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: antStyles },
  { rel: "stylesheet", href: styles },
];

const Document = (props: { children: ReactElement }) => {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Layout>{props.children}</Layout>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}
