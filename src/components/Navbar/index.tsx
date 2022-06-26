import { Button, Typography, Menu, Avatar } from "antd";
import type { MenuProps } from "antd";
import { Link, useLocation, useMatch } from "react-router-dom";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import Logo from "../../assets/images/cryptocurrency.png";
import { useEffect, useState } from "react";
import useWindowSize from "../../hooks/useWindowsSize";

type Link = {
  to: string;
  title: string;
  icon: any;
};

const links: Link[] = [
  {
    to: "/",
    title: "Home",
    icon: <HomeOutlined />,
  },
  {
    to: "/cryptocurrencies",
    title: "Cryptocurrencies",
    icon: <FundOutlined />,
  },
  {
    to: "/news",
    title: "News",
    icon: <BulbOutlined />,
  },
];

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(false);
  const { width } = useWindowSize();
  const location = useLocation();

  const toggleActiveMenu = () => setActiveMenu((active) => !active);
  const selectedKey: string =
    links.find((link) => link.to === location.pathname)?.to || "";

  useEffect(() => {
    // if the windowsSize is less than 760 then the menu will close automatically
    if (width !== undefined && width < 760) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [width]);

  return (
    <nav className="nav-container">
      <div className="logo-container">
        <Avatar src={Logo} size="large" />
        <Typography.Title level={2} className="logo">
          <Link to="/">Cryptoverse</Link>
        </Typography.Title>
        <Button className="menu-control-container" onClick={toggleActiveMenu}>
          <MenuOutlined />
        </Button>
      </div>
      {activeMenu && (
        <Menu theme="dark" selectedKeys={[selectedKey]}>
          {links.map((link) => (
            <Menu.Item key={link.to} icon={link.icon}>
              <Link to={link.to}>{link.title}</Link>
            </Menu.Item>
          ))}
        </Menu>
      )}
    </nav>
  );
};

export default Navbar;
