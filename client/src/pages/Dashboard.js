import React, { useContext} from "react";
import Navbar from "./navbar";
import {UserContext}from '../contexts/UserContext'
import { Redirect } from "react-router-dom";

function Dashboard(props){
  
  const {user} = useContext(UserContext)
  if(user === null){
    return <p>Loading profile...</p>;
  }   return(   
                 
                 <div>
                 
                     
                   <h1> Dashboard Now</h1>
                   <pre>Here is firstName:  { user.firstName + " " + user.lastName}</pre>
                   </div>
          
          )
      
    }
  
  

    export default (Dashboard);