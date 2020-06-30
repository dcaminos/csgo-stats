import "App.css";
import React, { useState } from "react";
import { Card, CardBody, Table } from "reactstrap";
import SortData from "./SortData";

const RankTable = ({ data }) => {
  const [rankData, setRankData] = useState(data);

  data.map((player, index) => {
    player.position = index + 1;
    return player;
  });

  const { items, requestSort, getClassNamesFor } = SortData(rankData, { key:'rank', direction:'descending' });

  const search = (event) => {
    event.preventDefault();
    if (event.target.value) {
      let filtered = items.filter(item => {
        return (
          item.position === Number(event.target.value) ||
          item.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
          item.rank.toLowerCase().includes(event.target.value.toLowerCase()) ||
          item.rounds === Number(event.target.value) ||
          item.matches === Number(event.target.value) ||
          item.kills.toLowerCase().includes(event.target.value.toLowerCase()) ||
          item.deaths.toLowerCase().includes(event.target.value.toLowerCase()) ||
          item.assists.toLowerCase().includes(event.target.value.toLowerCase()) ||
          item.headshotKills.toLowerCase().includes(event.target.value.toLowerCase()) ||
          item.mvps.toLowerCase().includes(event.target.value.toLowerCase())
        );
      });
      setRankData(filtered);
    } else {
      setRankData(data) ;
    }
  };
  return (
      <Card>
        <CardBody>
        <input
          type="text"
          onChange={search}
          className="form-control"
        />
          <Table responsive>
            <thead>
              <tr className=" align-middle">
                <th className="text-center"><span className={getClassNamesFor("position")}
                  onClick={() => requestSort("position")}>{"#"}</span></th>
                <th><span className={getClassNamesFor("name")}
                  onClick={() => requestSort("name")}>{"Player"}</span></th>
                <th className="text-center"><span className={getClassNamesFor("rank")}
                  onClick={() => requestSort("rank")}>{"Rank"}</span></th>
                <th className={"text-center"}>
                  <span className={getClassNamesFor("rounds")}
                  onClick={() => requestSort("rounds")}>
                  {"Rounds"}
                  </span></th>
                <th className="text-center"><span className={getClassNamesFor("matches")}
                  onClick={() => requestSort("matches")}>{"Matches"}</span></th>
                <th className="text-center"><span className={getClassNamesFor("kills")}
                  onClick={() => requestSort("kills")}>{"Kills"}</span></th>
                <th className="text-center"><span className={getClassNamesFor("deaths")}
                  onClick={() => requestSort("deaths")}>{"Deaths"}</span></th>
                <th className="text-center"><span className={getClassNamesFor("assists")}
                  onClick={() => requestSort("assists")}>{"Assists"}</span></th>
                <th className="text-center"><span className={getClassNamesFor("headshotKills")}
                  onClick={() => requestSort("headshotKills")}>{"Headshots"}</span></th>
                <th className="text-center"><span className={getClassNamesFor("mvps")}
                  onClick={() => requestSort("mvps")}>{"mvps"}</span></th>
              </tr>
            </thead>
            <tbody>
              {items.map((player, index) => (
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

export default RankTable;
