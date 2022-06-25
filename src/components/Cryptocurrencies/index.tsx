import { Card, Row, Col, Input } from "antd";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../../services/cryptoApi";
import React, { useEffect, useState } from "react";
import { prettyNumber } from "../../utils/numbers";

type Props = {
  simplified?: boolean;
};

const Cryptocurrencies = ({ simplified = false }: Props) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isLoading } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState(cryptosList?.data.coins || []);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(e.target.value);

  useEffect(() => {
    const coins = cryptosList?.data.coins || [];

    const filteredData = coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm)
    );

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      {simplified === false && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrencies"
            onChange={handleSearch}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-contaiuner">
        {cryptos?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currency.uuid}
          >
            <Link to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                hoverable
                extra={<img className="crypto-image" src={currency.iconUrl} />}
              >
                <p>Price: {prettyNumber(currency.price)}$</p>
                <p>Market Cap: {prettyNumber(currency.marketCap)}$</p>
                <p>Daily Change: {prettyNumber(currency.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
