/*import MatchesTable from "components/MatchesTable";
import Page from "components/Page";
import PageSpinner from "components/PageSpinner";
import React from "react";
import { useSelector } from "react-redux";
import { isLoaded, useFirestoreConnect } from "react-redux-firebase";
import { Card, CardBody, Col, Row } from "reactstrap";
import { getMatchesList } from "selectors/rankingSelectors";

const MatchesPage = () => {
  useFirestoreConnect(() => [{ collection: "matches" }]);
  const matchesList = useSelector(getMatchesList);

  if (!isLoaded(matchesList)) return <PageSpinner />;

  return (
    <Page className="MatchesPage" title="Matches">
      <Row>
        <Col md="12" sm="12" xs="12">
          <Card>
            <CardBody>
              <MatchesTable matchesList={matchesList} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
  );
};

export default MatchesPage;
*/
