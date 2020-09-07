import { checkServerStatus } from "actions/cloudFunctions";
import PageSpinner from "components/PageSpinner";
import React, { useEffect } from "react";
import componentQueries from "react-component-queries";
import { useDispatch } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import MainLayout from "./components/Layout/MainLayout";
import BalancerPage from "./pages/Balancer";
import MatchPage from "./pages/Match";
import RankingPage from "./pages/Ranking";
import "./styles/reduction.scss";

const App = ({ breakpoint }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkServerStatus());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Switch>
        <MainLayout breakpoint={breakpoint}>
          <React.Suspense fallback={<PageSpinner />}>
            <Route exact path="/" component={RankingPage} />
            <Route
              exact
              path="/matches/:id"
              render={(props) => <MatchPage id={props.match.params.id} />}
            />
            <Route exact path="/balancer" component={BalancerPage} />
          </React.Suspense>
        </MainLayout>
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: "xs" };
  }

  if (576 < width && width < 767) {
    return { breakpoint: "sm" };
  }

  if (768 < width && width < 991) {
    return { breakpoint: "md" };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: "lg" };
  }

  if (width > 1200) {
    return { breakpoint: "xl" };
  }

  return { breakpoint: "xs" };
};

export default componentQueries(query)(App);
