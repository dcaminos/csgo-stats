import React from "react";
import { Card, CardBody } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "App.css";

const RankTable = ({ data }) => {
  const initialSort = {
    defaultSortName: "rank",
    defaultSortOrder: "desc",
  };
  return (
    <Card>
      <CardBody>
        <BootstrapTable
          options={initialSort}
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
            }}
          >
            Matches
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="kills"
            dataSort={true}
            thStyle={{ minWidth: "110px" }}
            tdStyle={{ minWidth: "110px" }}
          >
            Kills
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="deaths"
            dataSort={true}
            thStyle={{ minWidth: "130px" }}
            tdStyle={{ minWidth: "130px" }}
          >
            Deaths
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="assists"
            dataSort={true}
            thStyle={{ minWidth: "115px" }}
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
            }}
          >
            Headshots
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="mvps"
            dataSort={true}
            thStyle={{ minWidth: "100px" }}
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
