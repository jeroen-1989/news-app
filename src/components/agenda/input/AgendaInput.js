import React, {useState} from "react"
import {firestore} from "../../../firebase/firebase"
import {useHistory, Link} from "react-router-dom"
import styles from "./AgendaInput.module.css"

const AgendaInput = () => {
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [event, setEvent] = useState("")
    const [location, setLocation] = useState("")
    const [toggleText, setToggleText] = useState("Verzenden")

    const sub = (e) => {
        e.preventDefault()

        firestore.collection("agenda")
            .add({
                Date: date,
                Event: event,
                Time: time,
                Location: location
            })
            .catch((error) => {
                console.log("Er is iets foutgegaan: ", error)
            });
    }

    const history = useHistory()
    const routeChange = () => {
        setTimeout(() => {
            history.push('/')
        }, 2000)
    }

    let today = new Date()
    const dd = String(today.getDate())
        .padStart(2, '0')
    const mm = String(today.getMonth() + 1)
        .padStart(2, '0')
    const yyyy = today.getFullYear()
    today = yyyy + '-' + mm + '-' + dd

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>Voeg uw agendapunt hieronder toe:</h2>
            <form className={styles.form}
                  onSubmit={(event) => {
                      sub(event)
                  }}>
                <input className={styles.input}
                       type="text"
                       placeholder="Typ hier uw event ..."
                       required
                       onChange={(e) => {
                           setEvent(e.target.value)
                       }}/>
                <input className={styles.input}
                       type="date"
                       min={today}
                       max="2022-12-31"
                       required
                       onChange={(e) => {
                           setDate(e.target.value)
                       }}/>
                <input className={styles.input}
                       type="time"
                       onChange={(e) => {
                           setTime(e.target.value)
                       }}/>
                <input className={styles.input}
                       placeholder="Typ hier de locatie van uw event ..."
                       required
                       onChange={(e) => {
                           setLocation(e.target.value)
                       }}/>
                <button className={styles.button}
                        type="submit"
                        onClick={() => {event && date && location ?
                            routeChange()
                            : setToggleText("Voer de vereiste velden in ...")
                        }}>
                    {toggleText}
                </button>
            </form>
            <Link className={styles.cancel}
                  to="/">
                Annuleren
            </Link>
        </div>
    )
}

export default AgendaInput