import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../../services/cryptoApi";
import { prettyNumber } from "../../utils/numbers";
import Cryptocurrencies from "../Cryptocurrencies";
import News from "../News";
import { Stats } from "../../types";

const { Title } = Typography;

interface StatisticI {
  title: string;
  value: keyof Stats;
}

const statistics: StatisticI[] = [
  {
    title: "Cryptocurrencies",
    value: "total",
  },
  {
    title: "Exchanges",
    value: "totalExchanges",
  },
  {
    title: "Market Cap",
    value: "totalMarketCap",
  },
  {
    title: "24h Volume",
    value: "total24hVolume",
  },
  {
    title: "Markets",
    value: "totalMarkets",
  },
];

const Homepage = () => {
  const { data, isLoading } = useGetCryptosQuery(10);
  const stats = data?.data?.stats;

  return (
    <>
      <Title className="heading" level={2}>
        Global Crypto Stats
      </Title>
      <Row>
        {statistics.map((stat) => (
          <Col span={12}>
            <Statistic
              title={`Total ${stat.title}`}
              value={prettyNumber(stats ? stats[stat.value] : undefined)}
              loading={isLoading}
            />
          </Col>
        ))}
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 cryptocurrencies in the world
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />

      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={3} className="show-more">
          <Link to="/news">Show More</Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
};

export default Homepage;
