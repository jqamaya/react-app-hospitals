import {
  Box,
  Button,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ArrowForward,
  Edit,
  KeyboardArrowDown,
} from "@mui/icons-material";

import { useHospital } from "../hooks/useHospital"
import Hospital from "../types/Hospital";

export default function HospitalsList() {
  const { filteredHospitals = [] } = useHospital();
  const { palette: { grey } } = useTheme();

  return (
    <>
      {filteredHospitals.map((hospital: Hospital) => (
        <Box
          borderRadius={2}
          bgcolor={grey[800]}
          mt={2}
        >
          <Box display="flex" justifyContent="space-between" p={3}>
            <Box display="flex">
              <Box
                borderRadius={1}
                bgcolor={grey[900]}
                width="50px"
                height="50px"
              />
              <Box ml={2}>
                <Typography variant="h6" color="text.primary">
                  {hospital.name}
                </Typography>
                <Typography variant="h6" color="grey.500">
                  {`ID: ${hospital.id}`}
                </Typography>
              </Box>
            </Box>
            <Button startIcon={<Edit />} sx={{ p: 0 }}>
              Edit
            </Button>
          </Box>
          <Divider />
          <Box display="flex" justifyContent="space-between" p={3}>
            <Button endIcon={<KeyboardArrowDown />}>
              Show details
            </Button>
            <Button endIcon={<ArrowForward />}>
              Full Overview
            </Button>
          </Box>
        </Box>
      ))}
    </>
  )
}