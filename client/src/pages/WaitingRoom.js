import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Button,
  Box,
  IconButton,
  TextField,
  Avatar,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { withStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import copy from "copy-to-clipboard";

const waitingRoomStyle = (theme) => ({
  root: {
    backgroundColor: "#495074",
    height: "100vh",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  dialog: {
    padding: ".5rem 0% 4.5rem 5%",
    [theme.breakpoints.up("sm")]: {
      padding: ".5rem 10% 4.5rem 10%",
    },
  },
  title: {
    color: "#4545F5",
    fontWeight: "800",
    marginTop: "3rem",
    paddingBottom: "1rem",
  },
  participants: {
    color: "#4545F5",
    fontWeight: "800",
    marginTop: "1rem",
    paddingBottom: "1rem",
  },
  menu: {
    textAlign: "center",
  },
  button: {
    borderRadius: 35,
    margin: ".3rem 0rem 0rem 0rem",
    padding: ".7rem 2.5rem .7rem 2.5rem",
  },
  link: {
    fontWeight: "700",
    margin: ".5rem 0 .5rem 0",
  },
  linkField: {
    width: "65%",
    marginRight: "1rem",
    minWidth: "270px",
  },
  avatar: {
    margin: ".4rem",
  },
  firstName: {
    margin: "1rem 0 0 .3rem",
  },
});

const defaultProps = {
  bgcolor: "background.paper",
  m: 0,
  border: 1,
  style: {
    width: "80%",
    height: "7rem",
    marginBottom: "1rem",
    padding: "2.5rem 0 2.5rem 2.5rem",
  },
};

function WaitingRoom(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const [openRoom, setOpenRoom] = useState(true);
  const [fullUrlPath, setFullUrlPath] = useState("");
  const history = useHistory();

  useEffect(() => {
    setFullUrlPath(window.location.href);
  }, []);

  function handleStartButtonClick() {}

  const handleClose = () => {
    history.push("/dashboard");
    window.location.reload(false);
  };

  const shareClick = () => {
    copy(fullUrlPath);
  };

  const ItemList = () => {
    const participantsList = [
      {
        avatar:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
        firstName: "Peter",
      },
      {
        avatar:
          "https://cdn.shopify.com/s/files/1/0045/5104/9304/t/27/assets/AC_ECOM_SITE_2020_REFRESH_1_INDEX_M2_THUMBS-V2-1.jpg?v=8913815134086573859",
        firstName: "Matthew",
      },
    ];
    return participantsList.map((item, i) => {
      return (
        <Box key={i} display="flex" direction="row">
          <Avatar className={classes.avatar} src={item.avatar} />
          <Typography className={classes.firstName}>
            {item.firstName}
          </Typography>
        </Box>
      );
    });
  };

  const { classes } = props;

  return (
    <div className={classes.root}>
      <Dialog
        fullScreen={fullScreen}
        fullWidth={"true"}
        maxWidth={"md"}
        open={openRoom}
        aria-labelledby="max-width-dialog-title"
        onClose={handleClose}
      >
        <DialogContent className={classes.dialog}>
          <Typography className={classes.title} variant="h3">
            Waiting Room
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
            <Typography className={classes.link} variant="h6">
              Share link
            </Typography>
            <TextField
              className={classes.linkField}
              id="outlined-basic"
              label={fullUrlPath}
              variant="outlined"
              disabled
            />
            <Button
              variant="contained"
              className={classes.button}
              onClick={shareClick}
              color="primary"
            >
              COPY
            </Button>
            <Typography className={classes.participants} variant="h4">
              Participants
            </Typography>
            <Box borderColor="grey.500" {...defaultProps}>
              {ItemList()}
            </Box>
            <Button
              variant="contained"
              className={classes.button}
              onClick={handleStartButtonClick}
              color="primary"
            >
              {" "}
              START
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default withStyles(waitingRoomStyle)(WaitingRoom);
