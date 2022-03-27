import { Button, Typography, Menu, Avatar } from "antd";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Link } from "@remix-run/react";
import logo from "../../assets/logo.png";
import { APP_NAME } from "~/configs/app";
import { useEffect, useState } from "react";

function Header() {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screeenSize, setScreeenSize] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setScreeenSize(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    handleResize();

    return window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setActiveMenu(!(screeenSize < 768));
  }, [screeenSize]);
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo-container">
          <Avatar src={logo} size="large" />
          <Typography.Title level={2} className="logo">
            <Link to="/">{APP_NAME}</Link>
          </Typography.Title>
          <Button
            className="menu-control-container"
            onClick={() => {
              setActiveMenu(!activeMenu);
            }}
          >
            <MenuOutlined />
          </Button>
        </div>
        {activeMenu && (
          <Menu theme="dark">
            <Menu.Item key="home" icon={<HomeOutlined />}>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="cryptocurrencies" icon={<FundOutlined />}>
              <Link to="/cryptocurrencies">Crptocurrencies</Link>
            </Menu.Item>
            <Menu.Item key="exchanges" icon={<MoneyCollectOutlined />}>
              <Link to="/exchanges">Exchanges</Link>
            </Menu.Item>
            <Menu.Item key="news" icon={<BulbOutlined />}>
              <Link to="/news">News</Link>
            </Menu.Item>
          </Menu>
        )}
      </div>
    </nav>
  );
}

export default Header;
