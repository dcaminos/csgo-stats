import React from "react";
import { Card, CardBody, Table } from "reactstrap";

const RankTable = ({ data }) => {
  return (
    <Card>
      <CardBody>
        <Table responsive>
          <thead>
            <tr className=" align-middle">
              <th>{"Player"}</th>
              <th className="text-center">{"Rank"}</th>
              <th className="text-center">{"Rounds"}</th>
              <th className="text-center">{"Matches"}</th>
              <th className="text-center">{"kills"}</th>
              <th className="text-center">{"Deaths"}</th>
              <th className="text-center">{"Assists"}</th>
              <th className="text-center">{"Headshots"}</th>
              <th className="text-center">{"mvps"}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((player, index) => (
              <tr key={index}>
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

export default RankTable;
