import { Google } from "@mui/icons-material";
import { Button, ButtonProps, CircularProgress, Typography } from "@mui/material";

type Props = ButtonProps & {
  isLoading?: boolean;
};

export default function GoogleButton(props: Props) {
  const { isLoading = false } = props;
  return (
    <Button
      variant="contained"
      color="secondary"
      fullWidth
      {...props}
      disabled={isLoading}
      sx={{
        bgcolor: 'white',
        color: 'black',
        textTransform: 'none',
        ...props.sx
      }}
    >
      {isLoading
        ? <CircularProgress color='inherit' size="16px" />
        : <Google />
      }
      <Typography variant='body1' ml={1} py={1} textTransform="none" fontWeight="500">
        Continue with Google
      </Typography>
    </Button>
  )
}