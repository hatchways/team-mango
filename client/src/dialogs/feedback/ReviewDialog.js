import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableRow,
  Dialog,
  Typography,
} from "@material-ui/core";
import MuiTableCell from "@material-ui/core/TableCell";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  QuestionTextAndNo,
  FeedbackBlueButton,
  FeedbackOutlinedButton,
  CustomSnackbar,
} from "../../components/DialogCommonComponents";

const TableCell = withStyles({
  root: {
    borderBottom: "none",
    padding: 0,
  },
})(MuiTableCell);

const useStyles = makeStyles((theme) => ({
  grid: {
    justifyContent: "space-between",
  },
  tableRow: {
    margin: 0,
    paddingTop: 5,
    paddingBottom: 5,
    justify: "center",
  },
  dialogActions: {
    paddingBottom: theme.spacing(4),
  },
  radioHeading: {
    width: 50,
    fontSize: 13,
    fontWeight: 600,
    color: "#516bf6",
  },
  formControlLabel: {
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
}));

const ReviewDialog = ({
  onClose,
  onPreviousQuestionClick,
  onNextQuestionClick,
  match,
}) => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(true);
  const reviewOptions = [
    "needs improvement",
    "satisfactory",
    "good",
    "great",
    "excellent",
  ];

  const [
    communicationSkillsSelection,
    setCommunicationSkillsSelection,
  ] = useState("");
  const [codeEfficiencySelection, setCodeEfficiencySelection] = useState("");
  const [codeOrganizationSelection, setCodeOrganizationSelection] = useState(
    ""
  );
  const [speedSelection, setSpeedSelection] = useState("");
  const [debuggingSkillsSelection, setDebuggingSkillsSelection] = useState("");
  const [problemSolvingSelection, setProblemSolvingSelection] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarErrorText, setSnackbarErrorText] = useState("");
  const [snackBarSeverity, setSnackBarSeverity] = useState("error");

  useEffect(() => {
    fetch(`/interviews/feedback/${match.params.id}/given`)
      .then((result) => result.json())
      .then((result) => {
        if (result.review) {
          const review = result.review;
          if (review.communicationSkills) {
            setCommunicationSkillsSelection(review.communicationSkills);
          }
          if (review.codeEfficiency) {
            setCodeEfficiencySelection(review.codeEfficiency);
          }
          if (review.codeOrganization) {
            setCodeOrganizationSelection(review.codeEfficiency);
          }
          if (review.speed) {
            setSpeedSelection(review.speed);
          }
          if (review.debuggingSkills) {
            setDebuggingSkillsSelection(review.debuggingSkills);
          }
          if (review.problemSolvingSkills) {
            setProblemSolvingSelection(review.problemSolvingSkills);
          }
        }
      });
  }, [match.params.id]);

  const handleClose = () => {
    setOpenDialog(false);
    onClose();
  };

  const previousButtonClick = () => {
    onPreviousQuestionClick();
  };

  const nextButtonClick = () => {
    const allFilled =
      communicationSkillsSelection &&
      codeEfficiencySelection &&
      codeOrganizationSelection &&
      speedSelection &&
      debuggingSkillsSelection &&
      problemSolvingSelection;
    if (allFilled) {
      const postBody = {
        review: {
          communicationSkills: communicationSkillsSelection,
          codeEfficiency: codeEfficiencySelection,
          codeOrganization: codeOrganizationSelection,
          speed: speedSelection,
          debuggingSkills: debuggingSkillsSelection,
          problemSolvingSkills: problemSolvingSelection,
        },
      };
      fetch(`/interviews/feedback/${match.params.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postBody),
      })
        .then((result) => onNextQuestionClick())
        .catch((err) =>
          handleSnackbarOpen("An error occured. Please try again")
        );
    } else {
      handleSnackbarOpen("Please check all the fields");
    }
  };

  const communicationSkillsOnChange = (e) => {
    setCommunicationSkillsSelection(e.target.value.toString());
  };

  const codeEfficiencyOnChange = (e) => {
    setCodeEfficiencySelection(e.target.value.toString());
  };

  const codeOrganizationOnChange = (e) => {
    setCodeOrganizationSelection(e.target.value.toString());
  };

  const speedOnChange = (e) => {
    setSpeedSelection(e.target.value.toString());
  };

  const debuggingSkillsOnChange = (e) => {
    setDebuggingSkillsSelection(e.target.value.toString());
  };

  const problemSolvingOnChange = (e) => {
    setProblemSolvingSelection(e.target.value.toString());
  };

  const handleSnackbarOpen = (message, severity = "error") => {
    setSnackbarErrorText(message);
    setSnackBarSeverity("error");
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"md"}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={openDialog}
    >
      <CustomSnackbar
        open={openSnackbar}
        severity={snackBarSeverity}
        onClose={handleSnackbarClose}
      >
        {snackbarErrorText}
      </CustomSnackbar>
      <DialogTitle
        id="customized-dialog-title"
        onClose={handleClose}
      ></DialogTitle>
      <DialogContent>
        <QuestionTextAndNo
          questionNo="2"
          questionText="Submit a review of the candidates in the following categories:"
        />
        <Table style={{ width: 750 }}>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <Grid container className={classes.grid}>
                  <Grid item>
                    <Typography align="center" className={classes.radioHeading}>
                      Needs Improvement
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography align="center" className={classes.radioHeading}>
                      Satisfactory
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography align="center" className={classes.radioHeading}>
                      Good
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography align="center" className={classes.radioHeading}>
                      Great
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography align="center" className={classes.radioHeading}>
                      Excellent
                    </Typography>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="left">
                <Typography>Communication skills</Typography>
              </TableCell>
              <TableCell>
                <RadioGroup
                  row
                  aria-label="score"
                  name="communication"
                  value={communicationSkillsSelection.toString()}
                  className={classes.radioGroup}
                >
                  <Grid container className={classes.grid}>
                    <FormControlLabel
                      value={reviewOptions[0]}
                      className={classes.formControlLabel}
                      onClick={communicationSkillsOnChange}
                      control={
                        <Radio
                          className={classes.radioButton}
                          color="primary"
                        />
                      }
                    />
                    <FormControlLabel
                      value={reviewOptions[1]}
                      className={classes.formControlLabel}
                      onClick={communicationSkillsOnChange}
                      control={
                        <Radio
                          className={classes.radioButton}
                          color="primary"
                        />
                      }
                    />
                    <FormControlLabel
                      value={reviewOptions[2]}
                      className={classes.formControlLabel}
                      onClick={communicationSkillsOnChange}
                      control={
                        <Radio
                          className={classes.radioButton}
                          color="primary"
                        />
                      }
                    />
                    <FormControlLabel
                      value={reviewOptions[3]}
                      className={classes.formControlLabel}
                      onClick={communicationSkillsOnChange}
                      control={
                        <Radio
                          className={classes.radioButton}
                          color="primary"
                        />
                      }
                    />
                    <FormControlLabel
                      value={reviewOptions[4]}
                      className={classes.formControlLabel}
                      onClick={communicationSkillsOnChange}
                      control={
                        <Radio
                          className={classes.radioButton}
                          color="primary"
                        />
                      }
                    />
                  </Grid>
                </RadioGroup>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">
                <Typography>Code efficiency</Typography>
              </TableCell>
              <TableCell>
                <RadioGroup
                  row
                  aria-label="score"
                  name="codeEfficiency"
                  value={codeEfficiencySelection.toString()}
                  className={classes.radioGroup}
                >
                  <Grid container className={classes.grid}>
                    <FormControlLabel
                      value={reviewOptions[0]}
                      className={classes.formControlLabel}
                      onClick={codeEfficiencyOnChange}
                      control={
                        <Radio
                          className={classes.radioButton}
                          color="primary"
                        />
                      }
                    />
                    <FormControlLabel
                      value={reviewOptions[1]}
                      className={classes.formControlLabel}
                      onClick={codeEfficiencyOnChange}
                      control={
                        <Radio
                          className={classes.radioButton}
                          color="primary"
                        />
                      }
                    />
                    <FormControlLabel
                      value={reviewOptions[2]}
                      className={classes.formControlLabel}
                      onClick={codeEfficiencyOnChange}
                      control={
                        <Radio
                          className={classes.radioButton}
                          color="primary"
                        />
                      }
                    />
                    <FormControlLabel
                      value={reviewOptions[3]}
                      className={classes.formControlLabel}
                      onClick={codeEfficiencyOnChange}
                      control={
                        <Radio
                          className={classes.radioButton}
                          color="primary"
                        />
                      }
                    />
                    <FormControlLabel
                      value={reviewOptions[4]}
                      className={classes.formControlLabel}
                      onClick={codeEfficiencyOnChange}
                      control={
                        <Radio
                          className={classes.radioButton}
                          color="primary"
                        />
                      }
                    />
                  </Grid>
                </RadioGroup>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">
                <Typography>Code organization</Typography>
              </TableCell>
              <TableCell>
                <RadioGroup
                  row
                  aria-label="score"
                  name="codeOrganiszation"
                  value={codeOrganizationSelection.toString()}
                  className={classes.radioGroup}
                >
                  <Grid container className={classes.grid}>
                    <FormControlLabel
                      value={reviewOptions[0]}
                      className={classes.formControlLabel}
                      onClick={codeOrganizationOnChange}
                      control={
                        <Radio
                          className={classes.radioButton}
                          color="primary"
                        />
                      }
                    />
                    <FormControlLabel
                      value={reviewOptions[1]}
                      className={classes.formControlLabel}
                      onClick={codeOrganizationOnChange}
                      control={
                        <Radio
                          className={classes.radioButton}
                          color="primary"
                        />
                      }
                    />
                    <FormControlLabel
                      value={reviewOptions[2]}
                      className={classes.formControlLabel}
                      onClick={codeOrganizationOnChange}
                      control={
                        <Radio
                          className={classes.radioButton}
                          color="primary"
                        />
                      }
                    />
                    <FormControlLabel
                      value={reviewOptions[3]}
                      className={classes.formControlLabel}
                      onClick={codeOrganizationOnChange}
                      control={
                        <Radio
                          className={classes.radioButton}
                          color="primary"
                        />
                      }
                    />
                    <FormControlLabel
                      value={reviewOptions[4]}
                      className={classes.formControlLabel}
                      onClick={codeOrganizationOnChange}
                      control={
                        <Radio
                          className={classes.radioButton}
                          color="primary"
                        />
                      }
                    />
                  </Grid>
                </RadioGroup>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">
                <Typography>Speed</Typography>
              </TableCell>
              <TableCell>
                <RadioGroup
                  row
                  aria-label="score"
                  name="speed"
                  value={speedSelection.toString()}
                  className={classes.radioGroup}
                >
                  <Grid container className={classes.grid}>
                    <FormControlLabel
                      value={reviewOptions[0]}
                      className={classes.formControlLabel}
                      onClick={speedOnChange}
                      control={
                        <Radio
                          className={classes.radioButton}
                          color="primary"
                        />
                      }
                    />
                    <FormControlLabel
                      value={reviewOptions[1]}
                      className={classes.formControlLabel}
                      onClick={speedOnChange}
                      control={
                        <Radio
                          className={classes.radioButton}
                          color="primary"
                        />
                      }
                    />
                    <FormControlLabel
                      value={reviewOptions[2]}
                      className={classes.formControlLabel}
                      onClick={speedOnChange}
                      control={
                        <Radio
                          className={classes.radioButton}
                          color="primary"
                        />
                      }
                    />
                    <FormControlLabel
                      value={reviewOptions[3]}
                      className={classes.formControlLabel}
                      onClick={speedOnChange}
                      control={
                        <Radio
                          className={classes.radioButton}
                          color="primary"
                        />
                      }
                    />
                    <FormControlLabel
                      value={reviewOptions[4]}
                      className={classes.formControlLabel}
                      onClick={speedOnChange}
                      control={
                        <Radio
                          className={classes.radioButton}
                          color="primary"
                        />
                      }
                    />
                  </Grid>
                </RadioGroup>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">
                <Typography>Debugging skills</Typography>
              </TableCell>
              <TableCell>
                <RadioGroup
                  row
                  aria-label="score"
                  name="debugging"
                  value={debuggingSkillsSelection.toString()}
                  className={classes.radioGroup}
                >
                  <Grid container className={classes.grid}>
                    <FormControlLabel
                      value={reviewOptions[0]}
                      className={classes.formControlLabel}
                      onClick={debuggingSkillsOnChange}
                      control={
                        <Radio
                          className={classes.radioButton}
                          color="primary"
                        />
                      }
                    />
                    <FormControlLabel
                      value={reviewOptions[1]}
                      className={classes.formControlLabel}
                      onClick={debuggingSkillsOnChange}
                      control={
                        <Radio
                          className={classes.radioButton}
                          color="primary"
                        />
                      }
                    />
                    <FormControlLabel
                      value={reviewOptions[2]}
                      className={classes.formControlLabel}
                      onClick={debuggingSkillsOnChange}
                      control={
                        <Radio
                          className={classes.radioButton}
                          color="primary"
                        />
                      }
                    />
                    <FormControlLabel
                      value={reviewOptions[3]}
                      className={classes.formControlLabel}
                      onClick={debuggingSkillsOnChange}
                      control={
                        <Radio
                          className={classes.radioButton}
                          color="primary"
                        />
                      }
                    />
                    <FormControlLabel
                      value={reviewOptions[4]}
                      className={classes.formControlLabel}
                      onClick={debuggingSkillsOnChange}
                      control={
                        <Radio
                          className={classes.radioButton}
                          color="primary"
                        />
                      }
                    />
                  </Grid>
                </RadioGroup>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">
                <Typography>Problem solving skills</Typography>
              </TableCell>
              <TableCell>
                <RadioGroup
                  row
                  aria-label="score"
                  name="problemSolving"
                  value={problemSolvingSelection.toString()}
                  className={classes.radioGroup}
                >
                  <Grid container className={classes.grid}>
                    <FormControlLabel
                      value={reviewOptions[0]}
                      className={classes.formControlLabel}
                      onClick={problemSolvingOnChange}
                      control={
                        <Radio
                          className={classes.radioButton}
                          color="primary"
                        />
                      }
                    />
                    <FormControlLabel
                      value={reviewOptions[1]}
                      className={classes.formControlLabel}
                      onClick={problemSolvingOnChange}
                      control={
                        <Radio
                          className={classes.radioButton}
                          color="primary"
                        />
                      }
                    />
                    <FormControlLabel
                      value={reviewOptions[2]}
                      className={classes.formControlLabel}
                      onClick={problemSolvingOnChange}
                      control={
                        <Radio
                          className={classes.radioButton}
                          color="primary"
                        />
                      }
                    />
                    <FormControlLabel
                      value={reviewOptions[3]}
                      className={classes.formControlLabel}
                      onClick={problemSolvingOnChange}
                      control={
                        <Radio
                          className={classes.radioButton}
                          color="primary"
                        />
                      }
                    />
                    <FormControlLabel
                      value={reviewOptions[4]}
                      className={classes.formControlLabel}
                      onClick={problemSolvingOnChange}
                      control={
                        <Radio
                          className={classes.radioButton}
                          color="primary"
                        />
                      }
                    />
                  </Grid>
                </RadioGroup>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Grid container justify="center" spacing={2}>
          <Grid item>
            <FeedbackOutlinedButton onClick={() => previousButtonClick()}>
              Previous Question
            </FeedbackOutlinedButton>
          </Grid>
          <Grid item>
            <FeedbackBlueButton onClick={() => nextButtonClick()}>
              Next Question
            </FeedbackBlueButton>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewDialog;
