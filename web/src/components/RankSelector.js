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
  return (
    <ButtonGroup>
      <Button
        onClick={() => setRankIndex(rankIndex - 1)}
        disabled={rankIndex <= 0}
      >
        {"<"}
      </Button>
      <UncontrolledButtonDropdown>
        <DropdownToggle caret>
          {rankList[rankIndex]}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </DropdownToggle>
        <DropdownMenu>
          {rankList.map((rank, index) => (
            <DropdownItem
              className={rankIndex === index ? "font-weight-bold" : ""}
              onClick={() => setRankIndex(index)}
            >
              {rank}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </UncontrolledButtonDropdown>

      <Button
        onClick={() => setRankIndex(rankIndex + 1)}
        disabled={rankIndex >= rankList.length - 1}
      >
        {">"}
      </Button>
    </ButtonGroup>
  );
};

export default RankSelector;
