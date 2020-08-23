import Typography from "components/Typography";
import React from "react";
import { Card, CardBody, Table } from "reactstrap";

const TeamResults = ({ team }) => {
  const isWinner = team.label === "WINNERS";
  return (
    <Card className={isWinner ? "bg-gradient-theme-right  text-white" : ""}>
      <CardBody>
        <div className="d-flex justify-content-between">
          <Typography type="h1" className="m-0">
            {team.label}
          </Typography>

          <Typography type="display-1" className="m-0 team-results-big-number">
            {team.score}
          </Typography>
        </div>
        <Table responsive className={isWinner ? "text-white" : ""}>
          <thead>
            <tr>
              <th>{"Name"}</th>
              <th className="lign-middle text-center">{"Kills"}</th>
              <th className="lign-middle text-center">{"Assists"}</th>
              <th className="lign-middle text-center">{"Deaths"}</th>
              <th className="lign-middle text-center">{"Headshots"}</th>
              <th className="lign-middle text-center">{"Rounds"}</th>
              <th className="lign-middle text-center">{"Score"}</th>
            </tr>
          </thead>
          <tbody>
            {team.players.map((player) => (
              <tr key={player.id}>
                <td> {player.name}</td>
                <td className="align-middle text-center">{player.kills}</td>
                <td className="align-middle text-center">{player.assists}</td>
                <td className="align-middle text-center">{player.deaths}</td>
                <td className="align-middle text-center">{player.headshots}</td>
                <td className="align-middle text-center">{player.rounds}</td>
                <td className="align-middle text-center">{player.score}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default TeamResults;
