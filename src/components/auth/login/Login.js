import React, {useContext, useState} from "react"
import {firebaseConfig} from "../../../firebase/firebase"
import styles from "./Login.module.css"
import {UserContext} from "../../../context/UserProvider"

function Login() {
    const [loading, toggleLoading] = useState(false)
    const [error, setError] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const setUser = useContext(UserContext)

    async function onSubmit(e) {

        setError("")
        toggleLoading(true)
        e.preventDefault()
        try {
            const result = await firebaseConfig
                .auth()
                .signInWithEmailAndPassword(email, password)
            setUser(result.user)
        } catch (e) {
            setError(`Het inloggen is mislukt. Probeer het opnieuw (${error.message})`)
        }
        toggleLoading(false)
    }

    return (

        <form className={styles.form}
              onSubmit={onSubmit}>

            <input className={styles.input}
                   onChange={e => setEmail(e.target.value)}
                   placeholder="Uw email ..."
                   type="email"
                   name="email"
                   value={email}/>
            <input className={styles.input}
                   onChange={e => setPassword(e.target.value)}
                   placeholder="Uw wachtwoord ..."
                   type="password"
                   name="password"
                   value={password}/>

            <button className={styles.button}
                    type="submit">
                {loading ? "Versturen..." : "Login"}
            </button>

        </form>

    )
}

export default Login

