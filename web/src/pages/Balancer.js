import Balancer from "components/Balancer";
import Page from "components/Page";
import PageSpinner from "components/PageSpinner";
import React from "react";
import { useSelector } from "react-redux";
import { getRanking } from "selectors/rankingSelectors";

const BalancerPage = () => {
  const ranking = useSelector(getRanking);

  if (ranking.isLoading) return <PageSpinner />;
  return (
    <Page title={"Balancer"}>
      <Balancer players={ranking.data} />
    </Page>
  );
};

export default BalancerPage;
