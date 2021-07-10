import React from 'react'
import {auth} from "../../../firebase/firebase"
import styles from "./LogOut.module.css"

function LogOut() {
    const logUserOut = async (e) => {
        e.preventDefault();

        await auth.signOut().then(function () {
            console.log("Successfully signed out.")

        }).catch(function (error) {
        });
    }

    return (
            <button className={styles.button} onClick={logUserOut}><p className={styles.txt}>Logout</p></button>
    );

}

export default LogOut;