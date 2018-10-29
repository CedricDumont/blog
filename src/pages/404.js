import React from "react"

import { Link } from "gatsby";

import LayoutBase from "../components/LayoutBase"

export default () => (
    <LayoutBase>
        <div>
            Oups ... sthg went wrong. Back to <Link to="/">Home</Link>
         </div>
    </LayoutBase>
)