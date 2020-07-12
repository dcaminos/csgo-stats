import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const ModalSetTeams = ({ isOpen, toggle }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle} backdrop={"static"}>
      <ModalHeader toggle={toggle}>Warning</ModalHeader>
      <ModalBody>
        This action will change the current teams and restart the match. Be sure
        to agree this action with all your teammates.
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => alert("asd")}>
          Apply Teams
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalSetTeams;
