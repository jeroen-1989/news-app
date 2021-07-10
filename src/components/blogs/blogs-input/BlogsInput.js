import React, {useState} from "react"
import {firestore, timestamp, imageStorage} from "../../../firebase/firebase"
import styles from "./BlogsInput.module.css"
import {useHistory, Link} from "react-router-dom"

const BlogsInput = () => {
    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [lead, setLead] = useState("")
    const [body, setBody] = useState("")
    const [url, setUrl] = useState("")
    const [buttonText, setButtonText] = useState("Verzenden")

    const upload = () => {
        if (image == null)
            return;
        imageStorage.ref(`/images/${image.name}`).put(image)
            .on("state_changed", alert("success"), alert, () => {

                imageStorage.ref("images").child(image.name).getDownloadURL()
                    .then((url) => {
                        setUrl(url)
                    })
            });
    }

    const sub = (e) => {
        e.preventDefault()

        firestore.collection("blogs").add({
            Title: title,
            Lead: lead,
            Body: body,
            timestamp: timestamp,
            ImageServer: url
        })
            .then((docRef) => {
                console.log("Het bericht is succesvol verzonden.")
            })
            .catch((error) => {
                console.log("Er is iets foutgegaan: ", error)
            })
    }

    const history = useHistory()
    const routeChange = () => {
        setTimeout(() => {
            history.push('/')
        }, 2000);
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>
                Voeg uw bericht hieronder toe:
            </h2>
            <form className={styles.form}
                  onSubmit={(event) => {
                      sub(event)
                  }}>


                <input className={styles.head}
                       type="text"
                       placeholder="Typ hier uw titel ..."
                       required
                       onChange={(e) => {
                           setTitle(e.target.value)
                       }}/>
                {!url ? <input className={styles.uploader}
                       type="file"
                       onChange={(e) => {
                           setImage(e.target.files[0])
                       }}/> : undefined}
                {!url ? <button className={styles.button}
                        type="button"
                        onClick={image ? upload : undefined}>
                    Upload afbeelding
                </button> : undefined}
                <p className={styles.reminder}>*Vergeet niet om op de upload-knop te drukken.</p>
                <img className={styles.preview}
                     alt=""
                     onChange={(e) => {
                         url(e.target.value)
                     }} src={url}/>
                <textarea className={styles.lead}
                          placeholder="Typ hier uw inleiding ..."
                          onChange={(e) => {
                              setLead(e.target.value)
                          }}/>
                <textarea className={styles.text}
                          placeholder="Typ hier de rest van uw bericht ..."
                          onChange={(e) => {
                              setBody(e.target.value)
                          }}/>
                <button className={styles.button}
                        type="submit"
                        onClick={() => {title ? routeChange() : setButtonText("Typ minimaal een titel ...")
                        }}>
                    {buttonText}
                </button>
            </form>
            <Link className={styles.cancel}
                  to="/">
                Annuleren
            </Link>
        </div>
    );
}

export default BlogsInput;