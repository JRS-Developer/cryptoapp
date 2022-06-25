import { Select, Typography, Col, Row, Avatar, Card } from "antd";
import { useGetCryptoNewsQuery } from "../../services/cryptoNewsApi";
import { formatDistanceToNow } from "date-fns";

const { Title, Text } = Typography;
const { Option } = Select;
const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

type Props = {
  simplified?: boolean;
};

const News = ({ simplified = false }: Props) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    count,
    newsCategory: "cryptocurrency",
  });

  if (!cryptoNews) return <Text>Loading...</Text>;
  console.log(cryptoNews.value);

  return (
    <>
      <Row gutter={[24, 24]}>
        {cryptoNews.value.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
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
