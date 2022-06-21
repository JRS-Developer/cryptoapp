import { Button, Typography, Menu, Avatar } from "antd";
import type { MenuProps } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
} from "@ant-design/icons";
import Logo from "../../assets/images/cryptocurrency.png";

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
    to: "/exchanges",
    title: "Exchanges",
    icon: <MoneyCollectOutlined />,
  },
  {
    to: "/news",
    title: "News",
    icon: <BulbOutlined />,
  },
];

const Navbar = () => {
  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={Logo} size="large" />
        <Typography.Title level={2} className="logo">
          <Link to="/">Cryptoverse</Link>
        </Typography.Title>
        {/* <Button>

            </Button> */}
      </div>
      <Menu theme="dark">
        {links.map((link, i) => (
          <Menu.Item key={i} icon={link.icon}>
            <Link to={link.to}>{link.title}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
};

export default Navbar;
