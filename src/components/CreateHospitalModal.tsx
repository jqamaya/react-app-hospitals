import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Typography,
  useTheme,
} from "@mui/material";
import { useHospital } from "../hooks/useHospital";
import InputField from "./InputField";
import React, { BaseSyntheticEvent, useCallback, useState } from "react";
import Hospital from "../types/Hospital";
import PrimaryButton from "./PrimaryButton";
import { Add } from "@mui/icons-material";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
}

type Data = {
  name: string;
  hospitalId: string;
  status: 'active' | 'inactive';
  acctManager: string;
  plan: string;
}

const testDynamicsAccounts = [
  {
    value: 'Test1',
    label: 'Test1',
  },
  {
    value: 'Test2',
    label: 'Test2',
  },
  {
    value: 'Test3',
    label: 'Test3',
  },
  {
    value: 'Test4',
    label: 'Test4',
  },
];

const plans = [
  {
    value: 'Plan1',
    label: 'Plan1',
  },
  {
    value: 'Plan2',
    label: 'Plan2',
  },
  {
    value: 'Plan3',
    label: 'Plan3',
  },
  {
    value: 'Plan4',
    label: 'Plan4',
  },
];

export default function CreateHospitalModal({isOpen, handleClose}: Props) {
  const { palette: { grey } } = useTheme();
  const { addHospital, isLoading } = useHospital();
  const [data, setData] = useState<Data>({
    name: '',
    hospitalId: '',
    status: 'inactive',
    acctManager: '',
    plan: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    hospitalId: '',
    status: '',
    acctManager: '',
    plan: '',
  });

  const resetValues = useCallback(() => {
    setData({
      name: '',
      hospitalId: '',
      status: 'inactive',
      acctManager: '',
      plan: '',
    });
  }, [setData]);

  const onSuccess = useCallback(() => {
    resetValues();
    handleClose();
  }, [handleClose, resetValues]);

  const handleAdd = useCallback(() => {
    const {
      name,
      hospitalId,
      status,
      acctManager,
      plan,
    } = data;
    const errObj = {
      name: '',
      hospitalId: '',
      status: '',
      acctManager: '',
      plan: '',
    };
    if (!name) {
      errObj.name = 'Hospital name is required.';
    }
    if (!hospitalId) {
      errObj.hospitalId = 'Hospital ID is required.';
    }
    if (!status) {
      errObj.status = 'Status is required.';
    }
    if (!acctManager) {
      errObj.acctManager = 'TestDynamics Account Manager is required.';
    }
    if (!plan) {
      errObj.plan = 'Plan is required.';
    }

    if (!name || !hospitalId || !status || !acctManager || !plan) {
      setErrors(errObj);
      return;
    }

    const hospital: Hospital = {
      name,
      id: hospitalId,
      status,
      testDynamicsManager: acctManager,
      plan,
    };
    addHospital(hospital, onSuccess);
  }, [
    setErrors,
    data,
    onSuccess,
    addHospital,
  ]);

  const handleAcctManagerChange = useCallback((e: SelectChangeEvent) => {
    const { value } = e.target;
    !!value && setData({ ...data, acctManager: value });
  }, [data]);

  const handleStatusChange = useCallback((e: BaseSyntheticEvent, status: 'active' | 'inactive') => {
    e.target.checked && setData({...data, status});
  }, [data]);

  const handlePlanChange = useCallback((e: SelectChangeEvent) => {
    const { value } = e.target;
    !!value && setData({ ...data, plan: value });
  }, [data]);

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '90%', sm: 400},
        bgcolor: grey[900],
        borderRadius: 2,
        boxShadow: 24,
        maxHeight: 500,
        py: 4,
        overflowY: 'auto',
      }}>
        <Divider />
        <Box px={4} mt={4}>
          <Typography variant="caption">
            STEP 1 OF 1
          </Typography>
          <Typography variant="h5" fontWeight={600} sx={{ mt: 3 }}>
            New hospital info
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Fill in the info of the Hospital. You can change this at any time by reaching the Hospital management page.
          </Typography>
          <Box borderRadius={2} bgcolor={grey[800]} mt={3}>
            <Box sx={{
              bgcolor: '#353535',
              display: 'flex',
              alignItems: 'center',
              padding: 3,
              borderTopRightRadius: 8,
              borderTopLeftRadius: 8,
            }}>
              <Add sx={{ color: 'text.primary', fontSize: 24 }} />
              <Typography sx={{ ml: 1, fontWeight: 700 }}>
                {data.name || 'New Hospital'}
              </Typography>
            </Box>
            <Box p={2}>
              <Box display="flex">
                <InputField
                  topLabel="Hospital name"
                  containerStyle={{ flex: 1 }}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  error={!!errors.name}
                  helperText={errors.name}
                />
                <InputField
                  topLabel="Hospital ID"
                  containerStyle={{ ml: 2, flex: 1 }}
                  onChange={(e) => setData({ ...data, hospitalId: e.target.value })}
                  error={!!errors.hospitalId}
                  helperText={errors.hospitalId}
                />
              </Box>
              <FormControl error={!!errors.status}>
                <FormLabel>Status</FormLabel>
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
              <Typography sx={{ mt: 2 }}>TestDynamics account manager</Typography>
              <Select
                sx={{ width: '100%', mt: 1 }}
                value={data.acctManager}
                displayEmpty
                renderValue={(selected: string) => {
                  if (selected?.length === 0) {
                    return "Select a TestDynamics account manager";
                  }
      
                  return selected;
                }}
                onChange={handleAcctManagerChange}
                error={!!errors.acctManager}
              >
                <MenuItem disabled value="">
                  Select a TestDynamics account manager
                </MenuItem>
                {testDynamicsAccounts.map(({value, label}) => (
                  <MenuItem value={value}>{label}</MenuItem>
                ))}
              </Select>
              <Typography sx={{ mt: 2 }}>Plan</Typography>
              <Select
                sx={{ width: '100%', mt: 1 }}
                value={data.plan}
                displayEmpty
                renderValue={(selected: string) => {
                  if (selected?.length === 0) {
                    return "Select a plan";
                  }
      
                  return selected;
                }}
                onChange={handlePlanChange}
                error={!!errors.plan}
              >
                <MenuItem disabled value="">
                  Select a plan
                </MenuItem>
                {plans.map(({value, label}) => (
                  <MenuItem value={value}>{label}</MenuItem>
                ))}
              </Select>
              <Button
                variant="outlined"
                color="secondary"
                sx={{ mt: 2 }}
              >
                Show more details
              </Button>
            </Box>
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClose}
              sx={{ mt: 2 }}
            >
              Cancel
            </Button>
            <PrimaryButton
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handleAdd}
              label="Add"
              isLoading={isLoading}
            />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
