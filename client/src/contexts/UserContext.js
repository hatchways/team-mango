/*
import { createContext, useContext } from "react";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}
*/


import React from "react";

const UserContext = React.createContext({ user: {} });

export { UserContext };