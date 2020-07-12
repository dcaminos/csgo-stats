import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Badge, Card, CardBody, CardFooter, CardTitle } from "reactstrap";

const BalancerTeam = ({ id, color, title, team }) => {
  const totalPoints = team
    .reduce((accumulator, player) => accumulator + Number(player.rank), 0)
    .toFixed(3);
  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef}>
          <Card>
            <CardBody>
              <CardTitle>
                <p className="d-flex flex-row justify-content-center">
                  <strong>{title}</strong>
                </p>
              </CardTitle>
              {team.map((player, index) => (
                <Draggable
                  key={player.id}
                  draggableId={player.id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <h3>
                        <Badge color={color}>{player.name}</Badge>
                      </h3>
                    </div>
                  )}
                </Draggable>
              ))}

              <CardFooter className="d-flex flex-row justify-content-end">
                <p>
                  Players: <strong>{team.length}</strong>
                  &nbsp;&nbsp;&nbsp;Points: <strong>{totalPoints}</strong>
                </p>
              </CardFooter>
            </CardBody>
          </Card>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default BalancerTeam;
