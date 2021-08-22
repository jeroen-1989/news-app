import {firestore} from "../../../firebase/firebase"
import React, {useState, useEffect, useContext} from "react"
import styles from "./Blogs.module.css"
import {CountContext} from "../../../context/TextsCountProvider";

const Blogs = () => {
    const {blogsCount, setBlogsCount} = useContext(CountContext)
    const [blogs, setBlogs] = useState([])
    const [showButton, setShowButton] = useState(true)
    const items = []

    const loadMoreBlogs = () => {
        setBlogsCount(blogs.length)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await firestore.collection("blogs")
                    .orderBy("timestamp", "desc")
                    .onSnapshot(function (querySnapshot) {
                        querySnapshot.forEach(function (editorial) {
                            items.push({key: editorial.id, ...editorial.data()})
                        })
                        setBlogs(items)
                    })
            } catch (e) {
                console.error(e)
            }
        }
        fetchData()
    }, [items])

    return (
        <main className={styles.container}>
            {
                blogs.slice(0, blogsCount).map((blogs) => (

                    <article key={blogs.timestamp} className={styles["output-container"]}>
                        <input className={styles["article-btn"]} type="checkbox"/>
                        <div className={styles["article-icon"]}>
                            <span className={styles.icon}/>
                        </div>
                        <section className={styles["article-container"]}>
                            <h4 className={styles.head}>
                                {blogs.Title}
                            </h4>
                            <section className={styles["category-container"]}>
                                <p className={styles.category}>{blogs.Category}</p>
                                <p className={styles.category}>•</p>
                                <time className={styles.category}>{blogs.timestamp.toDate()
                                    .toLocaleDateString("en-GB", {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit"
                                    })}
                                </time>
                                <p className={styles.category}>•</p>
                                <p className={styles.category}>Auteur: {blogs.Author}</p>
                            </section>
                            {
                                blogs.ImageServer &&
                                <img className={styles.picture}
                                     src={blogs.ImageServer}
                                     alt=""/>
                            }
                            {
                                blogs.Lead &&
                                <p className={styles.paragraph}>
                                    {blogs.Lead}
                                </p>
                            }
                            {
                                blogs.Body &&
                                <p className={styles.text}>
                                    {blogs.Body}
                                </p>
                            }
                        </section>
                    </article>
                ))
            }
            {blogsCount === 5 && <button onClick={() => {
                loadMoreBlogs()
                setShowButton(false)
            }}
                                    className={styles[showButton ? "load-text" : "hidden"]}>
                Meer berichten laden ...</button>}
        </main>
    )
}

export default Blogs