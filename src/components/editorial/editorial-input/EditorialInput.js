import React, {useState} from "react"
import {firestore, timestamp, imageStorage} from "../../../firebase/firebase"
import styles from "./EditorialInput.module.css"
import {useHistory, Link} from "react-router-dom"

const EditorialInput = () => {
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("Algemeen")
    const [author, setAuthor] = useState("")
    const [image, setImage] = useState("")
    const [caption, setCaption] = useState("")
    const [lead, setLead] = useState("")
    const [quote, setQuote] = useState("")
    const [paragraphOne, setParagraphOne] = useState("")
    const [paragraphTwo, setParagraphTwo] = useState("")
    const [paragraphThree, setParagraphThree] = useState("")
    const [url, setUrl] = useState("")
    const [buttonText, setButtonText] = useState("Verzenden")

    let categories = [
        {label: "Algemeen", value: "Algemeen"},
        {label: "Gemeenteberichten", value: "Gemeenteberichten"},
        {label: "Human interest", value: "Human interest"},
        {label: "Politiek", value: "Politiek"},
        {label: "Sport", value: "Sport"}
    ]

    const upload = () => {
        if (image == null)
            return;
        imageStorage.ref(`/images/${image.name}`).put(image)
            .on("state_changed", () => {

                imageStorage.ref("images").child(image.name).getDownloadURL()
                    .then((url) => {
                        setUrl(url)
                    })
            })
    }

    const sub = (e) => {
        e.preventDefault()

        firestore.collection("editorial").add({
            Title: title,
            Category: category,
            Author: author,
            ImageServer: url,
            Caption: caption,
            Quote: quote,
            Lead: lead,
            Paragraph1: paragraphOne,
            Paragraph2: paragraphTwo,
            Paragraph3: paragraphThree,
            timestamp: timestamp,
        })
            .then(() => {
                console.log("Het bericht is succesvol verzonden.")
            })
            .catch((error) => {
                console.log("Er is iets fout gegaan: ", error)
            })
    }

    const history = useHistory()
    const routeChange = () => {
        setTimeout(() => {
            history.push("/")
        }, 500)
    }

    return (
        <div className={styles["input-container"]}>
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

                {
                    !url &&
                    <>
                        <input className={styles.uploader}
                               type="file"
                               onChange={(e) => {
                                   setImage(e.target.files[0])
                               }}/>
                        <button className={styles.button}
                                type="button"
                                onClick={image ? upload : undefined}>
                            Upload afbeelding
                        </button>
                        <p className={styles.reminder}>*Vergeet niet om op de upload-knop te drukken.</p>
                    </>
                }

                {
                    url &&
                    <>
                        <img className={styles.preview}
                             alt=""
                             onChange={(e) => {
                                 setUrl(e.target.value)
                             }} src={url}/>
                        <input className={styles.caption}
                               type="text"
                               placeholder="Typ hier een foto-onderschrift ..."
                               onChange={(e) => {
                                   setCaption(e.target.value)
                               }}/>
                    </>
                }

                <div className={styles["category-container"]}>
                    <select className={styles.category}
                            onChange={(e) => {
                                setCategory(e.target.value)
                            }}>
                        {categories.map((category) =>
                            <option value={category.value}>
                                {category.label}
                            </option>
                        )}
                    </select>
                    <input className={styles.author}
                           type="text"
                           placeholder="Geschreven door ..."
                           required
                           onChange={(e) => {
                               setAuthor(e.target.value)
                           }}/>
                </div>
                <textarea className={styles.lead}
                          placeholder="Typ hier uw inleiding ..."
                          required
                          onChange={(e) => {
                              setLead(e.target.value)
                          }}/>
                <input className={styles.head}
                       type="text"
                       required
                       placeholder="Typ hier een quote ..."
                       onChange={(e) => {
                           setQuote(e.target.value)
                       }}/>
                <textarea className={styles.text}
                          placeholder="Typ hier (e.v.t.) de tweede paragraaf ..."
                          onChange={(e) => {
                              setParagraphOne(e.target.value)
                          }}/>
                <textarea className={styles.text}
                          placeholder="Typ hier (e.v.t.) de derde paragraaf ..."
                          onChange={(e) => {
                              setParagraphTwo(e.target.value)
                          }}/>
                <textarea className={styles.text}
                          placeholder="Typ hier (e.v.t.) de vierde paragraaf ..."
                          onChange={(e) => {
                              setParagraphThree(e.target.value)
                          }}/>
                <button className={styles.button}
                        type="submit"
                        onClick={() => {
                            title && author && url && lead && quote ? routeChange()
                                : setButtonText("Niet alle verplichte velden zijn ingevuld ...")
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

export default EditorialInput;