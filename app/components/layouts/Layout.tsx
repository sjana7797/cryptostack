import { ReactElement } from "react";
import Navbar from "../global/Navbar";
import { Layout as AntLayout, Typography, Space } from "antd";
import { APP_NAME } from "~/configs/app";
import { Link } from "@remix-run/react";

function Layout(props: { children: ReactElement }) {
  return (
    <div className="app">
      <Navbar />
      <main className="main">
        <AntLayout className="routes">{props.children}</AntLayout>
        <footer className="footer">
          <Typography.Title
            level={5}
            style={{ color: "white", textAlign: "center" }}
          >
            {APP_NAME} <br />
            All rights reserved.
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/">Home</Link>
            <Link to="/">Home</Link>
            <Link to="/">Home</Link>
          </Space>
        </footer>
      </main>
    </div>
  );
}

export default Layout;
