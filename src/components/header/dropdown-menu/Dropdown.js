import React, {useContext, useState} from "react"
import {UserContext} from "../../../context/UserProvider"
import styles from "./Dropdown.module.css"
import {NavLink} from "react-router-dom"
import Login from "../../auth/login/Login"
import Register from "../../auth/register/Register"
import LogOut from "../../auth/logout/LogOut"

function Dropdown() {
    const user = useContext(UserContext)
    const [checked, setChecked] = useState(false)
    const handleClick = () => setChecked(!checked)
    const [showLogin, toggleShowLogin] = useState(false)
    const [register, toggleRegister] = useState(false)
    const handleClickTwo = () => toggleShowLogin(!showLogin)

    return (

        <main>
            {
                user ?
                    <nav>
                        <input
                            className={styles["menu-btn"]}
                            type="checkbox"
                            checked={checked}
                            onClick={handleClick}
                        />

                        <div className={styles["menu-icon"]}>
                            <span className={styles["nav-icon"]}/>
                        </div>

                        <ul className={styles.menu}>
                            <NavLink
                                onClick={handleClick}
                                className={styles["nav-link"]}
                                to="/">
                                <li>Home</li>
                            </NavLink>

                            <NavLink
                                onClick={handleClick}
                                className={styles["nav-link"]}
                                to="/add-story">
                                <li>Bericht toevoegen</li>
                            </NavLink>

                            <NavLink
                                onClick={handleClick}
                                className={styles["nav-link"]}
                                to="/add-main-story">
                                <li>Hoofdbericht toevoegen</li>
                            </NavLink>

                            <NavLink
                                onClick={handleClick}
                                className={styles["nav-link"]}
                                to="/agenda">
                                <li>Agendapunt toevoegen</li>
                            </NavLink>

                            <LogOut onClick={handleClickTwo}>Log out</LogOut>
                        </ul>
                    </nav>
                    :
                    <button
                        className={styles["login-btn"]}
                        onClick={() => toggleShowLogin(true)}>
                        {
                            register ?
                                <p>Registreren</p>
                                : <p>Login</p>
                        }
                    </button>
            }

            {
                !user && showLogin ?
                    <section className={styles["login-container"]}>
                        {
                            register ?
                                <>
                                    <Register/>
                                    <p onClick={() => toggleRegister(false)} className={styles["login-toggle"]}>
                                        Heb je al een account?<br/>Je kunt hier inloggen.
                                    </p>
                                </>
                                :
                                <>
                                    <Login/>
                                    <p onClick={() => toggleRegister(true)} className={styles["login-toggle"]}>
                                        Heb je nog geen account?<br/>Je kunt je hier registreren.
                                    </p>
                                </>
                        }
                        <p onClick={() => toggleShowLogin(false)} className={styles.cancel}>Annuleren ...</p>

                    </section> : undefined
            }
        </main>
    )
}

export default Dropdown