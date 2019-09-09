import { FieldArray } from "react-final-form-arrays";
import styled from "styled-components";
import { sortableContainer } from "react-sortable-hoc";
import SortableList from "./SortableList";

import Question from "./Question";

const Questions = sortableContainer(() => {
  return (
    <Container>
      <FieldArray name="questions">
        {({ fields }) => (
          <>
            <SortableList
              lockAxis="y"
              useDragHandle
              onSortEnd={({ oldIndex, newIndex }) =>
                fields.move(oldIndex, newIndex)
              }
            >
              {fields.map((name, index) => {
                return <Question key={name} index={index} name={name} />;
              })}
            </SortableList>
            <Buttons>
              <button
                type="button"
                onClick={() => fields.push({ type: "text" })}
              >
                Add Question
              </button>
            </Buttons>
          </>
        )}
      </FieldArray>
    </Container>
  );
});

export default Questions;

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin: 20px 0;
`;

const Buttons = styled.div`
  padding: 10px 0;
  text-align: left;
`;
