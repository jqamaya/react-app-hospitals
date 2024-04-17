import { Box, Button, CircularProgress, Typography } from "@mui/material";

import { Props } from "../types/Button";

export default function PrimaryButton(props: Props) {
  const { isLoading = false, label } = props;
  return (
    <Button
      variant="contained"
      color="primary"
      {...props}
    >
      <Box display="flex" alignItems="center">
        {isLoading && <CircularProgress color='inherit' size="16px" />}
        <Typography variant='body1' ml={1} textTransform="none" py={1} fontWeight="500">
          {label}
        </Typography>
      </Box>
    </Button>
  )
}