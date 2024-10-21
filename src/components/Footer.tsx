import { Link } from "react-router-dom"
import { links } from "../constants/data"

export default function Footer() {
    return (
        <div className="flex flex-col justify-center items-center gap-5 bg-[--primary] text-white p-5 ">

            <div className="flex gap-3 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="white" d="M7 22v-5H2v-4h6.45l1.7 2.55q.125.2.35.325t.475.125q.325 0 .6-.2t.375-.5l1.35-4.05l.85 1.3q.15.2.375.325T15 13h7v4h-5v5zm3.7-9.25l-.875-1.3q-.125-.2-.35-.325T9 11H2V7h5V2h10v5h5v4h-6.475l-1.7-2.55q-.125-.2-.35-.325T13 8q-.325 0-.587.2t-.363.5z"></path></svg>
                <div className="text-2xl font-bold">Care Connect</div>
            </div>

            <div className="flex flex-wrap justify-center gap-5 ">
                {links.map(({ name, url }, index) => {
                    return <Link to={url} key={index}>{name}</Link>
                })}
            </div>

            <div className="text-xs">Copyright © 2024 Care Connect. All rights reserved</div>

        </div>
    )
}