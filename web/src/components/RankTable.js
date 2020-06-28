import React from "react";
import { Card, CardBody } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import "App.css";

const RankTable = ({ data }) => {
  console.log(data);
  return (
    <Card>
      <CardBody>
        <BootstrapTable
          version="4"
          data={data}
          hover={true}
          className="table-borderless"
          trClassName="table-top-border"
        >
          <TableHeaderColumn
            dataField="name"
            isKey={true}
            dataSort={true}
            tdStyle={{ textOverflow: "inherit", width: "15%" }}
            thStyle={{
              textOverflow: "inherit",
              width: "15%",
              borderBottom: "1px solid #dee2e6",
            }}
          >
            Player
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="rank"
            dataSort={true}
            tdStyle={{ textOverflow: "inherit", width: "8%" }}
            thStyle={{
              textOverflow: "inherit",
              width: "8%",
              borderBottom: "1px solid #dee2e6",
            }}
          >
            Rank
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="rounds"
            dataSort={true}
            tdStyle={{ textOverflow: "inherit", width: "9.5%" }}
            thStyle={{
              textOverflow: "inherit",
              width: "9.5%",
              borderBottom: "1px solid #dee2e6",
            }}
          >
            Rounds
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="matches"
            dataSort={true}
            tdStyle={{ textOverflow: "inherit", width: "11.5%" }}
            thStyle={{
              textOverflow: "inherit",
              width: "11.5%",
              borderBottom: "1px solid #dee2e6",
            }}
          >
            Matches
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="kills"
            dataSort={true}
            thStyle={{ borderBottom: "1px solid #dee2e6" }}
          >
            Kills
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="deaths"
            dataSort={true}
            thStyle={{ borderBottom: "1px solid #dee2e6" }}
          >
            Deaths
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="assists"
            dataSort={true}
            thStyle={{ borderBottom: "1px solid #dee2e6" }}
          >
            Assists
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="headshotKills"
            dataSort={true}
            tdStyle={{ textOverflow: "inherit", width: "12%" }}
            thStyle={{
              textOverflow: "inherit",
              width: "12%",
              borderBottom: "1px solid #dee2e6",
            }}
          >
            Headshots
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="mvps"
            dataSort={true}
            thStyle={{ borderBottom: "1px solid #dee2e6" }}
          >
            mvps
          </TableHeaderColumn>
        </BootstrapTable>
      </CardBody>
    </Card>
  );
};

export default RankTable;
