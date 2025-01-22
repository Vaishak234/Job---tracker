import {  Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from 'prop-types';

const ModalContainer = ({ open, handleClose, title, children, actions }) => {

    
    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" >
            <DialogTitle sx={{display:'flex' ,alignItems:"center",justifyContent:"space-between",px:2 ,pt:1}}>
                <Typography variant="h6" fontWeight={'bold'} color="initial">{title}</Typography>
                <IconButton onClick={handleClose} style={{ float: 'right' }}>
                    <CloseIcon color="primary" />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ px: 2 }}>
                {children}
            </DialogContent>

            <DialogActions sx={{ px: 2 }}>
                {actions}
            </DialogActions>
        </Dialog>
    );
};

ModalContainer.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    actions: PropTypes.node,
};

export default ModalContainer

