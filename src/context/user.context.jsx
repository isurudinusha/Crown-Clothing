import { createContext, useState } from "react";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null, // Change SetCurrentUser to setCurrentUser for naming convention
});

export const UserProvider = ({ children }) => {
  // Fix typo: change 'childern' to 'children'
  const [currentUser, setCurrentUser] = useState(null); // Change SetCurrentUser to setCurrentUser for naming convention
  const value = { currentUser, setCurrentUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>; // Fix typo: change 'childern' to 'children'
};
