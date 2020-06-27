import Switch from "@material-ui/core/Switch";
import React from "react";
import { Card, CardBody, Table } from "reactstrap";

const BalancerPlayers = ({ players, actives, setActives }) => {
  const handleChange = (event) => {
    setActives({
      ...actives,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Card>
      <CardBody>
        <Table responsive>
          <thead>
            <tr className=" align-middle">
              <th>{"Player"}</th>
              <th className="text-center">{"Active"}</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={index}>
                <td className="align-middle text-left">{`${player.name} (${player.rank})`}</td>

                <td className="align-middle text-center">
                  <Switch
                    checked={actives[player.id]}
                    onChange={handleChange}
                    name={player.id}
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default BalancerPlayers;
