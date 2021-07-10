import React, {useEffect, useState} from "react"
import styles from "./Preview.module.css"
import {firestore} from "../../../firebase/firebase"

function Preview() {

    const [preview, setPreview] = useState([])

    const getData = () => {
        firestore.collection("editorial")
            .orderBy("timestamp", "desc")
            .limit(2)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach(element => {
                    const data = element.data()
                    setPreview(arr => [...arr, data])
                })
            })
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className={styles.container}>
            {
                preview.map((editorial) => (
                    <Frame title={editorial.Title}
                           image={editorial.ImageServer}
                           lead={editorial.Lead}
                           caption={editorial.Caption}
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

const Frame = ({
                   title, image, lead, caption, quote,
                   paragraphOne, paragraphTwo, paragraphThree
               }) => {
    return (

        <>
            <div className={styles.preview}>
                <div className={styles.cropper}>
                    <img className={styles.image} src={image} alt=""/>
                </div>
                <div>
                    <article className={styles.article}>
                    <h2 className={styles.title}>
                        {title}
                    </h2>
                    <p className={styles.caption}>Foto: {caption}</p>
                    <p className={styles.lead}>{lead}</p>
                    <p className={styles.quote}>{quote}</p>
                    <p className={styles.text}>{paragraphOne}</p>
                    <p className={styles.text}>{paragraphTwo}</p>
                    <p className={styles.text}>{paragraphThree}</p>
                </article>
                </div>
            </div>
        </>

    )
}
export default Preview

