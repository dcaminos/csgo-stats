import withSorting from "hocs/withSorting";
import React from "react";
import { Card, CardBody, Table } from "reactstrap";

const RankTable = ({ data, ColumnTitle }) => {
  return (
    <Card>
      <CardBody>
        <Table responsive>
          <thead>
            <tr className="align-middle">
              <ColumnTitle id="position" text="#" />
              <ColumnTitle className="text-left" id="name" text="Player" />
              <ColumnTitle id="rank" text="Rank" />
              <ColumnTitle id="rounds" text="Rounds" />
              <ColumnTitle id="matches" text="Matches" />
              <ColumnTitle id="kills" text="Kills" />
              <ColumnTitle id="deaths" text="Deaths" />
              <ColumnTitle id="assists" text="Assists" />
              <ColumnTitle id="headshotKills" text="Headshots" />
              <ColumnTitle id="mvps" text="mvps" />
            </tr>
          </thead>
          <tbody>
            {data.map((player, index) => (
              <tr key={index}>
                <td className="align-middle text-center">{player.position}</td>
                <td className="align-middle text-left">{player.name}</td>
                <td className="align-middle text-center font-weight-bold">
                  {player.rankText}
                </td>
                <td className="align-middle text-center">{player.rounds}</td>
                <td className="align-middle text-center">{player.matches}</td>
                <td className="align-middle text-center">{player.kills}</td>
                <td className="align-middle text-center">{player.deaths}</td>
                <td className="align-middle text-center">{player.assists}</td>
                <td className="align-middle text-center">
                  {player.headshotKills}
                </td>
                <td className="align-middle text-center">{player.mvps}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default withSorting(RankTable);
