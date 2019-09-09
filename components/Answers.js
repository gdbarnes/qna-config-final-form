import { FieldArray } from "react-final-form-arrays";
import styled from "styled-components";

import Answer from "./Answer";
import SortableList from "./SortableList";

const Answers = ({ name }) => (
  <Container>
    <FieldArray name={`${name}.answers`}>
      {({ fields }) => (
        <>
          {/* {console.log({ fields })} */}
          <SortableList
            lockAxis="y"
            useDragHandle
            onSortEnd={({ oldIndex, newIndex }) =>
              fields.move(oldIndex, newIndex)
            }
          >
            {fields.map((name, index) => (
              <Answer
                key={name}
                index={index}
                name={name}
                remove={() => fields.remove(index)}
              />
            ))}
          </SortableList>
          <Buttons>
            <button type="button" onClick={() => fields.push({})}>
              + Add Answer
            </button>
          </Buttons>
        </>
      )}
    </FieldArray>
  </Container>
);

export default Answers;

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin: 10px 0;
  padding-left: 20px;
`;

const Buttons = styled.div`
  padding: 10px 0;
  text-align: left;
`;
