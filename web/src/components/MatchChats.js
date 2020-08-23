import React from "react";
import { Card, CardBody, CardHeader, Table } from "reactstrap";

const MatchChats = ({ data }) => {
  return (
    <Card>
      <CardHeader>{"Chats"}</CardHeader>
      <CardBody>
        <Table className={"chats-table"} responsive hover>
          <thead>
            <tr className="align-middle">
              <th>{"Time"}</th>
              <th>{"Player"}</th>
              <th>{"Destination"}</th>
              <th>{"Message"}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((chat, index) => (
              <tr key={index}>
                <td className="text-left">{chat.time}</td>
                <td className="text-left">{chat.player}</td>
                <td className="text-left">{chat.destination}</td>
                <td className=" text-left">{chat.message}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default MatchChats;
