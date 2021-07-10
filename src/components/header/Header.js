import React from "react"
import styles from "./Header.module.css"
import markt from "../../images/markt.png"
import Dropdown from "./dropdown-menu/Dropdown"

function Header() {

    return (

        <div className={styles.container}>
            <header className={styles.header}>

                <div className={styles.logoContainer}>
                    <h1 className={styles.logo}>Media</h1>
                    <h1 className={styles.lokaal}>Lokaal.</h1>
                </div>

                <Dropdown/>

            </header>

            <div className={styles["image-container"]}>
                <img className={styles.image} src={markt} alt={"De markt in Schijndel"}/>
            </div>
            <h1 className={styles.welcome}>Welkom op de website van Medialokaal</h1>
        </div>
    );
}

export default Header