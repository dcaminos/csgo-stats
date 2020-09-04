import withSorting from "hocs/withSorting";
import React from "react";
import { Table } from "reactstrap";

const RankPlayersTable = ({ data, ColumnTitle }) => {
  const renderPrevPosition = (player) => {
    const down = "\u25bc";
    const up = "\u25b2";
    if (player.prevPosition !== null) {
      const value = Number(player.prevPosition - player.position);
      if (player.prevPosition - player.position < 0) {
        return (
          <div className="text-danger">{`${Math.abs(value)} ${down}`}</div>
        );
      } else if (player.prevPosition - player.position > 0) {
        return <div className="text-success">{`${Math.abs(value)} ${up}`}</div>;
      } else {
        return <div>{"="}</div>;
      }
    }
    return <div>{"-"}</div>;
  };

  return (
    <Table responsive>
      <thead>
        <tr className="align-middle">
          <ColumnTitle className="m-0 p-0" id="" text="" />
          <ColumnTitle
            className="m-0 p-0 align-middle text-center"
            id="position"
            text="#"
          />
          <ColumnTitle className="text-left" id="name" text="Player" />
          <ColumnTitle id="rank" text="Rank" />
          <ColumnTitle id="rounds" text="Rounds" />
          <ColumnTitle id="matches" text="Matches" />
          <ColumnTitle id="kills" text="Kills" />
          <ColumnTitle id="deaths" text="Deaths" />
          <ColumnTitle id="assists" text="Assists" />
          <ColumnTitle id="headshots" text="Headshots" />
        </tr>
      </thead>
      <tbody>
        {data.map((player, index) => (
          <tr key={index}>
            <td className="m-0 p-0 align-middle text-center">
              {renderPrevPosition(player)}
            </td>
            <td className="m-0 p-0 align-middle text-center">
              {player.position}
            </td>
            <td className="align-middle text-left">{player.name}</td>
            <td className="align-middle text-center font-weight-bold">
              {player.rankText}
            </td>
            <td className="align-middle text-center">{player.rounds}</td>
            <td className="align-middle text-center">{player.matches}</td>
            <td className="align-middle text-center">{player.kills}</td>
            <td className="align-middle text-center">{player.deaths}</td>
            <td className="align-middle text-center">{player.assists}</td>
            <td className="align-middle text-center">{player.headshots}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default withSorting(RankPlayersTable);
