import React, {createContext, useState} from "react"

export const CountContext = createContext({})

function CountProvider({children}) {

    const [blogsCount, setBlogsCount] = useState(5)
    const [editorialCount, setEditorialCount] = useState(2)
    const [agendaCount, setAgendaCount] = useState(2)
    const [showButton, setShowButton] = useState(true)

    return (
        <CountContext.Provider value={
            {
                blogsCount, setBlogsCount,
                editorialCount, setEditorialCount,
                agendaCount, setAgendaCount,
                showButton, setShowButton
            }
        }>
            {children}
        </CountContext.Provider>
    )
}

export default CountProvider