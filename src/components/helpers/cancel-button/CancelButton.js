import React from "react"
import {Link} from "react-router-dom"
import styles from "./CancelButton.module.css"

function Button() {
    return (
        <Link
            className={styles.cancel}
            to="/"
        >
            Annuleren
        </Link>
    )
}

export default Button