import { Box, styled } from "@mui/material";


export const CustomScroll = styled(Box)(()=>({
    height:'calc(100vh - 72px)',
    overflowY: 'scroll', // Enable vertical scrollbar
    '&::-webkit-scrollbar': {
        width: 8, // Adjust scrollbar width
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#afacac', // Thumb color
        borderRadius: 4, // Round the corners
    },
    '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: '#737272', // Thumb color on hover
    },
    '&::-webkit-scrollbar-track': {
        backgroundColor: '#f1f1f1', // Track color
    },
}))