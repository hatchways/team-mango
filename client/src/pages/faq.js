import React, { useContext, Redirect } from "react";
import { UserContext } from "../contexts/UserContext";

function Faq(props) {
  const { user } = useContext(UserContext);

  console.log(user);
  if (user === null) {
    return <p>Loading profile...</p>;
  }
  return (
    <div>
      <h1> FAQ</h1>
      <pre>Here is Name:{user.firstName + " " + user.lastName}</pre>
    </div>
  );
}

export default Faq;
