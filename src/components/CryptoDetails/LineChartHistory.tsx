import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title as CharTitle,
} from "chart.js";
import type { ChartData, ChartOptions } from "chart.js";
import { Col, Row, Typography } from "antd";
import { format, fromUnixTime } from "date-fns";
import { CoinHistory } from "../../types";

type Props = {
  currentPrice: number | string;
  coinHistory: CoinHistory[];
  coinName: string;
  change: string;
};

const { Title } = Typography;

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  CharTitle
);

const LineChartHistory = ({
  currentPrice,
  coinHistory,
  coinName,
  change,
}: Props) => {
  const coinPrice: number[] = [];
  const coinTimestamp: string[] = [];

  // first reverse the array of history because the dates come with descending order
  const history = [...coinHistory];
  history.reverse();

  history.forEach((h) => {
    const price = Math.round(Number(h.price));
    // convert the unix timestamp to a date string
    const date = fromUnixTime(h.timestamp);
    const formattedDate = format(date, "dd/MM/y");
    // save the results in the arrays
    coinPrice.push(price);
    coinTimestamp.push(formattedDate);
  });

  const data: ChartData<"line"> = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price in USD",
        data: coinPrice,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options: ChartOptions<"line"> = {};

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            Change: {change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
        <Line data={data} options={options} />
      </Row>
    </>
  );
};

export default LineChartHistory;
