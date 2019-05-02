import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  IconButton
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 10,
    padding: theme.spacing.unit,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    // color: theme.palette.grey[500],
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    lineHeight: '1.1em',
    paddingTop: 10,
    paddingBottom: 10
  }
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography className={classes.title}>{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose} color="primary">
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

export default DialogTitle;