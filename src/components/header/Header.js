import React from "react"
import styles from "./Header.module.css"
import markt from "../../images/markt.png"
import Dropdown from "./dropdown-menu/Dropdown"

function Header() {

    return (
        <header>

            <section className={styles["header-container"]}>
                <div className={styles["logo-container"]}>
                    <h1 className={styles.logo}>Media</h1>
                    <h1 className={styles.lokaal}>Lokaal.</h1>
                </div>
                <Dropdown/>
            </section>

            <section className={styles["image-container"]}>
                <img className={styles.image} src={markt} alt={"De markt in Schijndel"}/>
                <h2 className={styles.welcome}>Welkom op de website van Medialokaal</h2>
            </section>

        </header>
    )
}

export default Header