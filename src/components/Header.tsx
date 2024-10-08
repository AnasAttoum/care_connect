import { Link, Outlet, useLocation } from "react-router-dom";
import { links } from "../constants/data";

import styles from '../styles/header.module.css'

export default function Header() {

  const location = useLocation()
  const { pathname } = location


  return (
    <>
      <div className="flex justify-between text-white px-7 py-5" style={{ backgroundColor: 'var(--primary)' }}>

        <Link to={'/'}>
          <div className="flex gap-3 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="white" d="M7 22v-5H2v-4h6.45l1.7 2.55q.125.2.35.325t.475.125q.325 0 .6-.2t.375-.5l1.35-4.05l.85 1.3q.15.2.375.325T15 13h7v4h-5v5zm3.7-9.25l-.875-1.3q-.125-.2-.35-.325T9 11H2V7h5V2h10v5h5v4h-6.475l-1.7-2.55q-.125-.2-.35-.325T13 8q-.325 0-.587.2t-.363.5z"></path></svg>
            <div>Care Connect</div>
          </div>
        </Link>

        <div className="flex gap-5">
          {links.map(({ name, url }) => {
            const isActive = url === pathname
            return <Link to={url} key={name} className={isActive ? styles.active : ''}>{name}</Link>
          })}
        </div>

      </div>

      <Outlet />

    </>
  )
}
