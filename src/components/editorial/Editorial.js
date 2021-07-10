import React, {useState, useEffect} from 'react'
import styles from './Editorial.module.css'
import {firestore} from "../../firebase/firebase";

function Editorial() {
    const [editorial, setEditorial] = useState([])

    const getData = () => {
        firestore.collection("editorial")
            .orderBy("timestamp", "desc")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach(element => {
                    const data = element.data()
                    setEditorial(arr => [...arr, data])
                })
            })
    }

    useEffect(() => {
        getData()
    }, [])

    return (
            <div className={styles.container}>
                {
                    editorial.map((editorial) => (
                        <EditorialFrame title={editorial.Title}
                                        image={editorial.ImageServer}
                                        caption={editorial.Caption}
                                        lead={editorial.Lead}
                                        quote={editorial.Quote}
                                        paragraphOne={editorial.Paragraph1}
                                        paragraphTwo={editorial.Paragraph2}
                                        paragraphThree={editorial.Paragraph3}
                        />
                    ))
                }

            </div>

    );
}

const EditorialFrame = ({
                            title, image, caption, lead, quote,
                            paragraphOne, paragraphTwo, paragraphThree
                        }) => {
    return (
        <div className={styles["output-container"]}>
            <input className={styles["article-btn"]} type="checkbox"/>
            <label className={styles["article-icon"]}>
                <span className={styles.icon}/>
            </label>
            <article className={styles["article-container"]}>

                <h2 className={styles.title}>
                    {title}
                </h2>

                <img className={styles.image}
                     src={image}
                     alt=""/>

                <p className={styles.caption}>{caption}</p>
                <p className={styles.lead}>{lead}</p>

                <h4 className={styles.quote}>
                    {quote}
                </h4>

                <div className={styles.body}>
                    <p className={styles.paragraph}>
                        {paragraphOne}
                    </p>
                    <p className={styles.paragraph}>
                        {paragraphTwo}
                    </p>
                    <p className={styles.paragraph}>
                        {paragraphThree}
                    </p>
                </div>

            </article>
        </div>
    )
}

export default Editorial
