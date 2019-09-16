import ReactSelect from "react-select";

export default ({ input, ...rest }) => {
  // console.log(input, rest);

  return (
    <ReactSelect
      {...input}
      {...rest}
      instanceId={input.name}
      onChange={option => input.onChange(option.value)}
      value={rest.options.find(option => option.value === input.value)}
    />
  );
};
