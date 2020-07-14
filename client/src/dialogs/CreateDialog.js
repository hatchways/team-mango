import React, { useState, useContext } from "react";
import {
  Typography,
  Grid,
  Button,
  Box,
  FormControl,
  Select,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { withStyles } from "@material-ui/core/styles";
import { UserContext } from "../contexts/UserContext";
import { useTheme } from "@material-ui/core/styles";

const createDialogStyle = (theme) => ({
  root: {
    backgroundColor: "#495074",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  dialog: {
    padding: ".5rem 10% .5rem 10%",
    [theme.breakpoints.up("sm")]: {
      padding: ".5rem 16% .5rem 16%",
    },
  },
  title: {
    color: "#4545F5",
    fontWeight: "800",
    marginTop: "3rem",
    paddingBottom: "1rem",
  },
  menu: {
    textAlign: "center",
  },
  create: {
    borderRadius: 35,
    margin: "1rem 0rem 6rem 0rem",
    padding: ".7rem 2.5rem .7rem 2.5rem",
  },
  question: {
    margin: "2rem 0 .5rem 0",
  },
});
const difficultyEnum = ["Beginner", "Intermediate", "Advanced", "Expert"];

function CreateDialog(props) {
  const { user, setUser } = useContext(UserContext);
  const [difficulty, setDifficulty] = useState("Intermediate");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const handleCreateInterviewClick = () => {
    props.onCreateClick(difficulty);
  };

  const difficultyChange = (e) => {
    setDifficulty(e.target.value);
  };

  const handleClose = () => {
    props.onClose();
  };

  const ItemList = () => {
    return difficultyEnum.map((item, i) => {
      return (
        <MenuItem key={i} value={item}>
          {item}
        </MenuItem>
      );
    });
  };
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Dialog
        fullScreen={fullScreen}
        fullWidth={"true"}
        maxWidth={"sm"}
        open={props.open}
        aria-labelledby="max-width-dialog-title"
        onClose={handleClose}
      >
        <DialogContent className={classes.dialog}>
          <Typography className={classes.title} align="center" variant="h3">
            Create
          </Typography>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleClose}
            edge="start"
          >
            <CloseIcon />
          </IconButton>
          <Grid>
            <Typography className={classes.question}>Difficulty:</Typography>
            <FormControl variant="outlined" fullWidth>
              <Select
                className={classes.menu}
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={difficulty}
                onChange={difficultyChange}
              >
                {" "}
                {ItemList()}
              </Select>
            </FormControl>
            <Box display="flex" justifyContent="center" m={1} p={1}>
              <Button
                variant="contained"
                className={classes.create}
                onClick={handleCreateInterviewClick}
                color="primary"
              >
                {" "}
                CREATE
              </Button>
            </Box>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default withStyles(createDialogStyle)(CreateDialog);
