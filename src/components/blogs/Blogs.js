import {firestore} from "../../firebase/firebase"
import React, {useState, useEffect, useContext} from "react"
import styles from "./Blogs.module.css"
import {CountContext} from "../../context/CountProvider";

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
            await firestore.collection("blogs")
                .orderBy("timestamp", "desc")
                .onSnapshot(function (querySnapshot) {
                    querySnapshot.forEach(function (editorial) {
                        items.push({key: editorial.id, ...editorial.data()})
                    })
                    setBlogs(items)
                })
        }
        fetchData()
    }, [items])

    return (
        <div className={styles.container}>
            {
                blogs.slice(0, blogsCount).map((blogs) => (

                    <div className={styles["output-container"]}>
                        <input className={styles["article-btn"]} type="checkbox"/>
                        <label className={styles["article-icon"]}>
                            <span className={styles.icon}/>
                        </label>
                        <article className={styles["article-container"]}>
                            <h4 className={styles.head}>
                                {blogs.Title}
                            </h4>
                            <p className={styles.category}>
                                {blogs.Category} - {blogs.timestamp.toDate()
                                .toLocaleDateString("en-GB", {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit'
                            })}
                            </p>
                            <img className={styles.picture}
                                 src={blogs.ImageServer}
                                 alt=""/>
                            <p className={styles.paragraph}>
                                {blogs.Lead}
                            </p>
                            <p className={styles.text}>
                                {blogs.Body}
                            </p>
                        </article>
                    </div>
                ))
            }
            {blogsCount === 5 && <p onClick={() => {
                loadMoreBlogs()
                setShowButton(false)
            }}
               className={styles[showButton ? "load-text" : "hidden"]}>
                Meer berichten laden ...</p>}
        </div>
    )
}

export default Blogs