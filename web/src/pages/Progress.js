import { changeIndicatorAction, fetchProgressAction } from "actions/progress";
import Page from "components/Page";
import PageSpinner from "components/PageSpinner";
import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "reactstrap";
import {
  getChartDataSelector,
  indicatorOptionsSelector,
  isLoadingSelector,
  selectedIndicatorSelector,
} from "selectors/progressSelectors";

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
    <Page title={"Stats"}>
      <Row>
        <Col className="text-right">
          <select value={indicatorId} onChange={handleChange} class="ml-4">
            {indicatorsOptions.map((option) => (
              <option value={option}>{option}</option>
            ))}
          </select>
        </Col>
      </Row>

      <Row>
        <Col xs="12">
          <Line
            data={chartData}
            height="700"
            options={{
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        </Col>
      </Row>
    </Page>
  );
};

export default ProgressPage;
