import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";

import { useLocation } from "react-router-dom";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  QuestionTextAndNo,
  FeedbackBlueButton,
} from "../../components/DialogCommonComponents";

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

const OverallDialog = ({ onClose, onNextQuestionClick }) => {
  const classes = useStyles();
  const location = useLocation();
  const [
    currentRadioButtonSelection,
    setCurrentRadioButtonSelection,
  ] = useState("");

  let openDialog = true;
  // const { pathname } = location;
  // if (
  //   pathname === "/dashboard/feedback/1" ||
  //   pathname === "/dashboard/feedback/1/"
  // )
  //   openDialog = true;

  const handleClose = () => {
    onClose();
  };

  const handleRadioButtonClick = (e) => {
    console.log(e.target.value);
    setCurrentRadioButtonSelection(e.target.value.toString());
  };

  const handleNextQuestionClick = () => {
    onNextQuestionClick();
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"sm"}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={openDialog}
    >
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
        <FeedbackBlueButton
          text="Next Question"
          clickEvent={handleNextQuestionClick}
        />
      </DialogActions>
    </Dialog>
  );
};

export default OverallDialog;
