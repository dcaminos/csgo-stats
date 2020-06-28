import React from "react";
import { Card, CardBody } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
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
          bordered={false}
          className="table-borderless"
          trClassName="table-top-border"
        >
          <TableHeaderColumn
            dataField="name"
            isKey={true}
            dataSort={true}
            tdStyle={{ textOverflow: "inherit", minWidth: "150px" }}
            thStyle={{
              textOverflow: "inherit",
              minWidth: "150px",
              borderBottom: "1px solid #dee2e6",
            }}
          >
            Player
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="rank"
            dataSort={true}
            tdStyle={{ textOverflow: "inherit", minWidth: "95px" }}
            thStyle={{
              textOverflow: "inherit",
              minWidth: "95px",
              borderBottom: "1px solid #dee2e6",
            }}
          >
            Rank
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="rounds"
            dataSort={true}
            tdStyle={{ textOverflow: "inherit", minWidth: "115px" }}
            thStyle={{
              textOverflow: "inherit",
              minWidth: "115px",
              borderBottom: "1px solid #dee2e6",
            }}
          >
            Rounds
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="matches"
            dataSort={true}
            tdStyle={{ textOverflow: "inherit", minWidth: "125px" }}
            thStyle={{
              textOverflow: "inherit",
              minWidth: "125px",
              borderBottom: "1px solid #dee2e6",
            }}
          >
            Matches
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="kills"
            dataSort={true}
            thStyle={{ borderBottom: "1px solid #dee2e6", minWidth: "110px" }}
            tdStyle={{ minWidth: "110px" }}
            >
            Kills
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="deaths"
            dataSort={true}
            thStyle={{ borderBottom: "1px solid #dee2e6", minWidth: "130px" }}
            tdStyle={{ minWidth: "130px" }}
            >
            Deaths
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="assists"
            dataSort={true}
            thStyle={{ borderBottom: "1px solid #dee2e6", minWidth: "115px" }}
            tdStyle={{ minWidth: "115px" }}
            >
            Assists
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="headshotKills"
            dataSort={true}
            tdStyle={{ textOverflow: "inherit", minWidth: "142px" }}
            thStyle={{
              textOverflow: "inherit",
              minWidth: "142px",
              borderBottom: "1px solid #dee2e6",
            }}
            >
            Headshots
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="mvps"
            dataSort={true}
            thStyle={{ borderBottom: "1px solid #dee2e6", minWidth: "100px" }}
            tdStyle={{ minWidth: "100px" }}
            >
            mvps
          </TableHeaderColumn>
        </BootstrapTable>
      </CardBody>
    </Card>
  );
};

export default RankTable;
