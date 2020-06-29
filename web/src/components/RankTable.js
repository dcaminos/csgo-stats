import "App.css";
import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Card, CardBody } from "reactstrap";

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
            className="text-center"
            columnClassName="text-center font-weight-bold"
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
            className="text-center"
            columnClassName="text-center"
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
            className="text-center"
            columnClassName="text-center"
          >
            Matches
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="kills"
            dataSort={true}
            thStyle={{ minWidth: "110px" }}
            tdStyle={{ minWidth: "110px" }}
            className="text-center"
            columnClassName="text-center"
          >
            Kills
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="deaths"
            dataSort={true}
            thStyle={{ minWidth: "130px" }}
            tdStyle={{ minWidth: "130px" }}
            className="text-center"
            columnClassName="text-center"
          >
            Deaths
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="assists"
            dataSort={true}
            thStyle={{ minWidth: "115px" }}
            tdStyle={{ minWidth: "115px" }}
            className="text-center"
            columnClassName="text-center"
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
            className="text-center"
            columnClassName="text-center"
          >
            Headshots
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="mvps"
            dataSort={true}
            thStyle={{ minWidth: "100px" }}
            tdStyle={{ minWidth: "100px" }}
            className="text-center"
            columnClassName="text-center"
          >
            mvps
          </TableHeaderColumn>
        </BootstrapTable>
      </CardBody>
    </Card>
  );
};

export default RankTable;
