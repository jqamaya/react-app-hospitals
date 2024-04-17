import { Box, TextField, TextFieldProps } from "@mui/material";
import React from "react";

type Props = TextFieldProps & {
  icon?: JSX.Element | React.ReactNode;
};

function InputField(props: Props) {
  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      {props.icon}
      <TextField
        {...props}
        sx={{
          '.MuiOutlinedInput-root': {
            bgcolor: '#333333',
          },
          ...!!props.icon && { ml: 1 },
          width: '100%',
          mb: 1,
          ...props.sx
        }}
      />
    </Box>
  );
};

export default InputField;
