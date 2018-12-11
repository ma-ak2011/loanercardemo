import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export const ConfirmDialog = ({ isOpen, title, content,
                                  cancelButtonText, okButtonText, cancel, ok }) => {
    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={e => cancel(e)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">

                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={e => ok(e)} color="secondary" variant="contained">
                        {okButtonText}
                    </Button>
                    <Button onClick={e => cancel(e)} color="default" variant="contained" autoFocus>
                        {cancelButtonText}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};