import { Outlet } from "react-router-dom";
import NavigationBar from "./UI/Navigation";
import { useContext } from "react";
import styles from './Root.module.css'
import { DashboardContext } from "../store/dashboardContext";

import { toast } from 'react-toastify';


export default function RootLayout(){
    const {isAuth , roles, permissions} = useContext(DashboardContext);

    return <section className={styles.rootLayout}>
        {!isAuth && <p>Please <a href="/login">login</a></p>}
        {isAuth && <>
        <NavigationBar />
        <main className={styles.mainContent}>
            <section className={styles.menuBar}>
                <p>Admin Dashboard</p>
                <img src="user-icon.png" alt="user icon"/></section>
            {roles && permissions && <Outlet />}
        </main>
        </>
        }        
    </section>
}