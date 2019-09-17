import { sortableHandle } from "react-sortable-hoc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const SortHandle = sortableHandle(() => (
  <SortButton icon={faSort} onClick={e => e.stopPropagation()} width="0" />
));

const SortButton = styled(FontAwesomeIcon)`
  cursor: pointer;
  font-size: 22px;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;

export default SortHandle;
