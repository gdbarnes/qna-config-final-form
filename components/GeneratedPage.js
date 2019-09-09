import { Form, Field } from "react-final-form";
import styled from "styled-components";
import {
  asAnchor,
  asPaginationItem,
  BackLink,
  Breadcrumb,
  Button,
  Checkbox,
  DateInput,
  FormGroup,
  FileUpload,
  GridCol,
  GridRow,
  H1,
  Header,
  InputField,
  Layout,
  ListItem,
  ListNavigation,
  Main,
  MultiChoice,
  Pagination,
  PhaseBanner,
  Radio,
  SearchBox,
  Select,
  TextArea,
  UnorderedList
} from "govuk-react";

import TextQuestion from "./generated/TextQuestion";
import LongTextQuestion from "./generated/LongTextQuestion";
import CheckboxQuestion from "./generated/CheckboxQuestion";
import OptionGroupQuestion from "./generated/OptionGroupQuestion";
import DropdownQuestion from "./generated/DropdownQuestion";
import ChecklistQuestion from "./generated/ChecklistQuestion";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async values => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const components = {
  text: TextQuestion,
  longText: LongTextQuestion,
  checkbox: CheckboxQuestion,
  optionGroup: OptionGroupQuestion,
  checklist: ChecklistQuestion,
  dropdown: DropdownQuestion
};

const GeneratedPage = ({ schema }) => {
  const { Title, questions } = schema;
  const reset = event => event.preventDefault();
  return (
    <Container>
      <H1>{Title}</H1>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <Main>
              <GridRow>
                <GridCol>
                  {questions &&
                    questions
                      .filter(question => question.key && question.type)
                      .map((question, index) => {
                        const QuestionComponent = components[question.type];
                        return (
                          question.key && (
                            <QuestionComponent
                              key={index}
                              questionIndex={index}
                              question={question}
                            />
                          )
                        );
                      })}
                </GridCol>
              </GridRow>
              <GridRow>
                <GridCol>
                  <Button type="submit" disabled={submitting}>
                    Submit
                  </Button>
                </GridCol>
              </GridRow>
              <GridRow>
                <GridCol>
                  <Button onClick={reset} disabled={submitting || pristine}>
                    Reset
                  </Button>
                </GridCol>
              </GridRow>
              <GridRow>
                <GridCol>
                  <Dump>{JSON.stringify(values, 0, 2)}</Dump>
                </GridCol>
              </GridRow>
            </Main>
            {/* <Buttons>
                <Button
                  secondary
                  type="submit"
                  disabled={submitting || pristine}
                >
                  Submit
                </Button>
              </Buttons>
              <Dump>{JSON.stringify(values, 0, 2)}</Dump> */}
          </form>
        )}
      />
    </Container>
  );
};

export default GeneratedPage;

const Container = styled.div`
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 10px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
`;

const StyledQuestions = styled.div`
  display: flex;
  flex-flow: column nowrap;
  & > * {
    margin: 3px 2px;
    border-top: 1px solid #eee;
    padding: 5px;
    &:last-of-type {
      border-bottom: 1px solid #eee;
    }
  }
`;

const Dump = styled.pre`
  border: 1px solid #ccc;
  font-size: 0.8em;
  background: rgba(0, 0, 0, 0.1);
  box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.2);
  padding: 20px;
  overflow: auto;
`;
