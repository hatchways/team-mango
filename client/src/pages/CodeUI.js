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
} from "@material-ui/core/";
import { withStyles } from "@material-ui/core/styles";
import { sizing } from "@material-ui/system";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import { theme } from "../themes/theme";

require("codemirror/mode/xml/xml");
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
  const [code, setCode] = useState(null);
  const [question, setQuestion] = useState(" ");
  const [interview, setInterview] = useState(interviewTitle);
  const [runResult, setrunResult] = useState(null);
  useEffect(() => {
    setQuestion(premadeq);
  });
  const updateCode = (newCode) => {
    setCode(newCode);
  };
  async function runCode() {
    const res = await fetch("/code/runcode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: code }),
    }).then((result) => result.json());

    setrunResult(res);
  }

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
              <Button color="inherit" variant="outlined">
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

        <Grid item xs={12} sm={7} className={classes.itemGrid}>
          <CodeMirror
            value={code}
            options={{
              mode: "javascript",
              theme: "material",
              lineNumbers: true,
            }}
            onBeforeChange={(editor, data, value) => {
              updateCode(value);
            }}
            onChange={(editor, data, value) => {
              updateCode(value);
            }}
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
