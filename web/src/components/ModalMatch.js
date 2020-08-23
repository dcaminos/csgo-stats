import MatchChats from "components/MatchChats";
import TeamResults from "components/TeamResults";
import React from "react";
import { useSelector } from "react-redux";
import { isLoaded, useFirestoreConnect } from "react-redux-firebase";
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { getMatch } from "selectors/matchSelectors";

const ModalMatch = ({ isOpen, toggle, matchId }) => {
  useFirestoreConnect(() => [{ collection: "_users" }]);
  useFirestoreConnect(() => [{ collection: "_config", doc: "maps" }]);
  useFirestoreConnect(() => [{ collection: "_matches", doc: matchId }]);
  const match = useSelector((state) => getMatch(state, matchId));

  const renderChats = (match) => {
    if (match.chats.length === 0) {
      return null;
    }

    return (
      <Row className="mb-3">
        <Col md="12" sm="12" xs="12">
          <MatchChats data={match.chats} />
        </Col>
      </Row>
    );
  };

  if (!isLoaded(match)) return null;

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="xl">
      <ModalHeader toggle={toggle}>{match.map}</ModalHeader>
      <ModalBody>
        <Row className="mb-3 d-flex">
          <Col className="d-flex justify-content-between">
            <div>{match.date}</div>
            <div>{match.duration}</div>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md="12" sm="12" xs="12">
            <TeamResults team={match.teamA} />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md="12" sm="12" xs="12">
            <TeamResults team={match.teamB} />
          </Col>
        </Row>
        {renderChats(match)}
      </ModalBody>
    </Modal>
  );
};

export default ModalMatch;
