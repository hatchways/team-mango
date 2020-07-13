import React, { useState } from "react";
import OverallDialog from "../dialogs/feedback/OverallDialog";
import { Button } from "@material-ui/core";

import { useHistory } from "react-router-dom";

function DialogTest(props) {
  const [openOverall, setopenOverall] = useState(false);
  const history = useHistory();

  function openOverallDialog() {
    history.push("/test/1");
  }

  function handleOvearllDialogClose(value) {
    history.push("/test");
  }

  return (
    <>
      <Button onClick={openOverallDialog} variant="outlined" color="primary">
        Overall Dialog
      </Button>
      <OverallDialog
        open={openOverall}
        onOverallClose={handleOvearllDialogClose}
      />
    </>
  );
}

export default DialogTest;
