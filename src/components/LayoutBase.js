import React from "react"
import Header from "./Header"
import layoutStyles from "./layout.module.css"

export default ({ children }) => (
    <div className={layoutStyles.container}>
        <Header />
        <hr/>
        {children}
    </div>
)