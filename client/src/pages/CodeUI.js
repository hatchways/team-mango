import React, { useContext, Redirect, useState, useEffect } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import {
  Grid,
  AppBar,
  Button,
  Paper,
  Box,
  Typography,
  Toolbar,
  Select,
  MenuItem,
} from "@material-ui/core/";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { withStyles } from "@material-ui/core/styles";
import { sizing } from "@material-ui/system";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import { theme } from "../themes/theme";
import socket from "../socket/socket";
require("codemirror/mode/xml/xml");
require("codemirror/mode/python/python");
require("codemirror/mode/clike/clike");
require("codemirror/mode/javascript/javascript");
const codeUIStyle = (theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    padding: "20px 30px 20px",
  },
  containerGrid: {
    marginTop: theme.spacing(-1),
  },
  itemGrid: {
    marginTop: theme.spacing(-0.5),
  },
  question: {
    padding: "5px 30px 0px",
    fontFamily: '"Open Sans", "Roboto"',
  },
  select: {
    marginBottom: "10px",
    color: "white",
    [theme.breakpoints.down("xs")]: {
      color: "black",
      "&:before": {
        borderColor: "black",
      },
      "&:after": {
        borderColor: "black",
      },
    },
    "&:before": {
      borderColor: "white",
    },
    "&:after": {
      borderColor: "white",
    },
  },
  icon: {
    fill: "white",
    [theme.breakpoints.down("xs")]: {
      fill: "black",
    },
  },
});
const qtitle = "Diagonal Difference";
const qdesc =
  "Given a square matrix, calculate the absolute difference between the sums of its diagonals. For example,  the square matrix <b> arr </b> is shown below:" +
  '<div style="margin-top: 10px; background-color:#E9FCFC; padding: 30px ">1 2 3<br/> 4 5 6<br/> 9 8 9 </div> <p>The left to right diagonal = <b> 1 + 5 + 9 + 15 </b>' +
  ". The right to left diagonal = <b> 3 + 5 + 9 = 17 </b>. Their absolute difference is <b> [ 15 - 17 ] = 2 </b> </br> </br> <b> Function description  </br></br></b> Complete the function" +
  "in the <i> <b> diagonalDifference </i> </b> editor below. It must return an interger representing the absolute diagnonal difference. diagonalDifference takes the " +
  "following parameter: arr. an array of integers.";
const premadeq = { title: qtitle, description: qdesc };
const interviewTitle = "Interview with John D";

function CodeUI(props) {
  const { user } = useContext(UserContext);
  const [code, setCode] = useState(null);
  const [question, setQuestion] = useState(" ");
  const [interview, setInterview] = useState(interviewTitle);
  const [runResult, setrunResult] = useState(null);
  const [inRoom, setInRoom] = useState(false);
  const history = useHistory();
  const [cursor, setCursor] = useState({ line: 0, ch: 0 });
  const [language, setLanguage] = useState("text/x-python");
  useEffect(() => {
    setQuestion(premadeq);
    handleInRoom();
    if (inRoom) {
      socket.emit(
        "joinCodeRoom",
        {
          id: props.match.params.id,
          name: user.firstName + " " + user.lastName,
          userId: user.id,
        },
        function (confimation) {
          if (!confimation) history.push("/dashboard");
        }
      );
    }
  }, [user]);

  useEffect(() => {
    socket.on("update_code", (info) => {
      setCode(info.code);
    });
    socket.on("toReview", (info) => {
      /*Route to review*/
      history.push("/dashboard");
    });
    socket.on("runResults", (res) => {
      console.log(res);
      setrunResult(res);
    });
  }, []);

  const handleInRoom = () => {
    inRoom ? setInRoom(false) : setInRoom(true);
  };

  const updateCode = (newCode) => {
    socket.emit("new_code", {
      id: props.match.params.id,
      name: user.firstName + " " + user.lastName,
      userId: user.id,
      code: newCode,
    });
  };
  async function runCode() {
    let runingCode = {
      code: code,
      language: language,
      id: props.match.params.id,
    };
    socket.emit("runCode", runingCode);
  }
  function endInterview() {
    fetch(`/interviews/endInterview/${props.match.params.id}`)
      .then((res) => socket.emit("endInterview", { id: props.match.params.id }))
      .catch((err) => console.log(err));
  }
  function saveCursor(pos) {
    setCursor(pos.to);
  }
  const changeLanguage = (lang) => {
    console.log(lang.target.value);
    setLanguage(lang.target.value);
  };

  const { classes } = props;
  return (
    <div className={classes.root}>
      <Grid container spacing={1} className={classes.containerGrid}>
        <Grid item xs={12}>
          <AppBar position="static" color="primary">
            <Toolbar variant="dense">
              <Typography color="white" variant="h6" style={{ flex: 1 }}>
                {interview}
              </Typography>

              <Button color="inherit" variant="outlined" onClick={endInterview}>
                End Interview
              </Button>
            </Toolbar>
          </AppBar>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5} className={classes.itemGrid}>
          <Paper style={{ height: "803px" }}>
            <Typography className={classes.title} color="primary" variant="h4">
              {question.title}
            </Typography>
            <div
              dangerouslySetInnerHTML={{ __html: question.description }}
              className={classes.question}
            ></div>
          </Paper>
        </Grid>

        <Grid
          item
          xs={12}
          sm={7}
          className={classes.itemGrid}
          style={{ marginTop: "-43px" }}
        >
          <Select
            value={language}
            onChange={changeLanguage}
            className={classes.select}
            inputProps={{
              classes: {
                icon: classes.icon,
              },
            }}
          >
            <MenuItem value={"text/x-python"}>Python</MenuItem>
            <MenuItem value={"text/x-java"}>Java</MenuItem>
            <MenuItem value={"text/javascript"}>Javascript</MenuItem>
            <MenuItem value={"text/x-csrc"}>C</MenuItem>
            <MenuItem value={"text/x-c++src"}>C++</MenuItem>
          </Select>
          <CodeMirror
            value={code}
            options={{
              mode: language,
              theme: "material",
              lineNumbers: true,
            }}
            cursor={cursor}
            onBeforeChange={(editor, data, value) => {
              updateCode(value);
              setCode(value);
            }}
            onChange={(editor, data, value) => {}}
            onCursor={(editor, data) => {}}
          />
          <Box bgcolor="#263238" height="200px">
            <AppBar position="static" color="primary">
              <Toolbar variant="dense">
                <Typography color="white" style={{ flex: 1 }}>
                  Console
                </Typography>
                <Button color="inherit" variant="outlined" onClick={runCode}>
                  Run Code
                </Button>
              </Toolbar>
            </AppBar>
            <Box color="white" p={3}>
              {runResult}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(codeUIStyle)(CodeUI);
