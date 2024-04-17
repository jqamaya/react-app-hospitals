import {
  Box,
  FormControl,
  FormLabel,
  SxProps,
  TextField,
  TextFieldProps,
} from "@mui/material";
import React from "react";

type Props = TextFieldProps & {
  icon?: JSX.Element | React.ReactNode;
  topLabel?: string;
  containerStyle?: SxProps;
};

function InputField(props: Props) {
  return (
    <FormControl sx={{ ...props.containerStyle }}>
      {!!props.topLabel && (
        <FormLabel sx={{ mb: 1 }}>
          {props.topLabel}
        </FormLabel>
      )}
      <Box display="flex" flexDirection="row" alignItems="center">
        {props.icon}
        <TextField
          {...props}
          sx={{
            '.MuiOutlinedInput-root': {
              bgcolor: '#333333',
            },
            '.MuiOutlinedInput-input': {
              padding: 1.25,
            },
            ...!!props.icon && { ml: 1 },
            width: '100%',
            mb: 1,
            '& legend': { display: 'none' },
            '& fieldset': { top: 0 },
            ...props.sx
          }}
        />
      </Box>
    </FormControl>
  );
};

export default InputField;
