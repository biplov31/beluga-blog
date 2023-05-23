// the information about the logged in user should not be stored in the Header component, but rather in a context
import { createContext, useState } from "react"

export const UserContext = createContext({});

export function UserContextProvider({children}) {
  const [userInfo, setUserInfo] = useState({});
  return (
    <UserContext.Provider value={{userInfo, setUserInfo}}>
      {children}
    </UserContext.Provider>
  )
}
