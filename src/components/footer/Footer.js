import React from "react"
import styles from "./Footer.module.css"
import {ReactComponent as Facebook} from "../../images/footer/facebook.svg"
import {ReactComponent as Twitter} from "../../images/footer/twitter.svg"
import {ReactComponent as Mail} from "../../images/footer/mail.svg"

function Footer() {
    return (
        <footer className={styles.footer}>
            <p className={styles["footer-text"]}>
                Deze site wordt uitgegeven door MediaLokaal.
                Hoofdstraat 89, 5482HL, Schijndel.
            </p>
            <a href="https://facebook.com/medialokaal">
                <Facebook className={styles["footer-icon"]}/>
            </a>

            <a href="https://twitter.com/medialokaal">
                <Twitter className={styles["footer-icon"]}/>
            </a>

            <a href="mailto:info@medialokaal.nl">
                <Mail className={styles["footer-icon"]}/>
            </a>

        </footer>
    )
}

export default Footer