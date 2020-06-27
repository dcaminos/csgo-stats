import Typography from "components/Typography";
import React from "react";
import { Card, CardBody, Table } from "reactstrap";

const TeamResults = ({ team, result, ...restProps }) => {
  return (
    <Card
      className={result.isWinner ? "bg-gradient-theme-right  text-white" : ""}
    >
      <CardBody>
        <div className="row">
          <div className="col-xs-12 col-md-5 m-0">
            {result.isWinner && (
              <Typography type="h1" className="m-0">
                WINNERS
              </Typography>
            )}
            {result.isLosers && (
              <Typography type="h1" className="m-0">
                LOSERS
              </Typography>
            )}
          </div>
          <div className="d-flex flex-row justify-content-end col-xs-12 col-md-7 ">
            <div
              className={
                "d-flex flex-column justify-content-end align-items-end mr-3 "
              }
            >
              <Typography type="h6">{`First half: ${result.partA}`}</Typography>
              <Typography type="h6">{`Second half: ${result.partB}`}</Typography>
            </div>
            <Typography
              type="display-1"
              className="m-0 team-results-big-number"
            >
              {result.total}
            </Typography>
          </div>
        </div>
        <Table
          responsive
          {...restProps}
          className={result.isWinner ? "text-white" : ""}
        >
          <thead>
            <tr>
              <th>{"Name"}</th>
              <th className="lign-middle text-center">{"Kills"}</th>
              <th className="lign-middle text-center">{"Assists"}</th>
              <th className="lign-middle text-center">{"Deaths"}</th>
              <th className="lign-middle text-center">{"Headshots"}</th>
              <th className="lign-middle text-center">{"mvps"}</th>
              <th className="lign-middle text-center">{"Rounds"}</th>
              <th className="lign-middle text-center">{"Score"}</th>
            </tr>
          </thead>
          <tbody>
            {team.map(
              ({
                id,
                name,
                kills,
                assists,
                deaths,
                headshotKills,
                mvps,
                rounds,
                score,
              }) => (
                <tr key={id}>
                  <td> {name}</td>
                  <td className="align-middle text-center"> {kills}</td>
                  <td className="align-middle text-center"> {assists}</td>
                  <td className="align-middle text-center"> {deaths}</td>
                  <td className="align-middle text-center"> {headshotKills}</td>
                  <td className="align-middle text-center"> {mvps}</td>
                  <td className="align-middle text-center"> {rounds}</td>
                  <td className="align-middle text-center"> {score}</td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default TeamResults;
