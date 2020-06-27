import BalancerPlayers from "components/BalancerPlayers";
import BalancerTeam from "components/BalancerTeam";
import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Col, Row } from "reactstrap";
const Balancer = ({ players }) => {
  const initActives = {};
  players.forEach((player) => {
    initActives[player.id] = true;
  });

  const [actives, setActives] = useState(initActives);
  const [teamA, setTeamA] = useState([]);
  const [teamB, setTeamB] = useState([]);

  useEffect(() => {
    setTeams(players, actives, setTeamA, setTeamB);
  }, [actives]);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
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
                title={"Team A"}
                color="primary"
                team={teamA}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <BalancerTeam
                id="teamB"
                title="Team B"
                color="secondary"
                team={teamB}
              />
            </Col>
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