import { sortableHandle } from "react-sortable-hoc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const SortHandle = sortableHandle(() => (
  // <span>SortHandle</span>
  <FontAwesomeIcon
    icon={faBars}
    style={{ cursor: "move" }}
    onClick={e => e.stopPropagation()}
  />
));

export default SortHandle;
