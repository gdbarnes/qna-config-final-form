import { Field } from "react-final-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { sortableElement } from "react-sortable-hoc";
import SortHandle from "./SortHandle";
import Textarea from "./Textarea";

const Answer = sortableElement(({ name, remove }) => (
  <Container>
    <Handle>
      <SortHandle />
    </Handle>
    <Rows>
      <Row>
        <Field
          name={`${name}.value`}
          component="input"
          type="text"
          placeholder="Value"
        />
      </Row>
      <Row>
        <Field name={`${name}.text`} component={Textarea} placeholder="Label" />
      </Row>
    </Rows>
    <RemoveButton icon={faTrash} onClick={remove} />
  </Container>
));

export default Answer;

const removeButtonSize = 16;
const RemoveButton = styled(FontAwesomeIcon)`
  color: #800;
  cursor: pointer;
  font-size: ${removeButtonSize}px;
  position: absolute;
  right: 5px;
  top: 50%;
  margin-top: ${removeButtonSize / -2}px;
  opacity: 0.4;
`;

const Container = styled.div`
  margin: 5px 0;
  position: relative;
  padding-right: 30px;
  &:hover {
    ${RemoveButton} {
      opacity: 1;
    }
  }
`;

const Rows = styled.div`
  /* border: 1px solid #ddd; */
  /* border-radius: 3px; */
  /* box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3); */

  input,
  textarea {
    flex: 1;
    padding: 6px 9px;
    font-size: 1em;
    border: 1px solid #ccc;
    border-radius: 3px;
    min-height: 38px;
    line-height: 24px;
    margin-left: 0;
    margin-bottom: 4px;
    &[disabled] {
      background: #eee;
    }
  }
`;

const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

const Handle = styled.div`
  position: absolute;
  left: -25px;
  top: 50%;
  margin-top: -8px;
  color: #666;
`;
