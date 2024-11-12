import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7f9fc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 2em;
  color: #333;
  margin: 0;
`;

const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 20px 0;
`;

const ToggleButton = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  font-size: 0.9em;
  font-weight: bold;
  color: #ffffff;
  background-color: ${({ active }) => (active ? "#0056b3" : "#007bff")};
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const CoinsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Coin = styled.li`
  background-color: #ffffff;
  margin: 8px 0;
  padding: 15px 20px;
  border-radius: 8px;
  transition: box-shadow 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  a {
    text-decoration: none;
    color: #007bff;
    font-weight: 600;
    font-size: 1.1em;
    transition: color 0.3s ease;

    &:hover {
      color: #0056b3;
    }
  }
`;

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTokens, setShowTokens] = useState(false); // 토큰 표시 여부 상태

  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
  }, []);

  const filteredCoins = showTokens
    ? coins.filter((coin) => coin.type === "token")
    : coins.filter((coin) => coin.type === "coin");

  return (
    <Container>
      <Header>
        <Title>Coins</Title>
        <ToggleContainer>
          <ToggleButton active={!showTokens} onClick={() => setShowTokens(false)}>
            코인
          </ToggleButton>
          <ToggleButton active={showTokens} onClick={() => setShowTokens(true)}>
            토큰
          </ToggleButton>
        </ToggleContainer>
      </Header>
      {loading ? (
        "Loading..."
      ) : (
        <CoinsList>
          {filteredCoins.map((coin) => (
            <Coin key={coin.id}>
              <Link to={{ pathname: `/${coin.id}`, state: { name: coin.name } }}>
                {coin.name} ({coin.symbol}) - Rank: {coin.rank}
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
