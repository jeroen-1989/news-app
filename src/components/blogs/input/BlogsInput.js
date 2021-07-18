import React, {useState} from "react"
import {firestore, timestamp, imageStorage} from "../../../firebase/firebase"
import styles from "./BlogsInput.module.css"
import {useHistory, Link} from "react-router-dom"
import Button from "../../helpers/button/Button"
import CancelButton from "../../helpers/cancel-button/CancelButton"

const BlogsInput = () => {
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("Algemeen")
    const [author, setAuthor] = useState("")
    const [image, setImage] = useState("")
    const [lead, setLead] = useState("")
    const [body, setBody] = useState("")
    const [url, setUrl] = useState("")
    const [buttonText, setButtonText] = useState("Verzenden")
    const [disable, setDisable] = useState(false)

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
            });
    }

    const sendToFirestore = (e) => {
        e.preventDefault()

        firestore.collection("blogs").add({
            Title: title,
            Category: category,
            Author: author,
            Lead: lead,
            Body: body,
            timestamp: timestamp,
            ImageServer: url
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
        setDisable(true)
        setTimeout(() => {
            history.push("/")
        }, 500);
    }

    return (
        <main className={styles["input-container"]}>

            <h2 className={styles.header}>
                Voeg uw bericht hieronder toe:
            </h2>

            <form className={styles.form}
                  onSubmit={(event) => {
                      sendToFirestore(event)
                  }}>

                <input className={styles.head}
                       type="text"
                       placeholder="Typ hier uw titel ..."
                       required
                       onChange={(e) => {
                           setTitle(e.target.value)
                       }}/>

                {
                    !url ?
                        <>
                            <input className={styles.uploader}
                                   type="file"
                                   onChange={(e) => {
                                       setImage(e.target.files[0])
                                   }}/>
                            <Button
                                    type="button"
                                    clickHandler={image ? upload : undefined}>
                                Upload afbeelding
                            </Button>
                            <p className={styles.reminder}>*Vergeet niet om op de upload-knop te drukken.</p>
                        </>
                        : undefined
                }

                <img className={styles.preview}
                     alt=""
                     onChange={(e) => {
                         url(e.target.value)
                     }} src={url}/>

                <section className={styles["category-container"]}>
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
                </section>

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

                <Button
                        type="submit"
                        disabled={disable}
                        clickHandler={() => {
                            title && author ? routeChange()
                                : setButtonText("Niet alle verplichte velden zijn ingevuld ...")
                        }}>
                    {buttonText}
                </Button>

            </form>

            <CancelButton/>

        </main>
    );
}

export default BlogsInput;