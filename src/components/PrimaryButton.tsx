import { Box, Button, CircularProgress, Typography } from "@mui/material";

import { Props } from "../types/Button";

export default function PrimaryButton(props: Props) {
  const { isLoading = false, label } = props;
  return (
    <Button
      variant="contained"
      color="primary"
      {...props}
      disabled={isLoading}
      {...(isLoading && {
        startIcon: <CircularProgress color='inherit' size="16px" />
      })}
    >
      {label}
    </Button>
  )
}