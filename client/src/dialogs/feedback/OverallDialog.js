import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Snackbar,
  Dialog,
  Typography,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  QuestionTextAndNo,
  FeedbackBlueButton,
} from "../../components/DialogCommonComponents";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  radioLine: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  perfectTerrible: {
    fontSize: 13,
    fontWeight: 600,
    color: "#516bf6",
    marginTop: "auto",
    paddingBottom: 7,
  },
  formControlLabel: {
    padding: 0,
    margin: 0,
  },
  radioButton: {
    padding: 7,
    margin: 0,
  },
  dialogActions: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(8),
  },
}));

const OverallDialog = ({ onClose, onNextQuestionClick, match }) => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(true);
  const [openSaveErrorSnackbar, setOpenSaveErrorSnackbar] = useState(false);
  const [openPleaseFillSnackbar, setOpenPleaseFillSnackbar] = useState(false);
  const [
    currentRadioButtonSelection,
    setCurrentRadioButtonSelection,
  ] = useState("");

  useEffect(() => {
    fetch(`/interviews/feedback/${match.params.id}/given`)
      .then((result) => result.json())
      .then((result) => {
        if (result.overallScore) {
          setCurrentRadioButtonSelection(result.overallScore);
        }
      });
  }, [match.params.id]);

  const handleClose = () => {
    setOpenDialog(false);
    onClose();
  };

  const handleRadioButtonClick = (e) => {
    setCurrentRadioButtonSelection(e.target.value.toString());
  };

  const nextButtonClick = () => {
    if (currentRadioButtonSelection) {
      fetch(`/interviews/feedback/${match.params.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ overallScore: currentRadioButtonSelection }),
      })
        .then((result) => onNextQuestionClick())
        .catch((err) => setOpenSaveErrorSnackbar(true));
    } else {
      setOpenPleaseFillSnackbar(true);
    }
  };

  const handlePleaseFillSnackbarClose = () => {
    setOpenPleaseFillSnackbar(false);
  };

  const handleSaveErrorSnackbarClose = () => {
    setOpenSaveErrorSnackbar(false);
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"sm"}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={openDialog}
    >
      <Snackbar
        open={openPleaseFillSnackbar}
        autoHideDuration={6000}
        onClose={handlePleaseFillSnackbarClose}
      >
        <Alert onClose={handlePleaseFillSnackbarClose} severity="error">
          Please select a value
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSaveErrorSnackbar}
        autoHideDuration={6000}
        onClose={handleSaveErrorSnackbarClose}
      >
        <Alert onClose={handleSaveErrorSnackbarClose} severity="error">
          An error occured. Please try again
        </Alert>
      </Snackbar>
      <DialogTitle
        id="customized-dialog-title"
        onClose={handleClose}
      ></DialogTitle>
      <DialogContent>
        <QuestionTextAndNo
          questionNo="1"
          questionText="Overall, how well did this person do in the interview?"
        />
        <div display="inline" className={classes.radioLine}>
          <Typography className={classes.perfectTerrible}>Terrible</Typography>
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="score"
              name="question-1-score"
              value={currentRadioButtonSelection.toString()}
              className={classes.radioGroup}
            >
              <FormControlLabel
                value="1"
                className={classes.formControlLabel}
                onClick={handleRadioButtonClick}
                control={
                  <Radio className={classes.radioButton} color="primary" />
                }
                label="1"
                labelPlacement="top"
              />
              <FormControlLabel
                value="2"
                className={classes.formControlLabel}
                onClick={handleRadioButtonClick}
                control={
                  <Radio className={classes.radioButton} color="primary" />
                }
                label="2"
                labelPlacement="top"
              />
              <FormControlLabel
                value="3"
                className={classes.formControlLabel}
                onClick={handleRadioButtonClick}
                control={
                  <Radio className={classes.radioButton} color="primary" />
                }
                label="3"
                labelPlacement="top"
              />
              <FormControlLabel
                value="4"
                className={classes.formControlLabel}
                onClick={handleRadioButtonClick}
                control={
                  <Radio className={classes.radioButton} color="primary" />
                }
                label="4"
                labelPlacement="top"
              />
              <FormControlLabel
                value="5"
                className={classes.formControlLabel}
                onClick={handleRadioButtonClick}
                control={
                  <Radio className={classes.radioButton} color="primary" />
                }
                label="5"
                labelPlacement="top"
              />
              <FormControlLabel
                value="6"
                className={classes.formControlLabel}
                onClick={handleRadioButtonClick}
                control={
                  <Radio className={classes.radioButton} color="primary" />
                }
                label="6"
                labelPlacement="top"
              />
              <FormControlLabel
                value="7"
                className={classes.formControlLabel}
                onClick={handleRadioButtonClick}
                control={
                  <Radio className={classes.radioButton} color="primary" />
                }
                label="7"
                labelPlacement="top"
              />
              <FormControlLabel
                value="8"
                className={classes.formControlLabel}
                onClick={handleRadioButtonClick}
                control={
                  <Radio className={classes.radioButton} color="primary" />
                }
                label="8"
                labelPlacement="top"
              />
              <FormControlLabel
                value="9"
                className={classes.formControlLabel}
                onClick={handleRadioButtonClick}
                control={
                  <Radio className={classes.radioButton} color="primary" />
                }
                label="9"
                labelPlacement="top"
              />
              <FormControlLabel
                value="10"
                className={classes.formControlLabel}
                onClick={handleRadioButtonClick}
                control={
                  <Radio className={classes.radioButton} color="primary" />
                }
                label="10"
                labelPlacement="top"
              />
            </RadioGroup>
          </FormControl>
          <Typography className={classes.perfectTerrible}>Perfect</Typography>
        </div>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <FeedbackBlueButton onClick={() => nextButtonClick()}>
          Next Question
        </FeedbackBlueButton>
      </DialogActions>
    </Dialog>
  );
};

export default OverallDialog;
