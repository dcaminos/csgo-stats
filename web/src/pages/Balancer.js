import Balancer from "components/Balancer";
import Page from "components/Page";
import PageSpinner from "components/PageSpinner";
import React from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { getPlayers } from "selectors/balancer";

const BalancerPage = () => {
  useFirestoreConnect(() => [{ collection: "_users" }]);
  const players = useSelector(getPlayers);

  if (players === undefined) return <PageSpinner />;

  return (
    <Page title={"Balancer"}>
      <Balancer players={players} />
    </Page>
  );
};

export default BalancerPage;
