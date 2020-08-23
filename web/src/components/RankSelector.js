import React from "react";
import {
  Button,
  ButtonGroup,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown,
} from "reactstrap";

const RankSelector = ({ rankList, rankIndex, setRankIndex }) => {
  const buttonLeft = (
    <Button
      onClick={() => setRankIndex(rankIndex - 1)}
      disabled={rankIndex <= 0}
    >
      {"<"}
    </Button>
  );

  const Dropdown = (
    <UncontrolledButtonDropdown>
      <DropdownToggle caret>
        {rankList[rankIndex]}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </DropdownToggle>
      <DropdownMenu>
        {rankList.map((rank, index) => (
          <DropdownItem
            key={index}
            className={rankIndex === index ? "font-weight-bold" : ""}
            onClick={() => setRankIndex(index)}
          >
            {rank}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </UncontrolledButtonDropdown>
  );

  const buttonRight = (
    <Button
      onClick={() => setRankIndex(rankIndex + 1)}
      disabled={rankIndex >= rankList.length - 1}
    >
      {">"}
    </Button>
  );

  return [
    <ButtonGroup key={"long"} className="d-none d-sm-flex">
      {buttonLeft}
      {Dropdown}
      {buttonRight}
    </ButtonGroup>,
    <ButtonGroup key={"short"} className="d-flex d-sm-none">
      {Dropdown}
    </ButtonGroup>,
  ];
};

export default RankSelector;
