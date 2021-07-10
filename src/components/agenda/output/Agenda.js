import { firestore } from "../../../firebase/firebase"
import React, { useState, useEffect } from "react"
import styles from "./Agenda.module.css"

function Agenda(){
    const [agenda, setAgenda] = useState([])
    let today = new Date()
    const dd = String(today.getDate())
        .padStart(2, "0")
    const mm = String(today.getMonth() + 1)
        .padStart(2, "0")
    const yyyy = today.getFullYear()
    today = yyyy + "-" + mm + "-" + dd

    const fetchData = () => {
        firestore.collection("agenda")
            .orderBy("Date", "asc")
            .where("Date", ">=", today)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach(element => {
                    const data = element.data()
                    setAgenda(arr => [...arr , data])
                })
            })
    }

    useEffect(() => {
        fetchData()
    },[]) //eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Agenda</h2>
            <p className={styles.today}>{today.split('-').reverse().join('/')}</p>
            {
                agenda.map((agenda) => (
                    <AgendaFrame event={agenda.Event}
                           date={agenda.Date.split('-').reverse().join('/')}
                           location={agenda.Location}
                           time={agenda.Time}/>
                ))
            }
        </div>
    )
}


const AgendaFrame = ({event, date, location, time}) => {
    return (
        <div className={styles.agenda}>
            <h4 className={styles.event}>{event}</h4>
            <p className={styles.content}>Datum: {date}</p>
            <p className={styles.content}>Locatie: {location}</p>
            <p className={styles.content}>Aanvangstijd: {time}</p>
        </div>
    )
}

export default Agenda;