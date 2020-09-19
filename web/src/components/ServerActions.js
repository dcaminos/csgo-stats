import { startServer } from "actions/cloudFunctions";
import ServerConfig from "components/ServerConfig";
import React, { useState } from "react";
import { FaCogs, FaSteam } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { isLoaded, useFirestoreConnect } from "react-redux-firebase";
import { Button, Popover, PopoverBody, Spinner } from "reactstrap";

const ServerActions = ({ id }) => {
  const dispatch = useDispatch();
  useFirestoreConnect(() => [{ collection: "_config", doc: "status" }]);
  const config = useSelector(({ firestore: { data } }) => data._config);
  const isLoading = useSelector((state) => state.cloudFunctions.isLoading);

  const [showPopover, setShowPopover] = useState(false);
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
      return (
        <div className="d-flex align-items-center">
          <ButtonPlay />
          <div className="ml-3">
            <div id="Popover2">
              <FaCogs color="#fc5c7d" size={40} />
            </div>
            <Popover
              placement="bottom-end"
              isOpen={showPopover}
              toggle={() => setShowPopover(!showPopover)}
              target="Popover2"
              className="p-0 border-0"
              style={{ minWidth: 250 }}
            >
              <PopoverBody className="p-0 border-light">
                <ServerConfig setShowPopover={setShowPopover} />
              </PopoverBody>
            </Popover>
          </div>
        </div>
      );
    } else if (status.state === "OFF") {
      return <ButtonStart />;
    }
  }

  return <Spinner color={"primary"} className="ml-3 " />;
};

export default ServerActions;
