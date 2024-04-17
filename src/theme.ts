import { deepPurple } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: deepPurple[500],
    },
    secondary: {
      main: '#edf2ff',
    },
  },
});

export default theme;
