import ModalMatch from "components/ModalMatch";
import React, { useState } from "react";
import { Table } from "reactstrap";

const RankMatchesTable = ({ data }) => {
  const [selectMatch, setSelectMatch] = useState(null);

  return (
    <div>
      <Table className={"matches-table"} responsive hover>
        <thead>
          <tr className=" align-middle">
            <th>{"Date"}</th>
            <th>{"Map"}</th>
            <th className="text-center">{"Players"}</th>
            <th className="text-center">{"Duration"}</th>
            <th className="text-center">{"Result"}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((match, index) => (
            <tr key={index} onClick={() => setSelectMatch(match.id)}>
              <td className="align-middle text-left d-none d-sm-table-cell ">
                {match.date}
              </td>

              <td className="align-middle text-left d-table-cell  d-sm-none">
                {match.shortDate}
              </td>

              <td className="align-middle text-left">{match.map}</td>
              <td className="align-middle text-center">{match.players}</td>
              <td className="align-middle text-center">{`${match.duration} min`}</td>
              <td className="align-middle text-center">{match.result}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ModalMatch
        isOpen={selectMatch !== null}
        toggle={() => setSelectMatch(null)}
        matchId={selectMatch}
      />
    </div>
  );
};

export default RankMatchesTable;
