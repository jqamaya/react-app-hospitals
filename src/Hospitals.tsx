import {
  BaseSyntheticEvent,
  ChangeEvent,
  useCallback,
  useState,
} from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Add, Cached, Search } from "@mui/icons-material";

import PrimaryButton from "./components/PrimaryButton";
import InputField from "./components/InputField";
import { useHospital } from "./hooks/useHospital";
import HospitalsList from "./components/HospitalsList";
import CreateHospitalModal from "./components/CreateHospitalModal";
import useCheckMobileScreen from "./hooks/useCheckMobile";

export default function Hospitals() {
  const isMobile = useCheckMobileScreen();
  const { setFilteredHospitals, hospitals } = useHospital();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [id, setId] = useState('');

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  const handleSearch = useCallback((searchKeyword = keyword) => {
    if (searchKeyword) {
      const filtered = hospitals.filter(hospital => {
        const { name, id, country, status: hospitalStatus } = hospital;
        const lcKeyword = searchKeyword.toLowerCase();
        if (name.toLowerCase().includes(lcKeyword)) {
          return true;
        }
        if (id.toLowerCase().includes(lcKeyword)) {
          return true;
        }
        if (country?.toLowerCase().includes(lcKeyword)) {
          return true;
        }
        if (hospitalStatus?.toLowerCase().includes(lcKeyword)) {
          return true;
        }
        return false;
      });
      setFilteredHospitals(filtered);
    } else {
      setFilteredHospitals(hospitals);
    }
  }, [keyword, hospitals, setFilteredHospitals]);

  const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value = '' } = e.target;
    if (value) {
      setLocation(value);
      handleSearch(value);
    }
  };

  const handleIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value = '' } = e.target;
    if (value) {
      setId(value);
      handleSearch(value);
    }
  };

  const handleStatusChange = (e: BaseSyntheticEvent, s: 'active' | 'inactive') => {
    if (e.target.checked) {
      handleSearch(s);
    }
  };

  const handleReset = () => {
    setLocation('');
    setId('');
    setFilteredHospitals(hospitals);
  };

  const filters = (
    <Box
      display="flex"
      flexDirection="column"
      flex={1}
      ml={{ xs: 0, sm: 4 }}
      mt={{ xs: 2, sm: 12 }}
      mb={{ xs: 2, sm: 0 }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">
          Filter by
        </Typography>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<Cached />}
          onClick={handleReset}
        >
          Reset
        </Button>
      </Box>
      <InputField
        value={location}
        onChange={handleLocationChange}
        topLabel="By geographic location"
        placeholder="Search for a country, state or city(contains)"
        sx={{ mb: 4 }}
      />
      <InputField
        value={id}
        onChange={handleIdChange}
        topLabel="By ID"
        placeholder="Search by ID(contains)"
        sx={{ mb: 4 }}
      />
      <FormControl>
        <FormLabel>By status</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel
            value="active"
            control={<Radio />}
            label="Active"
            onChange={(e: React.BaseSyntheticEvent) => {
              handleStatusChange(e, 'active');
            }}
          />
          <FormControlLabel
            value="inactive"
            control={<Radio />}
            label="Inactive"
            onChange={(e: React.BaseSyntheticEvent) => {
              handleStatusChange(e, 'inactive');
            }}
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );

  return (
    <Box my={5} width={{ xs: '90%', sm: "60%" }}>
      <CreateHospitalModal
        isOpen={openCreateModal}
        handleClose={handleCloseCreateModal}
      />
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Typography variant="h4">
          Manage Hospitals
        </Typography>
        <PrimaryButton
          startIcon={<Add />}
          label="Create Hospital"
          sx={{
            py: { xs: 1, sm: 2 },
            maxHeight: 48,
          }}
          onClick={() => setOpenCreateModal(true)}
        />
      </Box>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
      >
        <Box display="flex" flexDirection="column" flex={2}>
          <InputField
            value={keyword}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
            placeholder="Search for a hospital, country or ID"
            sx={{ mt: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Box display="flex">
                    <Divider orientation="vertical" flexItem />
                    <IconButton sx={{ ml: 1 }} onClick={() => handleSearch()}>
                      <Search />
                    </IconButton>
                  </Box>
                </InputAdornment>
              )
            }}
          />
          {isMobile && filters}
          <HospitalsList />
        </Box>
        {!isMobile && filters}
      </Box>
    </Box>
  );
}
