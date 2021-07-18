import React from "react"
import styles from "./Button.module.css"

function Button({type, children, clickHandler}) {
    return (
        <button
            type={type}
            className={styles.button}
            onClick={clickHandler}
        >
            {children}
        </button>
    )
}

export default Button