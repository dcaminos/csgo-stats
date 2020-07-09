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
  useFirestoreConnect(() => [{ collection: "_config", doc: "status" }]);
  const firestore = useFirestore();
  const config = useSelector(({ firestore: { data } }) => data._config);

  if (!isLoaded(config)) return <Spinner color={"primary"} />;
  const status = config.status;

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
      .collection("_config")
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
      .collection("_config")
      .doc("status")
      .set({
        ...status,
        state: "STOPPING",
      });

    setTimeout(() => {
      firestore
        .collection("_config")
        .doc("status")
        .set({
          ...status,
          state: "OFF",
        });
    }, 8000);
  };

  const renderContent = (status) => {
    if (status.state === "OFF") {
      return (
        <Button onClick={StartServer} className="ml-3 ">
          {"Start server"}
        </Button>
      );
    } else if (status.state === "STARTING") {
      return (
        <div>
          {"Turning On"}
          <Spinner color={"primary"} className="ml-3 " />
        </div>
      );
    } else if (status.state === "ON") {
      return (
        <div className="d-flex ">
          <div className="d-flex flex-column">
            <div>{"Server running"}</div>
            <div>{status.ip}</div>
          </div>
          <Button onClick={StopServer} className="ml-3 ">
            {"Stop server"}
          </Button>
        </div>
      );
    } else if (status.state === "STOPPING") {
      return (
        <div>
          {"Turning Off"}
          <Spinner color={"primary"} className="ml-3 " />
        </div>
      );
    }
    return null;
  };

  return (
    <Row>
      <Col>{renderContent(status)}</Col>
    </Row>
  );
};

export default ServerActions;
