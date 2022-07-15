import { Card, Row, Col, Input, Skeleton, Typography } from "antd";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../../services/cryptoApi";
import React, { useEffect, useState } from "react";
import { prettyNumber } from "../../utils/numbers";

const { Paragraph, Text } = Typography;

type SkeletonProps = {
  nItems?: number;
};

const LoadingSkeleton = ({ nItems = 10 }: SkeletonProps): JSX.Element => {
  return (
    <>
      {Array(nItems)
        .fill(undefined)
        .map((_, index) => (
          <Col key={index + "skeleton crypto"} xs={24} sm={12} lg={6}>
            <Skeleton active />
          </Col>
        ))}
    </>
  );
};

type Props = {
  simplified?: boolean;
};

const Cryptocurrencies = ({ simplified = false }: Props) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
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
        {isFetching ? (
          <LoadingSkeleton />
        ) : (
          cryptos?.map((currency) => (
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
                  extra={
                    <img className="crypto-image" src={currency.iconUrl} />
                  }
                >
                  <p>Price: {prettyNumber(currency.price)}$</p>
                  <p>Market Cap: {prettyNumber(currency.marketCap)}$</p>
                  <p>
                    Daily Change:{" "}
                    <Text
                      type={Number(currency.change) < 0 ? "danger" : "success"}
                    >
                      {prettyNumber(currency.change)}%
                    </Text>
                  </p>
                </Card>
              </Link>
            </Col>
          ))
        )}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
