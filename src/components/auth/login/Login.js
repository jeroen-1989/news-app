import React, {useState} from "react"
import {firebaseConfig} from "../../../firebase/firebase"
import {Link} from "react-router-dom"
import styles from "./Login.module.css"
import {useHistory} from "react-router-dom"

function Login() {
    const [loading, toggleLoading] = useState(false)
    const [error, setError] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState()
    const history = useHistory()

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

    if (user) {
        const path = "/"
        setTimeout(() => {
            history.push(path)
        }, 2000)
    }

    return <div className={styles.container}>

        <form className={styles.form}
              onSubmit={onSubmit}>

            <input className={styles.input}
                   onChange={e => setEmail(e.target.value)}
                   placeholder="Uw email ..."
                   type='email'
                   name='email'
                   value={email}/>
            <input className={styles.input}
                   onChange={e => setPassword(e.target.value)}
                   placeholder="Uw wachtwoord ..."
                   type='password'
                   name='password'
                   value={password}/>

            <button className={styles.button}
                    type='submit'>
                {loading ? 'Versturen...' : 'Login'}
            </button>

        </form>

        <p className={styles.register}>Heb je nog geen account?</p>
        <p className={styles.register}> Je kunt je <Link className={styles.registerLink} to="/register">hier</Link> registreren.</p>

        <Link className={styles.cancel} to="/">Annuleren</Link>

    </div>


}

export default Login

