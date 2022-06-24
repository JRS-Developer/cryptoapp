import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../../services/cryptoApi";

const { Title } = Typography;

const Homepage = () => {
  const { data } = useGetCryptosQuery();
  const stats = data?.data?.stats;
  const coins = data?.data?.coins;

  const prettyNumber = (num?: number | string): string => {
    if (typeof num === "undefined") return "";

    return millify(Number(num));
  };

  return (
    <>
      <Title className="heading" level={2}>
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic
            title="Total Cryptocurrencies"
            value={prettyNumber(stats?.total)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={prettyNumber(stats?.totalExchanges)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={prettyNumber(stats?.totalMarketCap)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24h Volume"
            value={prettyNumber(stats?.total24hVolume)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={prettyNumber(stats?.totalMarkets)}
          />
        </Col>
      </Row>
    </>
  );
};

export default Homepage;
