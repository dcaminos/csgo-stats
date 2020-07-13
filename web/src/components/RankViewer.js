import PageSpinner from "components/PageSpinner";
import RankTable from "components/RankTable";
import React from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { Col, Row } from "reactstrap";
import { getRank } from "selectors/rankingSelectors";

const RankViewer = ({ rankId }) => {
  useFirestoreConnect(() => [{ collection: "_ranks", doc: rankId }]);
  const rank = useSelector((state) => getRank(state, rankId));

  console.log(rank);
  if (rank === undefined) return <PageSpinner />;

  return (
    <Row>
      <Col md="12" sm="12" xs="12">
        <RankTable data={rank} />
      </Col>
    </Row>
  );
};

export default RankViewer;
