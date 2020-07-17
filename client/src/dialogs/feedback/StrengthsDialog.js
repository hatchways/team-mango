import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  QuestionTextAndNo,
  FeedbackBlueButton,
  FeedbackOutlinedButton,
  DialogCustomTextField,
} from "../../components/DialogCommonComponents";

const useStyles = makeStyles((theme) => ({
  dialogActions: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(8),
  },
}));

const StrengthsDialog = ({
  onClose,
  onPreviousQuestionClick,
  onNextQuestionClick,
}) => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(true);

  const handleClose = () => {
    setOpenDialog(false);
    onClose();
  };

  const onTextInputChange = (value) => {
    console.log(value);
  };

  const previousButtonClick = () => {
    onPreviousQuestionClick();
  };

  const nextButtonClick = () => {
    onNextQuestionClick();
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"md"}
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
          questionNo="3"
          questionText="What are some things this candidate did well (the more specific the better)"
        />
        <DialogCustomTextField onChange={onTextInputChange} />
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Grid container justify="center" spacing={2}>
          <Grid item>
            <FeedbackOutlinedButton
              text="Previous Question"
              clickEvent={previousButtonClick}
            />
          </Grid>
          <Grid item>
            <FeedbackBlueButton
              text="Next Question"
              clickEvent={nextButtonClick}
            />
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default StrengthsDialog;
