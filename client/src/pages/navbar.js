import React, { useContext, useState } from "react";
import { withStyles } from "@material-ui/styles";
import { Redirect, useHistory, useLocation, Route } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tab,
  Tabs,
  Menu,
  MenuItem,
} from "@material-ui/core/";
import { Link as RouterLink } from "react-router-dom";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { UserContext } from "../contexts/UserContext";

import { theme } from "../themes/theme";

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    width: "100%",
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

function Navbar(props) {
  const history = useHistory();
  const [value, setValue] = React.useState(0);
  const { user } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [link, setLink] = React.useState(null);
  const logout = async (event) => {
    let res = await fetch("/logout");
    window.location.href = "/login";
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  if (user === null) {
    return <></>;
  } else if (user === "failed to fetch") {
    console.log("navbar failed to fetch");
    console.log(window.location.href);
    let destination = window.location.href;
    history.push({
      pathname: "/login",
      state: { destinationPath: destination },
    });
    window.location.href = "localhost:3000/login";
  } else if (!user.backgroundCompleted) {
    return <Redirect to="/background" />;
  }

  return (
    <AppBar position="static" color="white" width="100%">
      <Toolbar>
        <Typography
          style={{ flex: 1 }}
          type="title"
          color="inherit"
          variant="h6"
        >
          Logo
        </Typography>
        <div>
          <Tabs value={value} indicatorColor="primary" textColor="primary">
            <Tab
              label="Dashboard"
              to="/dashboard"
              component={RouterLink}
              onClick={() => {
                setValue(0);
              }}
            />
            <Tab
              label="FAQ"
              to="/faq"
              component={RouterLink}
              onClick={() => {
                setValue(1);
              }}
            />
            <Tab
              label="Blog"
              to="/blog"
              component={RouterLink}
              onClick={() => {
                setValue(2);
              }}
            />
            <IconButton color="contrast" onClick={handleMenu}>
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </Tabs>
        </div>
        <Typography type="userName" color="inherit" variant="h6">
          {user.firstName + " " + user.lastName}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(styles)(Navbar);
