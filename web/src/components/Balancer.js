import BalancerPlayers from "components/BalancerPlayers";
import BalancerTeam from "components/BalancerTeam";
import ModalSetTeams from "components/ModalSetTeams";
import ServerExtraConfig from "components/ServerExtraConfig"
import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { isLoaded, useFirestoreConnect } from "react-redux-firebase";
import { Button, Col, Row } from "reactstrap";

const Balancer = ({ players }) => {
  const initActives = {};
  players.forEach((player) => {
    initActives[player.id] = player.online;
  });

  useFirestoreConnect(() => [{ collection: "_config", doc: "status" }]);
  const config = useSelector(({ firestore: { data } }) => data._config);

  const [actives, setActives] = useState(initActives);
  const [teamA, setTeamA] = useState([]);
  const [teamB, setTeamB] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setTeams(players, actives, setTeamA, setTeamB);
  }, [actives, players]);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const switchPlayers = () => {
    const teamC = [...teamA];
    setTeamA(teamB);
    setTeamB(teamC);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === "teamA") {
        setTeamA(reorder(teamA, source.index, destination.index));
      } else {
        setTeamB(reorder(teamB, source.index, destination.index));
      }
    } else {
      if (source.droppableId === "teamA") {
        setTeamA(teamA.filter((p) => p.id !== result.draggableId));

        teamB.splice(
          destination.index,
          0,
          players.find((p) => p.id === result.draggableId)
        );
        setTeamB(teamB);
      } else if (source.droppableId === "teamB") {
        setTeamB(teamB.filter((p) => p.id !== result.draggableId));

        teamA.splice(
          destination.index,
          0,
          players.find((p) => p.id === result.draggableId)
        );
        setTeamA(teamA);
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Row>
        <Col md="6" sm="6" xs="12">
          <BalancerPlayers
            players={players}
            actives={actives}
            setActives={setActives}
          />
        </Col>

        <Col md="6" sm="6" xs="12">
          <Row>
            <Col>
              <BalancerTeam
                id="teamA"
                title={"Counter Terrorist"}
                color="primary"
                team={teamA}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <BalancerTeam
                id="teamB"
                title="Terrorist"
                color="secondary"
                team={teamB}
              />
            </Col>
          </Row>
          <Row>
            {isLoaded(config) &&
              config.status.state === "ON" &&
              teamA.length + teamB.length > 0 && (
                <Col className="d-flex justify-content-between">
                  <Button onClick={switchPlayers}>{"Switch players"}</Button>
                  <Button color="primary" onClick={() => setShowModal(true)}>
                    {"Apply teams"}
                  </Button>
                </Col>
              )}
            <ModalSetTeams
              isOpen={showModal}
              toggle={() => setShowModal(false)}
              teamA={teamA}
              teamB={teamB}
            />
          </Row>
          <Row>
            <Col><ServerExtraConfig></ServerExtraConfig></Col>
          </Row>
        </Col>
      </Row>
    </DragDropContext>
  );
};

const setTeams = (players, actives, setTeamA, setTeamB) => {
  const list = players.filter((p) => actives[p.id]);
  const teamA = [];
  const teamB = [];

  list.forEach((player) => {
    if (teamRank(teamA) <= teamRank(teamB)) {
      teamA.push(player);
    } else {
      teamB.push(player);
    }
  });

  setTeamA(teamA);
  setTeamB(teamB);
};

const teamRank = (team) => {
  return team.reduce(
    (accumulator, player) => accumulator + Number(player.rank),
    0
  );
};

export default Balancer;
