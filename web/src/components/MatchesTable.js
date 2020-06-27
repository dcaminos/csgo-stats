import React from "react";
import { useHistory } from "react-router-dom";
import { Table } from "reactstrap";

const MatchesTable = ({ matchesList, ...restProps }) => {
  const history = useHistory();

  return (
    <Table className={"matches-table"} responsive hover {...restProps}>
      <thead>
        <tr className=" align-middle">
          <th>{"Date"}</th>
          <th>{"Map"}</th>
          <th className="text-center">{"Players"}</th>
          <th className="text-center">{"Result"}</th>
        </tr>
      </thead>
      <tbody>
        {matchesList.map(
          ({ id, date, shortDate, map, players, result }, index) => (
            <tr key={index} onClick={() => history.push(`/matches/${id}`)}>
              <td className="align-middle text-left d-none d-sm-table-cell ">
                {date}
              </td>

              <td className="align-middle text-left d-table-cell  d-sm-none">
                {shortDate}
              </td>

              <td className="align-middle text-left">{map}</td>
              <td className="align-middle text-center">{players}</td>
              <td className="align-middle text-center">{result}</td>
            </tr>
          )
        )}
      </tbody>
    </Table>
  );
};

export default MatchesTable;
