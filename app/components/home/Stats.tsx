import { Row, Col, Statistic, Typography } from "antd";
import millify from "millify";
import { Stats as StatsInterface } from "../../../index";

const { Title } = Typography;

function Stats(props: { stats: StatsInterface }) {
  const { stats } = props;
  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic
            title="Total Cryptocurrencies"
            value={millify(stats.totalCoins)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={millify(stats.totalExchanges)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={millify(stats.totalMarketCap)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24h Volume"
            value={millify(stats.total24hVolume)}
          />
        </Col>
        <Col span={12}>
          <Statistic title="Total Market" value={millify(stats.totalMarkets)} />
        </Col>
      </Row>
    </>
  );
}

export default Stats;
