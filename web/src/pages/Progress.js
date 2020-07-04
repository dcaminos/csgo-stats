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
  selectedIndicatorSelector,
  indicatorOptionsSelector,
} from "selectors/progressSelectors";
import { fetchProgressAction, changeIndicatorAction } from "actions/progress";

const ProgressPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProgressAction());
  }, []);

  const chartData = useSelector(getChartDataSelector);
  const isLoading = useSelector(isLoadingSelector);
  const indicatorId = useSelector(selectedIndicatorSelector);
  const indicatorsOptions = useSelector(indicatorOptionsSelector);

  const handleChange = (e) => {
    dispatch(changeIndicatorAction(e.target.value));
  };

  if (isLoading) {
    return <PageSpinner />;
  }

  return (
    <Page>
      <Row>
        <Col
          xs="12"
          sm="3"
          style={{
            marginTop: "auto",
            marginBottom: "auto",
          }}
        >
          <h3>Select Indicator</h3>
        </Col>
        <Col
          xs="12"
          sm="9"
          style={{
            marginTop: "auto",
            marginBottom: "auto",
          }}
        >
          <select value={indicatorId} onChange={handleChange}>
            {indicatorsOptions.map((option) => (
              <option value={option}>{option}</option>
            ))}
          </select>
        </Col>
      </Row>

      <Row>
        <Col xs="12">
          <div style={{ width: "100%" }}>
            <Line data={chartData} />
          </div>
        </Col>
      </Row>
    </Page>
  );
};

export default ProgressPage;
