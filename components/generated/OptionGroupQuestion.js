import React from "react";
import { Field } from "react-final-form";
import { MultiChoice, Radio, Paragraph, FormGroup } from "govuk-react";
import PropTypes from "prop-types";

const RadioGroup = ({ label, hint, options, inline, input, meta }) => (
  <div>
    <MultiChoice label={label} hint={hint} meta={meta}>
      {options.map(option => {
        // props removed from example here https://github.com/penx/govuk-react-example/blob/master/src/App.js

        return (
          option && (
            <Radio
              key={option.value}
              {...input}
              value={option.value}
              inline={inline}
              checked={option.value === input.value}
            >
              {option.title}
            </Radio>
          )
        );
      })}
    </MultiChoice>
  </div>
);

RadioGroup.defaultProps = {
  input: {},
  meta: {},
  hint: undefined,
  inline: false,
  options: {}
};

RadioGroup.propTypes = {
  input: PropTypes.shape({}),
  meta: PropTypes.shape({}),
  label: PropTypes.string.isRequired,
  hint: PropTypes.string,
  inline: PropTypes.bool
  // options: PropTypes.shape({
  //   title: PropTypes.string,
  //   value: PropTypes.string
  // })
};

const OptionGroupQuestion = ({ question }) => (
  <FormGroup>
    {/* {console.log("question:", question)} */}
    {question.Input.Options && (
      <Field
        type="radio"
        name={question.QuestionId}
        label={question.Label}
        hint={question.Hint}
        component={RadioGroup}
        options={question.Input.Options.map(
          answer =>
            answer.Label &&
            answer.Value && { title: answer.Label, value: answer.Value }
        )}
      />
    )}
  </FormGroup>
);

export default OptionGroupQuestion;
