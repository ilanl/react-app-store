import React, { Fragment } from "react";

const InputValidator = props => {
  let { errors, name, children } = props;

  return (
    <Fragment>
      {children}
      {errors && errors[name] ? (
        <div style={{ color: "red" }}>{errors[name]}</div>
      ) : null}
    </Fragment>
  );
};

export default InputValidator;
