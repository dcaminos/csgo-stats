import Page from "components/Page";
import PageSpinner from "components/PageSpinner";
import TeamResults from "components/TeamResults";
import React from "react";
import { useSelector } from "react-redux";
import { isLoaded, useFirestoreConnect } from "react-redux-firebase";
import { Col, Row } from "reactstrap";
import { getMatchInfo } from "selectors";

const MatchPage = ({ id }) => {
  useFirestoreConnect(() => [{ collection: "match_info", doc: id }]);
  const match = useSelector((state) => getMatchInfo(state, id));

  if (!isLoaded(match)) return <PageSpinner />;

  return (
    <Page className="MatchPage" title={match.map} backTo="/matches">
      <Row>
        <Col md="12" sm="12" xs="12">
          {match.date}
        </Col>
      </Row>

      <Row>
        <Col md="12" sm="12" xs="12">
          <TeamResults team={match.team1} result={match.resultTeam1} />
        </Col>
      </Row>
      <Row>
        <Col md="12" sm="12" xs="12">
          <TeamResults team={match.team2} result={match.resultTeam2} />
        </Col>
      </Row>
    </Page>
  );
};

export default MatchPage;
