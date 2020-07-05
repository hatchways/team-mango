import React, {Component, useContext, useEffect} from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import {NewUserContext} from '../App';
import {AppBar, Toolbar, Typography, IconButton, Tab, Tabs}   from '@material-ui/core/';
import {Link} from 'react-router-dom'
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

  const  {user} = useContext(UserContext)
  let curUserName = null;
  if(user ){
    
    curUserName = user.firstName + " " + user.lastName;
  }  




    
    return (
      <BrowserRouter>
<div>
      <AppBar position="static" elevation={0} color="white">
     
        <Toolbar>
          
          <Typography className="flex" type="title" color="inherit" variant="h6">
            Logo
          </Typography>
          <div>
          <Tabs style ={{marginRight: "20px"}}>
                <Tab label="Dashboard" to= '/dashboard' component={Link}  />
                <Tab label="FAQ" to= '/faq' component={Link}/>
                <Tab label="Blog" to ='/blog' component= {Link} />
          <IconButton color="contrast" >
          <AccountCircle/>
          </IconButton>
                

        </Tabs>
        
            
            
          </div>
          <Typography className="flex" type="userName" color="inherit" variant="h6">
          {curUserName}
                
               </Typography>



        </Toolbar>
      </AppBar>
      

  </div></BrowserRouter>

    )
  }




export default withStyles(styles)(Navbar);