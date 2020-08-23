import PageSpinner from "components/PageSpinner";
import RankMatchesTable from "components/RankMatchesTable";
import RankPlayersTable from "components/RankPlayersTable";
import React from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import { getMatches, getRank } from "selectors/rankingSelectors";

const RankViewer = ({ rankId }) => {
  useFirestoreConnect(() => [{ collection: "_ranks", doc: rankId }]);
  const rank = useSelector((state) => getRank(state, rankId));
  const matches = useSelector((state) => getMatches(state, rankId));

  if (rank === undefined || matches === undefined) return <PageSpinner />;

  return (
    <div>
      <Row>
        <Col md="12" sm="12" xs="12">
          <Card>
            <CardBody>
              <CardHeader className="d-flex justify-content-end">{`${rank.length} players`}</CardHeader>
              <RankPlayersTable data={rank} />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md="12" sm="12" xs="12">
          <Card>
            <CardBody>
              <CardHeader className="d-flex justify-content-end">{`${matches.length} matches`}</CardHeader>
              <RankMatchesTable data={matches} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default RankViewer;
