import React, {createContext, useState} from "react"
import {auth} from "../firebase/firebase"

export const UserContext = createContext(null)

function UserProvider({children}) {
    const [user, setUser] = useState(null)

    auth.onAuthStateChanged(userAuth => {
            setUser(userAuth)
        }
    )

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider