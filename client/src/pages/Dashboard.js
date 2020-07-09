import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Button } from "@material-ui/core"; //for testing;
import CreateDialog from "./CreateDialog";

function Dashboard(props) {
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  if (user === null) {
    return <p>Loading profile...</p>;
  }
  return (
    <div>
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
      <CreateDialog open={open} />
    </div>
  );
}

export default Dashboard;
