import React from "react";
import { Field } from "react-final-form";
import { InputField, FormGroup } from "govuk-react";

export default ({ question, questionIndex }) => (
  <FormGroup>
    <Field
      name={`${question.key}[${questionIndex}]`}
      component={InputField}
      placeholder={question.placeholder}
      hint={question.hint}
    >
      {question.text}
    </Field>
  </FormGroup>
);
