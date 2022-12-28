import { createTheme } from '@mui/material/styles';
import { BasicColor } from 'views/Color';

export const settingPage = createTheme({
  palette: {
    primary: {
      main: BasicColor.green,
      contrastText: '#ffffff',
      light: BasicColor.greenShadow,
      dark: BasicColor.greenShadow
    },
    secondary: {
      main: '#919699',
      contrastText: '#ffffff',
    },
  },
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {

        }
      }
    },
    MuiRadio: {
      styleOverrides: {

        root: {
          color: BasicColor.green,
          '& .MuiSvgIcon-root': {
            fontSize: 30,
          },
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          borderRadius: 15,
          minWidth: 150,
        },
        root: {
          textTransform: 'unset',
        },
        text: {
          color: BasicColor.blue,
          textDecoration: 'underline'
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: '100%',
          // borderColor: BasicColor.blue,
        },
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 15,
          ':focus': {
            outline: 0,
            border: 0,
          },

          '& fieldset': {
            borderColor: BasicColor.greenSoft,
          },
          ':hover fieldset': {
            borderColor: BasicColor.greenSoft
          },
        },
        input: {
          ':focus :valid': {
            outline: 0,
            border: 0
          },
        },
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          // borderColor:
        }
      }
    }
  }
});
