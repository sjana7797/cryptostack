import { Card, Select, Typography, Row, Col, Avatar } from "antd";
import { Coin, New } from "index";
import moment from "moment";

const { Title, Text } = Typography;
const { Option } = Select;

function News({ news, coins }: { news: New[]; coins: Coin[] }) {
  const demoImage =
    "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";
  return (
    <>
      <Row gutter={[24, 24]}>
        {news.length > 6 && (
          <Col span={24}>
            <Select
              showSearch
              className="select-news"
              placeholder="Select a Crypto"
              optionFilterProp="children"
              onChange={(value) => {
                console.log(value);
              }}
              filterOption={(input, option) =>
                option?.children?.indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="Cryptocurrencies">Cryptocurrencies</Option>
              {coins.map((coin) => {
                return (
                  <Option key={coin.uuid} value={coin.name}>
                    {coin.name}
                  </Option>
                );
              })}
            </Select>
          </Col>
        )}
        {news.map((cryptoNews, index) => {
          return (
            <Col key={index} xs={24} sm={12} lg={8}>
              <Card hoverable className="news-card">
                <a href={cryptoNews.url} target="_blank" rel="norefferrer">
                  <div className="news-image-container">
                    <Title level={4} className="news-title">
                      {cryptoNews.name}
                    </Title>
                    <img
                      style={{
                        maxWidth: "200px",
                        maxHeight: "100px",
                        borderRadius: "20px",
                      }}
                      src={cryptoNews.image.thumbnail?.contentUrl || demoImage}
                      alt={cryptoNews.name}
                    />
                  </div>
                  <p>
                    {cryptoNews.description.length > 100
                      ? `${cryptoNews.description.substring(0, 100)}...`
                      : cryptoNews.description}
                  </p>
                  <div className="provider-container">
                    <div>
                      <Avatar
                        src={
                          cryptoNews.provider[0].image.thumbnail?.contentUrl ||
                          demoImage
                        }
                        alt={cryptoNews.provider[0].name}
                      />
                    </div>
                    <Text className="provider-name">
                      {cryptoNews.provider[0].name}
                    </Text>
                    <Text>
                      {moment(cryptoNews.datePublished)
                        .startOf("seconds")
                        .fromNow()}
                    </Text>
                  </div>
                </a>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
}

export default News;
