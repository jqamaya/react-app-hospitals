import { Box, Typography } from "@mui/material";

import { useAuth } from "./hooks/useAuth";

function Home() {
  const { user } = useAuth();

  return (
    <Box mt={5}>
      <Typography variant="h5" color="common.white">
        {`Welcome, ${user?.name}!`}
      </Typography>
    </Box>
  );
}

export default Home;
