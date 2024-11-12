import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const Container = styled.div`
  max-width: 600px;
  margin: 10vh auto;
  padding: 20px;
  background-color: #f9fafb;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Header = styled.header`
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 2.2em;
  color: #333;
  font-weight: bold;
  margin: 0;
  padding-bottom: 10px;
  border-bottom: 2px solid #007bff;
`;

const InfoContainer = styled.div`
  margin: 20px 0;
  font-size: 1.1em;
  color: #555;
`;

const InfoItem = styled.div`
  margin: 5px 0;
`;

const BackButton = styled(Link)`
  display: inline-block; /* Link를 버튼처럼 보이게 하기 위해 inline-block으로 설정 */
  background-color: #007bff;
  font-size: 1.3rem;
  color: #ffffff;
  font-weight: bold;
  padding: 8px 32px;
  border: none;
  border-radius: 20px;
  text-decoration: none; /* 링크의 기본 밑줄 제거 */
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

interface RouteParms {
  coinId: string;
}

interface CoinData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  website: string;
}

function Coin() {
  const [loading, setLoading] = useState(true);
  const [coinData, setCoinData] = useState<CoinData | null>(null);
  const { coinId } = useParams<RouteParms>();

  useEffect(() => {
    const fetchCoinData = async () => {
      const response = await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`);
      const data = await response.json();
      setCoinData(data);
      setLoading(false);
    };

    fetchCoinData();
  }, [coinId]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!coinData) {
    return <h1>Coin not found</h1>;
  }

  return (
    <Container>
      <Header>
        <Title>
          {coinData.name} ({coinData.symbol})
        </Title>
        <InfoContainer>
          <InfoItem>Rank: {coinData.rank}</InfoItem>
          <InfoItem>Type: {coinData.type}</InfoItem>
          <InfoItem>New: {coinData.is_new ? "Yes" : "No"}</InfoItem>
          <InfoItem>Active: {coinData.is_active ? "Yes" : "No"}</InfoItem>
        </InfoContainer>
      </Header>
      <h2>About {coinData.name}</h2>
      <p>{coinData.description}</p>
      <h3>Website</h3>
      <a href={coinData.website} target="_blank" rel="noopener noreferrer">
        {coinData.website}
      </a>
      <BackButton to="/">
        {" "}
        {/* Link 컴포넌트로 '/' 경로로 이동 */}
        Back To List
      </BackButton>
    </Container>
  );
}

export default Coin;
