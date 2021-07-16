import React, {useContext} from 'react'
import styles from "./App.module.css"
import {Switch, Route} from "react-router-dom"
import {UserContext} from "./context/UserProvider"
import Header from "./components/header/Header"
import EditorialInput from "./components/editorial/input/EditorialInput"
import Editorial from "./components/editorial/output/Editorial"
import BlogsInput from "./components/blogs/input/BlogsInput"
import Blogs from "./components/blogs/output/Blogs"
import AgendaInput from "./components/agenda/input/AgendaInput"
import Agenda from "./components/agenda/output/Agenda"
import Footer from "./components/footer/Footer"
import Weather from "./components/weather/Weather"

function App() {
    const user = useContext(UserContext)

    return (
        <>
            <Header/>
            <Weather/>

            <Switch>
                <Route exact path="/">
                    <div className={styles["user-content"]}>
                        <div className={styles["news-container"]}>
                            <Editorial/>
                            <Blogs/>
                        </div>
                        <div className={styles["agenda-container"]}>
                            <Agenda/>
                        </div>
                    </div>
                </Route>

                {
                    user &&
                    <>
                        <Route path="/add-story">
                            <div className={styles["user-content"]}>
                                <BlogsInput/>
                            </div>
                        </Route>

                        <Route path="/add-main-story">
                            <div className={styles["user-content"]}>
                                <EditorialInput/>
                            </div>
                        </Route>

                        <Route path="/agenda">
                            <div className={styles["user-content"]}>
                                <div>
                                    <AgendaInput/>
                                </div>
                            </div>
                        </Route>
                    </>
                }

            </Switch>
            <Footer/>
        </>
    )
}

export default App
