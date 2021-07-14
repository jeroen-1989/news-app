import React, {useState, useEffect} from "react"
import styles from "./Editorial.module.css"
import {firestore} from "../../firebase/firebase"

function Editorial() {
    const [editorial, setEditorial] = useState([])
    const [showButton, setShowButton] = useState(true)
    const [editorialCount, setEditorialCount] = useState(2)
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
    }, []) //eslint-disable-line react-hooks/exhaustive-deps


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
                            <p className={styles.category}>
                                {editorial.Category} - {editorial.timestamp.toDate().toLocaleDateString("en-GB", { year: 'numeric', month: '2-digit', day: '2-digit' })}
                            </p>
                            <img className={styles.image}
                                 src={editorial.ImageServer}
                                 alt=""/>
                            <p className={styles.caption}>{editorial.Caption}</p>
                            <p className={styles.lead}>{editorial.Lead}</p>
                            <h4 className={styles.quote}>
                                {editorial.Quote}
                            </h4>
                            <div className={styles.body}>
                                <p className={styles.paragraph}>
                                    {editorial.Paragraph1}
                                </p>
                                <p className={styles.paragraph}>
                                    {editorial.Paragraph2}
                                </p>
                                <p className={styles.paragraph}>
                                    {editorial.Paragraph3}
                                </p>
                            </div>

                        </article>
                    </div>))}

            <p onClick={() => {
                loadMoreEditorials()
                setShowButton(false)
            }}
               className={styles[showButton ? "load-text" : "hidden"]
               }>
                Meer berichten laden ...</p>
        </div>

    )
}

export default Editorial
