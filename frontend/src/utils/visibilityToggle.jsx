import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";


export const visibilityToggle = (field,showPassword , handleClick) => {
    return (
        <InputAdornment position="end">
            <IconButton
                aria-label={`toggle ${field} visibility`}
                onClick={handleClick}
                edge="end"
            >
                {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
        </InputAdornment>
    );
};