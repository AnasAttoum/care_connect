import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/joy/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { Link, Outlet, useLocation } from "react-router-dom";
import { links } from "../constants/data";

import styles from '../styles/header.module.css'
import Footer from "./Footer";

export default function Header() {

  const location = useLocation()
  const { pathname } = location

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>

      <div className="flex gap-3 justify-center items-center my-5">
        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="var(--primary)" d="M7 22v-5H2v-4h6.45l1.7 2.55q.125.2.35.325t.475.125q.325 0 .6-.2t.375-.5l1.35-4.05l.85 1.3q.15.2.375.325T15 13h7v4h-5v5zm3.7-9.25l-.875-1.3q-.125-.2-.35-.325T9 11H2V7h5V2h10v5h5v4h-6.475l-1.7-2.55q-.125-.2-.35-.325T13 8q-.325 0-.587.2t-.363.5z"></path></svg>
        <div className='text-2xl font-bold'>Care Connect</div>
      </div>

      <List>
        {links.map(({ name, url }, index) => (
          <Link to={url} key={index}>
            <ListItem key={name} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 50 50"><g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4}><path stroke="#353b55" d="M9.375 40.625a7.375 7.375 0 0 1 0-10.417L14.583 25A7.375 7.375 0 0 1 25 25a7.375 7.375 0 0 1 0 10.417l-5.208 5.208a7.375 7.375 0 0 1-10.417 0m27.083-16.667l5.209-5.208a7.375 7.375 0 0 0 0-10.417v0a7.375 7.375 0 0 0-10.417 0l-5.208 5.209a7.375 7.375 0 0 0 0 10.416v0a7.375 7.375 0 0 0 10.416 0"></path><path stroke="#344054" d="m20.833 29.167l8.334-8.334"></path></g></svg>
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );


  return (
    <>
      <div className="flex justify-between text-white px-7 py-5" style={{ backgroundColor: 'var(--primary)' }}>

        <Link to={'/'}>
          <div className="flex gap-3 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="white" d="M7 22v-5H2v-4h6.45l1.7 2.55q.125.2.35.325t.475.125q.325 0 .6-.2t.375-.5l1.35-4.05l.85 1.3q.15.2.375.325T15 13h7v4h-5v5zm3.7-9.25l-.875-1.3q-.125-.2-.35-.325T9 11H2V7h5V2h10v5h5v4h-6.475l-1.7-2.55q-.125-.2-.35-.325T13 8q-.325 0-.587.2t-.363.5z"></path></svg>
            <div>Care Connect</div>
          </div>
        </Link>

        <div className={`${styles.links} flex gap-5`}>
          {links.map(({ name, url }) => {
            const isActive = url === pathname
            return <Link to={url} key={name} className={isActive ? styles.active : ''}>{name}</Link>
          })}
        </div>

        <div className={`${styles.hamb} cursor-pointer`} onClick={toggleDrawer(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 32 32"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h22M5 16h22M5 24h22"></path></svg>
        </div>

      </div>

      <Drawer anchor={'right'} open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>

      <div className="my-5" style={{ minHeight: 'calc(100vh - 100px)' }}>
        <Outlet />
      </div>

      <Footer />

    </>
  )
}
