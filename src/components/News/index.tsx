import { Select, Typography, Col, Row, Avatar, Card } from "antd";
import { useGetCryptoNewsQuery } from "../../services/cryptoNewsApi";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { useGetCryptosQuery } from "../../services/cryptoApi";

const { Title, Text } = Typography;
const { Option } = Select;
const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

type Props = {
  simplified?: boolean;
};

const News = ({ simplified = false }: Props) => {
  const defaultCategory = "Cryptocurrency";
  const [newsCategory, setNewsCategory] = useState(defaultCategory);
  const { data: cryptoNews, isLoading: isLoadingNews } = useGetCryptoNewsQuery({
    count: simplified ? 6 : 12,
    newsCategory: newsCategory,
  });
  const { data: coins, isLoading: isLoadingCoins } = useGetCryptosQuery(100);

  if (isLoadingNews) return <Text>Loading...</Text>;

  return (
    <>
      <Row gutter={[24, 24]}>
        {!simplified && (
          <Col span={24}>
            <Select
              showSearch
              className="select-news"
              placeholder="Select a Crypto"
              optionFilterProp="children"
              defaultValue={defaultCategory}
              loading={isLoadingCoins}
              onChange={(value) => setNewsCategory(value)}
              filterOption={(input, option) =>
                (option!.children as unknown as string)
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="Cryptocurency">Cryptocurrency</Option>
              {coins?.data?.coins?.map((currency) => (
                <Option key={currency.name} value={currency.name}>
                  {currency.name}
                </Option>
              ))}
            </Select>
          </Col>
        )}
        {cryptoNews?.value.map((news) => (
          <Col xs={24} sm={12} lg={8} key={news.name}>
            <Card hoverable className="news-card">
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>
                    {news.name}
                  </Title>
                  <img
                    src={news?.image?.thumbnail?.contentUrl || demoImage}
                    alt={news?.name}
                  />
                </div>
                <p>
                  {news.description.length > 100
                    ? `${news.description.substring(0, 100)}...`
                    : news.description}
                </p>
                <div className="provider-container">
                  <div>
                    <Avatar
                      src={
                        news.provider[0]?.image?.thumbnail?.contentUrl ||
                        demoImage
                      }
                      alt={news.provider[0]?.name}
                    />
                    <Text className="provider-name">
                      {news.provider[0]?.name}
                    </Text>
                  </div>
                  <Text>
                    {formatDistanceToNow(Date.parse(news.datePublished), {
                      addSuffix: true,
                    })}
                  </Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default News;
