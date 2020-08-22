import Page from "components/Page";
import PageSpinner from "components/PageSpinner";
import React from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { Col, Row } from "reactstrap";
import { getRanks } from "selectors/progressSelectors";

const StatsPage = () => {
  useFirestoreConnect(() => [{ collection: "_ranks" }]);
  const chartData = useSelector(getRanks);

  console.log(chartData);

  if (chartData === null) return <PageSpinner />;

  return (
    <Page title={"Stats"}>
      <Row>
        <Col xs="12">
          <Line
            data={chartData}
            height="700"
            options={{
              responsive: true,
              maintainAspectRatio: false,
              spanGaps: false,
            }}
          />
        </Col>
      </Row>
    </Page>
  );
};

export default StatsPage;
