import { createTheme } from '@mui/material/styles';

// Create a custom theme
const theme = createTheme({
    palette: {
        primary: {
            main: 'rgb(0, 0, 0)',
            light: 'rgb(229, 219, 219)',
        },
        secondary: {
            main: 'rgb(103, 58, 183)',
        },
        textColor:{
            main: 'rgba(0, 0, 0, 0.448)',
        }
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                '*': {
                    boxSizing: 'content-box', 
                    
                },
            },
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    marginBottom: '5px'
                }
            }
        },


    },
});

export default theme;
