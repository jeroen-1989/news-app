import React, {useState} from "react"
import {Link, useHistory} from "react-router-dom"
import {firebaseConfig} from "../../../firebase/firebase"
import styles from "./Register.module.css"

function Register() {

    const [loading, toggleLoading] = useState(false)
    const [error, setError] = useState("")
    const [registerSuccess, toggleRegisterSuccess] = useState(false)
    const history = useHistory()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState()

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

    if (user) {
        setTimeout(() => {
            history.push("/")
        }, 2000);
    }

    return <div className={styles.container}>

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

            <p className={styles.login}>Heb je al een account?</p>
            <p className={styles.login}>Je kunt je <Link className={styles.loginLink} to="/login">hier</Link> inloggen.</p>

            <Link className={styles.cancel} to="/">Annuleren</Link>

        </form>

    </div>
}

export default Register