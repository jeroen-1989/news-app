import {firestore} from "../../../firebase/firebase"
import React, {useState, useEffect, useContext} from "react"
import styles from "./Agenda.module.css"
import {CountContext} from "../../../context/TextsCountProvider";

function Agenda() {
    const [agenda, setAgenda] = useState([])
    const {agendaCount, setAgendaCount, showButton, setShowButton} = useContext(CountContext)
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
    }, [today])

    return (
        <main className={showButton ? `${styles.container} ${styles.small}` : styles.container}>
            <h2 className={styles.title}>Agenda</h2>
            <time className={styles.today}>{today.split("-").reverse().join("/")}</time>

            {
                agenda.slice(0, agendaCount).map((agenda) => (
                    <div key={agenda.Date} className={styles.agenda}>
                        <h4 className={styles.event}>{agenda.Event}</h4>
                        <p className={styles.content}>Datum: {agenda.Date.split("-").reverse().join("/")}</p>
                        <p className={styles.content}>Locatie: {agenda.Location}</p>
                        <p className={styles.content}>Aanvangstijd: {agenda.Time}</p>
                    </div>
                ))
            }

            {
                agendaCount === 2 &&
                <button onClick={() => {
                    loadMoreAgenda()
                    setShowButton(false)
                }}
                        className={styles[showButton ? "load-text" : "hidden"]
                        }>
                    Meer agendapunten laden ...
                </button>
            }
        </main>
    )
}


export default Agenda;