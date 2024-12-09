import { useContext, useEffect, useState } from "react";

import styles from './RoleContent.module.css'
import RoleHeader from "./RoleHeader";
import RolesList from "./RolesList";
import { DashboardContext } from "../../store/dashboardContext";

export default function RolesMainContent() {

    const {roles, permissions} = useContext(DashboardContext);

    return <section className={styles.RoleContent}> 
        <RoleHeader />
        {roles && <RolesList/>}
        
    </section>

}