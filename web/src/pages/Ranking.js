import Page from "components/Page";
import PageSpinner from "components/PageSpinner";
import RankTable from "components/RankTable";
import React from "react";
import { useSelector } from "react-redux";
import { Col, Row } from "reactstrap";
import { getRanking } from "selectors/index";

const MatchPage = () => {
  const ranking = useSelector(getRanking);
  if (ranking.isLoading) return <PageSpinner />;

  return (
    <Page title={"Ranking"}>
      <Row>
        <Col md="12" sm="12" xs="12">
          <RankTable data={ranking.data} />
        </Col>
      </Row>
    </Page>
  );
};

export default MatchPage;
