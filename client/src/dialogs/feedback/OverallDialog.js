import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {Radio, RadioGroup, FormControl, FormControlLabel } from '@material-ui/core'; 
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    justifyContent:"flex-end"
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle className={classes.root} {...other}>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    heading: {
        fontSize: 30,
        fontWeight: 400,
        color: '#516bf6',
        marginBottom: theme.spacing(2)
    },
    subHeading: {
        fontSize: 16,
        fontWeight: 400,
        color: '#5e6676',
        fontStyle: 'italic',
        marginBottom: theme.spacing(4)
    },
    questionNoStart: {
        fontSize: 16,
        fontWeight: 600,
        color: '#516bf6',
    },
    questionNoEnd: {
        fontSize: 16,
        fontWeight: 600,
        color: '#5e6676',
    },
    question: {
        fontSize: 14,
        fontWeight: 600,
        color: '#5e6676',
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(2)
    },
    radioLine: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }
  }));

function OverallDialog(props) {
   const classes = useStyles();
    
  const handleClose = () => {
    props.onOverallClose();
  };

  return (
      <Dialog  fullWidth={true}
      maxWidth = {'sm'} onClose={handleClose} aria-labelledby="customized-dialog-title" open={props.open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        </DialogTitle>
        <DialogContent>
          <Typography className={classes.heading} align='center'>
            Give us your Feedback
          </Typography>
          <Typography gutterBottom className={classes.subHeading} align='center'>
            Please leave your comments here:
          </Typography>
          <Typography gutterBottom display='inline' className={classes.questionNoStart}>
            Question 1
          </Typography>
          <Typography gutterBottom display='inline' className={classes.questionNoEnd}>
          &#160;/&#160;6
          </Typography>
          <Typography gutterBottom className={classes.question}>
            Overall, how well did this person do in the interview?
          </Typography>
          <div display='inline' className={classes.radioLine}>
              <Typography>Terrible</Typography>
              <FormControl component="fieldset">
                <RadioGroup row aria-label="position" name="position" defaultValue="top">
                <FormControlLabel
                    value="top"
                    control={<Radio />}
                    label="1"
                    labelPlacement="top"
                    />
                    <FormControlLabel
                    value="top"
                    control={<Radio />}
                    label="2"
                    labelPlacement="top"
                    />
                    <FormControlLabel
                    value="top"
                    control={<Radio />}
                    label="3"
                    labelPlacement="top"
                    />
                    <FormControlLabel
                    value="top"
                    control={<Radio />}
                    label="1"
                    labelPlacement="top"
                    />
                    <FormControlLabel
                    value="top"
                    control={<Radio />}
                    label="2"
                    labelPlacement="top"
                    />
                    <FormControlLabel
                    value="top"
                    control={<Radio />}
                    label="3"
                    labelPlacement="top"
                    />
                    <FormControlLabel
                    value="top"
                    control={<Radio />}
                    label="1"
                    labelPlacement="top"
                    />
                    <FormControlLabel
                    value="top"
                    control={<Radio />}
                    label="2"
                    labelPlacement="top"
                    />
                    <FormControlLabel
                    value="top"
                    control={<Radio />}
                    label="3"
                    labelPlacement="top"
                    />
                </RadioGroup>
              </FormControl>
              <Typography>Perfect</Typography>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
  );
}

export default OverallDialog;