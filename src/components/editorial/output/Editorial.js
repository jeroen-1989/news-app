import React, {useState, useEffect, useContext} from "react"
import styles from "./Editorial.module.css"
import {firestore} from "../../../firebase/firebase"
import {CountContext} from "../../../context/CountProvider";

function Editorial() {
    const [editorial, setEditorial] = useState([])
    const [showButton, setShowButton] = useState(true)
    const {editorialCount, setEditorialCount} = useContext(CountContext)
    const items = []

    const loadMoreEditorials = () => {
        setEditorialCount(editorial.length)
    }

    useEffect(() => {
        const fetchData = async () => {
            await firestore.collection("editorial")
                .orderBy("timestamp", "desc")
                .onSnapshot(function (querySnapshot) {
                    querySnapshot.forEach(function (editorial) {
                        items.push({key: editorial.id, ...editorial.data()})
                    })
                    setEditorial(items)
                })
        }
        fetchData()
    }, [items])


    return (
        <div className={styles.container}>
            {
                editorial.slice(0, editorialCount).map((editorial) => (
                    <div className={styles["output-container"]}>
                        <input className={styles["article-btn"]} type="checkbox"/>

                        <label className={styles["article-icon"]}>
                            <span className={styles.icon}/>
                        </label>

                        <article className={styles["article-container"]}>

                            <h2 className={styles.title}>
                                {editorial.Title}
                            </h2>
                            <div className={styles["category-container"]}>
                                <p className={styles.category}>{editorial.Category}</p>
                                <p className={styles.category}>•</p>
                                <p className={styles.category}>{editorial.timestamp.toDate()
                                    .toLocaleDateString("en-GB", {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit'
                                    })}</p>
                                <p className={styles.category}>•</p>
                                <p className={styles.category}>Auteur: {editorial.Author}</p>
                            </div>
                            <img className={styles.image}
                                 src={editorial.ImageServer}
                                 alt=""/>
                            {
                                editorial.Caption &&
                                <p className={styles.caption}>
                                {editorial.Caption}
                            </p>
                            }
                            <p className={styles.lead}>
                                {editorial.Lead}
                            </p>
                            <h4 className={styles.quote}>
                                {editorial.Quote}
                            </h4>
                            <div className={styles.body}>
                                {
                                    editorial.Paragraph1 &&
                                    <p className={styles["paragraph-one"]}>
                                        {editorial.Paragraph1}
                                    </p>
                                }
                                {
                                    editorial.Paragraph2 &&
                                    <p className={styles["paragraph-two"]}>
                                        {editorial.Paragraph2}
                                    </p>
                                }
                                {
                                    editorial.Paragraph3 &&
                                    <p className={styles["paragraph-three"]}>
                                    {editorial.Paragraph3}
                                </p>
                                }
                            </div>

                        </article>
                    </div>))}

            {editorialCount === 2 && <p onClick={() => {
                loadMoreEditorials()
                setShowButton(false)
            }}
                                        className={styles[showButton ? "load-text" : "hidden"]
                                        }>
                Meer berichten laden ...</p>}
        </div>

    )
}

export default Editorial
