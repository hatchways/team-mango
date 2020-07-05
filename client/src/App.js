import React, {useState, useMemo, useEffect} from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import { Redirect } from "react-router";
import Navbar from "./pages/navbar"
import { theme } from "./themes/theme";
//import LandingPage from "./pages/Landing";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Background from "./pages/Background";
import Dashboard from "./pages/Dashboard"
import Faq from "./pages/faq";
import "./App.css";
import { UserContext } from "./contexts/UserContext";
import Blog from './pages/Blog';



function App() {
  const [user, setUser] = useState(null);

  const value = useMemo(
    () => ({
      user: user,
      setUser: setUser,
      
    }),
    [user, setUser]
  );




  useEffect(() => {
    async function getUser() {
      fetch("/auth/verify").then(response => response.json()).then((data) => {let user = data; setUser(user);},
          (error) => { let user = {}; setUser(user) })}
    getUser();
  
  },[]);
  

  return (
    <UserContext.Provider value={value}>
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route exact path="/" render={() => <Redirect to="/signup" />} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/background" component={Background} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/faq" component={Faq} />
        <Route path="/blog" component={Blog}/>
      </BrowserRouter>
    </MuiThemeProvider>
    </UserContext.Provider>
  );
}

export default App;

/* */