import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Page from "components/Page";
import PageSpinner from "components/PageSpinner";
import RankTable from "components/RankTable";
import { Line } from "react-chartjs-2";
import { Col, Row } from "reactstrap";
import {
  getChartDataSelector,
  isLoadingSelector,
} from "selectors/progressSelectors";
import { fetchProgressAction } from "actions/progress";

const ProgressPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProgressAction());
  }, []);

  const chartData = useSelector(getChartDataSelector);
  const isLoading = useSelector(isLoadingSelector);

  if (isLoading) {
    return <PageSpinner />;
  }

  return (
    <Page title={"Progress"}>
      <Row>
        <Col md="12" sm="12" xs="12">
          <div style={{ width: "100%" }}>
            <Line data={chartData} />
          </div>
        </Col>
      </Row>
    </Page>
  );
};

export default ProgressPage;
