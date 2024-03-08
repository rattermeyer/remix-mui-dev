import { createTheme } from '@mui/material/styles';
import {themeOptions} from "~/mui/theme-options";



// Create a theme instance.
const theme = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                "a:has(button)": {
                    color: "inherit",
                    textDecoration: "none",
                }
            }
        }
    },
    ...themeOptions,
});

export default theme;
