import { Button, styled } from "@mui/material";

export const GoogleButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#f6f0f0',
    padding: '10px 20px',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    '&:hover': {
        outline: `1px solid ${theme.palette.secondary.main}`,
    },
}));


export const CustomButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    padding: '10px'

}))


