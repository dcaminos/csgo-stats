import Balancer from "components/Balancer";
import Page from "components/Page";
import PageSpinner from "components/PageSpinner";
import React from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { getPlayersBalanced } from "selectors/balancer";

const BalancerPage = () => {
  useFirestoreConnect(() => [{ collection: "_users" }]);
  useFirestoreConnect(() => [{ collection: "_ranks" }]);
  useFirestoreConnect(() => [{ collection: "_config", doc: "items" }]);

  const players = useSelector(getPlayersBalanced);

  if (players === undefined) return <PageSpinner />;

  return (
    <Page title={"Balancer"}>
      <Balancer players={players} />
    </Page>
  );
};

export default BalancerPage;
