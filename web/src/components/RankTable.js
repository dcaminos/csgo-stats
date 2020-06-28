import React from "react";
import { Card, CardBody } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

const RankTable = ({ data }) => {
  console.log(data);
  return (
    <Card>
      <CardBody>
        <BootstrapTable data={data} hover={true}>
          <TableHeaderColumn
            dataField="name"
            isKey={true}
            dataSort={true}
            tdStyle={{ textOverflow: 'inherit', width: '15%' }}
            thStyle={{ textOverflow: 'inherit', width: '15%' }}
          >
            Player
          </TableHeaderColumn>
          <TableHeaderColumn dataField="rank" dataSort={true}>
            Rank
          </TableHeaderColumn>
          <TableHeaderColumn dataField="rounds" dataSort={true}>
            Rounds
          </TableHeaderColumn>
          <TableHeaderColumn dataField="matches" dataSort={true}>
            Matches
          </TableHeaderColumn>
          <TableHeaderColumn dataField="kills" dataSort={true}>
            Kills
          </TableHeaderColumn>
          <TableHeaderColumn dataField="deaths" dataSort={true}>
            Deaths
          </TableHeaderColumn>
          <TableHeaderColumn dataField="assists" dataSort={true}>
            Assists
          </TableHeaderColumn>
          <TableHeaderColumn dataField="headshotKills" dataSort={true}>
            Headshots
          </TableHeaderColumn>
          <TableHeaderColumn dataField="mvps" dataSort={true}>
            mvps
          </TableHeaderColumn>
        </BootstrapTable>
      </CardBody>
    </Card>
  );
};

export default RankTable;
