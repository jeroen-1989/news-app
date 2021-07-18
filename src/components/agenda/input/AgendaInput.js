import React, {useState} from "react"
import {firestore} from "../../../firebase/firebase"
import {useHistory, Link} from "react-router-dom"
import styles from "./AgendaInput.module.css"
import Button from "../../helpers/button/Button"
import CancelButton from "../../helpers/cancel-button/CancelButton";

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
                console.log("Er is iets fout gegaan: ", error)
            });
    }

    const history = useHistory()
    const routeChange = () => {
        setTimeout(() => {
            history.push("/")
        }, 500)
    }

    const dd = String(new Date().getDate())
        .padStart(2, "0")
    const mm = String(new Date().getMonth() + 1)
        .padStart(2, "0")
    const yyyy = new Date().getFullYear()
    const today = yyyy + '-' + mm + '-' + dd

    return (
        <main className={styles.container}>
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
                <Button className={styles.button}
                        type="submit"
                        clickHandler={() => {event && date && location ?
                            routeChange()
                            : setToggleText("Voer de vereiste velden in ...")
                        }}>
                    {toggleText}
                </Button>
            </form>
            <CancelButton/>
        </main>
    )
}

export default AgendaInput