import { ChangeEvent, useCallback, useState } from 'react';
import {
  Box,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

import TextField from './components/InputField';
import { Lock, Mail } from '@mui/icons-material';
import useGoogle from './hooks/useGoogle';
import GoogleButton from './components/GoogleButton';
import PrimaryButton from './components/PrimaryButton';

function Login() {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const {
    login,
    isLoading,
  } = useAuth();

  const [isGoogleLoading, setGoogleLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState({
    type: '',
    message: '',
  });

  const onSuccess = useCallback(() => {
    setGoogleLoading(false);
    navigate('/home');
  }, [navigate]);

  const onError = (err: string | object) => {
    console.log({err})
    setError({
      type: 'credentials',
      message: 'Invalid email or password.'
    });
  };

  const onGoogleError = useCallback((err: string | object) => {
    console.log({err})
    setGoogleLoading(false);
    setError({
      type: 'google',
      message: 'Error logging in with Google',
    });
  }, [setError]);

  const { googleLogin } = useGoogle({ onSuccess, onError: onGoogleError });

  const handleGoogleLogin = () => {
    setGoogleLoading(true);
    googleLogin();
  };

  const handleLogin = useCallback(() => {
    setEmailError('');
    setPasswordError('');
    setError({type: '', message: ''});

    if (!email) {
      setEmailError('Email is required');
    }
    if (!password) {
      setPasswordError('Password is required');
    }
    if (!email || !password) return;

    login({
      email,
      password,
      onSuccess,
      onError,
    });
  }, [email, password, login, onSuccess]);

  return (
    <div>
      <header className="App-header">
        <Stack
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          width="100%"
          height="100vh"
        >
          <Box style={{ flex: 1 }}>
            <Box
              component="img"
              src="https://picsum.photos/seed/picsum/700/900"
              width="100%"
              height={{ xs: '25vh', sm: "100vh" }}
              sx={{ objectFit: 'cover' }}
            />
          </Box>
          <Box
            display="flex"
            flex={1}
            flexDirection="column"
            justifyContent="center"
            maxWidth="300px"
            mx="20%"
          >
            <Typography variant='h4' mb={3} textAlign="left" fontWeight="600">
              Sign in via SSO
            </Typography>
            {!!error.message && error.type === 'google' && (
              <Typography
                variant='body2'
                color={palette.error.light}
                mb={1}
                ml={4}
              >
                {error.message}
              </Typography>
            )}
            <GoogleButton
              isLoading={isGoogleLoading}
              onClick={handleGoogleLogin}
            />

            <Box display="flex" alignItems="center" mt={3} mb={2} width="100%">
              <Box height="1px" bgcolor="text.disabled" flex={1} />
              <Typography variant="body1" sx={{ mx: 1 }}>or</Typography>
              <Box height="1px" bgcolor="text.disabled" flex={1} />
            </Box>

            <Typography color="text.disabled" mb={2}>
              Sign in with your Satori credentials
            </Typography>

            {!!error.message && error.type === 'credentials' && (
              <Typography
                variant='body2'
                color={palette.error.light}
                mb={1}
                ml={4}
              >
                {error.message}
              </Typography>
            )}
            <TextField
              placeholder='Email address'
              variant='outlined'
              icon={<Mail />}
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
              error={!!emailError}
              helperText={emailError}
            />
            <TextField
              type="password"
              placeholder='Password'
              icon={<Lock />}
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
              error={!!passwordError}
              helperText={passwordError}
            />
            <Box
              component="a"
              color="text.primary"
              alignSelf="end"
              fontSize="12px"
              fontWeight="bold"
              href='#'
              mr={2}
              mb={4}
              sx={{ textDecoration: 'none' }}
            >
              Forgot password?
            </Box>
            <PrimaryButton
              onClick={handleLogin}
              isLoading={isLoading}
              label={"Login with Satori Credentials"}
            />
          </Box>
        </Stack>
      </header>
    </div>
  );
}

export default Login;
