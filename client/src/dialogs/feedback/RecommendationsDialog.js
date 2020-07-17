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

const RecommendationsDialog = ({
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
          questionNo="5"
          questionText="Any recommendations on resources that can help the candidate improve"
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

export default RecommendationsDialog;
