import { setConfig } from "actions/cloudFunctions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import {
  Button,
  Col,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

const ServerConfig = ({ setShowPopover }) => {
  useFirestoreConnect(() => [{ collection: "_config", doc: "maps" }]);
  const dispatch = useDispatch();
  const maps = useSelector(({ firestore: { data } }) => data._config.maps);

  const [gameType, setGameType] = useState("casual");
  const [map, setMap] = useState("Bank");
  const [bombGranade, setBombGranade] = useState(true);
  const [bombFlashbang, setBombFlashbang] = useState(true);
  const [bombMolotov, setBombMolotov] = useState(true);
  const [bombSmoke, setBombSmoke] = useState(true);
  const [friendlyFire, setFriendlyFire] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);

  const filteredMaps = Object.keys(maps || [])
    .filter(
      (mapId) =>
        maps[mapId].type === gameType ||
        (gameType === "casual" && maps[mapId].type === "demolition")
    )
    .sort((a, b) => ("" + maps[a].name).localeCompare(maps[b].name));

  useEffect(() => {
    if (filteredMaps.length > 0) {
      setMap(maps[filteredMaps[0]].name);
    }
  }, [gameType, filteredMaps, maps]);

  if (!maps) {
    return null;
  }

  const applyConfig = () => {
    setShowPopover(false);
    const mapId = Object.keys(maps).find((mapId) => maps[mapId].name === map);
    dispatch(
      setConfig({
        gameType,
        map: mapId,
        bombGranade,
        bombFlashbang,
        bombMolotov,
        bombSmoke,
        friendlyFire,
      })
    );
  };

  return (
    <div className="m-3">
      <Modal zIndex="9999" isOpen={showModal} toggle={toggleModal} backdrop={"static"}>
        <ModalHeader toggle={toggleModal}>Warning</ModalHeader>
        <ModalBody>
          This action will change the current map and restart the match. Be sure
          to agree this action with all your teammates.
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
      <Col>
        <FormGroup tag="fieldset" row>
          <Label className="font-weight-bold">Game type</Label>
          <Col className="ml-4 d-flex flex-column">
            <Label>
              <Input
                type="radio"
                name="radio0"
                checked={gameType === "casual"}
                onChange={(e) => {
                  if (e.target.value === "on") setGameType("casual");
                }}
              />{" "}
              Casual
            </Label>
            <Label>
              <Input
                type="radio"
                name="radio1"
                checked={gameType === "demolition"}
                onChange={(e) => {
                  if (e.target.value === "on") setGameType("demolition");
                }}
              />{" "}
              Demolition
            </Label>
            <Label>
              <Input
                type="radio"
                name="radio2"
                checked={gameType === "armrace"}
                onChange={(e) => {
                  if (e.target.value === "on") setGameType("armrace");
                }}
              />{" "}
              Armrace
            </Label>
          </Col>
        </FormGroup>
      </Col>
      <FormGroup>
        <Label className="font-weight-bold">Map</Label>
        <Col className="d-flex flex-column">
          <Input
            type="select"
            name="select"
            value={map}
            onChange={(e) => setMap(e.target.value)}
          >
            {filteredMaps.map((mapId) => (
              <option key={mapId}>{maps[mapId].name}</option>
            ))}
          </Input>
        </Col>
      </FormGroup>
      <FormGroup>
        <Label className="font-weight-bold">Random bombs</Label>
        <Col className="ml-4 d-flex flex-column">
          <Label>
            <Input
              type="checkbox"
              checked={bombGranade}
              onChange={(e) => setBombGranade(!bombGranade)}
            />{" "}
            Granade
          </Label>
          <Label>
            <Input
              type="checkbox"
              checked={bombFlashbang}
              onChange={(e) => setBombFlashbang(!bombFlashbang)}
            />{" "}
            Molotov
          </Label>
          <Label>
            <Input
              type="checkbox"
              checked={bombMolotov}
              onChange={(e) => setBombMolotov(!bombMolotov)}
            />{" "}
            Flashbang
          </Label>
          <Label>
            <Input
              type="checkbox"
              checked={bombSmoke}
              onChange={(e) => setBombSmoke(!bombSmoke)}
            />{" "}
            Smoke
          </Label>
        </Col>
      </FormGroup>
      <FormGroup>
        <Label className="font-weight-bold">Friendly Fire</Label>
        <Col className="ml-4 d-flex flex-column">
          <Label>
            <Input
              type="checkbox"
              checked={friendlyFire}
              onChange={(e) => setFriendlyFire(!friendlyFire)}
            />{" "}
            Friendly fire
          </Label>
        </Col>
      </FormGroup>

      <Button className="w-100" onClick={() => setShowModal(true)}>
        Apply config
      </Button>
    </div>
  );
};

export default ServerConfig;
