import {firestore} from "../../../firebase/firebase"
import React, {useState, useEffect} from "react"
import styles from "./Agenda.module.css"

function Agenda() {
    const [agenda, setAgenda] = useState([])
    const [showButton, setShowButton] = useState(true)
    const [agendaCount, setAgendaCount] = useState(2)
    const loadMoreAgenda = () => {
        setAgendaCount(agenda.length)
    }

    const dd = String(new Date().getDate()).padStart(2, "0")
    const mm = String(new Date().getMonth() + 1).padStart(2, "0")
    const yyyy = new Date().getFullYear()
    const today = yyyy + "-" + mm + "-" + dd

    useEffect(() => {
        const fetchData = async () => {
            await firestore.collection("agenda")
                .orderBy("Date", "asc")
                .where("Date", ">=", today)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach(element => {
                        const data = element.data()
                        setAgenda(arr => [...arr, data])
                    })
                })
        }
        fetchData()
    }, [today] )

    return (
        <div className={showButton ? `${styles.container} ${styles.small}` : styles.container}>
            <h2 className={styles.title}>Agenda</h2>
            <p className={styles.today}>{today.split('-').reverse().join('/')}</p>
            {
                agenda.slice(0, agendaCount).map((agenda) => (
                    <div className={styles.agenda}>
                        <h4 className={styles.event}>{agenda.Event}</h4>
                        <p className={styles.content}>Datum: {agenda.Date.split("-").reverse().join("/")}</p>
                        <p className={styles.content}>Locatie: {agenda.Location}</p>
                        <p className={styles.content}>Aanvangstijd: {agenda.Time}</p>
                    </div>
                ))
            }
            <p onClick={() => {
                loadMoreAgenda()
                setShowButton(false)
            }}
               className={styles[showButton ? "load-text" : "hidden"]
               }>
                Meer agendapunten laden ...</p>

        </div>
    )
}


export default Agenda;