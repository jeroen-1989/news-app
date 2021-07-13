import React, {useState} from "react"
import {firebaseConfig} from "../../../firebase/firebase"
import styles from "./Register.module.css"

function Register() {

    const [loading, toggleLoading] = useState(false)
    const [error, setError] = useState("")
    const [registerSuccess, toggleRegisterSuccess] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [setUser] = useState()

    async function onSubmit(e) {

        setError("")
        toggleLoading(true)
        e.preventDefault()

        try {
            const result = await firebaseConfig
                .auth()
                .createUserWithEmailAndPassword(email, password)
            setUser(result.user)
            toggleRegisterSuccess(true)
        } catch (e) {
            setError(`Het registeren is mislukt. Probeer het opnieuw (${error.message})`)
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
                   required
                   value={email}/>
            <input className={styles.input}
                   onChange={e => setPassword(e.target.value)}
                   placeholder="Uw wachtwoord ..."
                   type="password"
                   name="password"
                   minlength="6"
                   required
                   value={password}/>

            <button className={styles.button}
                    type='submit'
                    disabled={loading}>
                {loading ? 'Versturen...' : 'Registreren'}
            </button>

            {
                registerSuccess &&
                <p className={styles.login}>Het registeren is gelukt. Je bent meteen ingelogd.</p>
            }

            {
                error &&
                <p className={styles.login}>{error}</p>
            }

        </form>
    )
}

export default Register