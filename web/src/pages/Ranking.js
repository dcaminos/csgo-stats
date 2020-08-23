import Page from "components/Page";
import PageSpinner from "components/PageSpinner";
import RankSelector from "components/RankSelector";
import RankViewer from "components/RankViewer";
import Typography from "components/Typography";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
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

  const title = (
    <div className="w-100 d-flex justify-content-between align-items-center">
      <Typography type="h1">{"Ranking"}</Typography>
      <RankSelector
        rankList={rankList}
        rankIndex={rankIndex}
        setRankIndex={setRankIndex}
      />
    </div>
  );

  return (
    <Page title={title}>
      <RankViewer rankId={rankList[rankIndex]}></RankViewer>
    </Page>
  );
};

//<RankTable data={ranking.data} />

export default MatchPage;
