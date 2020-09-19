import { setBots } from "actions/cloudFunctions";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  ButtonGroup,
  Button,
  Col,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Card,
  CardBody,
  CardTitle,
} from "reactstrap";

const ServerExtraConfig = () => {
  const dispatch = useDispatch();

  const [teammatesAreEnemies, setTeammatesAreEnemies] = useState(false);
  const [botLevel, setBotLevel] = useState("expert");
  const [botLevelDisabled, setBotLevelDisabled] = useState(true);
  const [botsCT, setBotsCT] = useState(0);
  const [botsT, setBotsT] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [applyDisabled, setApplyDisabled] = useState(true);
  const minBot = 0;
  const maxBot = 5;
  const toggleModal = () => setShowModal(!showModal);

  useEffect(() => {
    if (teammatesAreEnemies) setApplyDisabled(false);
    if (botsCT === minBot && botsT === minBot) {
      setBotLevelDisabled(true);
      if (!teammatesAreEnemies) setApplyDisabled(true);
    } else {
      setBotLevelDisabled(false);
      setApplyDisabled(false);
    }
  }, [botsCT, botsT, teammatesAreEnemies]);

  const applyConfig = () => {
    dispatch(
      setBots({
        teammatesAreEnemies,
        addBotCt: botsCT,
        addBotT: botsT,
        botLevel,
      })
    );
    toggleModal();
  };

  return (
    <div className="">
      <Modal
        zIndex="9999"
        isOpen={showModal}
        toggle={toggleModal}
        backdrop={"static"}
      >
        <ModalHeader toggle={toggleModal}>Warning</ModalHeader>
        <ModalBody>
          You are adding Bots or Teammates are enemies flag. Is that right ?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={applyConfig}>
            Apply Config
          </Button>{" "}
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <Card>
        <CardBody>
          <CardTitle>
            <p className="d-flex flex-row justify-content-center">
              <strong>Additional game settings</strong>
            </p>
          </CardTitle>
          <FormGroup>
            <Label className="font-weight-bold">All against all ?</Label>
            <Col className="ml-4 d-flex flex-column">
              <Label>
                <Input
                  type="checkbox"
                  checked={teammatesAreEnemies}
                  onChange={(e) => setTeammatesAreEnemies(!teammatesAreEnemies)}
                />{" "}
                Teammates are enemies
              </Label>
            </Col>
            <Label className="font-weight-bold">Need Bots ?</Label>
            <Col className="d-flex flex-column">
              <span className="input-group">
                <div className="border-0 form-control col-3 col-sm-3 botLabel">
                  CT
                </div>
                <Button
                  disabled={botsCT > minBot ? false : true}
                  onClick={() => setBotsCT(botsCT - 1)}
                  size="sm"
                  className="col-3 col-sm-3"
                >
                  -
                </Button>
                <Label size="sm" className="text-center col-3 col-sm-3">
                  {botsCT}
                </Label>
                <Button
                  disabled={botsCT < maxBot ? false : true}
                  onClick={() => setBotsCT(botsCT + 1)}
                  size="sm"
                  className="col-3 col-sm-3"
                >
                  +
                </Button>
              </span>
              <span className="input-group">
                <div className="border-0 form-control col-3 col-sm-3 botLabel">
                  T
                </div>
                <Button
                  disabled={botsT > minBot ? false : true}
                  onClick={() => setBotsT(botsT - 1)}
                  size="sm"
                  className="col-3 col-sm-3"
                >
                  -
                </Button>
                <Label size="sm" className="text-center col-3 col-sm-3">
                  {botsT}
                </Label>
                <Button
                  disabled={botsT < maxBot ? false : true}
                  onClick={() => setBotsT(botsT + 1)}
                  size="sm"
                  className="col-3 col-sm-3"
                >
                  +
                </Button>
              </span>
              <ButtonGroup size="sm" className="mb-2">
                <Button
                  disabled={botLevelDisabled}
                  active={
                    !botLevelDisabled && botLevel === "normal" ? true : false
                  }
                  onClick={() => setBotLevel("normal")}
                >
                  Normal
                </Button>
                <Button
                  disabled={botLevelDisabled}
                  active={
                    !botLevelDisabled && botLevel === "hard" ? true : false
                  }
                  onClick={() => setBotLevel("hard")}
                >
                  Hard
                </Button>
                <Button
                  disabled={botLevelDisabled}
                  active={
                    !botLevelDisabled && botLevel === "expert" ? true : false
                  }
                  onClick={() => setBotLevel("expert")}
                >
                  Expert
                </Button>
              </ButtonGroup>
            </Col>
          </FormGroup>

          <Button disabled={applyDisabled} className="w-100" onClick={() => setShowModal(true)}>
            Apply config
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default ServerExtraConfig;
