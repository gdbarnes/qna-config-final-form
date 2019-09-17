import { useState } from "react";
import { Field } from "react-final-form";
import { sortableElement } from "react-sortable-hoc";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import SortHandle from "./SortHandle";
import WhenFieldChanges from "./WhenFieldChanges";
import Select from "./Select";
import Textarea from "./Textarea";
import Answers from "./Answers";

const types = [
  {
    value: "text",
    label: "Text"
  },
  // {
  //   value: "longText",
  //   label: "Long answer"
  // },
  {
    value: "Textarea",
    label: "Long answer"
  },
  {
    value: "checkbox",
    label: "Checkbox"
  },
  // {
  //   value: "optionGroup",
  //   label: "Radio group"
  // },
  {
    value: "Radio",
    label: "Radio"
  },
  {
    value: "checklist",
    label: "Checkbox list"
  },
  {
    value: "dropdown",
    label: "Select"
  }
];

const hasOptions = type => {
  // console.log(Input);

  return ~["optionGroup", "Radio", "checklist", "dropdown"].indexOf(type);
};

const isText = type => ~["text", "longText"].indexOf(type);

const IfType = ({ name, children, predicate }) => (
  <Field name={`${name}.Input.Type`} subscription={{ value: true }}>
    {({ input: { value } }) => (predicate(value) ? children : null)}
  </Field>
);

const Question = sortableElement(({ name, removeQuestion }) => {
  const [open, setOpen] = useState(true);
  const toggleOpen = event => setOpen(!open);

  return (
    <div>
      <Container>
        <Handle>
          <SortHandle />
          <RemoveQuestionButton
            icon={faTrash}
            onClick={removeQuestion}
            width="0"
          />
        </Handle>
        {/* <Handle>
          <SortHandle />
        </Handle> */}
        {/* <Toggle
            title={open ? "Collapse" : "Expand"}
            name={open ? "chevron-down" : "chevron-right"}
            onClick={this.toggleOpen}
          /> */}
        <Row>
          <Field
            name={`${name}.QuestionId`}
            component="input"
            type="text"
            placeholder="Question ID"
          />
          <Field
            name={`${name}.Input.Type`}
            component={TypeSelector}
            options={types}
            isSearchable={false}
          />
          <WhenFieldChanges
            field={`${name}.Input.Type`}
            becomes="text"
            set={`${name}.Input.Options`}
            to={undefined}
          />
        </Row>
        <Row>
          <Field
            name={`${name}.Label`}
            component={Textarea}
            placeholder="Label"
          />
        </Row>
        <Row>
          <Field
            name={`${name}.Hint`}
            component={Textarea}
            placeholder="Hint text"
          />
        </Row>
        {open && (
          <>
            <IfType name={name} predicate={hasOptions}>
              <Answers name={name} />
            </IfType>
            {/* <IfType name={name} predicate={isText}>
              <Row>
                <Field
                  name={`${name}.placeholder`}
                  component={Textarea}
                  placeholder="Placeholder"
                />
              </Row>
            </IfType> */}
          </>
        )}
      </Container>
    </div>
  );
});

export default Question;

const Container = styled.div`
  position: relative;
  border: 1px solid #bdbdbd;
  background: #fff;
  border-radius: 3px;
  padding: 10px 10px 10px 40px;
  margin-bottom: 10px;
`;

const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;

  input,
  textarea {
    flex: 1;
    padding: 6px 9px;
    font-size: 1em;
    border: 1px solid #ccc;
    border-radius: 3px;
    &[disabled] {
      background: #eee;
    }
  }

  & > input {
    margin-bottom: 5px;
    padding: 9px;
  }
  & > textarea {
    min-height: 38px;
    line-height: 24px;
    margin-bottom: 5px;
    margin-right: 3px;
  }
`;

const TypeSelector = styled(Select)`
  margin: 0 5px 5px 5px;
  width: 150px;
`;

// const Toggle = styled(Icon)`
//   position: absolute;
//   top: -15px;
//   left: 5px;
//   width: 20px;
//   margin-right: 5px;
//   margin-top: 20px;
// `;

const Handle = styled.div`
  position: absolute;
  left: 10px;
  top: 10px;
  color: #666;
`;

const removeButtonSize = 16;
const RemoveQuestionButton = styled(FontAwesomeIcon)`
  color: #800;
  cursor: pointer;
  font-size: ${removeButtonSize}px;
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: ${removeButtonSize + 5}px;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;
