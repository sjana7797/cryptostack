import { Link } from "@remix-run/react";
import { Row, Col, Card, Input } from "antd";
import { Coin } from "index";
import millify from "millify";
import { useEffect, useState } from "react";

function Cryptocurrencies({ coins }: { coins: Coin[] }) {
  const [cryptos, setCryptos] = useState<Coin[]>(coins);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const filterCoins = coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setCryptos(filterCoins);
  }, [coins, searchQuery]);
  return (
    <>
      {coins.length > 10 && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(event) => {
              setSearchQuery(event.target.value);
            }}
            value={searchQuery}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos.map((coin) => {
          return (
            <Col xs={24} sm={12} lg={6} key={coin.uuid} className="crypto-card">
              <Link to={`/crypto/${coin.uuid}`}>
                <Card
                  title={`${coin.rank} . ${coin.name}`}
                  extra={
                    <img
                      className="crypto-image"
                      src={coin.iconUrl}
                      alt={coin.name}
                    />
                  }
                  hoverable
                  style={{ borderRadius: "10px" }}
                >
                  <p>Price: {millify(coin.price)}</p>
                  <p>Market Cap: {millify(coin.marketCap)}</p>
                  <p>Daily Change: {millify(coin.change)}%</p>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </>
  );
}

export default Cryptocurrencies;
