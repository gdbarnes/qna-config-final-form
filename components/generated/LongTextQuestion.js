import React from "react";
import { Field } from "react-final-form";
import { TextArea, FormGroup, HintText } from "govuk-react";

export default ({ question, questionIndex }) => (
  <FormGroup>
    <Field
      name={question.key}
      component={TextArea}
      placeholder={question.placeholder}
      hint={question.hint}
    >
      {question.text}
    </Field>
  </FormGroup>
);
