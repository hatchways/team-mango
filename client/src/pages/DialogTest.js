import React, { useState } from "react";
import OverallDialog from "../dialogs/feedback/OverallDialog";
import {Button} from '@material-ui/core';

function DialogTest(props) {
    const [openOverall, setopenOverall] = useState(true);

    function openOverallDialog() {
        setopenOverall(true);
    }

    function handleOvearllDialogClose(value) {
        setopenOverall(false);
    }

  return (<>
    <Button onClick={openOverallDialog} variant="outlined" color="primary">Overall Dialog</Button>
    <OverallDialog open={openOverall} onOverallClose={handleOvearllDialogClose}/>
  </>)
};

export default DialogTest;