import React, {Component, useContext, useEffect, useState} from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import {NewUserContext} from '../App';
import {AppBar, Toolbar, Typography, IconButton, Tab, Tabs}   from '@material-ui/core/';
import {Link as RouterLink} from 'react-router-dom'
import FAQ from './faq';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {UserContext}from '../contexts/UserContext'
import { BrowserRouter, Route, Switch} from "react-router-dom";
import Dashboard from './Dashboard';
import Faq from './faq';
import Blog from './Blog';


const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit *3,
    width: '100%'
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
})




function Navbar (props) {
  const [value, setValue] = React.useState(0);
  const  {user} = useContext(UserContext);
  if(user === null){
    return <p>Loading profile...</p>;
  }  return (
  
      <AppBar position="static"  color="white" width="100%">
     
        <Toolbar>
          <Typography style={{ flex: 1 }} type="title" color="inherit" variant="h6">
            Logo
          </Typography>
          <div>
          <Tabs value={value}>
                <Tab label="Dashboard" to= '/dashboard' component={RouterLink} onClick={() => {setValue(0)}} />
                <Tab label="FAQ" to= '/faq' component={RouterLink} onClick={() => {setValue(1)}} />
                <Tab label="Blog" to ='/blog' component= {RouterLink} onClick={() => {setValue(2)}} />
          <IconButton color="contrast" >
          <AccountCircle/>
          </IconButton>
          </Tabs>
            </div>
          <Typography type="userName" color="inherit" variant="h6">
          { user.firstName + " " + user.lastName}
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }




export default withStyles(styles)(Navbar);