import React, {useContext, useState} from "react"
import {UserContext} from "../../../context/UserProvider"
import styles from "./Dropdown.module.css"
import {NavLink} from "react-router-dom"
import LogOut from "../../auth/logout/LogOut"
import {auth} from "../../../firebase/firebase"

function Dropdown() {
    const user = useContext(UserContext)
    const [checked, setChecked] = useState(false)
    const handleClick = () => setChecked (!checked)

user && console.log(auth.currentUser.email);


    return (
        <div className={styles.container}>
            {user && <nav>
                    <input className={styles["menu-btn"]} type="checkbox" checked={checked} onClick={handleClick}/>
                    <label className={styles["menu-icon"]}>
                        <span className={styles.navicon}/>
                    </label>

                    <ul className={styles.menu}>
                        <NavLink onClick={handleClick} className={styles.navlink} to="/">
                            <li>Home</li>
                        </NavLink>
                        <NavLink onClick={handleClick} className={styles.navlink} to="/add-story">
                            <li>Bericht toevoegen</li>
                        </NavLink>
                        <NavLink onClick={handleClick} className={styles.navlink} to="/add-main-story">
                            <li>Hoofdbericht toevoegen</li>
                        </NavLink>
                        <NavLink onClick={handleClick} className={styles.navlink} to="/agenda">
                            <li>Agendapunt toevoegen</li>
                        </NavLink>
                        <LogOut onClick={handleClick}>Log out</LogOut>
                    </ul>
                </nav>}

            {!user && <NavLink className={styles.login} to="/login">
                    Login
                </NavLink>}
        </div>
    );
}

export default Dropdown