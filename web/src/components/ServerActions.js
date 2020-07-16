import { startServer } from "actions/cloudFunctions";
import React from "react";
import { FaSteam } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { isLoaded, useFirestoreConnect } from "react-redux-firebase";
import { Button, Spinner } from "reactstrap";

const ServerActions = ({ id }) => {
  const dispatch = useDispatch();
  useFirestoreConnect(() => [{ collection: "_config", doc: "status" }]);
  const config = useSelector(({ firestore: { data } }) => data._config);
  const isLoading = useSelector((state) => state.cloudFunctions.isLoading);

  if (isLoaded(config) && isLoading === false) {
    const status = config.status;

    const ButtonPlay = () => (
      <a href={`steam://connect/${status.ip}/lages`}>
        <Button onClick={() => {}}>
          <FaSteam className="h2 mr-2 mb-0" />
          {"Play CS:GO"}
        </Button>
      </a>
    );

    const ButtonStart = () => (
      <Button onClick={() => dispatch(startServer())}>{"Start Server"}</Button>
    );

    if (status.state === "ON") {
      return <ButtonPlay />;
    } else if (status.state === "OFF") {
      return <ButtonStart />;
    }
  }

  return <Spinner color={"primary"} className="ml-3 " />;
};

export default ServerActions;
