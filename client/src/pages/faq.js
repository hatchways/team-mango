import React, { useContext} from "react";
import {UserContext}from '../contexts/UserContext'


function Faq(props){
  
  const {user} = useContext(UserContext)
  if(user === null){
    return <p>Loading profile...</p>;
  }  return(   
                 
                 <div>
                 
                 
                   <h1> FAQ</h1>
                   <pre>Here is firstName:{ user.firstName + " " + user.lastName}</pre>
                   </div>
          
          )
      
    }
  
  

    export default (Faq);