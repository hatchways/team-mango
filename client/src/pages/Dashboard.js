import React, { useContext} from "react";
import Navbar from "./navbar";
import {UserContext}from '../contexts/UserContext'
import { Redirect } from "react-router-dom";

function Dashboard(props){
  
  const {user} = useContext(UserContext)
  let curUserName = null;
  if(user){
     curUserName = user.firstName + " " + user.lastName;
  }  

          return(   
                 
                 <div>
                 
                   <Navbar/>    
                   <h1> Dashboard Now</h1>
                   <pre>Here is firstName: {curUserName}</pre>
                   </div>
          
          )
      
    }
  
  

    export default (Dashboard);