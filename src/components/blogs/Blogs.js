import {firestore} from '../../firebase/firebase'
import React, {useState, useEffect} from 'react'
import styles from './Blogs.module.css'

const Blogs = () => {
    const [blogs, setBlogs] = useState([])

    const getData = () => {
        firestore.collection("blogs")
            .orderBy("timestamp", "desc")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach(element => {
                    const data = element.data()
                    setBlogs(arr => [...arr, data])
                })
            })
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className={styles.container}>
            {
                blogs.map((blogs) => (
                    <Frame title={blogs.Title}
                           image={blogs.ImageServer}
                           lead={blogs.Lead}
                           body={blogs.Body}
                    />
                ))
            }
        </div>
    )
}

const Frame = ({title, image, lead, body}) => {

    return (
        <div className={styles["output-container"]}>
            <input className={styles["article-btn"]} type="checkbox"/>
            <label className={styles["article-icon"]}>
                <span className={styles.icon}/>
            </label>
            <article className={styles["article-container"]}>

                <h4 className={styles.head}>
                    {title}
                </h4>
                <img className={styles.picture}
                     src={image}
                     alt=""/>
                <p className={styles.paragraph}>
                    {lead}
                </p>
                <p className={styles.text}>
                    {body}
                </p>
            </article>
        </div>
    )
}

export default Blogs