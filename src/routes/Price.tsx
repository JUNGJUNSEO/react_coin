import { useQuery } from "react-query";
import { fetchCoinPrice } from "../api";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 50% 50%;


`;

const PriceData = styled.div`
  
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  color: ${(props) => props.theme.textColor};
  padding: 20px 20px;
  span:first-child {
    margin-bottom: 5px;
  }
`;


interface IPriceData {
  open: number;
  close: number;
  high: number;
  low: number;

}
interface ChartProps {
  coinId: string;
}
function Price({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IPriceData[]>(["price", coinId], () =>
    fetchCoinPrice(coinId)
  );

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) :  (
        <Container>
          <PriceData>
            <span>Open Price:</span>
            <span>{data?.map((price) => (price.open))}</span>
          </PriceData>
          <PriceData>
            <span>High Price:</span>
            <span>{data?.map((price) => (price.high))}</span>
          </PriceData>
          <PriceData>
            <span>Low Price:</span>
            <span>{data?.map((price) => (price.low))}</span>
          </PriceData>
          <PriceData>
            <span>Close Price:</span>
            <span>{data?.map((price) => (price.close))}</span>
          </PriceData>
        </Container>
      )}  

    </div>
    
  );
}
export default Price;

