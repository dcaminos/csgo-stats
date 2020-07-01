import React from "react";
import Page from "components/Page";
import PageSpinner from "components/PageSpinner";
import RankTable from "components/RankTable";
import { Line } from "react-chartjs-2";
import { Col, Row } from "reactstrap";
import { getRanking } from "selectors/index";

function getRandomRgb() {
  var num = Math.round(0xffffff * Math.random());
  var r = num >> 16;
  var g = num >> 8 & 255;
  var b = num & 255;
  return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

var RGBColor = () => (Math.round, Math.random, 255);
const randomColor = () => {

  const color = getRandomRgb();
  console.log("Color", color);
  return color;
};

console.log("Random:", randomColor());

const generateLineStyle = () => ({
  fill: false,
  lineTension: 0.1,
  backgroundColor: randomColor(),
  borderColor: randomColor(),
  borderCapStyle: "butt",
  borderDash: [],
  borderDashOffset: 0.0,
  borderJoinStyle: "miter",
  pointBorderColor: randomColor(),
  pointBackgroundColor: "#fff",
  pointBorderWidth: 1,
  pointHoverRadius: 5,
  pointHoverBackgroundColor: randomColor(),
  pointHoverBorderColor: "rgba(220,220,220,1)",
  pointHoverBorderWidth: 2,
  pointRadius: 1,
  pointHitRadius: 10,
});

const data = {
  labels: [
    1593040421,
    1593041376,
    1593042342,
    1593043536,
    1593225596,
    1593227862,
    1593229685,
    1593231412,
    1593233566,
    1592637952,
    1593470831,
    1593472283,
    1593473572,
    1593475191,
    1592794331,
    1592797571,
    1592798848,
    1592866804,
    1592869780,
    1593038982,
    1593126517,
    1593127570,
    1593128698,
    1593130141,
    1593386232,
    1593387675,
    1593389162,
    1592705988,
    1592707558,
    1593125323,
  ],
  datasets: [
    {
      ...generateLineStyle(),
      label: "FrictioN",
      data: [
        0,0,0,0,0,0,0,0,0,35,50,25,76,0,0,0,0,0,57,114,88,126,116,0,0,0,0,0,0,0,
      ],
    },
    {
      ...generateLineStyle(),
      label: "LionelHuts",
      data: [
        25,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16,16,20,36,33,0,0,0,14,13,16,10,
      ],
    },
    {
      ...generateLineStyle(),
      label: "ElraroCaminos",
      data: [
        60,0,0,51,42,44,32,61,16,46,20,39,2,0,23,24,45,56,31,42,46,51,59,53,65,55,8,44,38,53,
      ],
    },
    {
      ...generateLineStyle(),
      label: "psychokiller",
      data: [
        29,0,0,19,38,14,0,0,0,0,0,0,0,0,0,0,0,0,22,22,19,24,30,0,0,0,0,0,0,0,
      ],
    },
    {
      ...generateLineStyle(),
      label: "Seba",
      data: [
        50,15,30,46,41,29,27,37,21,37,42,0,13,0,0,0,9,40,28,58,19,58,41,40,45,43,50,48,31,54,
      ],
    },
    {
      ...generateLineStyle(),
      label: "TanoMockStar",
      data: [
        17,0,19,20,0,0,20,27,3,18,6,16,17,2,35,34,29,31,7,28,12,24,26,17,26,20,48,28,26,43,
      ],
    },
    {
      ...generateLineStyle(),
      label: "Bernabeu",
      data: [
        30,0,0,0,0,0,24,13,0,0,0,0,0,6,14,19,15,22,19,26,16,22,31,0,0,0,41,30,15,24,
      ],
    },
    {
      ...generateLineStyle(),
      label: "VPitcher",
      data: [
        30,0,0,19,39,25,23,16,24,23,27,13,0,18,17,0,9,29,17,30,22,35,26,36,30,41,23,15,21,19,
      ],
    },
    {
      ...generateLineStyle(),
      label: "FTMastersPachu",
      data: [
        45,0,0,33,35,39,30,29,12,23,15,43,31,19,45,30,27,27,22,49,16,33,27,37,27,32,0,0,0,0,
      ],
    },
    {
      ...generateLineStyle(),
      label: "MaxiGraham",
      data: [
        47,0,0,24,26,27,22,31,0,18,14,19,11,0,0,25,40,41,13,36,21,23,39,0,19,25,44,32,36,33,
      ],
    },
    {
      ...generateLineStyle(),
      label: "Pochokleytor",
      data: [
        58,0,0,30,41,23,0,0,0,0,0,0,0,0,0,0,0,0,23,48,26,48,68,0,0,0,0,0,0,0,
      ],
    },
    {
      ...generateLineStyle(),
      label: "Redwood",
      data: [
        49,40,42,51,50,23,52,18,20,36,11,41,31,0,0,0,0,0,42,40,15,41,44,48,36,38,7,24,38,35,
      ],
    },
    {
      ...generateLineStyle(),
      label: "GMCcoubrey",
      data: [
        25,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16,18,13,25,21,0,0,0,0,0,0,0,
      ],
    },
    {
      ...generateLineStyle(),
      label: "Mago",
      data: [
        28,24,22,41,18,29,14,28,0,0,0,0,0,18,35,21,34,35,11,44,27,31,53,19,12,18,32,31,41,33,
      ],
    },
    {
      ...generateLineStyle(),
      label: "Brad",
      data: [
        27,9,22,23,28,13,1,22,0,7,23,18,19,0,0,0,0,0,16,26,32,12,31,21,41,51,28,21,36,39,
      ],
    },
  ],
};

const ProgressPage = () => {
  return (
    <Page title={"Progress"}>
      <Row>
        <Col md="12" sm="12" xs="12">
          <div style={{ width: "900px" }}>
            <Line data={data} />
          </div>
        </Col>
      </Row>
    </Page>
  );
};

export default ProgressPage;
