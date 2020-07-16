import Page from "components/Page";
import PageSpinner from "components/PageSpinner";
import TeamResults from "components/TeamResults";
import React from "react";
import { useSelector } from "react-redux";
import { isLoaded, useFirestoreConnect } from "react-redux-firebase";
import { Col, Row } from "reactstrap";
import { getMatch } from "selectors/matchSelectors";

const MatchPage = ({ id }) => {
  useFirestoreConnect(() => [{ collection: "_matches", doc: id }]);
  const match = useSelector((state) => getMatch(state, id));

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
          <TeamResults team={match.teamA} />
        </Col>
      </Row>
      <Row>
        <Col md="12" sm="12" xs="12">
          <TeamResults team={match.teamB} />
        </Col>
      </Row>
    </Page>
  );
};

export default MatchPage;
