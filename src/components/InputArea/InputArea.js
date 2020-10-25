import React from "react";
import { TextField } from "@material-ui/core";

const InputArea = (props) => {
  return (
    <TextField
      required
      variant="outlined"
      multiline
      rows="2"
      fullWidth
      label={props.label}
      value={props.value}
      onChange={(event) => props.setValue(event.target.value)}
    />
  );
};

export default InputArea;