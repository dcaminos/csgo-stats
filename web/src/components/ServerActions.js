import React from "react";
import { useSelector } from "react-redux";
import {
  isLoaded,
  useFirestore,
  useFirestoreConnect,
} from "react-redux-firebase";
import { Button, Col, Row, Spinner } from "reactstrap";

const API_GATEWAY_URL =
  "https://3hsdhg6tok.execute-api.sa-east-1.amazonaws.com/test/invocations";

const ServerActions = ({ id }) => {
  useFirestoreConnect(() => [{ collection: "config", doc: "status" }]);
  const firestore = useFirestore();
  const config = useSelector(({ firestore: { data } }) => data.config);

  if (!isLoaded(config)) return <Spinner color={"primary"} />;
  const status = config.status;

  console.log(status);

  const StartServer = () => {
    const url = new URL(API_GATEWAY_URL);
    var data = {
      action: "start",
      instanceId: "i-03fc606c65cc6a1c6",
    };

    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
        "Access-Control-Allow-Credentials": true,
      },
    });

    firestore
      .collection("config")
      .doc("status")
      .set({
        ...status,
        state: "STARTING",
      });
  };

  const StopServer = () => {
    const url = new URL(API_GATEWAY_URL);
    var data = {
      action: "stop",
      instanceId: "i-03fc606c65cc6a1c6",
    };

    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
        "Access-Control-Allow-Credentials": true,
      },
    });

    firestore
      .collection("config")
      .doc("status")
      .set({
        ...status,
        state: "OFF",
      });
  };

  if (status.state === "OFF") {
    return (
      <Row>
        <Col>
          <Button onClick={StartServer}>{"Start server"}</Button>
        </Col>
      </Row>
    );
  } else if (status.state === "STARTING") {
    return (
      <Row>
        <Col>
          {"STARTING"}
          <Spinner color={"primary"} />
        </Col>
      </Row>
    );
  } else if (status.state === "ON") {
    return (
      <Row>
        <Col>
          {`Server running: ${status.ip}`}
          <Button onClick={StopServer}>{"Stop server"}</Button>
        </Col>
      </Row>
    );
  } else {
    return null;
  }
};

export default ServerActions;
