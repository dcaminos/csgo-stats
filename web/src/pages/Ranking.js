import Page from "components/Page";
import PageSpinner from "components/PageSpinner";
import RankSelector from "components/RankSelector";
import RankViewer from "components/RankViewer";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { Col, Row } from "reactstrap";
import { getRankList } from "selectors/rankingSelectors";

const MatchPage = () => {
  useFirestoreConnect(() => [{ collection: "_config", doc: "items" }]);
  const rankList = useSelector(getRankList);
  const [rankIndex, setRankIndex] = useState(null);

  useEffect(() => {
    if (rankList !== undefined) {
      setRankIndex(rankList.length - 1);
    }
  }, [rankList]);

  if (rankIndex === null) return <PageSpinner />;

  return (
    <Page title={"Ranking"}>
      <Row>
        <Col md="12" sm="12" xs="12">
          <div className="d-flex justify-content-end">
            <RankSelector
              rankList={rankList}
              rankIndex={rankIndex}
              setRankIndex={setRankIndex}
            />
          </div>
        </Col>
      </Row>

      <Row>
        <Col md="12" sm="12" xs="12">
          <RankViewer rankId={rankList[rankIndex]}></RankViewer>
        </Col>
      </Row>
    </Page>
  );
};

//<RankTable data={ranking.data} />

export default MatchPage;
