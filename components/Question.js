import { useState } from "react";
import { Field } from "react-final-form";
import { sortableElement } from "react-sortable-hoc";
import styled from "styled-components";
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
  {
    value: "longText",
    label: "Long answer"
  },
  {
    value: "checkbox",
    label: "Checkbox"
  },
  {
    value: "optionGroup",
    label: "Radio group"
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

const hasOptions = type =>
  ~["optionGroup", "checklist", "dropdown"].indexOf(type);

const isText = type => ~["text", "longText"].indexOf(type);

const IfType = ({ name, children, predicate }) => (
  <Field name={`${name}.type`} subscription={{ value: true }}>
    {({ input: { value } }) => (predicate(value) ? children : null)}
  </Field>
);

const Question = sortableElement(({ name }) => {
  const [open, setOpen] = useState(true);
  const toggleOpen = event => setOpen(!open);

  return (
    <div>
      <Container>
        <Handle>
          <SortHandle />
        </Handle>
        {/* <Toggle
            title={open ? "Collapse" : "Expand"}
            name={open ? "chevron-down" : "chevron-right"}
            onClick={this.toggleOpen}
          /> */}
        <Row>
          <Field
            name={`${name}.key`}
            component="input"
            type="text"
            placeholder="Field Name"
          />
          <Field
            name={`${name}.type`}
            component={TypeSelector}
            options={types}
            isSearchable={false}
          />
          <WhenFieldChanges
            field={`${name}.type`}
            becomes="text"
            set={`${name}.answers`}
            to={undefined}
          />
        </Row>
        <Row>
          <Field
            name={`${name}.text`}
            component={Textarea}
            placeholder="Question"
          />
        </Row>
        <Row>
          <Field
            name={`${name}.hint`}
            component={Textarea}
            placeholder="Hint text"
          />
        </Row>
        {open && (
          <>
            <IfType name={name} predicate={hasOptions}>
              <Answers name={name} />
            </IfType>
            <IfType name={name} predicate={isText}>
              <Row>
                <Field
                  name={`${name}.placeholder`}
                  component={Textarea}
                  placeholder="Placeholder"
                />
              </Row>
            </IfType>
          </>
        )}
      </Container>
    </div>
  );
});

export default Question;

const Container = styled.div`
  position: relative;
  border: 2px solid #ddd;
  border-radius: 3px;
  padding: 10px 10px 10px 40px;
  /* box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3); */
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
    margin: 5px;
    padding: 9px;
  }
  & > textarea {
    min-height: 38px;
    line-height: 24px;
    margin: 5px;
    margin-right: 3px;
  }
`;

const TypeSelector = styled(Select)`
  margin: 5px;
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
