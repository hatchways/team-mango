import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Button, Grid } from "@material-ui/core"; //for testing;
import CreateDialog from "./CreateDialog";
import { withStyles } from "@material-ui/core/styles";

const dashboardStyle = (theme) => ({
  dashboard: {
    height: "100vh",
  }
});

function Dashboard(props) {
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  if (user === null) {
    return <p>Loading profile...</p>;
  }
  const { classes } = props;
  return (
    <div>
      <Grid className={classes.dashboard}>
      <h1> Dashboard Now</h1>
      <pre>Here is firstName: {user.firstName + " " + user.lastName}</pre>
      <Button
        variant="contained"
        onClick={() => {
          setOpen(true);
        }}
        color="primary"
      >
        {" "}
        CREATE
      </Button>
      </Grid>
      <CreateDialog open={open} setOpen={setOpen} history={props.history}/>
    </div>
  );
}

export default withStyles(dashboardStyle)(Dashboard);
